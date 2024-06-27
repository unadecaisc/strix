<script lang="ts">
  import { Link, Route, Router } from "svelte-routing";
  import routes from "./routes";
  import BreadCrumb from "./lib/components/BreadCrumb.svelte";
  import type { BreadCrumItemType } from "./lib/components/types";
  let url = "";

  const breadCrumItems: BreadCrumItemType[] = [
    { title: "Home", path: "/", isHome: true },
    { title: "Config", path: "/Config" },
  ];
</script>

<BreadCrumb items={breadCrumItems}></BreadCrumb>

<Router {url}>
  <nav>
    <Link to="/">Home</Link>
    <Link to="/Config">Configuraciones</Link>
  </nav>
  <div>
    <Router {url}>
      {#each routes as { component, path }}
        <Route {path} {component}></Route>
      {/each}
    </Router>
  </div>
</Router>
