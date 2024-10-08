<script lang="ts">
  import {
    Pagination,
    PaginationItem,
    Table,
    TableBody,
    TableBodyCell,
    TableBodyRow,
    TableHead,
    TableHeadCell,
  } from "flowbite-svelte";
  import SkeletonTable from "./SkeletonTable.svelte";
  import { createEventDispatcher } from "svelte";
  import {
    type TableData,
    type TableHeader,
    type TablePagination,
  } from "../types";

  const dispatch = createEventDispatcher();
  export let headers: TableHeader[] = [];
  export let pagination: TablePagination | null = null;

  export let data: TableData<any> = [];

  function handleRowClick(data: any) {
    dispatch("rowClick", data);
  }
  function previous() {
    dispatch("previous");
  }
  function next() {
    dispatch("next");
  }
</script>

<Table hoverable={true} striped>
  <TableHead>
    {#each headers as header}
      <slot name="header" {header}>
        <TableHeadCell>{header.name}</TableHeadCell>
      </slot>
    {/each}
  </TableHead>
  <TableBody>
    {#if data.length === 0}
      <SkeletonTable rows={5} columns={headers.length} />
    {:else}
      {#each data as row}
        <slot name="row" {row}>
          <TableBodyRow
            class="cursor-pointer"
            on:dblclick={() => handleRowClick(row)}
          >
            {#each headers as { field, formatter }}
              <TableBodyCell>
                {#if formatter}
                  {formatter(row[field])}
                {:else}
                  {row[field]}
                {/if}
              </TableBodyCell>
            {/each}
          </TableBodyRow>
        </slot>
      {/each}
    {/if}
  </TableBody>
</Table>
<div class="flex flex-row-reverse mt-4">
  {#if pagination}
    {#if pagination.next_page}
      <PaginationItem slot="next" on:click={next}>Next</PaginationItem>
    {/if}
    {#if pagination.prev_page}
      <PaginationItem slot="prev" on:click={previous}>Previous</PaginationItem>
    {/if}
  {/if}
</div>
