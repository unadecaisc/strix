<script lang="ts">
  import {
    Alert,
    TableBodyRow,
    TableBodyCell,
    Badge,
    Button,
  } from "flowbite-svelte";
  import { PlusOutline } from "flowbite-svelte-icons";
  import { onMount } from "svelte";
  import GeneralConfigForm from "../../components/GeneralConfigForm.svelte";
  import type { TableHeader, TablePagination } from "../../types";
  import Table from "../../components/Table.svelte";

  type Student = {
    name: string;
    price: string;
    active: boolean;
  };

  let mailingList: Student[] = [
    { name: "Juan Pérez", price: "CRC 2300", active: true },
    { name: "Ana Gómez", price: "CRC 6700", active: true },
    { name: "Carlos Ruiz", price: "CRC 234", active: false },
    { name: "Luis Martínez", price: "CRC 5000", active: true },
    { name: "María López", price: "CRC 2300", active: true },
    { name: "Elena Rodríguez", price: "CRC 560", active: true },
  ];

  const tableHeaders: TableHeader[] = [
    { name: "Nombre", field: "name" },
    { name: "Precio", field: "price" },
    { name: "Estado", field: "active" },
  ];

  let pagination: TablePagination = {
    page: 1,
    size: 10,
    total: mailingList.length,
  };

  function handleFormModal() {}

  function handleUpdateModal(row: Student) {}

  function handleNext() {
    pagination.page++;
  }

  function handlePrevious() {
    if (pagination.page > 1) {
      pagination.page--;
    }
  }

  function toggleActive(row: Student) {
    row.active = !row.active;
  }
</script>

<div class="flex flex-col gap-2 p-2">
  <h1 class="text-xl font-bold">Notificaciones</h1>
  <div class="flex justify-between mt-3 mb-3">
    <Button size="xs" color="primary" on:click={handleFormModal}
      ><PlusOutline /> Agregar</Button
    >
    <div>
      <input
        type="text"
        placeholder="Buscar..."
        class="px-2 py-1 border border-gray-300 rounded-md"
      />
    </div>
  </div>
  <Table
    data={mailingList}
    headers={tableHeaders}
    {pagination}
    on:next={handleNext}
    on:previous={handlePrevious}
  >
    <TableBodyRow slot="row" let:row on:dblclick={() => handleUpdateModal(row)}>
      <TableBodyCell>{row.name}</TableBodyCell>
      <TableBodyCell>{row.price}</TableBodyCell>
      <TableBodyCell>
        <Badge color={row.active ? "green" : "red"}>
          {row.active ? "Activo" : "Desactivado"}
        </Badge>
      </TableBodyCell>
    </TableBodyRow>
  </Table>
  <div class="flex justify-end mt-3">
    <Button
      size="xs"
      color="primary"
      border="gray"
      on:click={handleNext}
      class="w-20">Next</Button
    >
  </div>
</div>
