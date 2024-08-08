import type {
  ApiPagination,
  PaginationQuery,
  StudentOnDepartment,
} from "../types";
import api from "./api-config";

const DEFAULT_ENDPOINT = "/scholarship-request";

export type GetStudentOnDepartmentQuery = PaginationQuery & {};

export async function getStudentOnDepartment(
  query?: GetStudentOnDepartmentQuery,
) {
  try {
    const result = await api.get<ApiPagination<StudentOnDepartment>>(
      DEFAULT_ENDPOINT,
      {
        params: query,
      },
    );

    return result.data;
  } catch (error) {
    return null;
  }
}

export async function createStudentOnDepartment(body: StudentOnDepartment) {
  try {
    const result = await api.post<StudentOnDepartment>(DEFAULT_ENDPOINT, body);

    return result.data;
  } catch (error) {
    return null;
  }
}

export async function updateStudentOnDepartment(
  id: number,
  body: StudentOnDepartment,
) {
  try {
    const result = await api.put<StudentOnDepartment>(
      `${DEFAULT_ENDPOINT}/${id}`,
      body,
    );

    return result.data;
  } catch (error) {
    return null;
  }
}
