import {ReactNode, useEffect, useState} from "react";
// import { EditorStateContext } from "./Context.ts_";
import {useParams} from "react-router-dom";
import {MapFragment, useEditorSessionQuery} from "../../../generated/graphql";
import {LocalEditorState} from "./LocalEditorState";
import {MapStateContext} from "../Map/Context";
import {initializeMapState, MapState} from "../Map/MapState";
import { SceneContext } from "../Scene/SceneContext";

interface EditorSimulatorProps {
  fallback: ReactNode;
  children: ReactNode;
}

export function EditorSimulator (props: EditorSimulatorProps) {
  let { mapId } = useParams<{ mapId: string }>();
  const { data } = useEditorSessionQuery({variables: { mapId: Number(mapId) }});
  const [mapState, setMapState] = useState<MapState | null>(null);
  useEffect(() => {
    if (data?.maps[0]) {
      setMapState(initializeMapState(data));
    }
  }, [data]);

  if (mapState) {
    return (
      <SceneContext.Provider value={mapState}>
        {props.children}
      </SceneContext.Provider>
    );
  } else {
    return <>
      {props.fallback}
    </>
  }
}