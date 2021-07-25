import {GameState} from "./GameState";
import {createGenericContext} from "../../common/createGenericContext";

//export const GameStateContext = createContext<GameState>(undefined!);


export const [useGameStateContext, GameStateContext] = createGenericContext<GameState>();