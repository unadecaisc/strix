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

<div class="flex flex-col gap-4">
  <Table hoverable striped>
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
            <TableBodyRow on:dblclick={() => handleRowClick(row)}>
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
  {#if pagination}
    <div class="flex justify-end p-4">
      {#if pagination.prev_page}
        <PaginationItem slot="prev" on:click={previous}>Previous</PaginationItem
        >
      {/if}
      {#if pagination.next_page}
        <PaginationItem slot="next" on:click={next}>Next</PaginationItem>
      {/if}
    </div>
  {/if}
</div>
