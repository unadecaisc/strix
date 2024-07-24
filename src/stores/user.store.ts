import { writable } from "svelte/store";
import { store } from "./store";
import type { User } from "../lib/types";

function getUserFromSessionStorage() {
  try {
    const user = sessionStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  } catch (error) {
    return null;
  }
}

const userStore = store<User | null>(
  writable<User | null>(getUserFromSessionStorage()),
);

export { userStore };
