import { app } from "@/app";
import { createElysia } from "@/util/elysia";
import { env } from "@/env";

const server = createElysia().use(app);

server.listen({ port: env.PORT }, ({ hostname, port }) => {
  const url = env.NODE_ENV === "production" ? "https" : "http";

  console.log(`Elysia is running at ${url}://${hostname}:${port}`);
});
