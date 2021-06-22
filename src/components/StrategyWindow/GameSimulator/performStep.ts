import {GameStateI} from "./Types";

export function performStep(gameState: GameStateI): GameStateI {

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

  return {
    ...gameState,
    ticks: gameState.running ? gameState.ticks + 1 : gameState.ticks,
  };
}