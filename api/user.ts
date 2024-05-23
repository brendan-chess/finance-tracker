import bcrypt from "bcrypt";
import { db } from "@/database";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

// Request body types
type RegisterBodyType = {
  username: string;
  password: string;
  email: string;
};

type LoginBodyType = {
  username: string;
  password: string;
};

async function userRoutes(fastify: FastifyInstance, options: Object) {
  // Register a new user
  fastify.post(
    "/api/user/register",
    async (
      request: FastifyRequest<{ Body: RegisterBodyType }>,
      reply: FastifyReply
    ) => {
      const { username, password, email } = request.body;

      try {
        const userExists = await db
          .selectFrom("users")
          .selectAll()
          .where("username", "=", username)
          .executeTakeFirst();
        if (userExists) {
          return reply.status(400).send({ error: "Username already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const [newUser] = await db
          .insertInto("users")
          .values({
            username,
            password: hashedPassword,
            email,
            created_at: new Date(),
          })
          .returning(["id", "username", "email", "created_at"])
          .execute();

        reply.send(newUser);
      } catch (error) {
        reply.status(500).send(error);
      }
    }
  );

  // Log a user in
  fastify.post(
    "/api/user/login",
    async (
      request: FastifyRequest<{ Body: LoginBodyType }>,
      reply: FastifyReply
    ) => {
      const { username, password } = request.body;

      try {
        // Find the user if they exist
        const user = await db
          .selectFrom("users")
          .selectAll()
          .where("username", "=", username)
          .executeTakeFirst();
        if (!user) {
          return reply
            .status(400)
            .send({ error: "Invalid username or password" });
        }

        // Check the password
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
          return reply
            .status(400)
            .send({ error: "Invalid username or password" });
        }

        // Credentials are valid, generate a JWT
        const token = fastify.jwt.sign({
          id: user.id,
          username: user.username,
        });

        reply.send({ token });
      } catch (error) {
        reply.status(500).send(error);
      }
    }
  );
}

export default userRoutes;
