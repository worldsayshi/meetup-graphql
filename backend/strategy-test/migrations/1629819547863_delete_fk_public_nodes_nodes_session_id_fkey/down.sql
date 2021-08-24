alter table "public"."nodes" add foreign key ("map_id") references "public"."game_sessions"("id") on update restrict on delete restrict;
