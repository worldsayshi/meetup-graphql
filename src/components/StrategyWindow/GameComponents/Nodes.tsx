import React from "react";
import Cylinder from "../Scene/Cylinder";
import {PointerEvent} from "react-three-fiber/canvas";
import {useGameStateContext} from "../GameSimulator/Context";
import {useMapContext} from "../Map/Context";


export function Nodes() {
  const { map } = useMapContext();
  const { gameState, dispatchLocalAction, dispatchSharedAction } = useGameStateContext()

  if(!gameState) {
    return null;
  }

  const {
    selectedArmy
  } = gameState;

  return <>
    {Object.values(map.nodesLookup).map((node) => (
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