import { atom } from "recoil";
import { Todo } from "../types";

export const todoState = atom<Todo[]>({
  key: "todoState",
  default: [],
});

export const todoEditingState = atom({
  key: "editingState",
  default: false,
});

export const todoToEditState = atom({
  key: "todoToEditState",
  default: "",
});

export const isTodoListLoading = atom({
  key: "isTodoListLoading",
  default: false,
});
