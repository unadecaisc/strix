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
  import { parseAllPermissions } from "../utils/permission-parser";
  import { createRole, updateRole } from "../services/roles.service";

  const dispatch = createEventDispatcher();
  export let open: boolean = false;
  export let formMode: "create" | "update" = "create";
  export let permissions: string[] = [];

  console.log("◉ ▶ permissions:", permissions);
  export let data: Partial<Role> = {};

  let isLoading = false;
  $: formattedPermissions = parseAllPermissions(permissions);

  $: title = formMode == "create" ? "Crear Rol" : "Actualizar Rol";

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

<Modal {title} bind:open outsideclose on:close={close} shadow rounded size="md">
  <form class="items-center object-center">
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

  <svelte:fragment slot="footer">
    <Button color="primary" on:click={handleSubmit}>
      {formMode === "create" ? "Crear" : "Actualizar"}
      {#if isLoading}
        <Spinner color="white" size="sm" />
      {/if}
    </Button>
  </svelte:fragment>
</Modal>
