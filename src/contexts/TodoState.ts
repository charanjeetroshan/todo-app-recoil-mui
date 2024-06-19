import { atom } from "recoil";
import { Todo } from "../types";

export const todoState = atom<Todo[]>({
  key: "todoState",
  default: [],
});
