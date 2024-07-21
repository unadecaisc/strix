import Config from "./lib/pages/Configuration.svelte";
import Home from "./lib/pages/Home.svelte";
import Login from "./lib/pages/Login.svelte";

export type RouterType = {
  path: string;
  component: any;
  isProtected?: boolean;
};

const routes: RouterType[] = [
  {
    path: "/",
    component: Home,
    isProtected: true,
  },
  {
    path: "/configuraciones",
    component: Config,
    isProtected: true,
  },
  // {
  //   path: "/login",
  //   component: Login,
  //   isProtected: false,
  // },
];

export default routes;
