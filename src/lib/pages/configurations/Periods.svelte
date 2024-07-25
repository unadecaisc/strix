<script lang="ts">
  import {
    Alert,
    TableBodyRow,
    TableBodyCell,
    Button,
    Heading,
    Badge,
  } from "flowbite-svelte";
  import { PenOutline, PlusOutline } from "flowbite-svelte-icons";
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

  import { getPeriods } from "../../services/periods.service";

  let periods: Period[] = [];
  let error: string | null = null;
  let success: string | null = null;
  let isLoading = false;
  let modalMode: "create" | "update" = "create";

  let openModal = false;
  const defaultPeriod: Partial<Period> = {
    name: "",
    startDate: "",
    endDate: "",
  };

  let currentSelected: Partial<Period> = defaultPeriod;

  $: pagination = {
    page: 1,
  } as TablePagination;

  const tableHeaders: TableHeader[] = [
    { name: "Nombre", field: "" },
    { name: "Fecha de Inicio", field: "" },
    { name: "Fecha de Fin", field: "" },
    { name: "Acciones", field: "" },
  ];

  async function reloadPeriods() {
    const res = await getPeriods({ page: pagination.page });
    periods = res?.data ?? [];
  }

  onMount(() => {
    reloadPeriods();
  });
</script>
