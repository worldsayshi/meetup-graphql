

import { split, HttpLink } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';

const httpLink = new HttpLink({
  uri: 'http://localhost:8080/v1/graphql'
});

const wsLink = new WebSocketLink({
  uri: 'ws://localhost:8080/v1/graphql',
  options: {
    reconnect: true
  }
});

// The split function takes three parameters:
//
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
export const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (

      true
      //definition.kind === 'OperationDefinition' &&
      //definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);