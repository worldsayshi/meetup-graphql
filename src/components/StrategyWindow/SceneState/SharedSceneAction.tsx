export type SharedSceneAction = {
  type: "set_running",
  running: boolean,
} | {
  type: "set_piece_target",
  armyId: number,
  nodeId: number
}