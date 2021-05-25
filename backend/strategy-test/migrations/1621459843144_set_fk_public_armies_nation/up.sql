alter table "public"."armies" drop constraint "armies_current_node_fkey",
             add constraint "armies_nation_fkey"
             foreign key ("nation")
             references "public"."nations"
             ("id") on update restrict on delete restrict;
