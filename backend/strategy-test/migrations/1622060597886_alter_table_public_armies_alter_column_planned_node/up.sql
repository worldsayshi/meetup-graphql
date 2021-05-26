ALTER TABLE ONLY "public"."armies" ALTER COLUMN "planned_node" SET DEFAULT '[]'::jsonb;
alter table "public"."armies" rename column "planned_node" to "planned_path";
