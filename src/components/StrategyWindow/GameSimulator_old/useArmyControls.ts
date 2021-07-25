import {
  GameClientFragment,
  SessionFragment,
  useGameEventsSubscription,
  useSetArmyTargetMutation,
  useSubmitGameEventMutation
} from "../../../generated/graphql";
import {useState} from "react";
import {GameStateI} from "./Types";

export function useArmyControls(
  gameSession: SessionFragment | null,
  gameClient: GameClientFragment | null,
  gameState: GameStateI | null
) {
  // useGameEventsSubscription()
  const [submitGameEvent] = useSubmitGameEventMutation();
  //const [setArmyTargetMutation] = useSetArmyTargetMutation();

  function setArmyTarget(armyId: number, nodeId: number) {
    if(gameClient && gameSession && gameState) {
      submitGameEvent({
        variables: {
          type: "SET_ARMY_TARGET",
          trigger_tick: gameState.ticks,
          target_tick: gameState.ticks + gameState.commandOffset,
          game_session_id: gameSession.id,
          source_client_id: gameClient.id,
          payload: {
            nodeId,
            armyId,
          },
        },
      }).catch((err) => {
        console.error(err);
      });
    } else {
      throw new Error("Tried to move an army but game state is not ready");
    }

/*    setArmyTargetMutation({
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
    });*/
  }

  const [selectedArmy, setSelectedArmy] = useState<number | null>(null);

/*  useEffect(() => {

  }, [se]);*/

  return {setArmyTarget, selectedArmy, setSelectedArmy};
}