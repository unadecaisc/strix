<script lang="ts">
  import {
    Button,
    Input,
    Label,
    Modal,
    Select,
    Spinner,
  } from "flowbite-svelte";
  import type { Department, Pricing } from "../types";

  import { createEventDispatcher, onMount } from "svelte";
  import { getPricing } from "../services/pricing.service";
  import {
    createDepartment,
    updateDepartment,
  } from "../services/department.service";

  const dispatch = createEventDispatcher();
  export let open = false;
  export let formMode: "create" | "update" = "create";
  export let data: Department = {
    name: "",
    code: "",
    pricing: 0,
  };

  let isLoading = false;

  const title = formMode ? "Crear Departamento" : "Actualizar Departamento";

  function close() {
    dispatch("close");
    open = false;
    isLoading = false;
  }
  function handleSubmit() {
    isLoading = true;
    if (formMode === "create") {
      console.log(data);

      createDepartment({
        name: data.name,
        code: data.code,
        pricing: data.pricing,
      }).then((res) => {
        close();
      });
      // create
    } else {
      // update
      updateDepartment(data.id as number, {
        name: data.name,
        code: data.code,
        pricing: data.pricing,
      }).then((res) => {
        if (res) {
          close();
        }
      });
    }
  }
</script>

<Modal {title} bind:open outsideclose shadow rounded class="w-[50%]">
  <form class="items-center object-center">
    <Label>Nombre</Label>
    <Input bind:value={data.name} placeholder="Nombre" />
    <Label>Codigo</Label>
    <Input bind:value={data.code} placeholder="Codigo" />
    <Label>Precio</Label>
    <Input bind:value={data.pricing} placeholder="Precio" />
  </form>

  <svelte:fragment slot="footer">
    <Button color="primary" on:click={handleSubmit}>
      {formMode === "create" ? "Crear" : "Actualizar"}
      {#if isLoading}
        <Spinner color="white" size="sm" />
      {/if}
    </Button>
  </svelte:fragment>
</Modal>
