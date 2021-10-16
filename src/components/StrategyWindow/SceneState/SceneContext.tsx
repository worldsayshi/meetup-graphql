import {createGenericContext} from "../../common/createGenericContext";
import {EdgeLookup, NodesLookup} from "../Map/MapState";
import {NodeFragment} from "../../../generated/graphql";
import {Vector3} from "../Scene/Types";
import {PieceLookup} from "../GameSimulator/LocalGameState";
import {LocalSceneAction} from "./LocalSceneAction";
import {SharedSceneAction} from "./SharedSceneAction";

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

