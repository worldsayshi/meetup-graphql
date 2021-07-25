import {useState} from "react";
import {NodeFragment} from "../../../generated/graphql";
import {Vector3} from "../Scene/Types";

export function useDragControls() {
  const [dragNode, setDragNode] = useState<NodeFragment | null>();
  const [dragPoint, setDragPoint] = useState<Vector3 | null>();
  const [dragging, setDragging] = useState(false);

  return {
    dragging,
    dragNode: dragNode ?? null,
    dragPoint: dragPoint ?? null,
    setDragPoint,
    setDragging,
    setDragNode,
  };
}