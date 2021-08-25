import {StrategyWindow} from './StrategyWindow';
import {ApolloProvider} from "@apollo/client";
import React, {useState} from 'react';
import {ThemeWrapper} from "../common/ThemeWrapper";
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import {useCreateMapMutation, useGameLobbyQuery} from "../../generated/graphql";
import {Field, Form, Formik} from "formik";
import { useSnackbar } from 'notistack';
import {
  Box,
  Button,
  CircularProgress,
  Container, Dialog, DialogActions, DialogContent, DialogTitle,
  List,
  ListItem, TextField,
  Typography,
} from "@material-ui/core";
import {client} from "./client";


const SessionLinkItem = ({ id, uuid }: { id: number, uuid: string }) => {
  // why: https://material-ui.com/guides/composition/#caveat-with-inlining

  const CustomLink = React.forwardRef((linkProps, ref) => (
    <Link to={`/game/${uuid}`}>Game session {id}</Link>
  ));

  return <ListItem key={id} button component={CustomLink} />;
}

const MapLinkItem = ({ id, name }: { id: number, name?: string | null | undefined }) => {
  // why: https://material-ui.com/guides/composition/#caveat-with-inlining

  const CustomLink = React.forwardRef((linkProps, ref) => (
    <Link to={`/game/${id}`}>Map: {id} - {name}</Link>
  ));

  return <ListItem key={id} button component={CustomLink} />;
}

function CreateMapDialogue(props: { open: boolean, onClose: () => void }) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [createMap] = useCreateMapMutation();
  return (
    <Dialog open={props.open}>
      <Formik initialValues={{ name: "", map_scale: 100, }} onSubmit={(values) => {
        createMap({ variables: values, refetchQueries: ["GameLobby"] }).then(() => {
          enqueueSnackbar('Map created!', { variant: 'success' });
          props.onClose();
        }).catch((err) => {
          enqueueSnackbar("Mutation error: " + JSON.stringify(err), { variant: 'error' });
        });
      }}>
        {({ values }) => (
          <Form>
            <DialogTitle>
              Create new map
            </DialogTitle>
            <DialogContent>
              <Field
                name="name"
                value={values.name}
              >
                {({
                    // @ts-ignore
                    field,
                  }) => <TextField fullWidth size="small" label="Name" {...field}/>}
              </Field>
              <TextField
                label="Map scale"
                name="map_scale"
                fullWidth
                size="small"
                value={values.map_scale}
                type="number"
                // InputLabelProps={{
                //   shrink: true,
                // }}
              />
            </DialogContent>
            <DialogActions>
              <Button fullWidth type="submit">
                Create
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
}

function CreateMapButtonAndDialogue(props: { }) {
  const [open, setOpen] = useState(false);
  return <>
    <Button
      type="submit"
      onClick={() => {
        setOpen(true);
      }}
      color="primary"
      //style={{width: "10%"}}
    >
      Create new map
    </Button>

    <CreateMapDialogue open={open} onClose={() => setOpen(false)} />
  </>;
}

function GameLobby() {
  const { data } = useGameLobbyQuery();
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
      <CreateMapButtonAndDialogue />
    </Box>
  </Container>: <CircularProgress />;
}

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