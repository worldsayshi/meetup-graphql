alter table "public"."armies"
           add constraint "armies_army_type_id_fkey"
           foreign key ("army_type_id")
           references "public"."army_types"
           ("id") on update restrict on delete restrict;
