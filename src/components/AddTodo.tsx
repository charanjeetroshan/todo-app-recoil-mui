import { useRecoilState } from "recoil";
import { todoState } from "../contexts/TodoState";
import { useEffect, useState } from "react";

function AddTodo() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useRecoilState(todoState);

  const handleSubmitTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!todo) return;
    setTodos((todos) => [
      ...todos,
      { id: crypto.randomUUID(), title: todo, isCompleted: false },
    ]);
  };

  useEffect(() => {
    const todosFromLocalStorage = JSON.parse(localStorage.getItem("todos") ?? "{}");
    if (Array.isArray(todosFromLocalStorage) && todosFromLocalStorage.length) {
      setTodos(todosFromLocalStorage);
    }
  }, [setTodos]);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <form onSubmit={handleSubmitTodo}>
      <input type="text" value={todo} onChange={(e) => setTodo(e.target.value)} />
      <br />
      <button type="submit">Add Todo</button>
    </form>
  );
}

export default AddTodo;
