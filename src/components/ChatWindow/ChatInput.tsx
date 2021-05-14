import {isMessage, Message} from "./types";
import {Formik} from "formik";
import {Button, Grid, TextField} from "@material-ui/core";
import React from "react";

export interface ChatInputProps {
  user: string | null;
  addMessage: (message: Message) => void;
}



export function ChatInput(props: ChatInputProps) {
  return (
    <Formik
      initialValues={{ user: props.user, text: '' }}
      onSubmit={(values, formikHelpers) => {
        if (isMessage(values)) {
          props.addMessage(values);
        }
        formikHelpers.setFieldValue("text", "");
      }}
    >
      {({
          values,
          handleChange,
          handleSubmit,
        }) => (
        <form onSubmit={handleSubmit}>
          <Grid container spacing={0}>
            <Grid item xs={11}>
              <TextField fullWidth variant="outlined" name="text" autoFocus={true} onChange={handleChange} value={values.text} />
            </Grid>
            <Grid item xs={1}>
              <Button disabled={!props.user} fullWidth type="submit" style={{ height: "100%" }}>
                Send
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
}