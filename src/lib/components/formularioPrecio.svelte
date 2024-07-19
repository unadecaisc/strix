<script>
  import { Button, Modal, Label, Input, Select } from "flowbite-svelte";
  let formModal = false;
  let horas = "";
  let precioHora = 1500;
  let nombreEstudiante = "";
  let departamento = "";

  async function guardar() {
    const data = {
      horas,
      precioHora,
      nombreEstudiante,
      departamento,
    };
    console.log(data);

    try {
      const response = await fetch("https://strix-api.onrender.com/price", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }

      const result = await response.json();
      console.log("Success:", result);

      // Cierra el modal y resetea los campos del formulario
      formModal = false;
      resetForm();
    } catch (error) {
      console.error("Error:", error);
    }
  }

  function resetForm() {
    horas = "";
    precioHora = 1500;
    nombreEstudiante = "";
    departamento = "";
  }
</script>

<Button on:click={() => (formModal = true)}>Precio</Button>

<Modal bind:open={formModal} size="lg" autoclose={false} class="w-full">
  <div class="p-4">
    <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">
      Precios
    </h3>
    <div class="grid grid-cols-2 gap-4">
      <div>
        <Label>
          <span>Ingrese Horas</span>
          <Input
            type="text"
            bind:value={horas}
            placeholder="Horas/7:00"
            required
          />
        </Label>
      </div>
      <div>
        <Label>
          <span>Precio-Horas</span>
          <Input
            type="number"
            bind:value={precioHora}
            placeholder="Ingrese precio de horas"
            required
          />
        </Label>
      </div>
      <div>
        <Label>
          <span>Estudiante</span>
          <Input
            type="text"
            bind:value={nombreEstudiante}
            placeholder="Ingrese nombre"
            required
          />
        </Label>
      </div>
      <div>
        <Label>
          <span>Asignar DPTS</span>
          <Select bind:value={departamento} required>
            <option value="">Departamentos</option>
            <option value="dpto1">Mantenimiento</option>
            <option value="dpto2">Oficinas</option>
            <option value="dpto3">Limpieza</option>
            <option value="dpto4">Biblioteca</option>
            <option value="dpto5">COSEVA</option>
            <option value="dpto6">Monitoria</option>
          </Select>
        </Label>
      </div>
    </div>
    <Button on:click={guardar} class="mt-4 w-full bg-green-500 text-white"
      >Guardar</Button
    >
  </div>
</Modal>
