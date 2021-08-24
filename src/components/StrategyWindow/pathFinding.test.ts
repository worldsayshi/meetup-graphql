
import { findPath } from './pathFinding';

const nodesLookup = {
  1: {
    id: 1,
    position: [0,0,0]
  },
  2: {
    id: 2,
    position: [0,0,1]
  },
  3: {
    id: 3,
    position: [1,0,1]
  },
  4: {
    id: 4,
    position: [3,0,1]
  }
};
const edgeLookup = {
  1: {
    id: 1,
    from: nodesLookup[1],
    to: nodesLookup[2]
  },
  2: {
    id: 2,
    from: nodesLookup[2],
    to: nodesLookup[3]
  },
  3: {
    id: 3,
    from: nodesLookup[3],
    to: nodesLookup[4]
  },
  4: {
    id: 4,
    from: nodesLookup[2],
    to: nodesLookup[4]
  }
};
const testCases = [{
  fromId: 1,
  toId: 2,
  nodesLookup,
  edgeLookup,
  expectedPath: [1, 2],
}, {
  fromId: 1,
  toId: 3,
  nodesLookup,
  edgeLookup,
  expectedPath: [1, 2, 3]
}];

describe('findPath', function () {
  it.each(testCases)('should find path to target for testcase %#', ({expectedPath, ...testCase}) => {
    const {path} = findPath(testCase);
    expect(path).toStrictEqual(expectedPath);
  });
});