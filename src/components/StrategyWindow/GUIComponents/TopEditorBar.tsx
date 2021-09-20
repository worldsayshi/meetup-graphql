import {AppBar, IconButton, Toolbar} from "@material-ui/core";
import PanoramaFishEyeIcon from '@material-ui/icons/PanoramaFishEye';
import LinkIcon from '@material-ui/icons/Link';

import OpenWithIcon from '@material-ui/icons/OpenWith';

export function TopEditorBar() {

  return <AppBar position="static">
    <Toolbar>
      <IconButton edge="start" color="inherit" aria-label="play" onClick={() => {
        console.log("Click")
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
