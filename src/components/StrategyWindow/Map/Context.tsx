import {MapState} from "./MapState";
import {createGenericContext} from "../../common/createGenericContext";
import {ReactNode} from "react";


export interface MapContext {
  map: MapState;
}

export const [useMapContext, MapStateContext] = createGenericContext<MapContext>();

