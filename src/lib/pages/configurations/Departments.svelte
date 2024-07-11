<script lang="ts">
  import { Button, Heading } from "flowbite-svelte";
  import DepartmentsForm from "../../components/DepartmentsForm.svelte";
  import { PlusOutline } from "flowbite-svelte-icons";

  let formMode: "create" | "update" = "create";
  let formOpen = false;

  function handleOpenForm() {
    formOpen = true;
  }
</script>

<div class="w-screen px-4 grid gap-3">
  <div class=" grid-flow-row">
    <Heading tag="h3" class="mb-4">Configuracion de Departamentos</Heading>

    <DepartmentsForm open={formOpen} />
  </div>
  <div class="grid-flow-row">
    <Button color="primary" size="sm" on:click={handleOpenForm}
      ><PlusOutline /> Agregar</Button
    >
  </div>
</div>
