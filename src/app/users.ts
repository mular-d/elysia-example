import { roles } from "@/db/schemas/role";
import { insertUserSchema, users } from "@/db/schemas/user";
import { db } from "@/lib/db";
import { createElysia } from "@/util/elysia";
import { eq } from "drizzle-orm";

export const usersRoutes = createElysia({ prefix: "/users" })
  .get("/", async () => {
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
    "/",
    async ({ body }) => {
      return await db.insert(users).values(body).returning();
    },
    {
      body: insertUserSchema,
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
      body: insertUserSchema,
    },
  )
  .delete("/:id", async ({ params: { id } }) => {
    const res = await db.delete(users).where(eq(users.id, id)).returning();
    return res;
  });
