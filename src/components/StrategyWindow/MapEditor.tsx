import React from "react";
import {TopEditorBar} from "./GUIComponents/TopEditorBar";
import {SceneWrapper} from "./Scene/SceneView";

function EditorScene() {
  return <SceneWrapper>

  </SceneWrapper>;
}

export function MapEditor() {
  return <>
    <TopEditorBar />
    <EditorScene />
  </>;
}