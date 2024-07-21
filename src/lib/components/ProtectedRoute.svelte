<script lang="ts">
  import { onMount } from "svelte";
  import { get } from "svelte/store";

  import { isAuthenticated } from "../../stores";

  $: isAuth = get(isAuthenticated);

  onMount(() => {
    if (!isAuth) {
      window.location.replace("/login");
    }
  });
</script>

{#if isAuth}
  <slot />
{/if}
