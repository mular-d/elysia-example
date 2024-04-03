import { insertRoleSchema, roles } from "@/db/schemas/role";
import { db } from "@/lib/db";
import { createElysia } from "@/util/elysia";
import { eq } from "drizzle-orm";

export const rolesRoutes = createElysia({ prefix: "/roles" })
  .get("/", async () => {
    const res = await db.query.roles.findMany();
    return res;
  })
  .post(
    "/",
    async ({ body }) => {
      const res = await db.insert(roles).values(body).returning();
      return res;
    },
    {
      body: insertRoleSchema,
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
      body: insertRoleSchema,
    },
  )
  .delete("/:id", async ({ params: { id } }) => {
    const res = await db.delete(roles).where(eq(roles.id, id)).returning();
    return res;
  });
