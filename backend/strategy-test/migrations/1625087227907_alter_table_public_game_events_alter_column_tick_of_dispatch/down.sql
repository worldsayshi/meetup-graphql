COMMENT ON COLUMN "public"."game_events"."tick_of_dispatch" IS E'';
alter table "public"."game_events" rename column "trigger_tick" to "tick_of_dispatch";
