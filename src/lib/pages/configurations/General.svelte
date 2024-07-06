<script lang="ts">
  import { Alert } from "flowbite-svelte";
  import { onMount } from "svelte";
  import { getConfig, updateConfig } from "../../services/config.service";
  import GeneralConfigForm from "../../components/GeneralConfigForm.svelte";
  import MailingList from "$lib/components/mailingList.svelte";

  let globalSetting: GlobalSetting | null = null;
  let error: string | null = null;
  let success: string | null = null;
  let isLoading = false;

  function reloadConfig() {
    isLoading = true;
    getConfig().then((res) => {
      globalSetting = res ?? null;
    });
    isLoading = false;
  }

  onMount(async () => {
    reloadConfig();
  });

  function handleUpdate(e: CustomEvent<GlobalSetting>) {
    isLoading = true;
    updateConfig(e.detail)
      .then(() => {
        reloadConfig();
      })
      .then(() => {
        error = null;
        success = "Configuracion actualizada";
      })
      .catch((err) => {
        error = err.message;
      });
    isLoading = false;
  }
</script>

<div class="py-3">
  <h1 class="text-xl font-bold">Configuracion General</h1>
</div>
{#if error}
  <Alert type="error" dismissable>{error}</Alert>
{/if}
{#if success}
  <Alert type="success" dismissable>{success}</Alert>
{/if}
<GeneralConfigForm
  currentState={globalSetting}
  on:update={handleUpdate}
  {isLoading}
></GeneralConfigForm>
<br /><br />
<MailingList />
