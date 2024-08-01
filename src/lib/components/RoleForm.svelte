<script lang="ts">
  import {
    Button,
    Input,
    Label,
    Modal,
    MultiSelect,
    Select,
    Spinner,
  } from "flowbite-svelte";
  import type { Role, User } from "../types";

  import { createEventDispatcher, onMount } from "svelte";

  import { createRole, updateRole } from "../services/roles.service";
  import { getPermissions } from "../services/permissions.service";
  import { getAvailablePersmissions } from "../utils/permission-parser";
  import { CloseCircleOutline } from "flowbite-svelte-icons";

  const dispatch = createEventDispatcher();
  export let open: boolean = false;
  export let formMode: "create" | "update" = "create";

  export let data: Partial<Role> = {};

  let isLoading = false;
  const formattedPermissions = getAvailablePersmissions();

  function close() {
    dispatch("close");
    isLoading = false;
    open = false;
  }
  async function handleSubmit() {
    isLoading = true;
    try {
      if (formMode === "create") {
        // create
        await createRole({
          name: data.name,
          allowedPermissions: data.allowedPermissions,
        });
      } else {
        // update
        await updateRole(data.id as number, {
          name: data.name,
          allowedPermissions: data.allowedPermissions,
        });
      }
    } catch (error) {}
    close();
    isLoading = false;
  }
</script>

<div class="container">
  <form class="flex flex-col space-y-3 mb-4">
    <Label>Nombre</Label>
    <Input bind:value={data.name} placeholder="Nombre" />
    <Label>Permisos</Label>
    <MultiSelect
      size="sm"
      bind:value={data.allowedPermissions}
      items={formattedPermissions}
      placeholder="Selecciona los permisos"
    />
  </form>
  <div class="flex flex-row justify-end space-x-2">
    <Button size="sm" color="primary" on:click={handleSubmit}>
      {formMode === "create" ? "Crear" : "Actualizar"}
      {#if isLoading}
        <Spinner color="white" size="sm" />
      {/if}
    </Button>
    <Button size="sm" color="red" on:click={close}>
      <CloseCircleOutline /> Cerrar
    </Button>
  </div>
</div>
