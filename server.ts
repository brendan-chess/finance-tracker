import "dotenv/config";
import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import Next from "next";
import { db } from "./database";
import fastifyCors from "@fastify/cors";
import { fastifyHelmet } from "@fastify/helmet";
import { fastifyJwt } from "@fastify/jwt";

const fastify = Fastify({ logger: true });
const dev = process.env.NODE_ENV !== "production";

// Create the Next app instance
const app = Next({ dev });
// Get the Next app's request handler, so we can forward requests for pages to it
const handle = app.getRequestHandler();

// Register Fastify plugins
fastify.register(fastifyCors, { origin: true });
fastify.register(fastifyHelmet);
fastify.register(fastifyJwt, { secret: process.env.JWT_SECRET || "" });

// Wait for the Next app to be ready, then start the Fastify server
app.prepare().then(() => {
  // API route declarations
  fastify.get("/api/users", async () => {
    const rows = await db.selectFrom("users").selectAll().execute();
    return { users: rows };
  });

  // Pass any route not handled by Fastify to the Next app
  // This is where requests for front-end pages will land
  fastify.get("/*", (request: FastifyRequest, reply: FastifyReply) => {
    return handle(request.raw, reply.raw).then(() => {
      reply.hijack();
    });
  });

  // Start the Fastify server
  fastify.listen(
    {
      port: 3000,
      host: "0.0.0.0",
    },
    (error: Error | null) => {
      if (error) {
        fastify.log.error(error);
        process.exit(1);
      }
    }
  );
});
