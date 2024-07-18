import type { ApiPagination, GlobalSetting, Period } from "../types";
import api from "./api-config";

const DEFAULT_ENDPOINT = "/periods";

export type paginationQuery = {
  page?: number;
  size?: number;
};

export type GetPeriodsQuery = paginationQuery & {};

export async function getPeriods(query?: GetPeriodsQuery) {
  try {
    const result = await api.get<Period[]>(DEFAULT_ENDPOINT, {
      params: query,
    });

    return result.data;
  } catch (error) {
    return null;
  }
}

export async function updateperiods(data: Period) {
  try {
    const result = await api.put<Period>(`${DEFAULT_ENDPOINT}`, data);
    return result.data;
  } catch (error) {
    return null;
  }
}
