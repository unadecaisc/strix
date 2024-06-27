<script>
  import {
    Button,
    Dropdown,
    DropdownItem,
    Breadcrumb,
    BreadcrumbItem,
  } from "flowbite-svelte";

  import { BarsOutline } from "flowbite-svelte-icons";
</script>

<div class="container px-7 h-screen">
  <div class="flex justify-between items-center">
    <div>
      <Button color="light" class="h-10">
        <BarsOutline class="w-5 h-5 pt-1" /> menu
      </Button>

      <Dropdown>
        <DropdownItem>Configuraciones</DropdownItem>
        <DropdownItem>Solicitudes</DropdownItem>
        <DropdownItem>Horas beca</DropdownItem>
        <DropdownItem>Reportes</DropdownItem>
      </Dropdown>
    </div>
    <div class="grow mx-2">
      <Breadcrumb color="light" class="h-10" solid>
        <BreadcrumbItem href="/">Inicio</BreadcrumbItem>

        <BreadcrumbItem></BreadcrumbItem>
      </Breadcrumb>
    </div>
    <Button color="light" class="h-10">
      <BarsOutline class="w-5 h-5 pt-1" /> paquito fernandez
    </Button>

    <Dropdown>
      <DropdownItem class="text-red-500">cerrar sesion</DropdownItem>
    </Dropdown>
  </div>

  <div class="container mt-4 px-4 py-4 bg-white rounded-lg">
    <h1>something goes here...</h1>
  </div>

  <div class="container h-3/4 mt-4 px-4 py-4 bg-white rounded-lg">
    <h1>something goes here...</h1>
  </div>
</div>

<style>
  :global(body) {
    background: rgba(234, 241, 251, 1);
  }
</style>
