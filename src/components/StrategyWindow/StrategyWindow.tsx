import {SceneWrapper} from "./Scene/SceneView";
import {SLine} from "./Scene/QuadLine";
import React from "react";
import {GameSimulator} from "./GameSimulator/GameSimulator";
import {TopGameBar} from "./GUIComponents/TopGameBar";
import {Edges} from "./GameComponents/Edges";
import {Nodes} from "./GameComponents/Nodes";
import {Armies} from "./GameComponents/Armies";
import {SceneContext, useSceneContext} from "./Scene/SceneContext";


function Scene() {
   const sceneStateContext = useSceneContext();

   if(!sceneStateContext) {
     return null;
   }

  const {
    state: {
      dragging,
      dragNode,
      dragPoint,
    },
    dispatchLocalAction,
  } = sceneStateContext;

  return <SceneWrapper
    bridgeContexts={[SceneContext]}
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
    // onClick={selectedPiece !== null ? ((event) => {
    //   setselectedPiece(null);
    // }): undefined}
    onPointerUp={() => {
      dispatchLocalAction({ type: "set_drag_point", dragPoint: null });
      //setDragPoint(null);
      dispatchLocalAction({ type: "set_dragging", dragging: false });
      dispatchLocalAction({ type: "select_piece", selectedPiece: null });
      //setDragging(false);
      //setselectedPiece(null);
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