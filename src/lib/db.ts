import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import * as roleSchema from "@/db/schemas/role";
import * as userSchema from "@/db/schemas/user";
import { t } from "elysia";
import { env } from "@/env";

const queryClient = postgres(env.DATABASE_URL);

export const db = drizzle(queryClient, {
  schema: { ...roleSchema, ...userSchema },
});

export const idParamsSchema = t.Object({ id: t.Numeric() });
