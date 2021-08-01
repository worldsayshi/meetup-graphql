import {StrategyWindow} from './StrategyWindow';
import {ApolloProvider} from "@apollo/client";
import React from 'react';
import {ThemeWrapper} from "../common/ThemeWrapper";
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import {useGameLobbyQuery} from "../../generated/graphql";
import {Box, CircularProgress, Container, List, ListItem,} from "@material-ui/core";
import {client} from "./client";


const LinkItem = ({ id, uuid }: { id: number, uuid: string }) => {
  // why: https://material-ui.com/guides/composition/#caveat-with-inlining

  const CustomLink = React.forwardRef((linkProps, ref) => (
    <Link to={`/game/${uuid}`}>Game session {id}</Link>
  ));

  return <ListItem key={id} button component={CustomLink} />;
}

function SessionSelection() {
  const { data } = useGameLobbyQuery();
  return data ? <Container maxWidth="sm">
    <Box my={4}>
      <List component="nav" aria-label="main mailbox folders">
        {data.game_sessions.map(LinkItem)}
      </List>
    </Box>
  </Container>: <CircularProgress />;
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
                <StrategyWindow />
              </Route>
              <Route path="/">
                <SessionSelection />
              </Route>
            </Switch>
          </div>
        </ThemeWrapper>
      </Router>
    </ApolloProvider>
  );
}

export default StrategyWindowFixture;