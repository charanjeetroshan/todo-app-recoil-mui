import { useRecoilValue } from "recoil";
import { todoState } from "../contexts/TodoState";

function TodoList() {
  const todos = useRecoilValue(todoState);

  return (
    <ul style={{ listStyle: "none" }}>
      {todos.length ? (
        todos.map((todo) => <li key={todo.id}>{todo.title}</li>)
      ) : (
        <div>No todos</div>
      )}
    </ul>
  );
}

export default TodoList;
