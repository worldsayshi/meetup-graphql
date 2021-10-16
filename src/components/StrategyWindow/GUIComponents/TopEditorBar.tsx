import {AppBar, IconButton, Toolbar} from "@material-ui/core";
import PanoramaFishEyeIcon from '@material-ui/icons/PanoramaFishEye';
import LinkIcon from '@material-ui/icons/Link';

import OpenWithIcon from '@material-ui/icons/OpenWith';
import {useSceneContext} from "../SceneState/SceneContext";

export function TopEditorBar() {
  const { state: sceneState, dispatchLocalAction } = useSceneContext();

  return <AppBar position="static">
    <Toolbar>
      <IconButton edge="start" color="inherit" aria-label="play" onClick={() => {
        dispatchLocalAction({ type: "set_action_mode", actionMode: "AddNode" });
      }}>
        <PanoramaFishEyeIcon />
      </IconButton>
      <IconButton edge="start" color="inherit" aria-label="play" onClick={() => {
        console.log("Click")
      }}>
        <LinkIcon />
      </IconButton>
      <IconButton edge="start" color="inherit" aria-label="play" onClick={() => {
        console.log("Click")
      }}>
        <OpenWithIcon />
      </IconButton>

      {/*
        - Tools (symbol, shortcut)
          - adding nodes (circle, n)
          - connecting nodes (line, c)
          - moving nodes (pointer, p)

        - Additions to game simulation:
          - Shortcut key handing
      */}
    </Toolbar>
  </AppBar>;
}
