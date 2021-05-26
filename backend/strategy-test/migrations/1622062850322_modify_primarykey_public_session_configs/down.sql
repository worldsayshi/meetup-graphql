alter table "public"."session_configs" drop constraint "session_configs_pkey";
alter table "public"."session_configs"
    add constraint "session_configs_pkey" 
    primary key ( "id" );
