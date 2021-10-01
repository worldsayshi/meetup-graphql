import {EdgeFragment, NodeFragment, SessionFragment} from "../../../generated/graphql";
import {Lookup, toLookup} from "./Lookup";

export type NodesLookup = Lookup<NodeFragment>;
export type EdgeLookup = Lookup<EdgeFragment>;

export function initializeMapState(gameSession?: SessionFragment): MapState {
  const nodesLookup = gameSession ? toLookup(gameSession.map.nodes) : {};
  const edgeLookup = gameSession ? toLookup(gameSession.map.edges) : {};

  return {
    nodesLookup,
    edgeLookup,
  };
}

export interface MapState {
  nodesLookup: NodesLookup;
  edgeLookup: EdgeLookup;
}