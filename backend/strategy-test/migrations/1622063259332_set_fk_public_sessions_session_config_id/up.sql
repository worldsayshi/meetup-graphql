alter table "public"."sessions"
           add constraint "sessions_session_config_id_fkey"
           foreign key ("session_config_id")
           references "public"."session_configs"
           ("id") on update restrict on delete restrict;
