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
    type User as FirebaseUser,
  } from "firebase/auth";
  import { getAuthInstance, getUser } from "./lib/services";
  import { get } from "svelte/store";
  import { isAuthenticated } from "./stores";
  import { onMount } from "svelte";
  import { userStore } from "./stores/user.store";
  import { Spinner } from "flowbite-svelte";
  import type { User } from "./lib/types";

  let url = "";
  let user: User | null = get(userStore);
  let isAuth: boolean = get(isAuthenticated);
  let isLoading = false;
  function clearAndRedirect() {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/");
  }
  async function syncData(firebaseUser?: FirebaseUser | null) {
    isLoading = true;
    try {
      if (firebaseUser) {
        const token = await firebaseUser.getIdToken();
        localStorage.setItem("uuid", firebaseUser.uid);
        localStorage.setItem("token", token);
        isAuthenticated.set(true);
      }
      if (!user) {
        const user = await getUser(localStorage.getItem("uuid") ?? "");
        userStore.set(user);
      }
    } catch (error) {
      console.error(error);
      clearAndRedirect();
    }
    isLoading = false;
  }
  onAuthStateChanged(
    getAuthInstance(),
    (firebaseUser) => {
      setPersistence(getAuthInstance(), browserSessionPersistence);

      syncData(firebaseUser).then(() => {});
    },
    () => {
      clearAndRedirect();
    },
  );

  onMount(async () => {
    if (!isAuth) {
      navigate("/login");
    }
  });
</script>

{#if isLoading}
  <div class="flex justify-center items-center h-screen">
    <Spinner />
  </div>
{:else}
  <Router {url} viewtransition={() => ({ fn: "fade", duration: 500 })}>
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
          <h1 class="text-center text-2xl font-semibold">
            404 - Page Not Found
          </h1>
        </Route>
      </Layout>
    {/if}
  </Router>
{/if}
