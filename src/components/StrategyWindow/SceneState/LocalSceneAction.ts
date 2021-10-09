import {LocalSceneState} from "./SceneContext";
import {Vector3} from "../Scene/Types";
import {NodeFragment} from "../../../generated/graphql";

export type LocalSceneAction = {
  type: "initialize",
  initialState: LocalSceneState,
} | {
  type: "tick"
} | {
  type: "set_drag_point",
  dragPoint: Vector3 | null,
} | {
  type: "set_drag_node",
  dragNode: NodeFragment,
} | {
  type: "set_dragging",
  dragging: boolean,
} | {
  type: "select_piece",
  selectedPiece: number | null,
};