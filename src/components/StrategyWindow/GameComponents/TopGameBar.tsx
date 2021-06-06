import React, {useContext} from "react";
import {ThemeContext} from "../../common/ThemeWrapper";
import {AppBar, IconButton, Toolbar} from "@material-ui/core";
import PauseIcon from "@material-ui/icons/Pause";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import BrightnessHighIcon from "@material-ui/icons/BrightnessHigh";
import BrightnessLowIcon from "@material-ui/icons/BrightnessLow";
import TimerIcon from '@material-ui/icons/Timer';
import {GameState} from "./GameSimulator";

export function TopGameBar() {
  const gameState = useContext(GameState);
  const themeContext = useContext(ThemeContext);
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="play" onClick={() => gameState?.toggleRunning()}>
          {gameState && (gameState.running ? <PauseIcon /> : <PlayArrowIcon/>)}
        </IconButton>
        {themeContext && <IconButton color="inherit"  onClick={() => themeContext.setLightMode(!themeContext.lightMode)}>
          {themeContext.lightMode ? <BrightnessHighIcon /> : <BrightnessLowIcon />}
        </IconButton>}
        {gameState?.ticks}
        <TimerIcon />
      </Toolbar>
    </AppBar>
  );
}