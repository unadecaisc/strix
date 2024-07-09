import type { ApiPagination, MailingList, User } from "../types";
import api from "./api-config";

const DEFAULT_ENDPOINT = "/mailing-list";

export type paginationQuery = {
  page?: number;
  size?: number;
};

export type GetMailingListQuery = paginationQuery & {};

export async function getMailingList(query?: GetMailingListQuery) {
  try {
    const result = await api.get<ApiPagination<MailingList>>(DEFAULT_ENDPOINT, {
      params: query,
    });

    return result.data;
  } catch (error) {
    return null;
  }
}
