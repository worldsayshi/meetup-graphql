import {SceneWrapper} from "./Scene/SceneView";
import {SLine} from "./Scene/QuadLine";
import React from "react";
import {GameSimulator} from "./GameSimulator/GameSimulator";
import {TopGameBar} from "./GameComponents/TopGameBar";
import {Edges} from "./GameComponents/Edges";
import {Nodes} from "./GameComponents/Nodes";
import {Armies} from "./GameComponents/Armies";
import {GameStateContext, useGameStateContext} from "./GameSimulator/Context";


function Scene() {
   const gameStateContext = useGameStateContext();

   if(!gameStateContext) {
     return null;
   }

  const {
    gameState: {
      dragging,
      dragNode,
      dragPoint,
    },
    dispatchLocalAction,
  } = gameStateContext;


  return <SceneWrapper
    bridgeContexts={[GameStateContext]}
    orbitEnabled={!dragging}
    pointerMoved={(point) => {
      if(dragging) {
        dispatchLocalAction({
          type: "set_drag_point",
          dragPoint: [point.x, point.y, point.z],
        });
        // setDragPoint([point.x, point.y, point.z]);
      }
    }}
    // onClick={selectedArmy !== null ? ((event) => {
    //   setSelectedArmy(null);
    // }): undefined}
    onPointerUp={() => {
      dispatchLocalAction({ type: "set_drag_point", dragPoint: null });
      //setDragPoint(null);
      dispatchLocalAction({ type: "set_dragging", dragging: false });
      dispatchLocalAction({ type: "select_army", selectedArmy: null });
      //setDragging(false);
      //setSelectedArmy(null);
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