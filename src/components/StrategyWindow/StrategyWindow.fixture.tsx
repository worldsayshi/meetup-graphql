import {StrategyWindow} from './StrategyWindow';
import {ApolloProvider} from "@apollo/client";
import React from 'react';
import {ThemeWrapper} from "../common/ThemeWrapper";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {client} from "./client";
import {GameLobby} from "./GameLobby";


function MapEditor() {
  return <div>TODO: Map editor</div>;
}

const StrategyWindowFixture = () => {


  return (
    <ApolloProvider client={client}>
      <Router>
        <ThemeWrapper>
          <div style={{
            width: "100%",
            height: "650px",
          }}>
            <Switch>
              <Route path="/game/:gameSessionGuid">
                <StrategyWindow/>
              </Route>
              <Route path="/map-editor/:mapId">
                <MapEditor/>
              </Route>
              <Route path="/">
                <GameLobby/>
              </Route>
            </Switch>
          </div>
        </ThemeWrapper>
      </Router>
    </ApolloProvider>
  );
}

export default StrategyWindowFixture;