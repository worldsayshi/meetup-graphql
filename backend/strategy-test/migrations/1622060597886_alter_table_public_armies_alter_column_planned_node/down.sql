ALTER TABLE ONLY "public"."armies" ALTER COLUMN "planned_node" DROP DEFAULT;
alter table "public"."armies" rename column "planned_path" to "planned_node";
