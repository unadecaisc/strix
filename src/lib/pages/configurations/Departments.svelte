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
  import { getDepartment } from "../../services/department.service";
  import DepartmentsForm from "../../components/DepartmentsForm.svelte";
  import type { Department, TableHeader, TablePagination } from "../../types";
  import Table from "../../components/Table.svelte";
  import { CRC } from "../../utils/currency";

  let departments: Department[] = [];
  let error: string | null = null;
  let success: string | null = null;
  let isLoading = false;
  let openModal = false;
  let modalMode: "create" | "update" = "create";

  let defaultDepartment: Department = {
    id: undefined,
    name: "",
    code: "",
    pricing: 0,
  };

  let currentSelected: Department = { ...defaultDepartment };

  $: pagination = {
    page: 1,
  } as TablePagination;

  const tableHeaders: TableHeader[] = [
    { name: "Nombre", field: "name" },
    { name: "Código", field: "code" },
    { name: "Precio", field: "pricing" },
    { name: "Jefe", field: "jefe" },
    { name: "Acciones", field: "" },
  ];

  function reloadDepartments() {
    isLoading = true;
    getDepartment({ page: pagination.page })
      .then((res) => {
        departments = res?.data ?? [];
        pagination.page = res?.page ?? 1;
        pagination.next_page = res?.next_page;
        pagination.prev_page = res?.prev_page;
      })
      .finally(() => {
        isLoading = false;
      });
  }

  onMount(() => {
    reloadDepartments();
  });

  function handleNext() {
    pagination.page = pagination.next_page ?? 1;
    reloadDepartments();
  }

  function handlePrevious() {
    pagination.page = pagination.prev_page ?? 1;
    reloadDepartments();
  }

  function handleFormModal() {
    openModal = true;
  }

  function handleUpdateModal(department: Department) {
    currentSelected = { ...department };
    modalMode = "update";
    openModal = true;
  }

  function handleCloseModal() {
    openModal = false;
    currentSelected = defaultDepartment;
    modalMode = "create";
    reloadDepartments();
  }
</script>

<DepartmentsForm
  bind:open={openModal}
  formMode={modalMode}
  data={currentSelected}
  on:close={handleCloseModal}
/>

<div class="w-full h-full px-4 grid gap-3">
  <div class="grid-flow-row">
    <Heading tag="h3" class="mb-4">Configuración de Departamentos</Heading>
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
      data={departments}
      headers={tableHeaders}
      {pagination}
      on:next={handleNext}
      on:previous={handlePrevious}
    >
      <TableBodyRow
        slot="row"
        let:row
        on:dblclick={() => handleUpdateModal(row)}
      >
        <TableBodyCell>{row.name}</TableBodyCell>
        <TableBodyCell>{row.code}</TableBodyCell>
        <TableBodyCell>{CRC(row.pricing)}</TableBodyCell>
        <TableBodyCell
          >{row.users.length === 0
            ? "Sin jefe Asignado "
            : row.users[0].name}</TableBodyCell
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

        <!-- TODO: Add price value  -->
      </TableBodyRow>
    </Table>
  </div>
</div>
