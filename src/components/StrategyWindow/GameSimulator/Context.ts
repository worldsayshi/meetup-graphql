import {createGenericContext} from "../../common/createGenericContext";
import {LocalGameAction, LocalGameState, SharedGameAction} from "./GameSimulator";
import {GameClientFragment} from "../../../generated/graphql";

//export const GameStateContext = createContext<GameState>(undefined!);
export interface GameContext {
  gameClient: GameClientFragment;
  gameState: LocalGameState;
  dispatchSharedAction: (action: SharedGameAction) => void;
  dispatchLocalAction: (action: LocalGameAction) => void;
}

export const [useGameStateContext, GameStateContext] = createGenericContext<GameContext>();