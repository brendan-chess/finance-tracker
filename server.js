require("dotenv").config();

const fastify = require("fastify")({
  logger: true,
});
const Next = require("next");

// Create the Next.js app instance
const dev = process.env.NODE_ENV !== "production";
const app = Next({ dev });
const handle = app.getRequestHandler();

// Register Fastify plugins
fastify.register(require("@fastify/cors"), { origin: true }); // Only use origin: true for development
fastify.register(require("@fastify/helmet"));
fastify.register(require("@fastify/jwt"), { secret: process.env.JWT_SECRET });

// Wait for the Next app to be ready, then start the Fastify server
app.prepare().then(() => {
  // API route declarations
  fastify.get("/api/hello", async (request, reply) => {
    return { message: "hello world" };
  });

  // Pass any route not handled by Fastify to the Next app
  // This is where requests for front-end pages will land
  fastify.get("/*", (request, reply) => {
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
    (error) => {
      if (error) {
        fastify.log.error(error);
        process.exit(1);
      }
    }
  );
});
