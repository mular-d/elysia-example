import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

const runMigrate = async () => {
  if (process.env.DATABASE_URL) {
    const migrationClient = postgres(process.env.DATABASE_URL, { max: 1 });
    const start = Date.now();

    await migrate(drizzle(migrationClient), {
      migrationsFolder: "src/db/migrations",
    });

    const end = Date.now();

    console.log("Migrations completed in", end - start, "ms");

    process.exit(0);
  } else {
    throw Error("DATABASE_URL is not found.");
  }
};

runMigrate().catch((err) => {
  console.error("Migration failed");
  console.error(err);
  process.exit(1);
});
