<script lang="ts">
  import {
    Alert,
    TableBodyRow,
    TableBodyCell,
    Badge,
    Button,
    Heading,
  } from "flowbite-svelte";
  import { PlusOutline } from "flowbite-svelte-icons";
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
  import MailinglistForm from "../../components/MailinglistForm.svelte";

  let globalSetting: GlobalSetting | null = null;
  let mailingList: MailingList[] = [];

  let error: string | null = null;
  let success: string | null = null;
  let isLoading = false;
  let openModal = false;
  let modalMode: "create" | "update" = "create";

  let defaultMailList: MailingList = {
    email: "",
    name: "",
    active: true,
  };
  let currentSelected: MailingList = defaultMailList;
  $: pagination = {
    page: 1,
  } as TablePagination;

  const tableHeaders: TableHeader[] = [
    { name: "Email", field: "email" },
    { name: "Nombre", field: "name" },
    { name: "Estado", field: "state" },
  ];

  async function reloadConfig() {
    const res = await getConfig();
    globalSetting = res ?? null;
  }

  async function reloadMailingList() {
    const res = await getMailingList({
      page: pagination.page,
    });
    mailingList = res?.data ?? [];
    pagination.page = res?.page ?? 1;
    pagination.next_page = res?.next_page;
    pagination.prev_page = res?.prev_page;
  }

  onMount(async () => {
    isLoading = true;
    await Promise.all([reloadConfig(), reloadMailingList()]);
    isLoading = false;
  });

  async function handleUpdate(e: CustomEvent<GlobalSetting>) {
    isLoading = true;
    try {
      const res = await updateConfig(e.detail);
      globalSetting = res ?? null;
      success = "Configuracion actualizada";
    } catch (error: any) {
      error = error.message;
    }
    isLoading = false;
  }
  async function handleNext() {
    pagination.page = pagination.next_page ?? 1;
    await reloadMailingList();
  }
  async function handlePrevious() {
    pagination.page = pagination.prev_page ?? 1;
    await reloadMailingList();
  }

  async function handleFormModal() {
    openModal = true;
  }
  async function handleUpdateModal(mailingList: MailingList) {
    currentSelected = mailingList;
    modalMode = "update";
    openModal = true;
  }

  async function handleCloseModal() {
    openModal = false;
    currentSelected = defaultMailList;
    modalMode = "create";
    await reloadMailingList();
  }
</script>

<MailinglistForm
  bind:open={openModal}
  formMode={modalMode}
  data={currentSelected}
  on:close={handleCloseModal}
></MailinglistForm>

<div class="w-full h-full px-4 grid gap-3">
  <div class="grid-flow-row">
    <Heading tag="h3" class="mb-4">Configuracion General</Heading>
  </div>
  <div class="grid-flow-row">
    <Heading tag="h5" class="mb-4">Configuracion Predeterminada</Heading>
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
  <div class="grid-flow-row">
    <Heading tag="h5" class="mb-4">Notificaciones</Heading>
    <div class="mt-3 mb-3">
      <Button size="xs" color="primary" on:click={handleFormModal}
        ><PlusOutline /> Agregar</Button
      >
    </div>
    <Table
      data={mailingList}
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
