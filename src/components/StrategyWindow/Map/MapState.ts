import {
  EdgeFragment,
  EditorSessionQuery, MapFragment,
  NodeFragment,
  SessionFragment
} from "../../../generated/graphql";
import {Lookup, toLookup} from "../MapEditor/Lookup";

export type NodesLookup = Lookup<NodeFragment>;
export type EdgeLookup = Lookup<EdgeFragment>;

function isSessionFragment(sf: SessionFragment | EditorSessionQuery | undefined): sf is SessionFragment {
  return !!sf?.hasOwnProperty("map");
}

function getMap(gameSession: SessionFragment | EditorSessionQuery | undefined): MapFragment | undefined {
  if(isSessionFragment(gameSession)) {
    return gameSession.map;
  } else if(gameSession) {
    return gameSession.maps[0];
  } else {
    return undefined;
  }
}

export function initializeMapState(gameSession?: SessionFragment | EditorSessionQuery): MapState {
  let map = getMap(gameSession);
  const nodesLookup = map ? toLookup(map.nodes) : {};
  const edgeLookup = map ? toLookup(map.edges) : {};

  return {
    nodesLookup,
    edgeLookup,
  };
}

export interface MapState {
  nodesLookup: NodesLookup;
  edgeLookup: EdgeLookup;
}