import {GameClientFragment} from "../../../generated/graphql";
import {LocalEditorAction, LocalEditorState} from "./LocalEditorState";
import {SharedGameAction} from "../GameSimulator/GameSimulator";
import {createGenericContext} from "../../common/createGenericContext";


export interface EditorContext {
  editorState: LocalEditorState;
  //dispatchSharedAction: (action: SharedEditorAction) => void;
  //dispatchLocalAction: (action: LocalEditorAction) => void;
}

export const [useEditorStateContext, EditorStateContext] = createGenericContext<EditorContext>();