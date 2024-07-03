import type { Pagination } from "flowbite-svelte";
import api from "./api-config";

const DEFAULT_ENDPOINT = "/global-settings";

export type paginationQuery = {
  page?: number;
  size?: number;
};

export type GetUsersQuery = paginationQuery & {};

export async function getConfig(query?: GetUsersQuery) {
  try {
    const result = await api.get<GlobalSetting>(DEFAULT_ENDPOINT, {
      params: query,
    });

    return result.data;
  } catch (error) {
    return null;
  }
}

export async function updateUser(id: number, data: any) {
  try {
    const result = await api.put<GlobalSetting>(
      `${DEFAULT_ENDPOINT}/${id}`,
      data,
    );
    return result.data;
  } catch (error) {
    return null;
  }
}
