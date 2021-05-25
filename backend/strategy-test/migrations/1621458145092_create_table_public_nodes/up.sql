CREATE TABLE "public"."nodes"("position" jsonb NOT NULL, "id" serial NOT NULL, PRIMARY KEY ("id") ); COMMENT ON TABLE "public"."nodes" IS E'Nodes on a strategy map (i.e. towns or cities)';
