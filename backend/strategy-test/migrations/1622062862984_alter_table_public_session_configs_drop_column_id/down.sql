ALTER TABLE "public"."session_configs" ADD COLUMN "id" int4;
ALTER TABLE "public"."session_configs" ALTER COLUMN "id" DROP NOT NULL;
