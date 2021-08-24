
import { findPath } from './pathFinding';

describe('findPath', function () {
  it('should find path to target', function () {
    const fromNode = {
      id: 1,
      position: [0,0,0]
    };
    const toNode = {
      id: 2,
      position: [0,0,1]
    };
    const {path} = findPath({
      fromId: 1,
      toId: 2,
      // nodesLookup: {
      //   "1": {
      //     id: 1,
      //     position: [],
      //   },
      // },
      nodesLookup: {
        1: fromNode,
        2: toNode,
      },
      edgeLookup: {
        1: {
          id: 1,
          from: fromNode,
          to: toNode
        }
      }
    });

    expect(path).toStrictEqual([1, 2]);
  });
});