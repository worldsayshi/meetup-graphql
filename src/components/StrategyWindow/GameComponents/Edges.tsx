import {SLine} from "../Scene/QuadLine";
import React from "react";
import {useSceneContext} from "../SceneState/SceneContext";

export function Edges() {
  const gameStateContext = useSceneContext();
  const sceneState = gameStateContext.state;

  if(!sceneState) {
    return null;
  }

  const edges = Object.values(sceneState.edgeLookup) || []
  return (
    <>
      {edges.map(({id, from, to}) => (
        <SLine
          key={"edge_"+id}
          start={from.position}
          end={to.position}
        />
      ))}
    </>
  );
}
