<script>
    import { Alert, Button, Card } from "flowbite-svelte";
</script>

<h1>Configuraciones</h1>

<div class="container p-10">
    <h2 class="text-lg font-semibold mb-4">User Settings</h2>
    <Card>
        <h3 class="text-xl font-bold mb-2">Profile</h3>
        <p class="text-gray-700 dark:text-gray-400 mb-4">
            Update your personal information.
        </p>
        <Button color="blue">Edit Profile</Button>
    </Card>
    
    <h2 class="text-lg font-semibold mt-10 mb-4">Account Settings</h2>
    <Card>
        <h3 class="text-xl font-bold mb-2">Security</h3>
        <p class="text-gray-700 dark:text-gray-400 mb-4">
            Manage your password and security settings.
        </p>
        <Button color="red">Change Password</Button>
    </Card>
    
    
</div>
