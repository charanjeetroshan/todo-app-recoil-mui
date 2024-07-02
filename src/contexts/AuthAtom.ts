import { atom } from "recoil";
import { LoggedInUser } from "../types";

export const currentUserStateAtom = atom<LoggedInUser>({
  key: "userState",
  default: {},
});

export const apiLoadingStateAtom = atom({
  key: "apiLoadingState",
  default: false,
});
