import { writable } from "svelte/store";
import { authenticateUser } from "../lib/services/auth.service";
const initialUser = {
  uuid: "",
  email: "",
  name: "",
  isLogged: false,
  rol: null,
};
export const user = writable(initialUser);
//# sourceMappingURL=user.store.js.map
