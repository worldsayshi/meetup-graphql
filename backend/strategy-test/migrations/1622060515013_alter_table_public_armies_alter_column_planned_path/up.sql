ALTER TABLE "public"."armies" ALTER COLUMN "planned_path" DROP DEFAULT;
ALTER TABLE "public"."armies" ALTER COLUMN "planned_path" DROP NOT NULL;
