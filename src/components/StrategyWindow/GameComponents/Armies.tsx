import React from "react";
import {Soldier} from "./Soldier";
import {SLine} from "../Scene/QuadLine";
import {useGameStateContext} from "../GameSimulator/Context";
import {useMapContext} from "../Map/Context";

export function Armies() {
  const { map } = useMapContext();
  const { gameState, dispatchLocalAction } = useGameStateContext();

  return (
    <>
      {gameState && Object.values(gameState?.armyLookup).map(({id, current_node, planned_node_id}) => (
        <React.Fragment key={"army_"+id}>
          <Soldier
            key={"army_"+id}
            selected={gameState.selectedArmy === id}
            position={current_node.position}
            onSelect={() => {
              dispatchLocalAction({ type: "select_army", selectedArmy: id });
            }}
          />
          {map.nodesLookup && planned_node_id && <SLine
            color="yellow"
            lineWidth={8}
            start={current_node.position}
            end={map.nodesLookup[planned_node_id]?.position}
          />}
        </React.Fragment>
      ))}
    </>
  );
}