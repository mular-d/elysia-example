import { pgTable, text } from "drizzle-orm/pg-core";
import { createId } from "@paralleldrive/cuid2";

export const users = pgTable("user", {
  id: text("id").notNull().primaryKey().$defaultFn(createId),
  name: text("name"),
  email: text("email"),
  roleId: text("roleId")
    .notNull()
    .references(() => roles.id, { onDelete: "cascade" }),
});

export const roles = pgTable("role", {
  id: text("id").notNull().primaryKey().$defaultFn(createId),
  name: text("name"),
  description: text("description"),
});
