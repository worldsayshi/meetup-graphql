export type SharedSceneAction = {
  type: "set_running",
  running: boolean,
} | {
  type: "set_army_target",
  armyId: number,
  nodeId: number
}