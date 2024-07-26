<script lang="ts">
  import {
    Alert,
    TableBodyRow,
    TableBodyCell,
    Button,
    Heading,
  } from "flowbite-svelte";
  import { PenOutline, PlusOutline } from "flowbite-svelte-icons";
  import { onMount } from "svelte";
  import DepartmentsForm from "../../components/DepartmentsForm.svelte";
  import type {
    Department,
    Role,
    TableHeader,
    TablePagination,
    User,
  } from "../../types";
  import Table from "../../components/Table.svelte";
  import UserForm from "../../components/UserForm.svelte";
  import { getRoles } from "../../services/roles.service";
  import { getUsers } from "../../services/user.service";
  type UserFormType = Partial<User> & { password: string };
  let users: User[] = [];
  let roles: Role[] = [];
  let error: string | null = null;
  let success: string | null = null;
  let isLoading = false;
  let modalMode: "create" | "update" = "create";

  let openModal = false;
  const defaultUser = {
    name: "",
    email: "",
    phone: "",
    password: "",
  };

  let currentSelected: UserFormType = defaultUser;

  $: pagination = {
    page: 1,
  } as TablePagination;

  const tableHeaders: TableHeader[] = [
    { name: "Nombre", field: "" },
    { name: "Correo", field: "" },
    { name: "Telefono", field: "" },
    { name: "Role", field: "" },
    { name: "Departamento", field: "" },
    { name: "Accion", field: "" },
  ];

  function reloadData() {
    getUsers({ page: pagination.page }).then((res) => {
      users = res?.data ?? [];
      pagination.page = res?.page ?? 1;
      pagination.next_page = res?.next_page;
      pagination.prev_page = res?.prev_page;
    });
  }

  onMount(() => {
    reloadData();
    getRoles({ size: 100 }).then((res) => {
      roles = res?.data ?? [];
    });
  });

  function handleNext() {
    pagination.page = pagination.next_page ?? 1;
    reloadData();
  }

  function handlePrevious() {
    pagination.page = pagination.prev_page ?? 1;
    reloadData();
  }

  function handleFormModal() {
    openModal = true;
  }

  function handleUpdateModal(user: UserFormType) {
    currentSelected = { ...user };
    modalMode = "update";
    openModal = true;
  }

  function handleCloseModal() {
    openModal = false;
    currentSelected = defaultUser;
    modalMode = "create";
    reloadData();
  }
</script>

<UserForm
  data={currentSelected}
  open={openModal}
  formMode={modalMode}
  on:close={handleCloseModal}
  {roles}
></UserForm>

<div class="w-full h-full px-4 grid gap-3">
  <div class="grid-flow-row">
    <Heading tag="h3" class="mb-4">Configuración de Usuarios</Heading>
  </div>
  <div class="grid-flow-row">
    {#if error}
      <Alert type="error" dismissable>{error}</Alert>
    {/if}
    {#if success}
      <Alert type="success" dismissable>{success}</Alert>
    {/if}
    <div class="mt-3 mb-3">
      <Button size="xs" color="primary" on:click={handleFormModal}>
        <PlusOutline /> Agregar
      </Button>
    </div>
    <Table
      data={users}
      headers={tableHeaders}
      {pagination}
      on:next={handleNext}
      on:previous={handlePrevious}
    >
      <TableBodyRow slot="row" let:row as User>
        <TableBodyCell>{row.name}</TableBodyCell>
        <TableBodyCell>{row.email}</TableBodyCell>
        <TableBodyCell>{row.phone}</TableBodyCell>
        <TableBodyCell>{row.role.name}</TableBodyCell>
        <TableBodyCell
          >{row.department?.name ?? "Sin departamento Asignado"}</TableBodyCell
        >
        <TableBodyCell>
          <Button
            size="xs"
            color="primary"
            on:click={() => handleUpdateModal(row)}
          >
            <PenOutline />
            Editar
          </Button>
          <!-- <Button size="xs" color="red">Eliminar</Button> -->
        </TableBodyCell>
      </TableBodyRow>
    </Table>
  </div>
</div>
