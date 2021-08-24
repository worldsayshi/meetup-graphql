import {EdgeLookup, NodesLookup} from "./GameSimulator/LocalGameState";
import {NodeFragment} from "../../generated/graphql";
import {distance, getAdjacencies} from "./pathFinding.util";


interface FindPathArgs {
  fromId: number,
  toId: number,
  nodesLookup: NodesLookup,
  edgeLookup: EdgeLookup,
}

export function findPath({ fromId, toId, nodesLookup, edgeLookup }: FindPathArgs) {
  const endNode = nodesLookup[toId];
  if (!endNode) {
    throw new Error("No end node!");
  }
  let openPaths: [{
    g: number,
    h: number,
    path: number[]
  }] = [{
    g: 0,
    h: distance(
      nodesLookup[fromId].position,
      nodesLookup[toId].position
    ),
    path: [fromId],
  }];
  let visitedNodes: {
    [key: number]: boolean,
  } = {};

  let loopGuard = 0;
  while(openPaths.length > 0) {
    loopGuard++;
    let currentExpandPath = openPaths.shift();
    if (!currentExpandPath) {
      break;
    }
    if (loopGuard > 100) {
      throw new Error("Loop guard!");
    }
    const currentExpandNode = nodesLookup[currentExpandPath.path[currentExpandPath.path.length-1]];
    if (currentExpandNode.id === toId) {
      return currentExpandPath;
    }
    const openAdjacencies: NodeFragment[] = getAdjacencies({
      node_id: currentExpandNode.id,
      edgeLookup,
    }).filter(adjNode => !visitedNodes[adjNode.id]);

    //
    for(let adjNode of openAdjacencies) {
      visitedNodes[adjNode.id] = true;
      openPaths.push({
        path: [...currentExpandPath.path, adjNode.id],
        g: currentExpandPath.g + distance(
          currentExpandNode.position,
          adjNode.position
        ),
        h: distance(
          adjNode.position,
          endNode.position
        ),
      });
    }
    openPaths.sort(({ g, h }) => g + h);
  }
  throw new Error("No solution found!");

  /*
    Get start node id as single step path
    expand path

expand:
    for each node adjacent to the fringe node
      add the shortest path to the fringe
    if the fringe node is the stop node, return the path
   */
}