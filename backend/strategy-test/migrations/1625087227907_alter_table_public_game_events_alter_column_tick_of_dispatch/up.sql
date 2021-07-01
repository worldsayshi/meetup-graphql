COMMENT ON COLUMN "public"."game_events"."tick_of_dispatch" IS E'Tick when event was triggered';
alter table "public"."game_events" rename column "tick_of_dispatch" to "trigger_tick";
