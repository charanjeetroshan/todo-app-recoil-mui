import { Stack, Typography } from "@mui/material";
import AddTodo from "../components/todos/AddTodo";
import TodoList from "../components/todos/TodoList";

function Home() {
  return (
    <Stack spacing={3}>
      <Typography variant="h1" fontSize="3rem">
        Your Todos
      </Typography>
      <AddTodo />
      <TodoList />
    </Stack>
  );
}

export default Home;
