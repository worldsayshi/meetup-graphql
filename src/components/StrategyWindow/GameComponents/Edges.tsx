import {SLine} from "../Scene/QuadLine";
import React, {useContext} from "react";
import {useGameStateContext} from "../GameSimulator/Context";

export function Edges() {
  const gameStateContext = useGameStateContext();
  const gameState = gameStateContext.gameState;
  //const gameState = useContext(GameState);

  if(!gameState) {
    return null;
  }

  const edges = Object.values(gameState.edgeLookup) || []
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
