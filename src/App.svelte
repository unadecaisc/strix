<script lang="ts">
  import { Link, Route, Router } from "svelte-routing";
  import routes from "./routes";
  let url = "";
</script>

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
