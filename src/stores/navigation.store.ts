import { writable } from "svelte/store";

export type LinkType = {
  title: string;
  path: string;
};
export const navigation = writable<LinkType[]>([
  {
    title: "Inicio",
    path: "/",
  },
]);
