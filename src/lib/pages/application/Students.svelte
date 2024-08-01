<script lang="ts">
  import {
    Alert,
    TableBodyRow,
    TableBodyCell,
    Button,
    Heading,
  } from "flowbite-svelte";
  import { PlusOutline, PenOutline } from "flowbite-svelte-icons";

  import { onMount } from "svelte";
  import type { Student, TableHeader, TablePagination } from "../../types";
  import Table from "../../components/Table.svelte";
  import { getStudent } from "../../services/student.service";
  import StudentsForm from "../../components/StudentsForm.svelte";

  let students: Student[] = [];
  let error: string | null = null;
  let success: string | null = null;
  let isLoading = false;
  let openModal = false;
  let modalMode: "create" | "update" = "create";

  let defaultStudent: Student = {
    id: 0,
    name: "",
    email: "",
    phone: "",
    code: "",
  };

  let currentSelected: Student = { ...defaultStudent };

  $: pagination = {
    page: 1,
  } as TablePagination;

  const tableHeaders: TableHeader[] = [
    { name: "Nombre", field: "" },
    { name: "Email", field: "" },
    { name: "Telefono", field: "" },
    { name: "Código", field: "" },
  ];

  function reloadStudents() {
    isLoading = true;
    getStudent({ page: pagination.page })
      .then((res) => {
        students = res?.data ?? [];
        pagination.page = res?.page ?? 1;
        pagination.next_page = res?.next_page;
        pagination.prev_page = res?.prev_page;
      })
      .finally(() => {
        isLoading = false;
      });
  }

  onMount(() => {
    reloadStudents();
  });

  function handleNext() {
    pagination.page = pagination.next_page ?? 1;
    reloadStudents();
  }

  function handlePrevious() {
    pagination.page = pagination.prev_page ?? 1;
    reloadStudents();
  }

  function handleFormModal() {
    openModal = true;
  }

  function handleUpdateModal(student: Student) {
    currentSelected = { ...student };
    modalMode = "update";
    openModal = true;
  }

  function handleCloseModal() {
    openModal = false;
    currentSelected = defaultStudent;
    modalMode = "create";
    reloadStudents();
  }
</script>

<StudentsForm
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
      data={students}
      headers={tableHeaders}
      {pagination}
      on:next={handleNext}
      on:previous={handlePrevious}
    >
      <TableBodyRow slot="row" let:row>
        <TableBodyCell>{row.name}</TableBodyCell>
        <TableBodyCell>{row.email}</TableBodyCell>
        <TableBodyCell>{row.phone}</TableBodyCell>
        <TableBodyCell>{row.code}</TableBodyCell>
        <TableBodyCell>
          <Button
            size="xs"
            color="primary"
            on:click={() => handleUpdateModal(row)}
          >
            <!-- svelte-ignore missing-declaration -->
            <PenOutline />
            Editar
          </Button>
        </TableBodyCell>
      </TableBodyRow>
    </Table>
  </div>
</div>
