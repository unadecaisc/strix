<script>
  import { onMount } from "svelte";
  import {
    Button,
    Modal,
    Label,
    Input,
    Dropdown,
    DropdownItem,
  } from "flowbite-svelte";
  import {
    ChevronDownOutline,
    CloseCircleOutline,
  } from "flowbite-svelte-icons";

  let defaultModal = false;
  let dropdownOpen = false;
  let name = "";
  /**
   * @type {any[]}
   */
  let selectedOptions = [];
  let nameError = "";
  /**
   * @type {any[]}
   */
  let roles = [];

  const API_URL = import.meta.env.VITE_API_URL; // Access VITE_API_URL from environment variables

  async function fetchRoles() {
    try {
      const response = await fetch(`${API_URL}/roles`); // Fetch roles from VITE_API_URL
      if (!response.ok) {
        throw new Error("Failed to fetch roles");
      }
      const { data } = await response.json();
      roles = data; // Assign roles data to roles array
    } catch (error) {
      console.error("Error fetching roles:", error);
      // Handle error gracefully
    }
  }

  onMount(fetchRoles);

  function handleSelect(option) {
    if (!selectedOptions.includes(option)) {
      selectedOptions = [...selectedOptions, option];
    }
  }

  function removeOption(option) {
    selectedOptions = selectedOptions.filter((item) => item !== option);
  }

  function handleGuardar() {
    if (!name.trim()) {
      nameError = "Por favor, ingrese un nombre.";
      return;
    }
    nameError = "";
    alert(`Nombre: ${name}, Permisos: ${selectedOptions.join(", ")}`);
    defaultModal = false;
    resetForm();
  }

  function resetForm() {
    name = "";
    selectedOptions = [];
    nameError = "";
  }

  function handleClickOutside(event) {
    if (!event.target.closest(".dropdown-container")) {
      dropdownOpen = false;
    }
  }
</script>

<svelte:window on:click={handleClickOutside} />

<Button on:click={() => (defaultModal = true)}>Agregar Roles</Button>

<Modal title="Agregar Rol" bind:open={defaultModal} on:close={resetForm}>
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
    <div class="dropdown-container relative">
      <Button on:click={() => (dropdownOpen = !dropdownOpen)}>
        Seleccionar permisos
        <ChevronDownOutline class="w-6 h-6 ms-2 text-white dark:text-white" />
      </Button>
      {#if dropdownOpen}
        <Dropdown class="w-full">
          {#each roles as role}
            <DropdownItem on:click={() => handleSelect(role.name)}>
              {role.name}
            </DropdownItem>
          {/each}
        </Dropdown>
      {/if}
    </div>
  </div>
  <svelte:fragment slot="footer">
    <div class="mb-4">
      <h3 class="mb-2 font-semibold">Permisos seleccionados:</h3>
      <ul class="flex flex-wrap gap-2">
        {#each selectedOptions as option}
          <li
            class="bg-blue-100 text-blue-800 px-2 py-1 rounded-full flex items-center"
          >
            {option}
            <button on:click={() => removeOption(option)} class="ml-2">
              <CloseCircleOutline class="w-4 h-4" />
            </button>
          </li>
        {/each}
      </ul>
    </div>
    <Button on:click={handleGuardar}>Guardar</Button>
  </svelte:fragment>
</Modal>

<style>
  :global(.dropdown-container .flowbite-dropdown) {
    position: absolute;
    top: calc(100% + 5px); /* Adjust this as needed */
    left: 0;
    width: 100%;
    z-index: 50;
  }
</style>
