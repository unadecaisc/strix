import { writable } from "svelte/store";

function isTokenValid() {
  const token = localStorage.getItem("token");

  return token !== null;
}

export const isAuthenticated = writable(isTokenValid());
