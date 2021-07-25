

export interface ArmyControls {
  selectedArmy: number | null;
  setSelectedArmy: (selectedArmy: number | null) => void;
  setArmyTarget: (armyId: number, nodeId: number) => void;
}