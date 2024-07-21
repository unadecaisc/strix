import type {
  ApiPagination,
  GlobalSetting,
  PaginationQuery,
  Pricing,
} from "../types";
import api from "./api-config";

const DEFAULT_ENDPOINT = "/price";

export type GetPricingQuery = PaginationQuery & {};

export async function getPricing(query?: GetPricingQuery) {
  try {
    const result = await api.get<Pricing[]>(DEFAULT_ENDPOINT, {
      params: query,
    });

    return result.data;
  } catch (error) {
    return null;
  }
}

export async function updatePricing(data: Pricing) {
  try {
    const result = await api.put<Pricing>(`${DEFAULT_ENDPOINT}`, data);
    return result.data;
  } catch (error) {
    return null;
  }
}
