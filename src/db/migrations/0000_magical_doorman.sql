CREATE TABLE IF NOT EXISTS "role" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text,
	"description" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text,
	"email" text,
	"roleId" text NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user" ADD CONSTRAINT "user_roleId_role_id_fk" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
