import {Vector3} from "../Scene/Types";
import {NodeFragment} from "../../../generated/graphql";


export interface DragControls {
  setDragPoint: (dragPoint: Vector3 | null) => void;
  setDragging: (dragging: boolean) => void;
  setDragNode: (dragNode: NodeFragment | null) => void;

  dragPoint: Vector3 | null;
  dragNode: NodeFragment | null;
  dragging: boolean;
}