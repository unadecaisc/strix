<script>
  import { Button, Modal, Label, Input, Checkbox } from "flowbite-svelte";
  let formModal = false;

  function handleSubmit(event) {
    event.preventDefault();
    // Aquí puedes manejar la lógica para guardar o actualizar los datos
    console.log("Formulario enviado");
  }
</script>

<Button color="blue" on:click={() => (formModal = true)}>Agregar Usuario</Button
>

<Modal bind:open={formModal} size="xs" autoclose={false} class="w-full">
  <form on:submit={handleSubmit} class="flex flex-col space-y-6" action="#">
    <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">
      Agregar Usuario
    </h3>

    <div class="flex flex-wrap justify-between">
      <div class="w-full md:w-1/2">
        <Label class="space-y-2">
          <span>Nombre</span>
          <Input type="text" name="name" placeholder="Nombre" required />
        </Label>
      </div>
      <div class="w-full md:w-1/2">
        <Label class="space-y-2">
          <span>Contraseña</span>
          <Input type="password" name="password" placeholder="•••••" required />
        </Label>
      </div>
    </div>

    <div class="flex flex-wrap justify-between">
      <div class="w-full md:w-1/2">
        <Label class="space-y-2">
          <span>Email</span>
          <Input
            type="email"
            name="email"
            placeholder="name@company.com"
            required
          />
        </Label>
      </div>
      <div class="w-full md:w-1/2">
        <Label class="space-y-2">
          <span>Teléfono</span>
          <Input type="tel" name="phone" placeholder="123-456-7890" required />
        </Label>
      </div>
    </div>

    <div class="flex flex-wrap justify-between">
      <div class="w-full md:w-1/2">
        <Label class="space-y-2">
          <span>Confirmar Contraseña</span>
          <Input
            type="password"
            name="confirmPassword"
            placeholder="•••••"
            required
          />
        </Label>
      </div>
    </div>

    <div class="flex justify-between">
      <Button type="submit" class="w-full md:w-auto">Guardar</Button>
      <Button type="button" class="w-full md:w-auto ml-2">Actualizar</Button>
    </div>
  </form>
</Modal>
