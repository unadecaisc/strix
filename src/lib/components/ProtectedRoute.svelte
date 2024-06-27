<script lang="ts">
  import { onMount } from "svelte";
  import { get } from "svelte/store";
  import { navigate } from "svelte-routing";
  import { userStore } from "../../stores/user.store";

  export let component: any;

  let Component: any = null;
  const user = get(userStore);

  onMount(() => {
    if (user.firebaseUser !== null && user.firebaseUser !== undefined) {
      Component = component;
    } else {
      navigate("/login");
    }
  });

  $: if (user.firebaseUser !== null && user.firebaseUser !== undefined) {
    Component = component;
  }
</script>

{#if Component}
  <svelte:component this={Component} />
{:else}
  <p>Loading...</p>
{/if}
