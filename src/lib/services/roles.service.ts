import api from "./api-config";

export async function fetchRoles(query?: any): Promise<any[]> {
  try {
    const response = await api.get("/roles", {
      params: query,
    });

    return [];
  } catch (error) {
    console.error("Error fetching roles:", error);
    return [];
  }
}
