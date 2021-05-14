import {useState} from "react";
import {Grid, makeStyles, Paper, Typography} from "@material-ui/core";
import {TodoInput} from "./TodoInput";
import {Todo} from "./types";


const useStyles = makeStyles((theme) => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
}));


export const TodoList = () => {
  const classes = useStyles();
  const [todos, setTodos] = useState<Todo[]>([]);

  function addTodo(newTodo: Todo) {
    setTodos([newTodo, ...todos]);
  }
  return (
    <main className={classes.layout}>
      <Paper className={classes.paper}>
        <Typography component="h1" variant="h4" align="center">
          Todos
        </Typography>
        <TodoInput addToList={addTodo} />
        {todos.map((todo) => (
          <Grid
            xs={12}
            item
          >
            <Paper elevation={2} className={classes.paper}>
              <span >{todo.title}</span>
            </Paper>
          </Grid>
        ))}
      </Paper>
    </main>
  );
};