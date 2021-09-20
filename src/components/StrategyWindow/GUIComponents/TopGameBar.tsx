import React, {useContext, useState} from "react";
import {ThemeContext} from "../../common/ThemeWrapper";
import {AppBar, IconButton, Toolbar, Tooltip} from "@material-ui/core";
import PauseIcon from "@material-ui/icons/Pause";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import BrightnessHighIcon from "@material-ui/icons/BrightnessHigh";
import BrightnessLowIcon from "@material-ui/icons/BrightnessLow";
import TimerIcon from '@material-ui/icons/Timer';
import InfoIcon from '@material-ui/icons/Info';
import {useGameStateContext} from "../GameSimulator/Context";
import AssessmentIcon from '@material-ui/icons/Assessment';
import {AnalyzeDialogue} from "./AnalyzeWindow";

function AnalyzeButton() {
  const [showDebuggingPopup, setShowDebuggingPopup] = useState<boolean>(false);
  return <>
    <IconButton onClick={() => {
      setShowDebuggingPopup(true);
    }}>
      <AssessmentIcon />
    </IconButton>
    <AnalyzeDialogue
      open={showDebuggingPopup}
      onClose={() => setShowDebuggingPopup(false)}
    />
  </>;
}

export function TopGameBar() {
  const { gameState, dispatchSharedAction, gameClient } = useGameStateContext();

  const themeContext = useContext(ThemeContext);
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="play" onClick={() => {
          dispatchSharedAction({ type: "set_running", running: !gameState.running });
        }}>
          {gameState && (gameState.running ? <PauseIcon /> : <PlayArrowIcon/>)}
        </IconButton>
        <AnalyzeButton />
        {themeContext && <IconButton color="inherit" onClick={
          () => themeContext.setLightMode(!themeContext.lightMode)
        }>
          {themeContext.lightMode ? <BrightnessHighIcon /> : <BrightnessLowIcon />}
        </IconButton>}

        {gameState?.tick}
        <TimerIcon />

        <Tooltip title={"client id: "+gameClient.id}>
          <InfoIcon />
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
}