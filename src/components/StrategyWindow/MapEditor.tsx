import React from "react";
import {TopEditorBar} from "./GUIComponents/TopEditorBar";
import {SceneWrapper} from "./Scene/SceneView";
import {EditorSimulator} from "./MapEditor/EditorSimulator";
import {Edges} from "./GameComponents/Edges";
import {Nodes} from "./GameComponents/Nodes";
import {SceneContext, useSceneContext} from "./SceneState/SceneContext";

function EditorScene() {
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
  </SceneWrapper>;
}

export function MapEditor() {
  return <EditorSimulator fallback={<div>Loading</div>}>
    <TopEditorBar />
    <EditorScene />
  </EditorSimulator>;
}