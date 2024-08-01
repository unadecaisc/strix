<script lang="ts">
  import {
    Button,
    Dropdown,
    DropdownItem,
    Breadcrumb,
    BreadcrumbItem,
  } from "flowbite-svelte";

  import { BarsOutline } from "flowbite-svelte-icons";
  import BreadCrumb from "./BreadCrumb.svelte";
  import { type BreadCrumItemType } from "./types";
  import { navigate } from "svelte-routing";
  import { logoutUser } from "../services/auth.service";
  import { userStore } from "../../stores/user.store";
  import { get } from "svelte/store";
  import { navigation } from "../../stores/navigation.store";

  const user = get(userStore);

  async function handleLogout() {
    await logoutUser();
    window.location.reload();
  }
</script>

<div class="h-screen px-8 pt-4">
  <div class="flex justify-between items-center">
    <div>
      <Button color="light" class="h-10">
        <BarsOutline class="w-5 h-5 pt-1" /> Menu
      </Button>

      <Dropdown>
        <DropdownItem href="/configuraciones">Configuraciones</DropdownItem>
        <DropdownItem href="/solicitudes">Solicitudes</DropdownItem>
        <DropdownItem href="/horas-beca">Horas beca</DropdownItem>
        <DropdownItem href="/reportes">Reportes</DropdownItem>
      </Dropdown>
    </div>
    <div class="grow mx-2">
      <BreadCrumb items={$navigation}></BreadCrumb>
    </div>
    <Button color="light" class="h-10">
      <BarsOutline class="w-5 h-5 pt-1" />
      {user?.name}
    </Button>

    <Dropdown>
      <DropdownItem class="text-red-500" on:click={handleLogout}
        >cerrar sesion</DropdownItem
      >
    </Dropdown>
  </div>
  <slot />
</div>

<style>
  :global(body) {
    background: #eaf1fb;
  }
</style>
