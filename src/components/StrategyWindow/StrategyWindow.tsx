import {SceneWrapper} from "./Scene/SceneView";
import Sphere from "./Scene/Sphere";
import {useGameMapQuery} from "../../generated/graphql";
import { SLine } from "./Scene/QuadLine";


interface GameMap {

}


export const StrategyWindow = () => {
  const { data: gameMap } = useGameMapQuery();
  return (
    <SceneWrapper>
      {gameMap?.edges.map(({from, to}) => (
        <SLine
          start={from.position}
          end={to.position}
        />
      ))}
      {gameMap?.nodes.map(({position}) => (
        <Sphere
          position={position}
        />
      ))}
    </SceneWrapper>
  );
}