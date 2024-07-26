<script lang="ts">
  import {
    Button,
    Input,
    Label,
    Modal,
    Select,
    Spinner,
  } from "flowbite-svelte";
  import type { Department, Role, User } from "../types";

  import { createEventDispatcher, onMount } from "svelte";
  import { createUser, updateUser } from "../services/user.service";
  import { getDepartment } from "../services/department.service";
  import Departments from "../pages/configurations/Departments.svelte";

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
    departmentId: undefined,
  };

  $: departments = [] as Department[];

  let isLoading = false;
  $: title = formMode == "create" ? "Crear Usuario" : "Actualizar Usuario";
  $: changePassword = false;
  function close() {
    dispatch("close");
    isLoading = false;
    open = false;
  }

  function deleteDepartment() {
    data.departmentId = undefined;
  }

  function handleSubmit() {
    isLoading = true;
    const sendData: Partial<Departments> = {
      name: data.name,
      email: data.email,
      password: data.password,
      phone: data.phone,
      roleId: data.roleId,
    };
    if (data.departmentId) {
      sendData.departmentId = data.departmentId;
    }

    if (formMode === "create") {
      createUser(sendData).then((res) => {
        close();
      });

      // create
    } else {
      updateUser(data.uuid as string, sendData).then((res) => {
        if (res) {
          close();
        }
      });
    }
  }
  onMount(async () => {
    const response = await getDepartment({ size: 1000 });
    departments = response?.data ?? [];
  });
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
  <form class="flex flex-col space-y-4">
    <Label>Nombre</Label>
    <Input bind:value={data.name} placeholder="Nombre" />
    <Label>Correo</Label>
    <Input type="email" bind:value={data.email} placeholder="Correo" />
    <Label>Telefono</Label>
    <Input type="text" bind:value={data.phone} placeholder="Telefono" />
    <Label>Contraseña</Label>

    <!-- svelte-ignore a11y-invalid-attribute -->
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <!-- svelte-ignore a11y-missing-attribute -->
    {#if formMode === "update"}
      <a
        on:click={() => (changePassword = !changePassword)}
        class="text-sm text-primary-500 hover:underline cursor-pointer dark:text-primary-500"
        >{changePassword ? "Cancelar" : "Cambiar Contraseña"}</a
      >
    {/if}
    {#if changePassword || formMode === "create"}
      <Input
        type="password"
        bind:value={data.password}
        placeholder="Contraseña"
      />
    {/if}

    <Label>Rol</Label>
    <Select bind:value={data.roleId}>
      {#each roles as role}
        <option value={role.id}>{role.name}</option>
      {/each}
    </Select>

    <Label>Asignar Departamento</Label>

    <!-- svelte-ignore a11y-invalid-attribute -->
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <!-- svelte-ignore a11y-missing-attribute -->
    {#if data.departmentId}
      <a
        on:click={deleteDepartment}
        class="text-sm text-red-500 hover:underline cursor-pointer dark:text-primary-500"
        >Eliminar Departamento</a
      >
    {/if}
    <Select bind:value={data.departmentId}>
      {#each departments as department}
        <option value={department.id}>{department.name}</option>
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
