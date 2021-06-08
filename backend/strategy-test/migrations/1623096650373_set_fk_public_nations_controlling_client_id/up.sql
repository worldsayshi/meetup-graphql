alter table "public"."nations"
           add constraint "nations_controlling_client_id_fkey"
           foreign key ("controlling_client_id")
           references "public"."game_clients"
           ("id") on update restrict on delete restrict;
