import type { ApiPagination, PaginationQuery, Student } from "../types";
import api from "./api-config";

const DEFAULT_ENDPOINT = "/students";

export type GetStudentQuery = PaginationQuery & {};

export async function getStudent(query?: GetStudentQuery) {
  try {
    const result = await api.get<ApiPagination<Student>>(DEFAULT_ENDPOINT, {
      params: query,
    });

    return result.data;
  } catch (error) {
    return null;
  }
}

export async function createStudent(body: Student) {
  try {
    const result = await api.post<Student>(DEFAULT_ENDPOINT, body);

    return result.data;
  } catch (error) {
    return null;
  }
}

export async function updateStudent(id: number, body: Student) {
  try {
    const result = await api.put<Student>(`${DEFAULT_ENDPOINT}/${id}`, body);

    return result.data;
  } catch (error) {
    return null;
  }
}
