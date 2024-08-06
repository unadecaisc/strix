<script lang="ts">
  import {
    Alert,
    TableBodyRow,
    TableBodyCell,
    Button,
    Heading,
  } from "flowbite-svelte";
  import { PlusOutline } from "flowbite-svelte-icons";
  import { onMount } from "svelte";
  import type {
    RequestStatus,
    StudentOnDepartment,
    TableHeader,
    TablePagination,
  } from "../../types";
  import Table from "../../components/Table.svelte";
  import { getStudentOnDepartment } from "../../services/request.service";
  import RequestForm from "../../components/RequestForm.svelte";

  let studentOnDepartment: StudentOnDepartment[] = [];
  let error: string | null = null;
  let success: string | null = null;
  let isLoading = false;
  let openModal = false;
  let modalMode: "create" | "update" = "create";

  let defaultStudentOnDepartment: StudentOnDepartment = {
    id: 0,
    studentId: 0,
    departmentId: 0,
    status: "PENDING" as RequestStatus,
  };

  let currentSelected: StudentOnDepartment = { ...defaultStudentOnDepartment };

  $: openForm = false;
  $: pagination = {
    page: 1,
  } as TablePagination;

  const tableHeaders: TableHeader[] = [
    { name: "studentId", field: "" },
    { name: "departmentId", field: "" },
    { name: "status", field: "" },
  ];

  function reloadStudentOnDepartment() {
    isLoading = true;
    getStudentOnDepartment({ page: pagination.page })
      .then((res) => {
        studentOnDepartment = res?.data ?? [];
        pagination.page = res?.page ?? 1;
        pagination.next_page = res?.next_page;
        pagination.prev_page = res?.prev_page;
      })
      .finally(() => {
        isLoading = false;
      });
  }

  onMount(() => {
    reloadStudentOnDepartment();
  });

  function handleNext() {
    pagination.page = pagination.next_page ?? 1;
    reloadStudentOnDepartment();
  }

  function handlePrevious() {
    pagination.page = pagination.prev_page ?? 1;
    reloadStudentOnDepartment();
  }

  function handleFormModal() {
    openModal = true;
  }

  function handleUpdateModal(studentOnDepartment: StudentOnDepartment) {
    currentSelected = { ...studentOnDepartment };
    modalMode = "update";
    openModal = true;
  }

  function handleCloseModal() {
    openModal = false;
    currentSelected = defaultStudentOnDepartment;
    modalMode = "create";
    reloadStudentOnDepartment();
  }
</script>

<RequestForm
  bind:open={openModal}
  formMode={modalMode}
  data={currentSelected}
  on:close={handleCloseModal}
/>

<div class="w-full h-full px-4 grid gap-3">
  <div class="grid-flow-row">
    <Heading tag="h3" class="mb-4">Estudiantes</Heading>
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
      data={studentOnDepartment}
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
        <TableBodyCell>{row.student.name}</TableBodyCell>
        <TableBodyCell>{row.department.name}</TableBodyCell>
        <TableBodyCell>{row.status}</TableBodyCell>
      </TableBodyRow>
    </Table>
  </div>
</div>
