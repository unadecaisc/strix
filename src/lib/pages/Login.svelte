<script lang="ts">
  import { login } from './authStore';
  import { navigate } from 'svelte-routing';

  let username = '';
  let password = '';
  let error = '';

  function handleLogin() {
    if (login(username, password)) {
      navigate('/configuraciones');
    } else {
      error = 'Invalid credentials';
    }
  }
</script>

<div class="container mx-auto p-10">
  <h1 class="text-2xl font-bold mb-4">Login</h1>
  {#if error}
    <p class="text-red-500">{error}</p>
  {/if}
  <form on:submit|preventDefault={handleLogin} class="space-y-4">
    <div>
      <label class="block">Username</label>
      <input type="text" bind:value={username} class="border p-2 w-full" />
    </div>
    <div>
      <label class="block">Password</label>
      <input type="password" bind:value={password} class="border p-2 w-full" />
    </div>
    <button type="submit" class="bg-blue-500 text-white p-2 rounded">Login</button>
  </form>
</div>
