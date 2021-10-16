import React, {ReactNode, useEffect, useMemo, useReducer, useState} from "react";
import {
  Game_Events_Insert_Input,
  useGameEventsSubscription,
  useGameSessionQuery
} from "../../../generated/graphql";
import useInterval from "../../common/useInterval";
import {useParams} from "react-router-dom";
import {useGameClient} from "./useGameClient";
import EventWorker from './EventWorker.worker';
import {initializeLocalGameState, localGameStateReducer} from "./LocalGameState";
import {SceneContext} from "../SceneState/SceneContext";
import {SharedSceneAction} from "../SceneState/SharedSceneAction";

interface GameSimulatorProps {
  noSessionFallback: ReactNode;
  children: ReactNode;
}


// Amount of ms between interleaved processing (currently also length of a tick)
export const GAME_CLOCK_SPEED = 100;
// Longest wait time between sending action batches in ms
export const HEARTBEAT_TIME_INTERVAL = GAME_CLOCK_SPEED * 5;
// Longest wait time between sending action batches in ticks
export const HEARTBEAT_TICK_INTERVAL = 10;
// How long after a heartbeat will the action be scheduled
export const ACTION_OFFSET = HEARTBEAT_TICK_INTERVAL * 4;

// -- Heartbeat watcher --
// Maybe first trigger a handshake batch?
// Listen to incoming batches
// Process batches, trigger local actions/events
// Remember last creation time for each batch
// For each client, if the last received batch is older than tick - ACTION_OFFSET - 1:
//    (trigger a connection lost event and) pause the game

export function GameSimulator(props: GameSimulatorProps) {

  const [lastHeartbeatMs, setLastHeartbeatMs] = useState(-1);
  const [lastHeartbeatTick, setLastHeartbeatTick] = useState(-1);

  let { gameSessionGuid } = useParams<{ gameSessionGuid?: string }>();
  const { data: gameSessions } = useGameSessionQuery({
    variables: { gameSessionGuid },
    skip: !gameSessionGuid,
  });
  // Maybe merge session and client queries into one?
  const [gameSession] = gameSessions?.game_sessions || [];
  const gameClient = useGameClient(gameSession);

  const [localGameState, dispatchLocalAction] = useReducer(
    localGameStateReducer,
    initializeLocalGameState(gameSession)
  );

  useEffect(() => {
    if (gameSession) {
      dispatchLocalAction({
        type: "initialize",
        initialState: initializeLocalGameState(gameSession),
      });
    }
  }, [gameSession]);


  /// --- Send events

  const [outgoingActionQueue, setOutgoingActionQueue] = useState<SharedSceneAction[]>([]);
  function dispatchSharedAction (action: SharedSceneAction) {
    // TODO Bug: The issue is that the dispatched shared action doesn't end up in hasura. Why?
    //
    console.log("dispatchSharedAction", action);
    setOutgoingActionQueue([...outgoingActionQueue, action]);
  }

  const eventWorker: Worker = useMemo<Worker>(() => new EventWorker(), []);
  // Push a shared action batch to the server
  function heartbeat() {
    // Let the event handling
    const gameEvents: Game_Events_Insert_Input[] = [
      {
        game_session_id: gameSession.id,
        source_client_id: gameClient?.id,
        type: "heartbeat",
        trigger_tick: localGameState.tick,
        target_tick: localGameState.tick + ACTION_OFFSET,
      },
      ...outgoingActionQueue.map(({type, ...payload}) => ({
        type,
        game_session_id: gameSession.id,
        source_client_id: gameClient?.id,
        trigger_tick: localGameState.tick,
        target_tick: localGameState.tick + ACTION_OFFSET,
        payload,
      })),
    ];

    console.log("nr event worker posted events", gameEvents.length);
    eventWorker.postMessage(JSON.stringify(gameEvents));
    setOutgoingActionQueue([]);
  }

  useInterval(() => {
    if (gameSession) {

      if (localGameState !== null && localGameState.running) {
        dispatchLocalAction({type: "tick"});
      }

      const currTime = Date.now();
      if (currTime + HEARTBEAT_TIME_INTERVAL > lastHeartbeatMs
        || localGameState.tick + HEARTBEAT_TICK_INTERVAL > lastHeartbeatTick) {

        heartbeat();
        setLastHeartbeatMs(currTime);
        setLastHeartbeatTick(localGameState.tick);
      }
    }

  }, GAME_CLOCK_SPEED);

  /// --- Read events
  const [lastHandledEvent, setLastHandledEvent] = useState<number>(0);
  const { data } = useGameEventsSubscription({
    variables: {
      after_game_event_id: lastHandledEvent,
      game_session_id: gameSession?.id,
    },
    skip: !gameSession
  });

  useEffect(() => {
    if(data && data.game_events.length > 0) {
      const regular_events = data.game_events.filter(ev => ev.type !== "heartbeat");
      regular_events.forEach((ev) => {
        if(ev.type !== "heartbeat") {
          dispatchLocalAction({
            ...ev,
            ...ev.payload,
          });
        }
      })
      setLastHandledEvent(data.game_events[data.game_events.length-1].id)
    }
  }, [data && data.game_events.length > 0 && data.game_events[data.game_events.length-1].id !== lastHandledEvent])


  /// --- Render
  if(localGameState && gameSession && gameClient) {
    return (
      <SceneContext.Provider value={{
        state: localGameState,
        dispatchLocalAction,
        dispatchSharedAction,
      }}>
        {props.children}
      </SceneContext.Provider>
    );
  } else {
    return <>
      {props.noSessionFallback}
    </>
  }
}