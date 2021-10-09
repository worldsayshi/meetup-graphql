import {Lookup} from "../MapEditor/Lookup";


export function keys<T>(lu: Lookup<T>): number[] {
  return Object.keys(lu).map(Number);
}