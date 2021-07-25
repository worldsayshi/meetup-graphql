import {useParams} from "react-router-dom";
import {useGameSessionQuery} from "../../../generated/graphql";
import {GameState} from "./GameState";
import {useDragControls} from "./useDragControls";
import {useArmyControls} from "./useArmyControls";


export function useGameState (): GameState {
  let { gameSessionId } = useParams<{ gameSessionId?: string }>();
  const { data: gameSessions } = useGameSessionQuery({
    variables: { gameSessionId },
    skip: !gameSessionId,
  });

  const [gameSession] = gameSessions?.game_sessions || [];

  return {
    ...useDragControls(),
    ...useArmyControls(),
  };
}