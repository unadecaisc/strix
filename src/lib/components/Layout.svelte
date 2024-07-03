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

  const breadCrumItems: BreadCrumItemType[] = [
    { title: "Home", path: "/" },
    { title: "Config", path: "/Config" },
  ];

  function handleMenu(path: string) {
    navigate(path);
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
      <BreadCrumb items={breadCrumItems}></BreadCrumb>
    </div>
    <Button color="light" class="h-10">
      <BarsOutline class="w-5 h-5 pt-1" /> Paquito fernandez
    </Button>

    <Dropdown>
      <DropdownItem class="text-red-500">cerrar sesion</DropdownItem>
    </Dropdown>
  </div>
  <slot />
</div>

<style>
  :global(body) {
    background: #eaf1fb;
  }
</style>
