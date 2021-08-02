// import {SubmitGameEventsDocument} from "../../../generated/graphql";

import {gql} from "@apollo/client/core";
import {client} from '../client';
import {GameEventFragment} from "../../../generated/graphql";

// Lots of mutations made the GUI very sluggish. Solved with web workers!! Hurray, new hammer!
// https://www.smashingmagazine.com/2020/10/tasks-react-app-web-workers/

// Maybe try this at some point?
// https://github.com/dai-shi/react-hooks-worker

declare const self: Worker;
export default {} as typeof Worker & { new (): Worker };

console.log('[EventWorker] Running.');

// Couldn't import document from the generated file. Got parse errors. Ouch.
// Let the event mutation remove the previous hearbeats and be it's own cleaner.
const mutation = gql`
mutation submitGameEvents(
  $gameEvents: [game_events_insert_input!]!,
  $gameSessionId: Int,
  $sourceClientId: Int,
) {
  delete_game_events(
    where: {
      type: {_eq: "heartbeat"}
      game_session_id: {_eq: $gameSessionId},
      source_client_id: {_eq: $sourceClientId}
    }
  ) {
    affected_rows
  }
  insert_game_events(objects: $gameEvents) {
    returning {
      ...GameEvent
    }
  }

}

fragment GameEvent on game_events {
  id
  game_session_id
  source_client_id
  type
  target_tick
  trigger_tick
  payload
}
`;

self.addEventListener('message', (event: MessageEvent): void => {
  //console.log('[EventWorker] Incoming message from main thread:', event.data);
  const gameEvents: GameEventFragment[] = JSON.parse(event.data);
  gameEvents.forEach((ge) => {
    if(ge.type !== "heartbeat") {
      console.log('[EventWorker] Incoming event from main thread:', event.data);
    }
  });
  client.mutate({
    mutation,
    variables: { gameEvents },
  }).then((res) => {

  }).catch((err) => {
    console.error("Failed to submit events: ", err);
  });
/*  fetch("http://localhost:8080/v1/graphql", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables: { gameEvents },
    })
  }).then((res) => {

  }).catch((err) => {
    console.error("Failed to submit events: ", err);
  });*/

/*  submitGameEventsMutation({ variables: { gameEvents }}).then(() => {

  }).catch((err) => {

  });*/
});