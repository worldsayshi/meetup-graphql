import React, {useContext} from "react";
import {GameState} from "../GameSimulator_old/Context";
import Cylinder from "../Scene/Cylinder";
import {PointerEvent} from "react-three-fiber/canvas";

export function Nodes() {
  const gameState = useContext(GameState);

  if(!gameState) {
    return null;
  }

  const {
    selectedArmy,
    setArmyTarget,
    setDragging,
    setDragNode,
  } = gameState;

  return <>
    {gameState.gameSession?.nodes.map((node) => (
      <Cylinder
        key={"node_"+node.id}
        onRightPointerDown={() => {
          // console.log("Click right")
          if (typeof selectedArmy === "number") {
            setArmyTarget(selectedArmy, node.id);
          }
        }}
        onDragStart={(event: PointerEvent) => {
          setDragging(true);
          setDragNode(node)
        }}
        position={node.position}
      />
    ))}
  </>;
}