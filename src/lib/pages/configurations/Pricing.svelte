<script lang="ts">
  import {
    Table,
    TableBody,
    TableBodyCell,
    TableBodyRow,
    TableHead,
    TableHeadCell,
  } from "flowbite-svelte";
  let searchTerm = "";
  let items = [] as {
    id: number;
    name: string;
    student: string;
    price: string;
    status: string;
  }[];
  let newName = "";
  let newStudent = "";
  let newPrice = "";
  let newStatus = "Activo";
  let showModal = false;
  let currentPage = 1;
  let itemsPerPage = 5;

  $: filteredItems = items.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.student.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  $: paginatedItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  function addItem() {
    items = [
      ...items,
      {
        id: items.length + 1,
        name: newName,
        student: newStudent,
        price: newPrice,
        status: newStatus,
      },
    ];
    showModal = false;
    newName = "";
    newStudent = "";
    newPrice = "";
    newStatus = "Activo";
    currentPage = Math.ceil(filteredItems.length / itemsPerPage);
  }
</script>

<div class="flex justify-between mb-4">
  <button class="btn btn-primary" on:click={() => (showModal = true)}
    >Agregar +</button
  >
  <input
    type="text"
    placeholder="Buscar"
    bind:value={searchTerm}
    class="input input-bordered w-full max-w-xs"
  />
</div>

<Table>
  <TableHead>
    <TableHeadCell>NOMBRE</TableHeadCell>
    <TableHeadCell>ESTUDIANTE</TableHeadCell>
    <TableHeadCell>PRECIO</TableHeadCell>
    <TableHeadCell>ESTADO</TableHeadCell>
  </TableHead>
  <TableBody tableBodyClass="divide-y">
    {#each paginatedItems as item}
      <TableBodyRow>
        <TableBodyCell>{item.name}</TableBodyCell>
        <TableBodyCell>{item.student}</TableBodyCell>
        <TableBodyCell>{item.price}</TableBodyCell>
        <TableBodyCell>
          {#if item.status === "Activo"}
            <span class="text-green-500">{item.status}</span>
          {:else}
            <span class="text-red-500">{item.status}</span>
          {/if}
        </TableBodyCell>
      </TableBodyRow>
    {/each}
  </TableBody>
</Table>

<div class="flex justify-between mt-4">
  <p>
    Showing {itemsPerPage * (currentPage - 1) + 1}-{Math.min(
      itemsPerPage * currentPage,
      filteredItems.length,
    )} of {filteredItems.length}
  </p>
  <div class="btn-group">
    {#each Array(Math.ceil(filteredItems.length / itemsPerPage)) as _, i}
      <button
        class="btn"
        class:btn-primary={i + 1 === currentPage}
        on:click={() => (currentPage = i + 1)}>{i + 1}</button
      >
    {/each}
  </div>
</div>

{#if showModal}
  <div class="modal">
    <div class="modal-box">
      <h3 class="font-bold text-lg">Precios</h3>
      <div class="flex flex-col">
        <label for="newName">Ingrese Horas</label>
        <input
          type="text"
          bind:value={newName}
          placeholder="Horas/ 7:00"
          class="input input-bordered mb-2"
          id="newName"
        />
        <label for="newStudent">Estudiante</label>
        <input
          type="text"
          bind:value={newStudent}
          placeholder="Ingrese nombre"
          class="input input-bordered mb-2"
          id="newStudent"
        />
        <label for="newPrice">Precio-Horas</label>
        <input
          type="text"
          bind:value={newPrice}
          placeholder="1.500 ¢"
          class="input input-bordered mb-2"
          id="newPrice"
        />
        <label for="newStatus">Asignar DPTS</label>
        <select
          bind:value={newStatus}
          class="input input-bordered mb-2"
          id="newStatus"
        >
          <option value="Activo">Activo</option>
          <option value="Desactivado">Desactivado</option>
        </select>
      </div>
      <div class="modal-action">
        <button class="btn btn-primary" on:click={addItem}>Guardar</button>
        <button class="btn" on:click={() => (showModal = false)}>Cerrar</button>
      </div>
    </div>
  </div>
{/if}

<style>
  .btn {
    padding: 0.5rem 1rem;
    margin: 0 0.25rem;
    border: 1px solid #ccc;
    border-radius: 0.25rem;
  }
  .btn-primary {
    background-color: #007bff;
    color: white;
  }
  .input {
    padding: 0.5rem 1rem;
    border: 1px solid #ccc;
    border-radius: 0.25rem;
  }
  .text-green-500 {
    color: #38a169;
  }
  .text-red-500 {
    color: #e53e3e;
  }
  .btn-group {
    display: flex;
  }
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .modal-box {
    background: white;
    padding: 1rem;
    border-radius: 0.5rem;
    width: 300px;
  }
  .modal-action {
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;
  }
</style>
