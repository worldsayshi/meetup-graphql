import {
  ArmyFragment,
  EdgeFragment,
  NodeFragment,
  SessionFragment
} from "../../../generated/graphql";
import {Vector3} from "../Scene/Types";
import {performStep} from "./performStep";
import {SharedGameAction} from "./GameSimulator";


export type Lookup<T> = {
  [key: number]: T;
}
export type NodesLookup = Lookup<NodeFragment>;
export type ArmyLookup = Lookup<ArmyFragment>;
export type EdgeLookup = Lookup<EdgeFragment>;


function toLookup<T extends { id: number }>(ts: T[]) {
  return ts.reduce((lookup: Lookup<T>, t) => {
    lookup[t.id] = t;
    return lookup;
  }, {});
}

export interface LocalGameState {
  mapScale: number;

  tick: number;
  running: boolean;

  dragNode: NodeFragment | null;
  dragPoint: Vector3 | null;
  dragging: boolean;

  selectedArmy: number | null;

  nodesLookup: NodesLookup;
  armyLookup: ArmyLookup;
  edgeLookup: EdgeLookup;
}


export type LocalGameAction = {
  type: "initialize",
  initialState: LocalGameState,
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
  type: "select_army",
  selectedArmy: number | null,
};


export function initializeLocalGameState(gameSession?: SessionFragment): LocalGameState {

  const nodesLookup = gameSession ? toLookup(gameSession.nodes) : {};
  const armyLookup = gameSession ? toLookup(gameSession.armies) : {};
  const edgeLookup = gameSession ? toLookup(gameSession.edges) : {};
  return {
    mapScale: gameSession?.session_config.map_scale ?? 1,
    tick: gameSession?.elapsed_ticks ?? 0,
    running: false,

    dragNode: null,
    dragPoint: null,
    dragging: false,

    selectedArmy: null,

    nodesLookup,
    armyLookup,
    edgeLookup,
    // nodes: gameSession.nodes,
    // armies: gameSession.armies,
  };
}

export function localGameStateReducer(gameState: LocalGameState, action: LocalGameAction | SharedGameAction): LocalGameState {
  switch (action.type) {
    case "initialize":
      return action.initialState;
    case "tick":
      return performStep(gameState);
    case "select_army":
      return {...gameState, selectedArmy: action.selectedArmy};
    case "set_running":
      console.log("set_running", action);
      return {...gameState, running: action.running};
    case "set_army_target":
      return {...gameState, armyLookup: {
        ...gameState.armyLookup,
        [action.armyId]: {
          ...gameState.armyLookup[action.armyId],
          planned_node_id: action.nodeId,
        }
      }};
    case "set_drag_point":
      return {...gameState, dragPoint: action.dragPoint};
    case "set_drag_node":
      return {...gameState, dragNode: action.dragNode};
    case "set_dragging":
      return {...gameState, dragging: action.dragging};
  }
  return gameState;
}