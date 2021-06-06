import React, {createContext, ReactNode, useEffect, useState} from "react";
import {ArmyFragment, NodeFragment, SessionFragment} from "../../../generated/graphql";
import useInterval from "../../common/useInterval";

interface GameStateI {
  ticks: number;
  running: boolean;
  nodesLookup: NodesLookup;
  armies: ArmyLookup;
  selectedArmy: number | null;
}

interface GameStateActions {
  setSelectedArmy: (selectedArmy: number | null) => void;
  toggleRunning: () => void;
}

type NodesLookup = {
  [key: number]: NodeFragment;
};
type ArmyLookup = {
  [key: string]: ArmyFragment;
}

function initGameState(gameSession: SessionFragment): GameStateI {
  return {
    ticks: gameSession.elapsed_ticks,
    running: false,
    nodesLookup: gameSession.nodes.reduce((nl: NodesLookup, node) => {
      nl[node.id] = node;
      return nl;
    }, {}),
    armies: gameSession.armies.reduce((al: ArmyLookup, army) => {
      al[army.id] = army;
      return al;
    }, {}),
    selectedArmy: null,
  }
}


export const GameState = createContext<GameStateI & GameStateActions | null>(null);

function performStep(gameState: GameStateI): GameStateI {

  return {
    ...gameState,
    ticks: gameState.running ? gameState.ticks + 1: gameState.ticks,
  };
}

export function GameSimulator(props: { gameSession: SessionFragment, children: ReactNode }) {

  const {gameSession, children} = props;

  const [gameState, setGameState] = useState<GameStateI | null>(null);

  useEffect(() => {
    if(gameSession) {
      const gameState = initGameState(gameSession);
      setGameState(gameState);
      //setNodesLookup()
    }
  }, [gameSession]);

  useInterval(() => {
    if (gameState !== null) {
      const newGameState = performStep(gameState);
      setGameState(newGameState);
    }
  }, 100);

  return (
    <GameState.Provider value={gameState ? {
      ...gameState,
      setSelectedArmy: (selectedArmy) => {
        gameState && setGameState({
          ...gameState,
          selectedArmy,
        })
      },
      toggleRunning: () => {
        gameState && setGameState({
          ...gameState,
          running: !gameState.running,
        })
      }
    } : null}>
      {children}
    </GameState.Provider>
  );
}