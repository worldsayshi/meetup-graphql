import React, {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {
  ArmyFragment,
  NodeFragment,
  SessionFragment,
  useCreateGameClientMutation
} from "../../../generated/graphql";
import useInterval from "../../common/useInterval";

interface GameStateI {
  clientId?: number;
  ticks: number;
  running: boolean;
  nodesLookup: NodesLookup;
  armies: ArmyLookup;
  selectedArmy: number | null;
}

interface GameStateActions {
  setSelectedArmy: (selectedArmy: number | null) => void;
  toggleRunning: () => void;
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
  }
}


export const GameState = createContext<GameStateI & GameStateActions | null>(null);

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

function GameSyncClient() {
  const gameState = useContext(GameState);
  const [lastBeat, setLastBeat] = useState();

  useEffect(() => {

  }, [gameState?.ticks]);
  return null;
}

export function GameSimulator(props: { gameSession: SessionFragment, children: ReactNode }) {

  const [createGameClient] = useCreateGameClientMutation();

  const {gameSession, children} = props;

  const [gameState, setGameState] = useState<GameStateI | null>(null);

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

  useInterval(() => {
    if (gameState !== null) {
      const newGameState = performStep(gameState);
      setGameState(newGameState);
    }
  }, 100);

  return (
    <GameState.Provider value={gameState ? {
      ...gameState,
      setSelectedArmy: (selectedArmy) => {
        gameState && setGameState({
          ...gameState,
          selectedArmy,
        })
      },
      toggleRunning: () => {
        gameState && setGameState({
          ...gameState,
          running: !gameState.running,
        })
      }
    } : null}>
      <GameSyncClient />
      {children}
    </GameState.Provider>
  );
}