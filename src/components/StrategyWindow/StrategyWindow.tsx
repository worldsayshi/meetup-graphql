import {SceneWrapper} from "./Scene/SceneView";
import {NodeFragment, useGameSessionQuery} from "../../generated/graphql";
import { SLine } from "./Scene/QuadLine";
import React, { useState } from "react";
import { Vector3 } from "./Scene/Types";
import Cylinder from "./Scene/Cylinder";
import { Soldier } from "./Soldier";



export const StrategyWindow = () => {
  const [dragNode, setDragNode] = useState<NodeFragment | null>();
  const [dragPoint, setDragPoint] = useState<Vector3 | null>();
  const [selectedArmy, setSelectedArmy] = useState<number | null>();
  const [dragging, setDragging] = useState(false);
  const { data: gameSessions } = useGameSessionQuery();
  // const { data: gameMap } = useGameMapQuery();

  const [gameSession] = gameSessions?.sessions || [];
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



      {gameSession?.edges.map(({id, from, to}) => (
        <SLine
          key={"edge_"+id}
          start={from.position}
          end={to.position}
        />
      ))}
      {gameSession?.nodes.map((node) => (
        <Cylinder
          key={"node_"+node.id}
          onDragStart={(event: PointerEvent) => {
            setDragging(true);
            setDragNode(node)
          }}
          position={node.position}
        />
      ))}
      {gameSession?.armies && gameSession?.armies.map(({id, current_node}) => (
        <Soldier
          key={"army_"+id}
          selected={selectedArmy === id}
          position={current_node.position}
          onSelect={() => setSelectedArmy(id)}
        />
      ))}

      {dragNode && dragPoint && <SLine
        start={dragNode.position}
        end={dragPoint}
        color="limegreen"
        lineWidth={10}
      />}
    </SceneWrapper>
  );
}