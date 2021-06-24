import {useSetArmyTargetMutation} from "../../../generated/graphql";
import {useState} from "react";

export function useArmyControls() {
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

  const [selectedArmy, setSelectedArmy] = useState<number | null>(null);

  return {setArmyTarget, selectedArmy, setSelectedArmy};
}