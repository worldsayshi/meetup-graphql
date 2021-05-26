ALTER TABLE ONLY "public"."armies" ALTER COLUMN "planned_path" SET DEFAULT '[]'::jsonb;
ALTER TABLE "public"."armies" ALTER COLUMN "planned_path" SET NOT NULL;
