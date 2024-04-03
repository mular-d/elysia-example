import swagger from "@elysiajs/swagger";
import { Elysia, t } from "elysia";
import { db } from "./db";
import { roles, users } from "./db/schema";
import { eq } from "drizzle-orm";

const app = new Elysia()
  .use(swagger())
  .group("/users", (app) =>
    app
      .get("", async () => {
        const res = await db
          .select({
            id: users.id,
            name: users.name,
            email: users.email,
            role: { id: roles.id, name: roles.name },
          })
          .from(users)
          .innerJoin(roles, eq(users.roleId, roles.id));
        return res;
      })
      .post(
        "",
        async ({ body }) => {
          return await db.insert(users).values(body).returning();
        },
        {
          body: t.Object({
            name: t.String({ minLength: 3 }),
            email: t.String(),
            roleId: t.String(),
          }),
        },
      )
      .put(
        "/:id",
        async ({ params: { id }, body }) => {
          const res = await db
            .update(users)
            .set({ name: body.name, email: body.email, roleId: body.roleId })
            .where(eq(users.id, id))
            .returning();
          return res;
        },
        {
          body: t.Object({
            name: t.String({ minLength: 3 }),
            email: t.String(),
            roleId: t.String(),
          }),
        },
      )
      .delete("/:id", async ({ params: { id } }) => {
        const res = await db.delete(users).where(eq(users.id, id)).returning();
        return res;
      }),
  )
  .group("/roles", (app) =>
    app
      .get("", async () => {
        const res = await db.query.roles.findMany();
        return res;
      })
      .post(
        "",
        async ({ body }) => {
          const res = await db.insert(roles).values(body).returning();
          return res;
        },
        {
          body: t.Object({
            name: t.String({ minLength: 3 }),
            description: t.String(),
          }),
        },
      )
      .put(
        "/:id",
        async ({ params: { id }, body }) => {
          const res = await db
            .update(roles)
            .set({ name: body.name, description: body.description })
            .where(eq(roles.id, id))
            .returning();
          return res;
        },
        {
          body: t.Object({
            name: t.String({ minLength: 3 }),
            description: t.String(),
          }),
        },
      )
      .delete("/:id", async ({ params: { id } }) => {
        const res = await db.delete(roles).where(eq(roles.id, id)).returning();
        return res;
      }),
  )

  .listen(3000);

console.log(`Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
