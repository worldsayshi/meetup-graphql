

export type DragType = "Move" | "Connect";

export type Vector3 = [number, number, number];

export interface SimpleLink {
  start: Vector3;
  mid: Vector3;
  end: Vector3;
}
