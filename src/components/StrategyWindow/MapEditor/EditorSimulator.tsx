import {ReactNode, useEffect, useState} from "react";
import { EditorStateContext } from "./Context";
import {useParams} from "react-router-dom";
import {MapFragment, useEditorSessionQuery} from "../../../generated/graphql";
import {LocalEditorState} from "./LocalEditorState";
import {MapStateContext} from "../Map/Context";
import {initializeMapState, MapState} from "../Map/MapState";

interface EditorSimulatorProps {
  fallback: ReactNode;
  children: ReactNode;
}

export function EditorSimulator (props: EditorSimulatorProps) {
  let { mapId } = useParams<{ mapId: string }>();
  const { data } = useEditorSessionQuery({variables: { mapId: Number(mapId) }});
  const [mapState, setMapState] = useState<MapState | null>(null);
  const [editorState, setEditorState] = useState<LocalEditorState | null>(null);
  useEffect(() => {
    if (data?.maps[0]) {
      setMapState(initializeMapState(data));
    }
  }, [data]);

  if (editorState && mapState) {
    return (
      <MapStateContext.Provider value={{map: mapState}}>
        <EditorStateContext.Provider value={{editorState}}>
          {props.children}
        </EditorStateContext.Provider>
      </MapStateContext.Provider>
    );
  } else {
    return <>
      {props.fallback}
    </>
  }
}