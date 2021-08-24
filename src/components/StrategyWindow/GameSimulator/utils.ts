import {Lookup} from "./LocalGameState";


export function keys<T>(lu: Lookup<T>): number[] {
  return Object.keys(lu).map(Number);
}