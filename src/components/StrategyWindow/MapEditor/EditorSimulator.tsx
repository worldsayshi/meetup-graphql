import {ReactNode, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useEditorSessionQuery} from "../../../generated/graphql"
import {initializeMapState, MapState} from "../Map/MapState";
import {LocalSceneState, SceneContext} from "../SceneState/SceneContext";

interface EditorSimulatorProps {
  fallback: ReactNode;
  children: ReactNode;
}

export function EditorSimulator (props: EditorSimulatorProps) {
  let { mapId } = useParams<{ mapId: string }>();
  const { data } = useEditorSessionQuery({variables: { mapId: Number(mapId) }});
  const [mapState, setMapState] = useState<LocalSceneState | null>(null);
  useEffect(() => {
    if (data?.maps[0]) {
      setMapState(initializeMapState(data));
    }
  }, [data]);

  if (mapState) {
    return (
      <SceneContext.Provider value={{
        state: mapState,

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