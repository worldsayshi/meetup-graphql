CREATE TABLE "public"."edges"("id" serial NOT NULL, "from" integer NOT NULL, "to" integer NOT NULL, PRIMARY KEY ("id") , FOREIGN KEY ("from") REFERENCES "public"."nodes"("id") ON UPDATE restrict ON DELETE restrict, FOREIGN KEY ("to") REFERENCES "public"."nodes"("id") ON UPDATE restrict ON DELETE restrict); COMMENT ON TABLE "public"."edges" IS E'Paths between cities/points on the game map';
