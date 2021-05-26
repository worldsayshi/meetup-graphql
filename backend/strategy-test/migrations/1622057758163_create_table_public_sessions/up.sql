CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE TABLE "public"."sessions"("id" serial NOT NULL, "uuid" uuid NOT NULL DEFAULT gen_random_uuid(), PRIMARY KEY ("id") ); COMMENT ON TABLE "public"."sessions" IS E'A gaming session';
