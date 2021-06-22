import {createContext} from "react";
import {FullGameState} from "./Types";

export const GameState = createContext<FullGameState | null>(null);