<script lang="ts">
  import { Breadcrumb, BreadcrumbItem } from "flowbite-svelte";
  import type { BreadCrumItemType } from "./types";

  export let items: BreadCrumItemType[] = [];
</script>

<Breadcrumb
  aria-label="Solid background breadcrumb example"
  class="bg-gray-50 py-3 px-5 dark:bg-gray-900"
>
  {#each items as item}
    <BreadcrumbItem href={item.path} home={item.isHome}
      >{item.title}</BreadcrumbItem
    >
  {/each}
</Breadcrumb>
