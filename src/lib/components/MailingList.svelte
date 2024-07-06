<script lang="ts">
  import { Button, Modal, Label, Input } from "flowbite-svelte";
  import { createMailingListItem } from "$lib/services/mailingList.service";

  let formModal = false;
  let formData = {
    name: "",
    email: "",
    active: true,
  };
  let successMessage = "";

  async function handleClick() {
    try {
      const response = await createMailingListItem(formData);
      console.log("Exito", response);
      successMessage = "Guardado";
      formData = {
        name: "",
        email: "",
        active: true,
      };
    } catch (error) {
      console.error("Error al crear el elemento de la lista de correo", error);
    }
  }
</script>

<Button
  on:click={() => {
    formModal = true;
    successMessage = "";
  }}>Add</Button
>

<Modal bind:open={formModal} size="xs" autoclose={false} class="w-full">
  <form class="flex flex-col space-y-6" on:submit|preventDefault={handleClick}>
    <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">
      Add to Mailing List
    </h3>
    <Label class="space-y-2">
      <span>Name</span>
      <Input
        type="text"
        name="name"
        placeholder="Name"
        required
        bind:value={formData.name}
      />
    </Label>
    <Label class="space-y-2">
      <span>Email</span>
      <Input
        type="email"
        name="email"
        placeholder="Name@gmail.com"
        required
        bind:value={formData.email}
      />
    </Label>
    <div>
      <Button color="green" type="submit" class="w-full">Save</Button>
    </div>
    {#if successMessage}
      <p class="mt-4 text-green-500">{successMessage}</p>
    {/if}
  </form>
</Modal>
