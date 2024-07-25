import type { ApiPagination, Department, PaginationQuery } from "../types";
import api from "./api-config";

const DEFAULT_ENDPOINT = "/periods";

export type GetDepartmentQuery = PaginationQuery & {};

export async function getDepartment(query?: GetDepartmentQuery) {
  try {
    const result = await api.get<ApiPagination<Department>>(DEFAULT_ENDPOINT, {
      params: query,
    });
    return result.data;
  } catch (error) {
    return null;
  }
}

export async function createDepartment(body: Department) {
  try {
    const result = await api.post<Department>(DEFAULT_ENDPOINT, body);
    return result.data;
  } catch (error) {
    return null;
  }
}

export async function updateDepartment(id: number, body: Department) {
  try {
    const result = await api.put<Department>(`${DEFAULT_ENDPOINT}/${id}`, body);
    return result.data;
  } catch (error) {
    return null;
  }
}
