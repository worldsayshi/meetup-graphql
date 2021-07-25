import {SceneWrapper} from "./Scene/SceneView";
import {SLine} from "./Scene/QuadLine";
import React from "react";
import {GameSimulator} from "./GameSimulator/GameSimulator";
import {TopGameBar} from "./GameComponents/TopGameBar";
import {Edges} from "./GameComponents/Edges";
import {Nodes} from "./GameComponents/Nodes";
import {Armies} from "./GameComponents/Armies";
import {useGameStateContext} from "./GameSimulator/Context";
import {GameState} from "./GameSimulator_old/Context";


function Scene() {
   const gameState = useGameStateContext();

   if(!gameState) {
     return null;
   }

  const {
    dragging,
    setDragPoint,
    setDragging,
    setSelectedArmy,
    dragNode,
    dragPoint,
  } = gameState;

  return <SceneWrapper
    bridgeContexts={[GameState]}
    orbitEnabled={!dragging}
    pointerMoved={(point) => {
      if(dragging) {
        setDragPoint([point.x, point.y, point.z]);
      }
    }}
    // onClick={selectedArmy !== null ? ((event) => {
    //   setSelectedArmy(null);
    // }): undefined}
    onPointerUp={() => {
      setDragPoint(null);
      setDragging(false);
      setSelectedArmy(null);
    }}>

    <Edges />
    <Nodes />
    <Armies />

    {dragNode && dragPoint && <SLine
      start={dragNode.position}
      end={dragPoint}
      color="limegreen"
      lineWidth={10}
    />}
  </SceneWrapper>;
}

export const StrategyWindow = () => {

  return (
    <GameSimulator noSessionFallback={<div>No Session found</div>}>
      <TopGameBar />
      <Scene />
    </GameSimulator>
  );
}