<script lang="ts">
  import { Button, Modal, Label, Input } from "flowbite-svelte";
  import { createPrice } from "../services/pricing";

  let formModal = false;
  let price = 0.0;
  let active = true; // Default to active

  async function handleSubmit(event: Event) {
    event.preventDefault();
    const target = event.target as HTMLFormElement;
    const newPrice: Partial<Pricing> = {
      price: parseFloat(target.precios.value),
      active: active,
    };
    const result = await createPrice(newPrice);
    if (result) {
      alert("Price created successfully");
      formModal = false;
    } else {
      alert("Error creating price");
    }
  }
</script>

<Button color="green" on:click={() => (formModal = true)}>Form modal</Button>

<Modal bind:open={formModal} size="xs" autoclose={false} class="w-full">
  <form class="flex flex-col space-y-6" on:submit={handleSubmit}>
    <h3
      class="mb-4 text-xl font-medium text-center text-gray-900 dark:text-white"
    >
      Precios
    </h3>

    <Label class="space-y-2">
      <span>Precios</span>
      <Input type="number" name="precios" required />
    </Label>
    <Label class="space-y-2">
      <span>Activo</span><br />
      <input type="radio" bind:group={active} value={true} /> Activo
      <input type="radio" bind:group={active} value={false} /> Desactivado
    </Label>
    <div class="flex justify-center">
      <Button color="green" type="submit" class="w-full">Aceptar</Button>
    </div>
  </form>
</Modal>
