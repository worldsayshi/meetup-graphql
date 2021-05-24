import {SceneWrapper} from "./Scene/SceneView";
import Sphere from "./Scene/Sphere";
import {NodeFragment, useGameMapQuery} from "../../generated/graphql";
import { SLine } from "./Scene/QuadLine";
import {useState} from "react";
import {Vector3} from "./Scene/Types";


interface GameMap {

}


export const StrategyWindow = () => {
  const [dragNode, setDragNode] = useState<NodeFragment | null>();
  const [dragPoint, setDragPoint] = useState<Vector3 | null>();
  const [dragging, setDragging] = useState(false);
  const { data: gameMap } = useGameMapQuery();
  return (
    <SceneWrapper
      orbitEnabled={!dragging}
      pointerMoved={(point) => {
        if(dragging) {
          setDragPoint([point.x, point.y, point.z]);
        }
      }}
      onPointerUp={() => {
        setDragPoint(null);
        setDragging(false);
      }}>
      {dragNode && dragPoint && <SLine
        start={dragNode.position}
        end={dragPoint}
      />}
      {gameMap?.edges.map(({from, to}) => (
        <SLine
          start={from.position}
          end={to.position}
        />
      ))}
      {gameMap?.nodes.map((node) => (
        <Sphere
          onDragStart={(event: PointerEvent) => {
            setDragging(true);
            setDragNode(node)
          }}
          position={node.position}
        />
      ))}
    </SceneWrapper>
  );
}