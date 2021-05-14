import {FormEvent, useState} from "react";
import {Button, Grid, makeStyles, TextField} from "@material-ui/core";
import {Todo} from "./types";

export function TodoInput(props: { addToList: (newTodo: Todo) => void }) {

  const [value, setValue] = useState<string>();
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    e.stopPropagation();
    if(value) {
      props.addToList({
        title: value,
      });
    }
  }
  return (
    <form onSubmit={handleSubmit} style={{ display: "flex" }}>
      <Grid container spacing={4}>
        <Grid item>
          <TextField
            style={{ width: "90%" }}
            value={value}
            onChange={({ target: { value }}) => {
              setValue(value);
            }}
          />
        </Grid>
        <Grid item>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ width: "10%" }}
          >
            Add
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}