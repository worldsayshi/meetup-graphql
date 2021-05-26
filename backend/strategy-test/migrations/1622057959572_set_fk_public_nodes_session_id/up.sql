alter table "public"."nodes"
           add constraint "nodes_session_id_fkey"
           foreign key ("session_id")
           references "public"."sessions"
           ("id") on update restrict on delete restrict;
