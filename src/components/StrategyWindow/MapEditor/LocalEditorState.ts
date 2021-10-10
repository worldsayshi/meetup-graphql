import {MapFragment} from "../../../generated/graphql";
import {LocalSceneState} from "../SceneState/SceneContext";
import {LocalSceneAction} from "../SceneState/LocalSceneAction";
import {SharedSceneAction} from "../SceneState/SharedSceneAction";



export function localEditorStateReducer(gameState: LocalSceneState, action: LocalSceneAction | SharedSceneAction): LocalSceneState {

}

export interface LocalEditorState {
  map: MapFragment;
}