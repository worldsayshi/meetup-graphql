import {ArmyFragment, SessionFragment} from "../../../generated/graphql";
import {performStep} from "./performStep";
import {Lookup, toLookup} from "../MapEditor/Lookup";
import {LocalSceneState} from "../SceneState/SceneContext";
import {LocalSceneAction} from "../SceneState/LocalSceneAction";
import {SharedSceneAction} from "../SceneState/SharedSceneAction";

export type PieceLookup = Lookup<ArmyFragment>;

/*export interface LocalGameState {
  mapScale: number;

  tick: number;
  running: boolean;

  dragNode: NodeFragment | null;
  dragPoint: Vector3 | null;
  dragging: boolean;

  selectedPiece: number | null;
  pieceLookup: PieceLookup;
}*/



export function initializeLocalGameState(gameSession?: SessionFragment): LocalSceneState {

  const armyLookup = gameSession ? toLookup(gameSession.armies) : {};
  const nodesLookup = gameSession ? toLookup(gameSession.map.nodes) : {};
  const edgeLookup = gameSession ? toLookup(gameSession.map.edges) : {};
  return {
    mapScale: gameSession?.map.map_scale ?? 1,
    tick: gameSession?.elapsed_ticks ?? 0,
    running: false,

    dragNode: null,
    dragPoint: null,
    dragging: false,

    selectedPiece: null,

    pieceLookup: armyLookup,

    nodesLookup,
    edgeLookup,
    // nodes: gameSession.nodes,
    // armies: gameSession.armies,
  };
}

export function localGameStateReducer(gameState: LocalSceneState, action: LocalSceneAction | SharedSceneAction): LocalSceneState {
  switch (action.type) {
    case "initialize":
      return action.initialState;
    case "tick":
      return performStep(gameState);
    case "select_piece":
      return {...gameState, selectedPiece: action.selectedPiece};
    case "set_running":
      console.log("set_running", action);
      return {...gameState, running: action.running};
    case "set_army_target":
      return {...gameState, pieceLookup: {
        ...gameState.pieceLookup,
        [action.armyId]: {
          ...gameState.pieceLookup[action.armyId],
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