<script lang="ts">
  import {
    Button,
    Input,
    Label,
    Modal,
    Select,
    Spinner,
  } from "flowbite-svelte";
  import type { Role, User } from "../types";

  import { createEventDispatcher, onMount } from "svelte";
  import { createUser, updateUser } from "../services/user.service";

  const dispatch = createEventDispatcher();
  export let open: boolean = false;
  export let formMode: "create" | "update" = "create";

  export let roles: Role[] = [];
  export let data: Partial<User> & { password: string } = {
    name: "",
    password: "",
    phone: "",
    email: "",
    roleId: 0,
  };

  let isLoading = false;
  $: title = formMode == "create" ? "Crear Usuario" : "Actualizar Usuario";

  function close() {
    dispatch("close");
    isLoading = false;
    open = false;
  }
  function handleSubmit() {
    isLoading = true;
    if (formMode === "create") {
      console.log(data);
      createUser({
        name: data.name,
        email: data.email,
        password: data.password,
        phone: data.phone,
        roleId: data.roleId,
      }).then((res) => {
        close();
      });

      // create
    } else {
      updateUser(data.id as number, {
        name: data.name,
        email: data.email,
        password: data.password,
        phone: data.phone,
        roleId: data.roleId,
      }).then((res) => {
        if (res) {
          close();
        }
      });
    }
  }
</script>

<Modal
  {title}
  bind:open
  outsideclose
  on:close={close}
  shadow
  rounded
  class="w-[75%]"
>
  <form class="items-center object-center">
    <Label>Nombre</Label>
    <Input bind:value={data.name} placeholder="Nombre" />
    <Label>Correo</Label>
    <Input type="email" bind:value={data.email} placeholder="Correo" />
    <Label>Telefono</Label>
    <Input type="text" bind:value={data.phone} placeholder="Telefono" />
    <Label>Contraseña</Label>
    <Input
      type="password"
      bind:value={data.password}
      placeholder="Contraseña"
    />
    <Label>Rol</Label>
    <Select bind:value={data.roleId}>
      {#each roles as role}
        <option value={role.id}>{role.name}</option>
      {/each}
    </Select>
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
