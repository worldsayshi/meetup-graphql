import React from "react";
import Cylinder from "../Scene/Cylinder";
import {PointerEvent} from "react-three-fiber/canvas";
import {useGameStateContext} from "../GameSimulator/Context";


export function Nodes() {
  const { gameState, dispatchLocalAction, dispatchSharedAction } = useGameStateContext()

  if(!gameState) {
    return null;
  }

  const {
    selectedArmy
  } = gameState;

  return <>
    {Object.values(gameState.nodesLookup).map((node) => (
      <Cylinder
        key={"node_"+node.id}
        onRightPointerDown={() => {
          if (typeof selectedArmy === "number") {
            dispatchSharedAction({ type: "set_army_target", armyId: selectedArmy, nodeId: node.id});
          }
        }}
        onDragStart={(event: PointerEvent) => {
          dispatchLocalAction({ type: "set_dragging", dragging: true });
          dispatchLocalAction({ type: "set_drag_node", dragNode: node });        }}
        position={node.position}
      />
    ))}
  </>;
}