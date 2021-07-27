import {GameState} from "./GameState";
import {createGenericContext} from "../../common/createGenericContext";
import {LocalGameAction, LocalGameState, SharedGameAction} from "./GameSimulator";

//export const GameStateContext = createContext<GameState>(undefined!);
export interface GameContext {
  gameState: LocalGameState;
  dispatchSharedAction: (action: SharedGameAction) => void;
  dispatchLocalAction: (action: LocalGameAction) => void;
}

export const [useGameStateContext, GameStateContext] = createGenericContext<GameContext>();