import { A } from "flowbite-svelte";

const replacingWords: Record<string, string> = {
  ADMIN: "Administrador",
  USER: "Usuario",
  GLOBAL: "Global",
  ROLES: "Roles",
  PERIODS: "Períodos",
  DEPARTMENTS: "Departamentos",
  MAILING: "Correos",
  LISTS: "",
  LIST: "",
  USERS: "Usuarios",
  STUDENTS: "Estudiantes",
  SETTINGS: "Configuraciones",
  SETTING: "Configuración",
  READ: "Lectura",
  WRITE: "Escritura",
  DELETE: "Eliminación",
  CREATE: "Creación",
  UPDATE: "Actualización",
};
export function parsePermission(permission: string): {
  value: string;
  name: string;
} {
  const name = permission
    .split("_")
    .map((word) => {
      if (word) {
        const newWord = word[0].toUpperCase() + word.slice(1);
        return replacingWords[newWord] ?? newWord;
      }
      return "";
    })
    .reverse()
    .join(" ");

  return { value: permission, name };
}

export function parseAllPermissions(
  permissions: string[],
): { value: string; name: string }[] {
  return permissions.map(parsePermission);
}
