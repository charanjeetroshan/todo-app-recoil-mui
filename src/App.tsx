import { Container, Stack, Typography, styled } from "@mui/material";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";

const StyledContainer = styled(Container)({
  width: "100%",
  maxWidth: "1280px",
  paddingBlock: "2rem",
  margin: "0 auto",
  textAlign: "center",
});

function App() {
  return (
    <StyledContainer>
      <Stack spacing={3}>
        <Typography variant="h1" fontSize="3rem">
          Todos App
        </Typography>
        <AddTodo />
        <TodoList />
      </Stack>
    </StyledContainer>
  );
}

export default App;
