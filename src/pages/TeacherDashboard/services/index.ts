import { api } from "../../../services/api";
import type {
  ListStudentsRes,
  RegisterStudentParams,
  RegisterStudentRes,
  UpdateStudentParams,
} from "../types";

export async function registerStudent(
  params: RegisterStudentParams,
): Promise<RegisterStudentRes> {
  const res = await api.post<RegisterStudentRes>("register-student", {
    params,
  });

  return res.data ?? { message: "", student_id: null, invitationSent: false };
}

export async function listStudent(): Promise<ListStudentsRes> {
  const res = await api.get<ListStudentsRes>("/users/students");

  return res.data ?? { students: [] };
}

export async function desactive(userId: number) {
  const res = await api.post(`/users/${userId}`);

  return res.data;
}

export async function updateStudent(
  userId: number,
  params: UpdateStudentParams,
): Promise<void> {
  await api.patch(`/users/${userId}`, params);
}
