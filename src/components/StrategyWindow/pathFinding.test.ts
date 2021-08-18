
import { findPath } from './pathFinding';

describe('findPath', function () {
  it('should find path to target', function () {
    const path = findPath({
      fromId: 1,
      toId: 2,
      // nodesLookup: {
      //   "1": {
      //     id: 1,
      //     position: [],
      //   },
      // },
      edgeLookup: {
        "1": {
          id: 1,
          from: {
            id: 1,
            position: [0,0,0]
          },
          to: {
            id: 2,
            position: [0,0,1]
          }
        }
      }
    });

    expect(path).toBe([0, 1]);
  });
});