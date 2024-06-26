 <script lang="ts">
    import { onMount } from 'svelte';
    import { isAuthenticated } from './authStore';
    import { get } from 'svelte/store';
    import { navigate } from 'svelte-routing';
  
    export let component: any;
  
    let Component: any = null;
  
    onMount(() => {
      const authStatus = get(isAuthenticated);
      console.log("Authenticated status on mount:", authStatus);
      if (authStatus) {
        Component = component;
      } else {
        navigate('/login');
      }
    });
  
    $: if (get(isAuthenticated)) {
      Component = component;
    }
  </script>
  
  {#if Component}
    <svelte:component this={Component} />
  {:else}
    <p>Loading...</p>
  {/if}
  