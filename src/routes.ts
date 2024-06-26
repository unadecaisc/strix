import Config from "./lib/pages/Configuration.svelte";
import Home from "./lib/pages/Home.svelte";
import Login from "./lib/pages/Login.svelte";

export type RouterType = {
  path: string;
  component: any;
  authRequired?: boolean;
};

const routes: RouterType[] = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/configuraciones",
    component: Config,
    authRequired: true,
  },
  {
    path: "/login",
    component: Login,
  },
];

export default routes;
