<script lang="ts">
  import {
    Alert,
    TableBodyRow,
    TableBodyCell,
    Button,
    Heading,
    Badge,
    Popover,
    Indicator,
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
  let isLoading = false;
  let formMode: "create" | "update" = "create";
  const defaultRole: Partial<Role> = {
    name: "",
    allowedPermissions: [],
  };
  let currentSelected: Partial<Role> = defaultRole;

  $: openForm = false;
  $: formTitle = formMode === "create" ? "Crear" : "Actualizar";
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

  onMount(async () => {
    await Promise.all([reloadRoles()]);
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
    formMode = "update";
    openForm = true;
  }

  function handleCloseForm() {
    openForm = false;
    currentSelected = defaultRole;
    formMode = "create";
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
    <div class="mt-3 mb-3">
      <Button size="xs" color="primary" on:click={handleFormModal}>
        <PlusOutline /> Agregar
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
              <Badge color="primary" class="font-bold p-1 " id="role-perms"
                >{parsePermissionsToName(row.allowedPermissions[0]) + " "}
                {#if row.allowedPermissions.length > 1}
                  <Indicator color="none" class="p-2">
                    +{row.allowedPermissions.length}
                  </Indicator>
                {/if}
              </Badge>
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
          <Heading tag="h5" class="mb-4">{formTitle} rol</Heading>
          <Alert type="info" dismissable>
            Los permisos que indican <b>Ver</b>/<b>Crear</b> se refieren a ver o
            modificar el contenido de las secciones indicadas, otros roles estan
            predefinidos segun su funcion.
          </Alert>
          <RoleForm
            data={currentSelected}
            open={openForm}
            {formMode}
            on:close={handleCloseForm}
          ></RoleForm>
        </div>
      {/if}
    </div>
  </div>
</div>
