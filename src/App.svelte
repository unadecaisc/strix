<script lang="ts">
  import { Link, Route, Router } from "svelte-routing";
  import routes from "./routes";
  let url = "";
</script>

<Router {url}>
  <nav>
    <Link to="/">Home</Link>
    <Link to="/configuraciones">Configuraciones</Link>
    <Link to="/login">Login</Link>
  </nav>
  <div class="container mx-auto mt-8">
    <Router {url}>
      {#each routes as { component, path, authRequired }}
        {#if authRequired}
          <Route path={path} let:params>
            <ProtectedRoute {component} />
          </Route>
        {:else}
          <Route {path} {component} />
        {/if}
      {/each}
      <!-- Ruta para manejar 404 -->
      <Route path="*">
        <h1 class="text-center text-2xl font-semibold">404 - Page Not Found</h1>
      </Route>
    </Router>
  </div>
</Router>
