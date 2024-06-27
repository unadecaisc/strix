<script lang="ts">
  import { Link, Route, Router } from "svelte-routing";
  import BreadCrumb from "./lib/components/BreadCrumb.svelte";
  import type { BreadCrumItemType } from "./lib/components/types";
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
  
  const breadCrumItems: BreadCrumItemType[] = [
    { title: "Home", path: "/", isHome: true },
    { title: "Config", path: "/Config" },
  ];

</script>

<BreadCrumb items={breadCrumItems}></BreadCrumb>

<Router {url}>
  <div class="container mx-auto mt-8">
    <Router {url}>
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
    </Router>
  </div>
</Router>
