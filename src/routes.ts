import Config from "./lib/pages/Configuration.svelte";
import Home from "./lib/pages/Home.svelte";

export type RouterType = {
  path: string;
  component: any;
};

const routes: RouterType[] = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/configuraciones",
    component: Config,
  },
];
export default routes;
