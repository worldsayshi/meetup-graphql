import {SceneWrapper} from "./Scene/SceneView";
import {
  NodeFragment,
  SessionFragment,
  useGameSessionQuery,
  useSetArmyTargetMutation
} from "../../generated/graphql";
import {SLine} from "./Scene/QuadLine";
import React, {createContext, useEffect, useState} from "react";
import {Vector3} from "./Scene/Types";
import Cylinder from "./Scene/Cylinder";
import {Soldier} from "./Soldier";


interface GameStateI {
  ticks: number;
}

function initGameState(gameSession: SessionFragment): GameStateI {
  return {
    ticks: gameSession.elapsed_ticks,
  }
}

const GameState = createContext<GameStateI | null>(null);

export const StrategyWindow = () => {
  const [dragNode, setDragNode] = useState<NodeFragment | null>();
  const [dragPoint, setDragPoint] = useState<Vector3 | null>();
  const [selectedArmy, setSelectedArmy] = useState<number | null>();
  const [dragging, setDragging] = useState(false);
  const { data: gameSessions } = useGameSessionQuery();
  const [setArmyTargetMutation] = useSetArmyTargetMutation();
  // const { data: gameMap } = useGameMapQuery();
  const [gameState, setGameState] = useState<GameStateI | null>(null);


  const [gameSession] = gameSessions?.sessions || [];

  useEffect(() => {
    if(gameSession) {
      const gameState = initGameState(gameSession);
      setGameState(gameState);
    }
  }, [gameSession]);

  function setArmyTarget(armyId: number, nodeId: number) {
    setArmyTargetMutation({
      variables: { armyId, nodeId },
      optimisticResponse: {
        update_armies: {
          returning: [{
            id: armyId,
            planned_node: nodeId,
          }]
        }}
    }).catch((err) => {
      console.error(err);
    });
    //console.log("setArmyTarget", armyId, nodeId);
  }

  return (
    <SceneWrapper
      orbitEnabled={!dragging}
      pointerMoved={(point) => {
        if(dragging) {
          setDragPoint([point.x, point.y, point.z]);
        }
      }}
      // onClick={selectedArmy !== null ? ((event) => {
      //   setSelectedArmy(null);
      // }): undefined}
      onPointerUp={() => {
        setDragPoint(null);
        setDragging(false);
        setSelectedArmy(null);
      }}>
      <GameState.Provider value={gameState}>
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
            onRightPointerDown={() => {
              // console.log("Click right")
              if (typeof selectedArmy === "number") {
                setArmyTarget(selectedArmy, node.id);
              }
            }}
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
            onSelect={() => {
              console.log("select")
              setSelectedArmy(id)
            }}
          />
        ))}

        {dragNode && dragPoint && <SLine
          start={dragNode.position}
          end={dragPoint}
          color="limegreen"
          lineWidth={10}
        />}
      </GameState.Provider>
    </SceneWrapper>
  );
}