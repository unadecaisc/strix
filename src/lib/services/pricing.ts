import api from "./api-config";

const DEFAULT_ENDPOINT = "/price";

export type Pricing = {
  id?: number;
  price: number;
  active: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};

export async function createPrice(data: Partial<Pricing>) {
  try {
    const result = await api.post<Pricing>(DEFAULT_ENDPOINT, {
      price: data.price || 0,
      active: data.active || false,
    });
    return result.data;
  } catch (error) {
    console.error("Error creating price:", error);
    return null;
  }
}
