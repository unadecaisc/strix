<script lang="ts">
  import {
    Alert,
    TableBodyRow,
    TableBodyCell,
    Button,
    Heading,
    Badge,
  } from "flowbite-svelte";
  import {
    CloseCircleOutline,
    PenOutline,
    PlusOutline,
  } from "flowbite-svelte-icons";
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

  import { getRoles } from "../../services/roles.service";

  import RoleForm from "../../components/RoleForm.svelte";
  import { getPermissions } from "../../services/permissions.service";
  import { parsePermissionsToName } from "../../utils/permission-parser";

  let roles: Role[] = [];
  let error: string | null = null;
  let success: string | null = null;
  let permissions: string[] = [];
  let isLoading = false;
  let modalMode: "create" | "update" = "create";

  $: openForm = false;
  const defaultRole: Partial<Role> = {
    name: "",
    allowedPermissions: [],
  };

  let currentSelected: Partial<Role> = defaultRole;

  $: pagination = {
    page: 1,
  } as TablePagination;

  const tableHeaders: TableHeader[] = [
    { name: "Nombre", field: "" },
    { name: "Permisos", field: "" },
    { name: "Acciones", field: "" },
  ];

  async function reloadRoles() {
    const res = await getRoles({ page: pagination.page });
    roles = res?.data ?? [];
  }

  async function reloadPermissions() {
    const res = await getPermissions();
    permissions = res ?? [];
  }

  onMount(async () => {
    await Promise.all([reloadRoles(), reloadPermissions()]);
  });

  function handleNext() {
    pagination.page = pagination.next_page ?? 1;
  }

  function handlePrevious() {
    pagination.page = pagination.prev_page ?? 1;
  }

  function handleFormModal() {
    openForm = true;
  }

  function handleUpdateModal(role: Partial<Role>) {
    currentSelected = role;
    modalMode = "update";
    openForm = true;
  }

  function handleCloseForm() {
    openForm = false;
    currentSelected = defaultRole;
    modalMode = "create";
    reloadRoles().then();
  }

  function formatRolePermissions(permissions: string[]) {
    return permissions.map((p) => parsePermissionsToName(p));
  }
</script>

<div class="w-full h-full px-4 grid gap-3">
  <div class="grid-flow-row">
    <Heading tag="h3" class="mb-4">Configuración de Roles</Heading>
  </div>
  <div class="grid-flow-row">
    {#if error}
      <Alert type="error" dismissable>{error}</Alert>
    {/if}
    {#if success}
      <Alert type="success" dismissable>{success}</Alert>
    {/if}
    <div class="mt-3 mb-3">
      <Button
        size="xs"
        color={openForm ? "red" : "primary"}
        on:click={openForm ? handleCloseForm : handleFormModal}
      >
        {#if openForm}
          <CloseCircleOutline /> Cerrar
        {:else}
          <PlusOutline /> Agregar
        {/if}
      </Button>
    </div>
    <div class="grid grid-flow-col">
      <div class={openForm ? "col-span-6" : "col-span-full"}>
        <Table
          data={roles}
          headers={tableHeaders}
          {pagination}
          on:next={handleNext}
          on:previous={handlePrevious}
        >
          <TableBodyRow slot="row" let:row as User>
            <TableBodyCell>{row.name}</TableBodyCell>
            <TableBodyCell>
              <ul class="list-none gap-2">
                {#each formatRolePermissions(row.allowedPermissions) as permission}
                  <span class="font-bold">{permission}, </span>
                  <!-- <li>
                  <Badge color="indigo">{permission.name}</Badge>
                </li> -->
                {/each}

                <!-- ... -->
              </ul>
            </TableBodyCell>
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
      {#if openForm}
        <div class="col-span-6 p-4">
          <Heading tag="h5" class="mb-4">Crear rol</Heading>
          <RoleForm
            data={currentSelected}
            open={openForm}
            formMode={modalMode}
            on:close={handleCloseForm}
            {permissions}
          ></RoleForm>
        </div>
      {/if}
    </div>
  </div>
</div>
