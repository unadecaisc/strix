<script lang="ts">
  import { Link, Route, Router } from "svelte-routing";
  import routes from "./routes";
  import Login from "./components/Login.svelte";
  let url = "";
</script>

<Login></Login>

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
