import {ArmyFragment, NodeFragment, SessionFragment} from "../../../generated/graphql";
import {Vector3} from "../Scene/Types";

export interface GameStateI {
  clientId?: number;
  ticks: number;
  running: boolean;
  nodesLookup: NodesLookup;
  armies: ArmyLookup;
  selectedArmy: number | null;


  heartBeatInterval: number;
  commandOffset: number;

  gameSession: SessionFragment;


}

export interface UserGameStateI {
  dragging: boolean;
  dragPoint: Vector3 | null;
  dragNode: NodeFragment | null;
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

export type FullGameState = UserGameStateI & GameStateI & GameStateActions;