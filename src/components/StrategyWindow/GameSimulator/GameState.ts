import {Vector3} from "../Scene/Types";
import {NodeFragment} from "../../../generated/graphql";
import {DragControls} from "./DragControls";
import {ArmyControls} from "./ArmyControls";

export interface GameActions {
  setRunning: (running: boolean) => void;
  setDragPoint: (dragPoint: Vector3 | null) => void;
  setDragging: (dragging: boolean) => void;
  setDragNode: (dragNode: NodeFragment | null) => void;
}

export interface GameState extends DragControls, ArmyControls {

}