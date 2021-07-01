import {
  GameClientFragment,
  SessionFragment,
  useGameEventsSubscription,
  useSetArmyTargetMutation,
  useSubmitGameEventMutation
} from "../../../generated/graphql";
import {useState} from "react";

export function useArmyControls(
  gameSession: SessionFragment,
  gameClient: GameClientFragment | null
) {
  // useGameEventsSubscription()
  const [submitGameEvent] = useSubmitGameEventMutation();
  //const [setArmyTargetMutation] = useSetArmyTargetMutation();

  function setArmyTarget(armyId: number, nodeId: number) {
    if(gameClient) {
      submitGameEvent({
        variables: {
          type: "SET_ARMY_TARGET",
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
      throw new Error("Tried to move an army without a client");
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