import {
  GameClientFragment,
  SessionFragment,
  useCreateGameClientMutation
} from "../../../generated/graphql";
import {useEffect, useState} from "react";


export function useGameClient(gameSession: SessionFragment | null): GameClientFragment | null {

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