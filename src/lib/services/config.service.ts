import type { GlobalSetting, PaginationQuery } from "../types";
import api from "./api-config";

const DEFAULT_ENDPOINT = "/global-configs";

export type GetUsersQuery = PaginationQuery & {};

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

export async function updateConfig(data: GlobalSetting) {
  try {
    const result = await api.put<GlobalSetting>(`${DEFAULT_ENDPOINT}`, data);
    return result.data;
  } catch (error) {
    return null;
  }
}
