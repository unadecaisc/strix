const permissionsList: Record<string, string> = {
  CONFIGURATIONS_READ: "Ver configuraciones",
  CONFIGURATIONS_WRITE: "Editar configuraciones",
  STUDENTS_READ: "Ver estudiantes",
  STUDENTS_WRITE: "Editar estudiantes",
  SCOLARSHIPS_READ: "Ver becas",
  SCOLARSHIPS_WRITE: "Editar becas",
  REQUESTS_READ: "Ver solicitudes",
  REQUESTS_WRITE: "Editar solicitudes",
  WORK_HOURS_READ: "Ver horas beca",
  WORK_HOURS_WRITE: "Editar horas beca",
  ADMIN: "Administrador",
  ASISTANT: "Asistente",
  BOSS: "Jefe de departamento",
};

export function parsePermissionsToName(permission: string): string {
  return permissionsList[permission];
}

export function getAvailablePersmissions(): { value: string; name: string }[] {
  return Object.keys(permissionsList).map((key: string) => ({
    value: key,
    name: permissionsList[key],
  }));
}
