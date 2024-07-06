import api from "./api-config";

const MAILING_LIST_ENDPOINT = "/mailing-list";

export type PaginationQuery = {
  page?: number;
  size?: number;
};

export type GetMailingListQuery = PaginationQuery & {};

export async function getMailingList(query?: GetMailingListQuery) {
  try {
    const result = await api.get(MAILING_LIST_ENDPOINT, {
      params: query,
    });
    return result.data;
  } catch (error) {
    return null;
  }
}

export async function getMailingListItem(id: number) {
  try {
    const result = await api.get(`${MAILING_LIST_ENDPOINT}/${id}`);
    return result.data;
  } catch (error) {
    return null;
  }
}

export async function createMailingListItem(data: any) {
  try {
    const result = await api.post(MAILING_LIST_ENDPOINT, data);
    return result.data;
  } catch (error) {
    return null;
  }
}

export async function updateMailingListItem(id: number, data: any) {
  try {
    const result = await api.put(`${MAILING_LIST_ENDPOINT}/${id}`, data);
    return result.data;
  } catch (error) {
    return null;
  }
}
