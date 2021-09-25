import {ReactNode, useEffect, useState} from "react";
import { EditorStateContext } from "./Context";
import {useParams} from "react-router-dom";
import {MapFragment, useEditorSessionQuery} from "../../../generated/graphql";
import {LocalEditorState} from "./LocalEditorState";


interface EditorSimulatorProps {
  noSessionFallback: ReactNode;
  children: ReactNode;
}

export function EditorSimulator (props: EditorSimulatorProps) {
  let { mapId } = useParams<{ mapId: string }>();
  const { data } = useEditorSessionQuery({variables: { mapId: Number(mapId) }});
  const [editorState, setEditorState] = useState<LocalEditorState | null>(null);
  useEffect(() => {
    if (data?.maps[0]) {
      setEditorState({map: data?.maps[0]});
    }
  }, [data]);

  if (editorState) {
    return (
      <EditorStateContext.Provider value={{editorState}}>
        {props.children}
      </EditorStateContext.Provider>
    );
  } else {
    return <>
      {props.noSessionFallback}
    </>
  }
}