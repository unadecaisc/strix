<script lang="ts">
  import { Alert, TableBodyRow, TableBodyCell, Badge } from "flowbite-svelte";
  import { onMount } from "svelte";
  import { getConfig, updateConfig } from "../../services/config.service";
  import GeneralConfigForm from "../../components/GeneralConfigForm.svelte";
  import type {
    GlobalSetting,
    MailingList,
    TableHeader,
    TablePagination,
  } from "../../types";
  import Table from "../../components/Table.svelte";
  import { getMailingList } from "../../services/mailing-list.service";

  let globalSetting: GlobalSetting | null = null;
  let mailingList: MailingList[] = [];

  let error: string | null = null;
  let success: string | null = null;
  let isLoading = false;

  $: pagination = {
    page: 1,
    pages: [],
  } as TablePagination;
  const tableHeaders: TableHeader[] = [
    { name: "Email", field: "email" },
    { name: "Nombre", field: "name" },
    { name: "Estado", field: "state" },
  ];

  function reloadConfig() {
    isLoading = true;
    getConfig().then((res) => {
      globalSetting = res ?? null;
    });
    isLoading = false;
  }

  function reloadMailingList() {
    getMailingList({
      page: pagination.page,
    }).then((res) => {
      mailingList = res?.data ?? [];
      pagination.page = res?.page ?? 1;
      pagination.next_page = res?.next_page;
      pagination.prev_page = res?.prev_page;
    });
  }

  onMount(async () => {
    reloadConfig();
    reloadMailingList();
  });

  function handleUpdate(e: CustomEvent<GlobalSetting>) {
    isLoading = true;
    updateConfig(e.detail)
      .then(() => {
        reloadConfig();
      })
      .then(() => {
        error = null;
        success = "Configuracion actualizada";
      })
      .catch((err) => {
        error = err.message;
      });
    isLoading = false;
  }
  function handleNext() {
    pagination.page = pagination.next_page ?? 1;
    reloadMailingList();
  }
  function handlePrevious() {
    pagination.page = pagination.prev_page ?? 1;
    reloadMailingList();
  }
</script>

<div class="flex flex-col gap-6">
  <div class="flex-row w-auto mb-5">
    <div class="py-3">
      <h1 class="text-xl font-bold">Configuracion General</h1>
    </div>
    {#if error}
      <Alert type="error" dismissable>{error}</Alert>
    {/if}
    {#if success}
      <Alert type="success" dismissable>{success}</Alert>
    {/if}
    <GeneralConfigForm
      currentState={globalSetting}
      on:update={handleUpdate}
      {isLoading}
    ></GeneralConfigForm>
  </div>
  <div class="flex flex-col gap-2">
    <h1 class="text-xl font-bold">Notificaciones</h1>
    <Table
      data={mailingList}
      headers={tableHeaders}
      {pagination}
      on:next={handleNext}
      on:previous={handlePrevious}
    >
      <TableBodyRow slot="row" let:row>
        <TableBodyCell>{row.email}</TableBodyCell>
        <TableBodyCell>{row.name}</TableBodyCell>
        <TableBodyCell>
          <Badge color={row.active ? "green" : "red"}
            >{row.active ? "Activo" : "Inactivo"}</Badge
          >
        </TableBodyCell>
      </TableBodyRow>
    </Table>
  </div>
</div>
