alter table "public"."armies" add foreign key ("army_type_id") references "public"."army_types"("id") on update restrict on delete restrict;
