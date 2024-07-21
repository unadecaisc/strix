<script lang="ts">
  import PageContainer from "$lib/components/PageContainer.svelte";
  import General from "./configurations/General.svelte";
  import type { PageConfigType } from "$lib/components/types";
  import Periods from "./configurations/Periods.svelte";
  import Departments from "./configurations/Departments.svelte";
  import Users from "./configurations/Users.svelte";
  import Roles from "./configurations/Roles.svelte";

  const config: PageConfigType[] = [
    {
      title: "General",
      component: General,
      open: true,
    },
    {
      title: "Departamentos",
      component: Departments,
    },
    {
      title: "Usuarios",
      component: Users,
    },
    {
      title: "Roles",
      component: Roles,
    },
    {
      title: "Periodos",
      component: Periods,
    },
  ];
</script>

<PageContainer tabs={config}></PageContainer>
