import api from "./api-config";

const DEFAULT_ENDPOINT = "/prices";

export type PaginationQuery = {
  page?: number;
  size?: number;
};

export type GetPricesQuery = PaginationQuery & {};

export async function getPrices(query?: GetPricesQuery) {
  try {
    const result = await api.get(DEFAULT_ENDPOINT, {
      params: query,
    });
    return result.data;
  } catch (error) {
    return null;
  }
}

export async function getPrice(id: number) {
  try {
    const result = await api.get(`${DEFAULT_ENDPOINT}/${id}`);
    return result.data;
  } catch (error) {
    return null;
  }
}

export async function createPrice(data: any) {
  try {
    const result = await api.post(DEFAULT_ENDPOINT, data);
    return result.data;
  } catch (error) {
    return null;
  }
}

export async function updatePrice(id: number, data: any) {
  try {
    const result = await api.put(`${DEFAULT_ENDPOINT}/${id}`, data);
    return result.data;
  } catch (error) {
    return null;
  }
}
