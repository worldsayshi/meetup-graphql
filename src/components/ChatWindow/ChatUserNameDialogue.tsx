import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField
} from "@material-ui/core";
import {Field, Form, Formik} from "formik";
import React from "react";

export function UserNameDialogue(props: { user: string | null, setUser: (user: string) => void }) {

  return (
    <Dialog open={!props.user}>
      <Formik initialValues={{user: ""}} onSubmit={(values) => props.setUser(values.user)} >
        {({
            values,
          }) =>
          <Form>
            <DialogTitle>
              Welcome to this simple chat app!
            </DialogTitle>
            <DialogContent>
              <p>What do you want to call yourself?</p>
              <Field
                name="user"
                value={values.user}
              >
                {({
                    // @ts-ignore
                    field,
                  }) => <TextField fullWidth variant="outlined" size="small" label="Username" {...field}/>}
              </Field>

            </DialogContent>
            <DialogActions>
              <Button fullWidth type="submit">
                Set
              </Button>
            </DialogActions>
          </Form>
        }
      </Formik>
    </Dialog>
  );
}