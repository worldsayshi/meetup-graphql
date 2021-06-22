import {FullGameState, GameStateI} from "./Types";
import {
  NodeFragment,
  SessionFragment,
  useCreateGameClientMutation,
  useSetArmyTargetMutation
} from "../../../generated/graphql";
import {useEffect, useState} from "react";
import {Vector3} from "../Scene/Types";
import useInterval from "../../common/useInterval";
import {initGameState} from "./initGameState";
import {performStep} from "./performStep";

export function useGameState(gameSession: SessionFragment): FullGameState | null {
  const [dragNode, setDragNode] = useState<NodeFragment | null>();
  const [dragPoint, setDragPoint] = useState<Vector3 | null>();
  //const [selectedArmy, setSelectedArmy] = useState<number | null>();
  const [dragging, setDragging] = useState(false);

  const [setArmyTargetMutation] = useSetArmyTargetMutation();

  function setArmyTarget(armyId: number, nodeId: number) {
    setArmyTargetMutation({
      variables: {armyId, nodeId},
      optimisticResponse: {
        update_armies: {
          returning: [{
            id: armyId,
            planned_node_id: nodeId,
          }],
        }
      }
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