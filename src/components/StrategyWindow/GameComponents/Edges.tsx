import {SLine} from "../Scene/QuadLine";
import React from "react";
import {useGameStateContext} from "../GameSimulator/Context";
import {useMapContext} from "../Map/Context";

export function Edges() {
  const { map } = useMapContext();
  const gameStateContext = useGameStateContext();
  const gameState = gameStateContext.gameState;
  //const gameState = useContext(GameState);

  if(!gameState) {
    return null;
  }

  const edges = Object.values(map.edgeLookup) || []
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
