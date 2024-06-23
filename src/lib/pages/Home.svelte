<script>
  import { Alert, Button, Card } from "flowbite-svelte";
</script>

<div class="container p-10">
  <h1 class="p-2 font-semibold">Welcome to strix project using tailwind</h1>

  <Alert color="blue">This is a flowbite component</Alert>

  <div class="p-10">
    <Button>Default</Button>
    <Button color="alternative">Alternative</Button>
    <Button color="dark">Dark</Button>
    <Button color="light">Light</Button>
    <Button color="blue">Blue</Button>
    <Button color="green">Green</Button>
    <Button color="red">Red</Button>
    <Button color="yellow">Yellow</Button>
    <Button color="purple">Purple</Button>
  </div>

  <div class="p-10">
    <Card href="/cards">
      <h5
        class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
      >
        Noteworthy technology acquisitions 2021
      </h5>
      <p class="font-normal text-gray-700 dark:text-gray-400 leading-tight">
        Here are the biggest enterprise technology acquisitions of 2021 so far,
        in reverse chronological order.
      </p>
    </Card>
  </div>
</div>
