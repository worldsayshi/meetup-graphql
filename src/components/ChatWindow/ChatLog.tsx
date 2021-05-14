import React from "react";
import {makeStyles} from "@material-ui/core";
import {Message} from "./types";
const useStyles = makeStyles((theme) => ({
  chatLog: {
    width: "100%",
    height: "100%",
    border: "1px inset #ccc",
    backgroundColor: "white",
    ///font: "small courier, monospace black",
    fontFamily: "monospace",
  },
  userGutter: {
    // fontWight: "bolder",
  },
}));

export function ChatLog(props: { messages: Message[] }) {
  const classes = useStyles();
  return (
    <>
      <div className={classes.chatLog} >
        {props.messages.map(({user, text}) =>
          <>{`<${user}> ${text}`}<br/></>
        )}
      </div>
    </>
  );
}