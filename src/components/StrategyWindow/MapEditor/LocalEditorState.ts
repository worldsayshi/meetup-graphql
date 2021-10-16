import {MapFragment} from "../../../generated/graphql";
import {LocalSceneState} from "../SceneState/SceneContext";
import {LocalSceneAction} from "../SceneState/LocalSceneAction";
import {SharedSceneAction} from "../SceneState/SharedSceneAction";
import {never} from "../GameSimulator/LocalGameState";



export function localEditorStateReducer(sceneState: LocalSceneState, action: LocalSceneAction | SharedSceneAction): LocalSceneState {
  switch (action.type) {
    case "initialize":
      return action.initialState;
    case "set_drag_point":
      // TODO Maybe try moving a dragged node if there is one here?
      return {...sceneState, dragPoint: action.dragPoint};
    case "set_drag_node":
      return {...sceneState, dragNode: action.dragNode};
    case "set_dragging":
      return {...sceneState, dragging: action.dragging};
    case "select_piece":
    case "set_running":
    case "set_army_target":
    case "tick":
      console.warn(`${action.type} not supported for editor`);
      return sceneState;
    default:
      never(action);
      return sceneState;
  }
}

export interface LocalEditorState {
  map: MapFragment;
}