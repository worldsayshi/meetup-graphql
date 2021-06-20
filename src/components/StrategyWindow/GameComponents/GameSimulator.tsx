import React, {createContext, ReactNode, useContext, useEffect, useMemo, useState} from "react";
import {
  ArmyFragment,
  NodeFragment,
  SessionFragment,
  useCreateGameClientMutation,
  useGameEventsSubscription, useGameSessionLazyQuery,
  useGameSessionQuery,
  useSetArmyTargetMutation
} from "../../../generated/graphql";
import useInterval from "../../common/useInterval";
import {Vector3} from "../Scene/Types";


interface GameStateI {
  clientId?: number;
  ticks: number;
  running: boolean;
  nodesLookup: NodesLookup;
  armies: ArmyLookup;
  selectedArmy: number | null;


  heartBeatInterval: number;
  commandOffset: number;

  gameSession: SessionFragment;


}

interface UserGameStateI {
  dragging: boolean;
  dragPoint: Vector3 | null;
  dragNode: NodeFragment | null;
}

interface GameStateActions {
  setSelectedArmy: (selectedArmy: number | null) => void;
  setRunning: (running: boolean) => void;
  setArmyTarget: (armyId: number, nodeId: number) => void;

  setDragPoint: (dragPoint: Vector3 | null) => void;
  setDragging: (dragging: boolean) => void;
  setDragNode: (dragNode: NodeFragment | null) => void;
}

type NodesLookup = {
  [key: number]: NodeFragment;
};
type ArmyLookup = {
  [key: string]: ArmyFragment;
}

function initGameState(gameSession: SessionFragment): GameStateI {

  let storedClientIds = localStorage.getItem("gameClientIds");

  let clientIds: { [sessionId: number]: number } = storedClientIds
    ? JSON.parse(storedClientIds)
    : {};

  return {
    // Hmm, hearbeat interval and command offset should probably be in the same unit to be able to
    // ensure that heartbeat happens x times within a command offset.
    // But what happens when the game is paused? I guess the heartbeat is not needed then?
    heartBeatInterval: 10,
    commandOffset: 40,
    clientId: clientIds[gameSession.id] ?? undefined,
    ticks: gameSession.elapsed_ticks,
    running: false,
    nodesLookup: gameSession.nodes.reduce((nl: NodesLookup, node) => {
      nl[node.id] = node;
      return nl;
    }, {}),
    armies: gameSession.armies.reduce((al: ArmyLookup, army) => {
      al[army.id] = army;
      return al;
    }, {}),
    selectedArmy: null,

    gameSession,
  }
}

type FullGameState = UserGameStateI & GameStateI & GameStateActions;
export const GameState = createContext<FullGameState | null>(null);

function performStep(gameState: GameStateI): GameStateI {

  /*
  TODO: Think about how heartbeat and army movement meshes

  Heartbeat etc idea:
  - command_offset - the amount of ticks in the future a command will happen
  - User commands are added to a remote list user_commands
  - they are scheduled `command_offset` into the future
  - The heartbeat is sent at least twice during a command_offset
  - If the hearbeat is not received by a client, the game will pause until heartbeat

  c: .--v__.--v
  h: i_i_i_i_i_i

  Army movement idea:
  - Add edge_progress to the army type
  - Each step, increment edge_progress by one for each army
  - When edge_progress * armySpeed > edgeLength the army jumps to next node.
     - set edge_progress to 0
     - remove the first element on army node_path
  * */

  return {
    ...gameState,
    ticks: gameState.running ? gameState.ticks + 1: gameState.ticks,
  };
}

/*
  1. Send heartbeat.
  Ever. Listen for heartbeats

  Count ticks, when
* */
function GameSyncClient() {
  const gameState = useContext(GameState);
  const [lastBeat, setLastBeat] = useState();
  const { data } = useGameEventsSubscription();

  useEffect(() => {

  }, [gameState?.ticks]);
  return null;
}


function useGameState(gameSession: SessionFragment): FullGameState | null {
  const [dragNode, setDragNode] = useState<NodeFragment | null>();
  const [dragPoint, setDragPoint] = useState<Vector3 | null>();
  //const [selectedArmy, setSelectedArmy] = useState<number | null>();
  const [dragging, setDragging] = useState(false);

  const [setArmyTargetMutation] = useSetArmyTargetMutation();

  function setArmyTarget(armyId: number, nodeId: number) {
    setArmyTargetMutation({
      variables: { armyId, nodeId },
      optimisticResponse: {
        update_armies: {
          returning: [{
            id: armyId,
            planned_node_id: nodeId,
          }],
        }}
    }).catch((err) => {
      console.error(err);
    });
  }

  const [createGameClient] = useCreateGameClientMutation();
  const [gameState, setGameState] = useState<GameStateI | null>(null);

  useInterval(() => {
    if (gameState !== null) {
      const newGameState = performStep(gameState);
      setGameState(newGameState);
    }
  }, 100);

  useEffect(() => {
    if(gameSession) {
      const gameState = initGameState(gameSession);
      if(typeof gameState.clientId !== "number") {
        createGameClient({ variables: { game_session_id: gameSession.id } })
          .then(data => {
            const [game_client] = data.data?.insert_game_clients?.returning || [];
            if(game_client) {
              setGameState({
                ...gameState,
                clientId: game_client.game_session_id
              });
            } else {
              console.error("Client id was not returned");
            }
          })
          .catch(err => {
            console.error(err);
          });
      } else {
        setGameState(gameState);
      }
    }
  }, [gameSession]);

  if(!gameState) {
    return null;
  }

  return {
    ...gameState,
    dragging,
    gameSession,
    dragNode: dragNode ?? null,
    dragPoint: dragPoint ?? null,
    setRunning: (running: boolean) => {
      gameState && setGameState({
        ...gameState,
        running: running,
      })
    },
    setSelectedArmy: (selectedArmy: number | null) => {
      gameState && setGameState({
        ...gameState,
        selectedArmy,
      })
    },
    setArmyTarget,
    setDragPoint,
    setDragging,
    setDragNode,
  };
}

interface GameSimulatorProps {
  // gameSession: SessionFragment;
  noSessionFallback: ReactNode;
  children: ReactNode;
}

export function GameSimulator(props: GameSimulatorProps) {

  const gameSessionId = useMemo(() =>
    localStorage.getItem("gameSessionId"), [])
  const { data: gameSessions } = useGameSessionQuery({
    variables: { gameSessionId },
    skip: !gameSessionId,
  });

  const [gameSession] = gameSessions?.game_sessions || [];


  const gameState = useGameState(gameSession);

  if(gameState) {
    return (
      <GameState.Provider value={gameState ? gameState : null}>
        <GameSyncClient />
        {props.children}
      </GameState.Provider>
    );
  } else {
    return <>
      {props.noSessionFallback}
    </>
  }
}