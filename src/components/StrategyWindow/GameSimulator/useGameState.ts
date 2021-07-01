import {FullGameState, GameStateI} from "./Types";
import {
  GameClientFragment,
  SessionFragment,
  useCreateGameClientMutation
} from "../../../generated/graphql";
import React, {useEffect, useMemo, useState} from "react";
import useInterval from "../../common/useInterval";
import {initGameState} from "./initGameState";
import {performStep} from "./performStep";
import {useArmyControls} from "./useArmyControls";
import {useDragControls} from "./useDragControls";



function useGameClient(gameSession: SessionFragment): GameClientFragment | null {

  const [createGameClient] = useCreateGameClientMutation();

  const [gameClient, setGameClient] = useState<GameClientFragment>();

  useEffect(() => {
    function getGameClientsFromLocalStorage(): { [sessionId: number]: GameClientFragment } {
      let storedClients = localStorage.getItem("gameClients");
      return  storedClients
        ? JSON.parse(storedClients)
        : {};
    }
    if (gameSession && gameSession.uuid) {
      let clients = getGameClientsFromLocalStorage();
      let client = clients[gameSession.id];
      if (client) {
        setGameClient(client);
      } else {
        createGameClient({
          variables: {
            game_session_id: gameSession.id
          },
        }).then(data => {
            const [game_client] = data.data?.insert_game_clients?.returning || [];
            if (game_client) {
              setGameClient(game_client);
              clients[gameSession.id] = game_client;
              localStorage.setItem("gameClients", JSON.stringify(clients));
            } else {
              console.error("Client was not returned");
            }
          })
          .catch(err => {
            console.error(err);
          });
      }
    }
  }, [gameSession && gameSession.uuid]);

  return gameClient ?? null;
}

export function useGameState(gameSession: SessionFragment): FullGameState | null {

  const dragControls = useDragControls();
  const gameClient = useGameClient(gameSession);
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
    console.log("gameSession", gameSession);
    if (gameSession && !gameState) {
      console.log("INITIALIZE GAME STATE")
      const gameState = initGameState(gameSession);
      setGameState(gameState);
    }
  }, [gameSession && gameSession.uuid]);

  if (!gameState) {
    return null;
  }

  return {
    ...gameState,
    ...dragControls,
    ...armyControls,
    gameClient,
    gameSession,
    setRunning: (running: boolean) => {
      gameState && setGameState({
        ...gameState,
        running: running,
      })
    },
  };
}