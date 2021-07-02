import {
  ArmyFragment,
  GameClientFragment, GameEventFragment,
  NodeFragment,
  SessionFragment
} from "../../../generated/graphql";
import {Vector3} from "../Scene/Types";

export interface GameStateI {
  //clientId?: number;
  gameSession: SessionFragment;
  ticks: number;
  running: boolean;
  nodesLookup: NodesLookup;
  armies: ArmyLookup;


  heartBeatInterval: number;
  commandOffset: number;


}

export interface UserGameStateI {
  dragging: boolean;
  dragPoint: Vector3 | null;
  dragNode: NodeFragment | null;

  selectedArmy: number | null;
}

export interface GameStateActions {
  setSelectedArmy: (selectedArmy: number | null) => void;
  setRunning: (running: boolean) => void;
  setArmyTarget: (armyId: number, nodeId: number) => void;

  setDragPoint: (dragPoint: Vector3 | null) => void;
  setDragging: (dragging: boolean) => void;
  setDragNode: (dragNode: NodeFragment | null) => void;
}

export type NodesLookup = {
  [key: number]: NodeFragment;
};
export type ArmyLookup = {
  [key: string]: ArmyFragment;
}

export type FullGameState = UserGameStateI & GameStateI & GameStateActions & {
  gameClient: GameClientFragment;
  gameEvents: GameEventFragment[];
};