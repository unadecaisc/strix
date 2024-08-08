<script lang="ts">
  import {
    Button,
    Input,
    Label,
    Modal,
    P,
    Select,
    Spinner,
  } from "flowbite-svelte";
  import type { RequestStatus, Student, StudentOnDepartment } from "../types";

  import { createEventDispatcher, onMount } from "svelte";
  import {
    createStudentOnDepartment,
    updateStudentOnDepartment,
  } from "../services/request.service";

  const dispatch = createEventDispatcher();
  export let open = false;
  export let formMode: "create" | "update" = "create";
  export let data: StudentOnDepartment = {
    id: 0,
    studentId: 0,
    departmentId: 0,
    status: "PENDING" as RequestStatus, // PENDING, APPROVED, REJECTED
  };

  let isLoading = false;

  const title = formMode ? "Crear Solicitud" : "Actualizar Solicitud";

  function close() {
    dispatch("close");
    open = false;
    isLoading = false;
  }
  function handleSubmit() {
    isLoading = true;
    if (formMode === "create") {
      console.log(data);

      createStudentOnDepartment({
        id: data.id,
        studentId: data.studentId,
        departmentId: data.departmentId,
        status: data.status,
      }).then((res) => {
        close();
      });
      // create
    } else {
      // update
      updateStudentOnDepartment(data.id as number, {
        id: data.id,
        studentId: data.studentId,
        departmentId: data.departmentId,
        status: data.status,
      }).then((res) => {
        if (res) {
          close();
        }
      });
    }
  }
</script>

<Modal
  {title}
  bind:open
  outsideclose
  on:close={close}
  shadow
  rounded
  class="w-[50%]"
>
  <form class="items-center object-center">
    <Label>Estudiante</Label>
    <Input bind:value={data.studentId} placeholder="Estudiante" />
    <Label>Departamento</Label>
    <Input bind:value={data.departmentId} placeholder="Departamento" />
    <Label>Estado</Label>
    <Input bind:value={data.status} placeholder="Estado" />
  </form>

  <svelte:fragment slot="footer">
    <Button color="primary" on:click={handleSubmit}>
      {formMode === "create" ? "Crear" : "Actualizar"}
      {#if isLoading}
        <Spinner color="white" size="sm" />
      {/if}
    </Button>
  </svelte:fragment>
</Modal>
