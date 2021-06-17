import {SceneWrapper} from "./Scene/SceneView";
import {
  EdgeFragment,
  NodeFragment,
  useGameSessionQuery,
  useSetArmyTargetMutation
} from "../../generated/graphql";
import {SLine} from "./Scene/QuadLine";
import React, {useContext, useState} from "react";
import {Vector3} from "./Scene/Types";
import Cylinder from "./Scene/Cylinder";
import {Soldier} from "./GameComponents/Soldier";
import {PointerEvent} from "react-three-fiber/canvas";
import {GameSimulator, GameState} from "./GameComponents/GameSimulator";
import {TopGameBar} from "./GameComponents/TopGameBar";


function Edges(props: { edges: EdgeFragment[] }) {
  return (
    <>
      {props.edges.map(({id, from, to}) => (
        <SLine
          key={"edge_"+id}
          start={from.position}
          end={to.position}
        />
      ))}
    </>
  );
}


function Armies() {
  const gameState = useContext(GameState);
  return (
    <>
      {gameState && Object.values(gameState?.armies).map(({id, current_node, planned_node_id}) => (
        <React.Fragment key={"army_"+id}>
          <Soldier
            key={"army_"+id}
            selected={gameState.selectedArmy === id}
            position={current_node.position}
            onSelect={() => {
              gameState.setSelectedArmy(id)
            }}
          />
          {gameState.nodesLookup && planned_node_id && <SLine
            color="yellow"
            lineWidth={8}
            start={current_node.position}
            end={gameState.nodesLookup[planned_node_id]?.position}
          />}
        </React.Fragment>
      ))}
    </>
  );
}

function Nodes() {
  const gameState = useContext(GameState);

  if(!gameState) {
    return null;
  }

  const {
    selectedArmy,
    setArmyTarget,
    setDragging,
    setDragNode,
  } = gameState;

  return <>
    {gameState.gameSession?.nodes.map((node) => (
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
  </>;
}


function Scene() {
   const gameState = useContext(GameState);

   if(!gameState) {
     return null;
   }

  const {
    dragging,
    setDragPoint,
    setDragging,
    setSelectedArmy,
    gameSession,
    dragNode,
    dragPoint,
  } = gameState;

  return <SceneWrapper
    bridgeContexts={[GameState]}
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
    <Edges edges={gameSession?.edges || []} />
    <Nodes />
    <Armies />


    {dragNode && dragPoint && <SLine
      start={dragNode.position}
      end={dragPoint}
      color="limegreen"
      lineWidth={10}
    />}
  </SceneWrapper>;
}

export const StrategyWindow = () => {

  return (
    <GameSimulator noSessionFallback={<div>No Session</div>}>
      <TopGameBar />
      <Scene />
    </GameSimulator>
  );
}