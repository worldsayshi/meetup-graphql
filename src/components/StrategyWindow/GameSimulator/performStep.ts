import {ArmyFragment} from "../../../generated/graphql";
import {PieceLookup} from "./LocalGameState";
import {distance} from "../pathFinding.util";
import {keys} from "./utils";
import {LocalSceneState} from "../SceneState/SceneContext";

/*function distance(pos1: [number, number, number], pos2: [number, number, number]) {
  return Math.sqrt((pos1[0]-pos2[0])**2+(pos1[2]-pos2[2])**2);
}*/

// Maybe "Tick" should be a redux event instead...
export function performStep(gameState: LocalSceneState): LocalSceneState {

  /*
  TODO: Think about how heartbeat and army movement meshes

  Heartbeat etc idea:
  - command_offset - the amount of ticks in the future a command will happen
  - User commands are added to a remote list user_commands
  - they are scheduled `command_offset` into the future
  - The heartbeat is sent at least twice during a command_offset
  - If the hearbeat is not received by a client, the game will pause until heartbeat

  c: .--v__.--v
  h: i_i_i_i_i_i

  Army movement idea:
  - Add edge_progress to the army type
  - Each step, increment edge_progress by one for each army
  - When edge_progress * armySpeed > edgeLength the army jumps to next node.
     - set edge_progress to 0
     - remove the first element on army node_path
  * */

  // 1. Progress armies
  let movedArmies = keys(gameState.pieceLookup).reduce((ma, key: number) => {
    const army: ArmyFragment = gameState.pieceLookup[key];
    const speed = army.army_type?.speed;
    return {
      ...ma,
      [key]: {
        ...army,
        progress: army.current_node.id !== army.planned_node_id ? army.progress + speed : 0,
      },
    };
  }, {} as PieceLookup);

  // 2. Move armies to next node if applicable
  movedArmies = keys(movedArmies).reduce((ma, key) => {
    const army: ArmyFragment = movedArmies[key];
    const current_node = army.current_node;
    const planned_node = gameState.nodesLookup[army.planned_node_id];
    const map_scale = gameState.mapScale;
    const edge_length = distance(current_node.position, planned_node.position);
    if (army.progress * map_scale > edge_length) {
      return {
        ...ma,
        [key]: {
          ...army,
          progress: army.progress - map_scale * edge_length,
          planned_node_id: army.planned_node_id,
          current_node: planned_node,
        },
      };
    }
    return {
      ...ma,
      [key]: {
        ...army,
      },
    };
  }, {} as PieceLookup);

  return {
    ...gameState,
    pieceLookup: movedArmies,
    tick: gameState.running ? gameState.tick + 1 : gameState.tick,
  };
}