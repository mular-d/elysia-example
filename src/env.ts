import { z } from "zod";

const envVariables = z.object({
  DATABASE_URL: z.string().min(1),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  PORT: z.coerce.number().default(3000),
});

export const env = envVariables.parse(process.env);
