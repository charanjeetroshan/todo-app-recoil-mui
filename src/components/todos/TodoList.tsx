import { useRecoilState, useSetRecoilState } from "recoil";
import { todoEditingState, todoState, todoToEditState } from "../../contexts/TodoState";
import {
  Checkbox,
  CircularProgress,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Tooltip,
  TooltipProps,
  Typography,
  styled,
  tooltipClasses,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { Todo } from "../../types";

const StyledCheckbox = styled(Checkbox)(({ theme }) => ({
  color: theme.palette.info.main,
}));

const StyledTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.black,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.black,
    fontSize: "0.9rem",
  },
}));

function TodoList() {
  const [todos, setTodos] = useRecoilState(todoState);
  const setIsEditing = useSetRecoilState(todoEditingState);
  const setTodoToEdit = useSetRecoilState(todoToEditState);

  const toggleTodo = (todoId: string) => {
    const foundTodo = todos.find((todo) => todo.id === todoId);
    const newTodos = todos.map((todo) => {
      if (todo === foundTodo) {
        return {
          ...foundTodo,
          isCompleted: !foundTodo.isCompleted,
        };
      } else {
        return todo;
      }
    });
    setTodos(newTodos);
  };

  const deleteTodo = (todoId: string) => {
    setTodos((todos) => todos.filter((todo) => todo.id !== todoId));
  };

  function editTodo(editTodo: Todo) {
    setIsEditing(true);
    const foundTodo = todos.find((todo) => todo.id === editTodo.id);
    if (foundTodo) {
      setTodoToEdit(foundTodo.title);
    }
  }

  return (
    <List>
      {!todos.length ? (
        <CircularProgress color="info" />
      ) : todos.length ? (
        todos.map((todo) => (
          <Stack key={todo.id} direction="row" alignItems="center">
            <ListItem sx={{ paddingLeft: 0 }}>
              <ListItemButton
                onClick={() => toggleTodo(todo.id)}
                sx={{
                  paddingLeft: 0,
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.08)",
                  },
                }}
              >
                <ListItemIcon>
                  <StyledCheckbox checked={todo.isCompleted} color="info" />
                </ListItemIcon>
                <ListItemText primary={todo.title} />
              </ListItemButton>
            </ListItem>
            <Stack direction="row" alignItems="center">
              <StyledTooltip title="Edit todo" arrow>
                <IconButton
                  onClick={() => editTodo(todo)}
                  sx={{
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.08)",
                    },
                  }}
                >
                  <Edit sx={{ color: "whitesmoke" }} />
                </IconButton>
              </StyledTooltip>
              <StyledTooltip
                title="Delete todo"
                arrow
                sx={{
                  [`& .${tooltipClasses.tooltip}`]: {
                    backgroundColor: "black !important",
                  },
                }}
              >
                <IconButton
                  onClick={() => deleteTodo(todo.id)}
                  sx={{
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.08)",
                    },
                  }}
                >
                  <Delete sx={{ color: "whitesmoke" }} />
                </IconButton>
              </StyledTooltip>
            </Stack>
          </Stack>
        ))
      ) : (
        <Typography variant="h5" textAlign="center">
          No Todos yet ;)
        </Typography>
      )}
    </List>
  );
}

export default TodoList;
