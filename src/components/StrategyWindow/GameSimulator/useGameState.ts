import {FullGameState, GameStateI} from "./Types";
import {
  GameEventFragment,
  SessionFragment, useGameEventsSubscription,
} from "../../../generated/graphql";
import {useEffect, useState} from "react";
import useInterval from "../../common/useInterval";
import {initGameState} from "./initGameState";
import {performStep} from "./performStep";
import {useArmyControls} from "./useArmyControls";
import {useDragControls} from "./useDragControls";
import {useGameClient} from "./useGameClient";


function useGameEvents (gameSession: SessionFragment | null): Array<GameEventFragment> | null {
  const { data/*, loading*/, error } = useGameEventsSubscription({
    variables: {
      game_session_id: gameSession?.id ?? null,
    },
    skip: gameSession === null,
  });

  if (error) {
    throw error;
  }
  console.log("game events error", error);

  return data?.game_events ?? null;
}

export function useGameState(gameSession: SessionFragment | null): FullGameState | null {

  const dragControls = useDragControls();
  const gameClient = useGameClient(gameSession);
  const gameEvents = useGameEvents(gameSession);
  const armyControls = useArmyControls(gameSession, gameClient);

  const [gameState, setGameState] = useState<GameStateI | null>(null);

  useInterval(() => {
    if (gameState !== null && gameState.running) {
      const newGameState = performStep(gameState);
      setGameState(newGameState);
    }
  }, 100);


  // TODO Tricky problem:
  // setting army target modifies the game session shared between client and server
  // But gameState holds a non-shared copy of the game session. Right now, the only way to get the
  // target change is to recreate the game state. And we don't want to do that.

  // We want to send user input, that part is good. How should we incorporate user input into the
  // game state? I suppose the "target" and its army is not to be treated as a shared entity.
  //
  // The shared entity should instead be the user input event!

  useEffect(() => {
    if (gameSession && !gameState) {
      console.log("INITIALIZE GAME STATE")
      const gameState = initGameState(gameSession);
      setGameState(gameState);
    }
  }, [gameSession && gameSession.uuid]);

  if (!gameState || !gameClient || !gameEvents || !gameSession) {
    console.log({
      gameState: !!gameState,
      gameClient: !!gameClient,
      gameEvents: !!gameEvents,
      gameSession: !!gameSession,
    });
    console.log("gameEvents", gameEvents);
    return null;
  }

  return {
    ...gameState,
    ...dragControls,
    ...armyControls,
    gameClient,
    gameEvents,
    gameSession,
    setRunning: (running: boolean) => {
      gameState && setGameState({
        ...gameState,
        running: running,
      })
    },
  };
}