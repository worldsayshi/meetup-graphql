import {
  GameEventFragment,
  SessionFragment,
  useGameEventsSubscription
} from "../../../generated/graphql";
import {useEffect, useState} from "react";

/*
* TODO Redux?
*  Maybe use redux as a local event stream?
*
* Also: https://discord.com/channels/407792526867693568/428469959530643466/861702099728859227
* */

interface Event {
  type: string;
}

interface SetArmyTarget extends Event {
  type: "SET_ARMY_TARGET";
}

export function useGameEvents(
  gameSession: SessionFragment | null
): Array<GameEventFragment> | null {

  //const [latestEventsLength, setLatestEventsLength] = useState<number>(0);
  //const [latestEvents, setLatestEvents] = useState<Array<GameEventFragment>>([]);
  const [after_game_event_id, set_after_game_event_id] = useState<number>(0);

  const {data/*, loading*/, error} = useGameEventsSubscription({
    variables: {
      after_game_event_id: after_game_event_id ?? null,
      game_session_id: gameSession?.id ?? null,
    },
    skip: gameSession === null,
  });

  if (error) {
    throw error;
  }

  useEffect(() => {
    if (data?.game_events) {
      const game_events = data?.game_events ?? [];
      //dispatchEvent(game_events);
      set_after_game_event_id(game_events[game_events.length - 1].id);
      //setLatestEvents(data?.game_events.slice(latestEventsLength));
      //setLatestEventsLength(data?.game_events.length);
    }
  }, [JSON.stringify(data?.game_events.map(e => e.id))]);

  //console.log("latestEvents", latestEvents);
  return data?.game_events ?? null; // latestEvents;
}