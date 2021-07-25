import React, {ReactNode} from "react";
import {GameStateContext} from "./Context";
import {useGameState} from "./useGameState";

interface GameSimulatorProps {
  noSessionFallback: ReactNode;
  children: ReactNode;
}

export function GameSimulator(props: GameSimulatorProps) {


  const gameState = useGameState();

  if(gameState) {
    return (
      <GameStateContext.Provider value={gameState}>
        {props.children}
      </GameStateContext.Provider>
    );
  } else {
    return <>
      {props.noSessionFallback}
    </>
  }
}