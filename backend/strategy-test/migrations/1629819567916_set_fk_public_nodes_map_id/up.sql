alter table "public"."nodes"
           add constraint "nodes_map_id_fkey"
           foreign key ("map_id")
           references "public"."maps"
           ("id") on update restrict on delete restrict;
