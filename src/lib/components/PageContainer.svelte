<script lang="ts">
  import { Tabs, TabItem } from "flowbite-svelte";
  import type { PageConfigType } from "./types";
  import { onMount } from "svelte";
  import { navigation, type LinkType } from "../../stores/navigation.store";
  import { updateNavigation } from "../actions/navigationt";

  export let tabs: PageConfigType[] = [];
  export let link: LinkType = { title: "", path: "" };
  onMount(() => {});

  function updateSection(node: HTMLElement, { title }: { title: string }) {
    updateNavigation(node, { title }, link);
  }
</script>

<Tabs
  tabStyle="underline"
  activeClasses="p-4 text-primary-600 bg-gray-100 rounded-t-lg dark:bg-gray-800 dark:text-primary-500"
  class="mt-4 bg-white rounded-lg"
  contentClass="min-w-full  w-full  container m-0 bg-white p-4 rounded-lg dark:bg-gray-800 mt-4 transition-all duration-300 "
>
  {#each tabs as { title, component, open }}
    <TabItem {open} {title}>
      <div use:updateSection={{ title }}>
        <svelte:component this={component} class="w-full" />
      </div>
    </TabItem>
  {/each}
</Tabs>
