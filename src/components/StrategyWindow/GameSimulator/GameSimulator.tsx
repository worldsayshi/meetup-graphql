import React, {ReactNode, useContext, useEffect, useState} from "react";
import {useGameEventsSubscription, useGameSessionQuery} from "../../../generated/graphql";
import {useParams} from "react-router-dom";
import {GameState} from "./Context";
import {useGameState} from "./useGameState";


/*
  1. Send heartbeat.
  Ever. Listen for heartbeats

  Count ticks, when
* */
function GameSyncClient() {
  const gameState = useContext(GameState);
  const [lastBeat, setLastBeat] = useState();
  const { data } = useGameEventsSubscription();

  useEffect(() => {

  }, [gameState?.ticks]);
  return null;
}


interface GameSimulatorProps {
  // gameSession: SessionFragment;
  noSessionFallback: ReactNode;
  children: ReactNode;
}

export function GameSimulator(props: GameSimulatorProps) {
  let { gameSessionId } = useParams<{ gameSessionId?: string }>();
  const { data: gameSessions } = useGameSessionQuery({
    variables: { gameSessionId },
    skip: !gameSessionId,
  });

  const [gameSession] = gameSessions?.game_sessions || [];


  const gameState = useGameState(gameSession);

  if(gameState) {
    return (
      <GameState.Provider value={gameState ? gameState : null}>
        <GameSyncClient />
        {props.children}
      </GameState.Provider>
    );
  } else {
    return <>
      {props.noSessionFallback}
    </>
  }
}