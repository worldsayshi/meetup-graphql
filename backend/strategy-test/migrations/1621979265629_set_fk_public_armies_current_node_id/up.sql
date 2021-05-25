alter table "public"."armies"
           add constraint "armies_current_node_id_fkey"
           foreign key ("current_node_id")
           references "public"."nodes"
           ("id") on update restrict on delete restrict;
