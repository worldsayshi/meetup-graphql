import React from "react";
import Cylinder from "../Scene/Cylinder";
import {PointerEvent} from "react-three-fiber/canvas";
import {useSceneContext} from "../SceneState/SceneContext";


export function Nodes() {
  const { state, dispatchLocalAction, dispatchSharedAction } = useSceneContext()

  if(!state) {
    return null;
  }

  const {
    selectedPiece
  } = state;

  return <>
    {Object.values(state.nodesLookup).map((node) => (
      <Cylinder
        key={"node_"+node.id}
        onRightPointerDown={() => {
          if (typeof selectedPiece === "number") {
            dispatchSharedAction({ type: "set_piece_target", armyId: selectedPiece, nodeId: node.id});
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