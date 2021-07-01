CREATE TABLE "public"."army_types"("id" serial NOT NULL, "speed" integer NOT NULL, PRIMARY KEY ("id") , UNIQUE ("id")); COMMENT ON TABLE "public"."army_types" IS E'Army type properties';
