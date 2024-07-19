<script lang="ts">
  import { navigate, Route, Router } from "svelte-routing";
  import Layout from "./lib/components/Layout.svelte";
  import routes from "./routes";
  import ProtectedRoute from "$lib/components/ProtectedRoute.svelte";
  import Login from "./lib/pages/Login.svelte";
  import {
    browserSessionPersistence,
    onAuthStateChanged,
    setPersistence,
  } from "firebase/auth";
  import { getAuthInstance, getUser } from "./lib/services";
  import { get } from "svelte/store";
  import { isAuthenticated } from "./stores";
  import { onMount } from "svelte";
  import { userStore } from "./stores/user.store";
  import FormularioPrecio from "$lib/components/formularioPrecio.svelte";

  let url = "";
  const user = get(userStore);
  const isAuth = get(isAuthenticated);

  console.log("◉ ▶ isAuth:", isAuth);

  function setUserData() {
    if (!user.user) {
      getUser(localStorage.getItem("uuid") ?? "").then((user) => {
        userStore.update((state) => {
          return { ...state, user };
        });
      });
    }
  }

  onAuthStateChanged(
    getAuthInstance(),
    (firebaseUser) => {
      setPersistence(getAuthInstance(), browserSessionPersistence);
      if (firebaseUser) {
        localStorage.setItem("uuid", firebaseUser.uid);
      }
    },
    () => {
      localStorage.removeItem("token");
    },
  );

  onMount(() => {
    if (!isAuth) {
      navigate("/login");
    }
    setUserData();
  });
</script>

<Router {url}>
  <Route path="/login">
    <Login />
  </Route>
  {#if isAuth}
    <Layout>
      {#each routes as { component, path }}
        <ProtectedRoute>
          <Route {path}><svelte:component this={component} /></Route>
        </ProtectedRoute>
      {/each}
      <Route path="*">
        <h1 class="text-center text-2xl font-semibold">404 - Page Not Found</h1>
      </Route>
    </Layout>
  {/if}
</Router>
