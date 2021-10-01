
export type Lookup<T> = {
  [key: number]: T;
}
export function toLookup<T extends { id: number }>(ts: T[]) {
  return ts.reduce((lookup: Lookup<T>, t) => {
    lookup[t.id] = t;
    return lookup;
  }, {});
}