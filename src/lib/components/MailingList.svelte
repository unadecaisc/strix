<script>
  
    import { Button, Modal, Label, Input, Checkbox } from 'flowbite-svelte';
    import { onMount } from 'svelte';
  
    let formModal = false;
    let email = '';
    let name = '';
    let errorMessage = '';
  
    // Function to handle form submission
    async function handleSubmit(event) {
      event.preventDefault();
  
      // Basic validation
      if (!email || !name) {
        errorMessage = 'Please fill in all fields';
        return;
      }
  
      // Clear previous error message
      errorMessage = '';
  
      // Create payload
      const payload = { name, email };
  
      try {
        // Replace 'your-api-endpoint' with the actual endpoint for your mailing list
        const response = await fetch('your-api-endpoint', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });
  
        if (!response.ok) {
          throw new Error('Failed to add to mailing list');
        }
  
        // Reset form and close modal
        name = '';
        email = '';
        formModal = false;
      } catch (error) {
        errorMessage = error.message;
      }
    }
  </script>
  
  <Button on:click={() => (formModal = true)}>Form modal</Button>
  <Modal bind:open={formModal} size="xs" autoclose={false} class="w-full">
    <form class="flex flex-col space-y-6" on:submit={handleSubmit}>
    <div class="modal">
      <div class="modal_Cabecera">
  
        <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Add Notification Email</h3>
        
      </div>
      <hr><br>
      <div class="Modal_Cuerpo" >
        <Label class="space-y-2">
          <span>Name</span>
          <Input type="text" bind:value={name} name="name" placeholder="Your Name" required />
        </Label><br>
        <Label class="space-y-2">
          <span>Email</span>
          <Input type="email" bind:value={email} name="email" placeholder="name@company.com" required />
        </Label>    
      </div>
      <br><hr><br>
      <div Class="Modal_Piernas">
  
        <Button color="green" >Guardar</Button>
        {#if errorMessage}
          <p class="text-red-500">{errorMessage}</p>
        {/if}
      </div>
  
  
    </div>
  
    </form>
  </Modal>
  
  