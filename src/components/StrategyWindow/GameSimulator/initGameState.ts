import {SessionFragment} from "../../../generated/graphql";
import {ArmyLookup, GameStateI, NodesLookup} from "./Types";

export function initGameState(gameSession: SessionFragment): GameStateI {

  let storedClientIds = localStorage.getItem("gameClientIds");

  let clientIds: { [sessionId: number]: number } = storedClientIds
    ? JSON.parse(storedClientIds)
    : {};

  return {
    // Hmm, hearbeat interval and command offset should probably be in the same unit to be able to
    // ensure that heartbeat happens x times within a command offset.
    // But what happens when the game is paused? I guess the heartbeat is not needed then?
    heartBeatInterval: 10,
    commandOffset: 40,
    clientId: clientIds[gameSession.id] ?? undefined,
    ticks: gameSession.elapsed_ticks,
    running: false,
    nodesLookup: gameSession.nodes.reduce((nl: NodesLookup, node) => {
      nl[node.id] = node;
      return nl;
    }, {}),
    armies: gameSession.armies.reduce((al: ArmyLookup, army) => {
      al[army.id] = army;
      return al;
    }, {}),
    // selectedArmy: null,

    gameSession,
  }
}