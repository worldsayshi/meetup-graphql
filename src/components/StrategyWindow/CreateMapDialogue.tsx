import {useSnackbar} from "notistack";
import {useCreateMapMutation} from "../../generated/graphql";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField
} from "@material-ui/core";
import {Field, Form, Formik} from "formik";
import React, {useState} from "react";

export function CreateMapDialogue(props: { open: boolean, onClose: () => void }) {
  const {enqueueSnackbar, closeSnackbar} = useSnackbar();
  const [createMap] = useCreateMapMutation();
  return (
    <Dialog open={props.open}>
      <Formik initialValues={{name: "", map_scale: 100,}} onSubmit={(values) => {
        createMap({variables: values, refetchQueries: ["GameLobby"]}).then(() => {
          enqueueSnackbar('Map created!', {variant: 'success'});
          props.onClose();
        }).catch((err) => {
          enqueueSnackbar("Mutation error: " + JSON.stringify(err), {variant: 'error'});
        });
      }}>
        {({values}) => (
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

export function CreateMapButtonAndDialogue(props: {}) {
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

    <CreateMapDialogue open={open} onClose={() => setOpen(false)}/>
  </>;
}