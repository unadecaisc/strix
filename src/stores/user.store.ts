import { writable } from "svelte/store";
import { authenticateUser } from "../lib/services/auth.service";

export type User = {
  uuid: string;
  email: string;
  name: string;
  isLogged: boolean;
  rol: string | null;
};

const initialUser: User = {
  uuid: "",
  email: "",
  name: "",
  isLogged: false,
  rol: null,
};

export const user = writable<User>(initialUser);
