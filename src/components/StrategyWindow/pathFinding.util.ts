import {EdgeLookup} from "./GameSimulator/LocalGameState";
import {NodeFragment} from "../../generated/graphql";

export function getAdjacencies(args: { edgeLookup: EdgeLookup; node_id: any }): NodeFragment[] {
  return Object.values(args.edgeLookup)
    .filter((edge) => edge.to.id === args.node_id || edge.from.id === args.node_id)
    .map(edge => edge.to.id === args.node_id ? edge.from : edge.to);
}

export function distance(pos1: [number, number, number], pos2: [number, number, number]) {
  return Math.sqrt((pos1[0]-pos2[0])**2+(pos1[2]-pos2[2])**2);
}
