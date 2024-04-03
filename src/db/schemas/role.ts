import { pgTable, text } from "drizzle-orm/pg-core";
import { createId } from "@paralleldrive/cuid2";
import { createInsertSchema } from "drizzle-typebox";

export const roles = pgTable("role", {
  id: text("id").notNull().primaryKey().$defaultFn(createId),
  name: text("name"),
  description: text("description"),
});

export const insertRoleSchema = createInsertSchema(roles);
export type InsertRoleSchema = typeof insertRoleSchema.static;
