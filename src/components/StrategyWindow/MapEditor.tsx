import React from "react";
import {TopEditorBar} from "./GUIComponents/TopEditorBar";
import {SceneWrapper} from "./Scene/SceneView";
import {EditorSimulator} from "./MapEditor/EditorSimulator";

function EditorScene() {
  return <SceneWrapper>

  </SceneWrapper>;
}

export function MapEditor() {
  return <EditorSimulator fallback={<div>Loading</div>}>
    <TopEditorBar />
    <EditorScene />
  </EditorSimulator>;
}