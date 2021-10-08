import {createGenericContext} from "../../common/createGenericContext";
import {EdgeLookup, NodesLookup} from "../Map/MapState";
import {NodeFragment} from "../../../generated/graphql";
import {Vector3} from "./Types";
import {LocalSceneAction, PieceLookup} from "../GameSimulator/LocalGameState";
import {SharedSceneAction} from "../GameSimulator/GameSimulator";


export interface LocalSceneState {
  mapScale: number;

  tick: number;
  running: boolean;

  dragNode: NodeFragment | null;
  dragPoint: Vector3 | null;
  dragging: boolean;

  selectedPiece: number | null;
  pieceLookup: PieceLookup;

  nodesLookup: NodesLookup,
  edgeLookup: EdgeLookup,
}

export const [useSceneContext, SceneContext] = createGenericContext<{
  state: LocalSceneState;
  dispatchSharedAction: (action: SharedSceneAction) => void;
  dispatchLocalAction: (action: LocalSceneAction) => void;
}>();

