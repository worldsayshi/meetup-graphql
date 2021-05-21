import {StrategyWindow} from './StrategyWindow';
import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client";
import React from 'react';



const client = new ApolloClient({
  uri: 'http://localhost:8080/v1/graphql',
  cache: new InMemoryCache()
});

export default () => (
  <ApolloProvider client={client}>
    <div style={{
      width: "100%",
      height: "650px",
    }}>
      <StrategyWindow />
    </div>
  </ApolloProvider>
)