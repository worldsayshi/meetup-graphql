import {EdgeLookup, NodesLookup} from "./GameSimulator/LocalGameState";
import {NodeFragment} from "../../generated/graphql";

export function getAdjacencies(args: { edgeLookup: EdgeLookup; node_id: any }): NodeFragment[] {
  return Object.values(args.edgeLookup)
    .filter((edge) => edge.to.id === args.node_id || edge.from.id === args.node_id)
    .map(edge => edge.to.id === args.node_id ? edge.from : edge.to);
}

interface AddOpenPathArgs {
  openPaths: [{ estCost: number; path: number[] }];
  newPath: { path: number[]; estCost: number };
}

// Add a new path to the list sorted by cost
export function addOpenPath({}: AddOpenPathArgs) {

  return [{estCost: 0, path: []}];
}
