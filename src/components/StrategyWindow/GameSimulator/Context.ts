import {createGenericContext} from "../../common/createGenericContext";
import {SharedGameAction} from "./GameSimulator";
import {GameClientFragment} from "../../../generated/graphql";
import {LocalGameAction, LocalGameState} from "./LocalGameState";

export interface GameContext {
  gameClient: GameClientFragment;
  gameState: LocalGameState;
  dispatchSharedAction: (action: SharedGameAction) => void;
  dispatchLocalAction: (action: LocalGameAction) => void;
}

export const [useGameStateContext, GameStateContext] = createGenericContext<GameContext>();