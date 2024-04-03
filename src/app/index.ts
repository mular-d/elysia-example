import { createElysia } from "@/util/elysia";
import swagger from "@elysiajs/swagger";
import { usersRoutes } from "@/app/users";
import { rolesRoutes } from "@/app/roles";

export const app = createElysia()
  .use(swagger())

  .use(usersRoutes)

  .use(rolesRoutes)

  .get("/health", () => { });

export type App = typeof app;
