import {ReactNode, useEffect, useReducer, useState} from "react";
import {useParams} from "react-router-dom";
import {useEditorSessionQuery} from "../../../generated/graphql"
import {initializeMapState, MapState} from "../Map/MapState";
import {LocalSceneState, SceneContext} from "../SceneState/SceneContext";
import {SharedSceneAction} from "../SceneState/SharedSceneAction";
import {initializeLocalGameState} from "../GameSimulator/LocalGameState";
import {LocalSceneAction} from "../SceneState/LocalSceneAction";
import {localEditorStateReducer} from "./LocalEditorState";

interface EditorSimulatorProps {
  fallback: ReactNode;
  children: ReactNode;
}



export function EditorSimulator (props: EditorSimulatorProps) {
  let { mapId } = useParams<{ mapId: string }>();
  const { data } = useEditorSessionQuery({variables: { mapId: Number(mapId) }});
  
  const [mapState, dispatchLocalAction] = useReducer(
    localEditorStateReducer,
    initializeMapState(),
  );

  function dispatchSharedAction (action: SharedSceneAction) {
    console.log("Editor not handling shared actions!")
    console.log("dispatchSharedAction", action);
  }
  
  
  useEffect(() => {
    if (data?.maps[0]) {
      dispatchLocalAction({
        type: "initialize",
        initialState: initializeMapState(data),
      });
    }
  }, [data]);

  if (mapState) {
    return (
      <SceneContext.Provider value={{
        state: mapState,
        dispatchLocalAction,
        dispatchSharedAction,
      }}>
        {props.children}
      </SceneContext.Provider>
    );
  } else {
    return <>
      {props.fallback}
    </>
  }
}