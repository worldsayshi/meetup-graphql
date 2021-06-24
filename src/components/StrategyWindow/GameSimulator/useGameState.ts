import {FullGameState, GameStateI} from "./Types";
import {SessionFragment, useCreateGameClientMutation} from "../../../generated/graphql";
import {useEffect, useState} from "react";
import useInterval from "../../common/useInterval";
import {initGameState} from "./initGameState";
import {performStep} from "./performStep";
import {useArmyControls} from "./useArmyControls";
import {useDragControls} from "./useDragControls";

export function useGameState(gameSession: SessionFragment): FullGameState | null {

  const dragControls = useDragControls();
  const armyControls = useArmyControls();

  const [createGameClient] = useCreateGameClientMutation();
  const [gameState, setGameState] = useState<GameStateI | null>(null);

  useInterval(() => {
    if (gameState !== null) {
      const newGameState = performStep(gameState);
      setGameState(newGameState);
    }
  }, 100);

  useEffect(() => {
    if (gameSession) {
      const gameState = initGameState(gameSession);
      if (typeof gameState.clientId !== "number") {
        createGameClient({variables: {game_session_id: gameSession.id}})
          .then(data => {
            const [game_client] = data.data?.insert_game_clients?.returning || [];
            if (game_client) {
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

  if (!gameState) {
    return null;
  }

  return {
    ...gameState,
    ...dragControls,
    ...armyControls,
    gameSession,
    setRunning: (running: boolean) => {
      gameState && setGameState({
        ...gameState,
        running: running,
      })
    },
  };
}