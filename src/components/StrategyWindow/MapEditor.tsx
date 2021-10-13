import React from "react";
import {TopEditorBar} from "./GUIComponents/TopEditorBar";
import {SceneWrapper} from "./Scene/SceneView";
import {EditorSimulator} from "./MapEditor/EditorSimulator";
import {Edges} from "./GameComponents/Edges";
import {Nodes} from "./GameComponents/Nodes";
import {SceneContext} from "./SceneState/SceneContext";

function EditorScene() {
  return <SceneWrapper
    bridgeContexts={[SceneContext]}
  >
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