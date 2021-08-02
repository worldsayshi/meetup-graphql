// import {SubmitGameEventsDocument} from "../../../generated/graphql";

import {gql} from "@apollo/client/core";
import {client} from '../client';

declare const self: Worker;
export default {} as typeof Worker & { new (): Worker };

console.log('[EventWorker] Running.');

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
  console.log('[EventWorker] Incoming message from main thread:', event.data);
  const gameEvents = JSON.parse(event.data);
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