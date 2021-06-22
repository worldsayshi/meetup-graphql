import React, {useContext} from "react";
import {GameState} from "../GameSimulator/GameSimulator";
import {Soldier} from "./Soldier";
import {SLine} from "../Scene/QuadLine";

export function Armies() {
  const gameState = useContext(GameState);
  return (
    <>
      {gameState && Object.values(gameState?.armies).map(({id, current_node, planned_node_id}) => (
        <React.Fragment key={"army_"+id}>
          <Soldier
            key={"army_"+id}
            selected={gameState.selectedArmy === id}
            position={current_node.position}
            onSelect={() => {
              gameState.setSelectedArmy(id)
            }}
          />
          {gameState.nodesLookup && planned_node_id && <SLine
            color="yellow"
            lineWidth={8}
            start={current_node.position}
            end={gameState.nodesLookup[planned_node_id]?.position}
          />}
        </React.Fragment>
      ))}
    </>
  );
}