import type { ApiPagination, PaginationQuery, Role } from "../types";
import api from "./api-config";

const DEFAULT_ENDPOINT = "/roles";

export type GetRoleQuery = PaginationQuery & {};

export async function getRoles(query?: GetRoleQuery) {
  try {
    const result = await api.get<ApiPagination<Role>>(DEFAULT_ENDPOINT, {
      params: query,
    });

    return result.data;
  } catch (error) {
    return null;
  }
}

export async function createRole(body: Partial<Role>) {
  try {
    const result = await api.post<Role>(DEFAULT_ENDPOINT, body);

    return result.data;
  } catch (error) {
    return null;
  }
}

export async function updateRole(id: number, body: Partial<Role>) {
  try {
    const result = await api.put<Role>(`${DEFAULT_ENDPOINT}/${id}`, body);

    return result.data;
  } catch (error) {
    return null;
  }
}
