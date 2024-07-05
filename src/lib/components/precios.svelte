<script lang="ts">
  import api from "$lib/services/api-config";
  import { Button, Modal, Label, Input } from "flowbite-svelte";

  let formModal = false;
  let id = "";
  let precios = "";
  let activo = "false";
  let crear = "";
  let actualizar = "";
  let error: string | null = null;

  async function handleSubmit(event: Event) {
    event.preventDefault();
    try {
      const response = await api.post("/endpoint", {
        id,
        precios,
        activo,
        crear,
        actualizar,
      });
      console.log("Response", response.data);
      formModal = false;
    } catch (err) {
      console.error(err);
      error = "Failed to submit data";
    }
  }
</script>

<Button color="green" on:click={() => (formModal = true)}>Form modal</Button>

<Modal bind:open={formModal} size="xs" autoclose={false} class="w-full">
  <form class="flex flex-col space-y-6" action="#">
    <h3
      class="mb-4 text-xl font-medium text-center text-gray-900 dark:text-white"
    >
      Precios
    </h3>
    <Label class="space-y-2">
      <span>ID</span>
      <Input type="text" name="ID" required />
    </Label>
    <Label class="space-y-2">
      <span>Precios </span>
      <Input type="text" name="precios" required />
    </Label>
    <Label class="space-y-2">
      <span>Activo </span>
      <Input type="text" name="activo" required />
    </Label>
    <Label class="space-y-2">
      <span>CrearAt </span>
      <Input name="crear" required />
    </Label>
    <Label class="space-y-2">
      <span>ActualizarAt </span>
      <Input name="actualizar" required />
    </Label>

    <div class="flex justify-center">
      <Button color="green" type="submit" class="w-full">Aceptar</Button>
    </div>
  </form>
</Modal>
