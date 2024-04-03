import { pgTable, text } from "drizzle-orm/pg-core";
import { createId } from "@paralleldrive/cuid2";
import { createInsertSchema } from "drizzle-typebox";
import { roles } from "@/db/schemas/role";

export const users = pgTable("user", {
  id: text("id").notNull().primaryKey().$defaultFn(createId),
  name: text("name"),
  email: text("email"),
  roleId: text("roleId")
    .notNull()
    .references(() => roles.id, { onDelete: "cascade" }),
});

export const insertUserSchema = createInsertSchema(users);

export type InsertUserSchema = typeof insertUserSchema.static;
