import React, {ReactNode, useCallback, useReducer, useState} from "react";
import {GameStateContext} from "./Context";
import {Vector3} from "../Scene/Types";
import {
  ArmyFragment, EdgeFragment,
  Game_Events_Insert_Input,
  NodeFragment, SessionFragment, useGameSessionQuery,
  useSubmitGameEventsMutation
} from "../../../generated/graphql";
import useInterval from "../../common/useInterval";
import {useParams} from "react-router-dom";
import {useGameClient} from "../GameSimulator_old/useGameClient";
import {performStep} from "../GameSimulator_old/performStep";

interface GameSimulatorProps {
  noSessionFallback: ReactNode;
  children: ReactNode;
}

export type LocalGameAction = {
  type: "tick"
} | {
  type: "set_drag_point",
  dragPoint: Vector3 | null,
} | {
  type: "set_drag_node",
  dragNode: NodeFragment,
} | {
  type: "set_dragging",
  dragging: boolean,
} | {
  type: "select_army",
  selectedArmy: number | null,
};

export type SharedGameAction = {
  type: "set_running",
  running: boolean,
} | {
  type: "set_army_target",
  armyId: number,
  nodeId: number
}

export type Lookup<T> = {
  [key: string]: T;
}
export type NodesLookup = Lookup<NodeFragment>;
export type ArmyLookup = Lookup<ArmyFragment>;
export type EdgeLookup = Lookup<EdgeFragment>;


function toLookup<T extends { id: string | number }>(ts: T[]) {
  return ts.reduce((lookup: Lookup<T>, t) => {
    lookup[t.id] = t;
    return lookup;
  }, {});
}

export interface LocalGameState {
  mapScale: number;

  tick: number;
  running: boolean;

  dragNode: NodeFragment | null;
  dragPoint: Vector3 | null;
  dragging: boolean;

  selectedArmy: number | null;

  nodesLookup: NodesLookup;
  armyLookup: ArmyLookup;
  edgeLookup: EdgeLookup;
}


function initializeLocalGameState(gameSession?: SessionFragment): LocalGameState {

  const nodesLookup = gameSession ? toLookup(gameSession.nodes) : {};
  const armyLookup = gameSession ? toLookup(gameSession.armies) : {};
  const edgeLookup = gameSession ? toLookup(gameSession.edges) : {};
  return {
    mapScale: gameSession?.session_config.map_scale ?? 1,
    tick: gameSession?.elapsed_ticks ?? 0,
    running: false,

    dragNode: null,
    dragPoint: null,
    dragging: false,

    selectedArmy: null,

    nodesLookup,
    armyLookup,
    edgeLookup,
    // nodes: gameSession.nodes,
    // armies: gameSession.armies,
  };
}

function localGameStateReducer(gameState: LocalGameState, action: LocalGameAction): LocalGameState {
  switch (action.type) {
    case "tick":
      console.warn("tick not implemented")

      return performStep(gameState);
      break;
    case "select_army":
      return {...gameState, selectedArmy: action.selectedArmy};
      break;
    case "set_drag_point":
      return {...gameState, dragPoint: action.dragPoint};
    case "set_drag_node":
      return {...gameState, dragNode: action.dragNode};
    case "set_dragging":
      return {...gameState, dragging: action.dragging};
  }
  return gameState;
}




// Amount of ms between interleaved processing (currently also length of a tick)
export const GAME_CLOCK_SPEED = 100;
// Longest wait time between sending action batches in ms
export const HEARTBEAT_TIME_INTERVAL = GAME_CLOCK_SPEED * 5;
// Longest wait time between sending action batches in ticks
export const HEARTBEAT_TICK_INTERVAL = 10;
// How long after a heartbeat will the action be scheduled
export const ACTION_OFFSET = HEARTBEAT_TICK_INTERVAL * 4;


export function GameSimulator(props: GameSimulatorProps) {

  const [submitGameEventsMutation] = useSubmitGameEventsMutation();


  const [outgoingActionQueue, setOutgoingActionQueue] = useState<SharedGameAction[]>([]);
  const [lastHeartbeatMs, setLastHeartbeatMs] = useState(-1);
  const [lastHeartbeatTick, setLastHeartbeatTick] = useState(-1);

  let { gameSessionId } = useParams<{ gameSessionId?: string }>();
  const { data: gameSessions } = useGameSessionQuery({
    variables: { gameSessionId },
    skip: !gameSessionId,
  });
  // Maybe merge session and client queries into one?
  const [gameSession] = gameSessions?.game_sessions || [];
  const gameClient = useGameClient(gameSession);

  const initialLocalGameState = initializeLocalGameState(gameSession);

  const [localGameState, dispatchLocalAction] = useReducer(localGameStateReducer, initialLocalGameState);

  function dispatchSharedAction (action: SharedGameAction) {
    setOutgoingActionQueue([...outgoingActionQueue, action]);
  }

  // Push a shared action batch to the server
  function heartbeat() {

    const gameEvents: Game_Events_Insert_Input[] = outgoingActionQueue.map((payload) => ({
      game_session_id: Number(gameSessionId),
      source_client_id: gameClient?.id,
      payload,
    }));

    submitGameEventsMutation({ variables: { gameEvents }}).then(() => {
      setOutgoingActionQueue([]);
    }).catch(() => {

    });
  }

  useInterval(() => {
    if (localGameState !== null && localGameState.running) {
      dispatchLocalAction({ type: "tick" });
    }

    const currTime = Date.now();
    if (currTime + HEARTBEAT_TIME_INTERVAL > lastHeartbeatMs
      || localGameState.tick + HEARTBEAT_TICK_INTERVAL > lastHeartbeatTick) {

      heartbeat();
      setLastHeartbeatMs(currTime);
      setLastHeartbeatTick(localGameState.tick);
    }

  }, GAME_CLOCK_SPEED);

  if(localGameState && gameSession && gameClient) {
    return (
      <GameStateContext.Provider value={{ gameState: localGameState, dispatchLocalAction, dispatchSharedAction, gameClient }}>
        {props.children}
      </GameStateContext.Provider>
    );
  } else {
    return <>
      {props.noSessionFallback}
    </>
  }
}