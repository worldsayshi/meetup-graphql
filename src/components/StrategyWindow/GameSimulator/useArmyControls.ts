import {useState} from "react";
import {ArmyControls} from "./ArmyControls";

// TODO Maybe use useReducer instead of the whole of redux for user actions!?
//  https://reactjs.org/docs/hooks-reference.html#usereducer
//  https://reactjs.org/docs/hooks-faq.html#how-to-avoid-passing-callbacks-down
//  https://stackoverflow.com/a/53146965/439034

export function useArmyControls(
): ArmyControls {
  const [selectedArmy, setSelectedArmy] = useState<number | null>(null);

  function setArmyTarget(armyId: number, nodeId: number) {

  }


  return {setArmyTarget, selectedArmy, setSelectedArmy};
}