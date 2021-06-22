import {SLine} from "../Scene/QuadLine";
import React, {useContext} from "react";
import {GameState} from "../GameSimulator/Context";


export function Edges() {
  const gameState = useContext(GameState);

  if(!gameState) {
    return null;
  }

  const edges = gameState?.gameSession?.edges || []
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
