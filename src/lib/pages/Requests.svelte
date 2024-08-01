<script lang="ts">
  import PageContainer from "$lib/components/PageContainer.svelte";
  import type { PageRequestsType } from "$lib/components/types";
  import Request from "./application/Request.svelte";
  import Students from "./application/Students.svelte";

  const Requests: PageRequestsType[] = [
    {
      title: "Estudiantes",
      component: Students,
      open: true,
    },
    {
      title: "Solitudes",
      component: Request,
    },
  ];
</script>

<PageContainer tabs={Requests}></PageContainer>
