import {StrategyWindow} from './StrategyWindow';
import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client";
import React from 'react';
import {ThemeWrapper} from "../common/ThemeWrapper";
import {BrowserRouter as Router, Route} from "react-router-dom";



const client = new ApolloClient({
  uri: 'http://localhost:8080/v1/graphql',
  cache: new InMemoryCache()
});



export default () => {


  return (
    <ApolloProvider client={client}>
      <Router>
        <ThemeWrapper>
          <div style={{
            width: "100%",
            height: "650px",
          }}>
            <Route path="/game/:gameSessionId">
              <StrategyWindow />
            </Route>
            <Route path="/">
              <div>TODO: Game Session select/create view</div>
            </Route>
          </div>
        </ThemeWrapper>
      </Router>
    </ApolloProvider>
  );
}