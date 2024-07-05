<script lang="ts">
  import GetMalingList from "./lib/components/getMaling-list.svelte";
  import { Link, Route, Router } from "svelte-routing";
  import Layout from "./lib/components/Layout.svelte";
  import routes from "./routes";
  import ProtectedRoute from "$lib/components/ProtectedRoute.svelte";
  import { onMount } from "svelte";
  import { userStore } from "./stores/user.store";
  import { get } from "svelte/store";

  let url = "";

  onMount(async () => {
    console.log("onMount");
    const user = get(userStore);
    console.log(user);
  });
</script>

<Router {url}>
  <Layout>
    {#each routes as { component, path, authRequired }}
      {#if authRequired}
        <Route {path} let:params>
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
  </Layout>
</Router>
