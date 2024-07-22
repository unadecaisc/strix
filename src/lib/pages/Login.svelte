<script lang="ts">
  import { navigate } from "svelte-routing";
  import { InfoCircleSolid } from "flowbite-svelte-icons";
  import { Card, Button, Label, Input, Alert } from "flowbite-svelte";
  import { authenticateUser } from "../services/auth.service";
  import { onMount } from "svelte";
  import { get } from "svelte/store";
  import { isAuthenticated } from "../../stores";

  let email = "";
  let password = "";
  let error = "";

  function handleLogin() {
    authenticateUser(email, password).then((res) => {
      if (res) {
        window.location.assign("/");
      } else {
        error = "Datos Incorrectos";
      }
    });
  }
  onMount(() => {
    if (get(isAuthenticated)) {
      navigate("/");
    }
  });
</script>

<div class=" py-10 flex justify-center items-center h-full w-full">
  <Card class="">
    <form
      class="flex flex-col space-y-6"
      on:submit|preventDefault={handleLogin}
    >
      <h3 class="text-xl font-medium text-gray-900 dark:text-white">
        Bienvenido | Inicia sesión
      </h3>
      <Label class="space-y-2">
        <span>Correo </span>
        <Input
          type="email"
          name="email"
          placeholder="john@mail.com"
          bind:value={email}
          required
        />
      </Label>
      <Label class="space-y-2">
        <span>contraseña</span>
        <Input
          type="password"
          name="password"
          placeholder="•••••"
          required
          bind:value={password}
        />
      </Label>

      <Button color="blue" type="submit" class="w-full">Inciar Sesion</Button>
      {#if error}
        <Alert color="red">
          <InfoCircleSolid slot="icon" class="w-5 h-5" /> {error}</Alert
        >
      {/if}
    </form>
  </Card>
</div>
