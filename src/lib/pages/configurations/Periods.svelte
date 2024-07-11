<script>
  import { onMount } from "svelte";
  import { Button, Modal, Label, Input } from "flowbite-svelte";
  import { CloseCircleOutline } from "flowbite-svelte-icons";

  let defaultModal = false;
  let name = "";
  let startDate = "";
  let endDate = "";
  let nameError = "";
  let startDateError = "";
  let endDateError = "";

  function handleGuardar() {
    let valid = true;

    if (!name.trim()) {
      nameError = "Por favor, ingrese un nombre.";
      valid = false;
    } else {
      nameError = "";
    }

    if (!startDate) {
      startDateError = "Por favor, ingrese una fecha de inicio.";
      valid = false;
    } else {
      startDateError = "";
    }

    if (!endDate) {
      endDateError = "Por favor, ingrese una fecha de fin.";
      valid = false;
    } else {
      endDateError = "";
    }

    if (valid) {
      alert(
        `Nombre: ${name}, Fecha de Inicio: ${startDate}, Fecha de Fin: ${endDate}`,
      );
      defaultModal = false;
      resetForm();
    }
  }

  function resetForm() {
    name = "";
    startDate = "";
    endDate = "";
    nameError = "";
    startDateError = "";
    endDateError = "";
  }
</script>

<Button on:click={() => (defaultModal = true)}>Crear Periodo</Button>

<Modal title="Crear Periodo" bind:open={defaultModal} on:close={resetForm}>
  <div class="grid gap-4">
    <div>
      <Label for="name" class="mb-2">Nombre</Label>
      <Input
        type="text"
        id="name"
        bind:value={name}
        placeholder="Ingrese nombre"
        required
      />
      {#if nameError}
        <p class="text-red-500 text-sm mt-1">{nameError}</p>
      {/if}
    </div>
    <div>
      <Label for="start-date" class="mb-2">Fecha de Inicio</Label>
      <Input type="date" id="start-date" bind:value={startDate} required />
      {#if startDateError}
        <p class="text-red-500 text-sm mt-1">{startDateError}</p>
      {/if}
    </div>
    <div>
      <Label for="end-date" class="mb-2">Fecha de Fin</Label>
      <Input type="date" id="end-date" bind:value={endDate} required />
      {#if endDateError}
        <p class="text-red-500 text-sm mt-1">{endDateError}</p>
      {/if}
    </div>
  </div>
  <svelte:fragment slot="footer">
    <Button on:click={handleGuardar}>Guardar</Button>
  </svelte:fragment>
</Modal>

<style>
  :global(.modal-container .flowbite-modal) {
    position: fixed;
    inset: 0;
    z-index: 50;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
  }
</style>
