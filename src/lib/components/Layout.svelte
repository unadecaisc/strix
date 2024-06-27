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

  const breadCrumItems: BreadCrumItemType[] = [
    { title: "Home", path: "/", isHome: true },
    { title: "Config", path: "/Config" },
  ];
</script>

<div class="h-screen px-8 pt-4">
  <div class="flex justify-between items-center">
    <div>
      <Button color="light" class="h-10">
        <BarsOutline class="w-5 h-5 pt-1" /> Menu
      </Button>

      <Dropdown>
        <DropdownItem>Configuraciones</DropdownItem>
        <DropdownItem>Solicitudes</DropdownItem>
        <DropdownItem>Horas beca</DropdownItem>
        <DropdownItem>Reportes</DropdownItem>
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

  <div class="mt-4 px-4 py-4 bg-white rounded-lg">
    <slot name="tabs">tabs not provided...</slot>
  </div>

  <div class="!h-[80%] mt-4 px-4 py-4 bg-white rounded-lg">
    <slot name="content">Content not provided...</slot>
  </div>
</div>

<style>
  :global(body) {
    background: rgba(234, 241, 251, 1);
  }
</style>
