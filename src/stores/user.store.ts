import { writable } from "svelte/store";
import { logoutUser } from "../lib/services/auth.service";
import { store } from "./store";
import { getUser } from "../lib/services";

export type User = {
  firebaseUser?: string | null;
  [key: string]: any;
};

const initialUser: User = {
  firebaseUser: localStorage.getItem("uuid"),
};
const userStore = store<User>(writable<User>(initialUser));

export { userStore };
