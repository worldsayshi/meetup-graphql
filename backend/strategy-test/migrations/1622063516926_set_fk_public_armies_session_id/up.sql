alter table "public"."armies"
           add constraint "armies_session_id_fkey"
           foreign key ("session_id")
           references "public"."sessions"
           ("id") on update restrict on delete restrict;
