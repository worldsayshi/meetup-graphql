import React from "react";
import {Link} from "react-router-dom";
import {Box, CircularProgress, Container, List, ListItem, Typography} from "@material-ui/core";
import {useGameLobbyQuery} from "../../generated/graphql";
import {CreateMapButtonAndDialogue} from "./CreateMapDialogue";

const SessionLinkItem = ({id, uuid}: { id: number, uuid: string }) => {
  // why: https://material-ui.com/guides/composition/#caveat-with-inlining

  const CustomLink = React.forwardRef((linkProps, ref) => (
    <Link to={`/game/${uuid}`}>Game session {id}</Link>
  ));

  return <ListItem key={id} button component={CustomLink}/>;
}
const MapLinkItem = ({id, name}: { id: number, name?: string | null | undefined }) => {
  // why: https://material-ui.com/guides/composition/#caveat-with-inlining

  const CustomLink = React.forwardRef((linkProps, ref) => (
    <Link to={`/map-editor/${id}`}>Map: {id} - {name}</Link>
  ));

  return <ListItem key={id} button component={CustomLink}/>;
}

export function GameLobby() {
  const {data} = useGameLobbyQuery();
  return data ? <Container maxWidth="sm">
    <Box my={4}>
      <Typography component="h3" variant="h4">
        Game Sessions
      </Typography>
      <List component="nav" aria-label="main game-sessions">
        {data.game_sessions.map(SessionLinkItem)}
      </List>
    </Box>
    <Box my={4}>
      <Typography component="h3" variant="h4">
        Maps
      </Typography>
      <List component="nav" aria-label="main maps">
        {data.maps.map(MapLinkItem)}
      </List>
      <CreateMapButtonAndDialogue/>
    </Box>
  </Container> : <CircularProgress/>;
}