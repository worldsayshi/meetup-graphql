alter table "public"."armies" drop constraint "armies_nation_fkey",
          add constraint "armies_current_node_fkey"
          foreign key ("current_node")
          references "public"."nodes"
          ("id")
          on update restrict
          on delete restrict;
