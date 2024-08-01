<script lang="ts">
  import {
    Button,
    Input,
    Label,
    Modal,
    Select,
    Spinner,
  } from "flowbite-svelte";
  import type { Student } from "../types";

  import { createEventDispatcher, onMount } from "svelte";
  import { createStudent, updateStudent } from "../services/student.service";

  const dispatch = createEventDispatcher();
  export let open = false;
  export let formMode: "create" | "update" = "create";
  export let data: Student = {
    name: "",
    email: "",
    phone: "",
    code: "",
  };

  let isLoading = false;

  const title = formMode ? "Crear Estudiante" : "Actualizar Estudiante";

  function close() {
    dispatch("close");
    open = false;
    isLoading = false;
  }
  function handleSubmit() {
    isLoading = true;
    if (formMode === "create") {
      console.log(data);

      createStudent({
        name: data.name,
        email: data.email,
        phone: data.phone,
        code: data.code,
      }).then((res) => {
        close();
      });
      // create
    } else {
      // update
      updateStudent(data.id as number, {
        name: data.name,
        email: data.email,
        phone: data.phone,
        code: data.code,
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
    <Label>Nombre</Label>
    <Input bind:value={data.name} placeholder="Nombre" />
    <Label>Email</Label>
    <Input bind:value={data.email} placeholder="Email" />
    <Label>Telefono</Label>
    <Input bind:value={data.phone} placeholder="Telefono" />
    <Label>Codigo</Label>
    <Input bind:value={data.code} placeholder="Codigo" />
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
