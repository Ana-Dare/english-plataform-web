import { api } from "../../../services/api";
import type {
  ListStudentsRes,
  RegisterStudentParams,
  RegisterStudentRes,
  UpdateStudentParams,
} from "../../../interfaces/students";

export async function registerStudent(
  params: RegisterStudentParams,
  photoBlob?: Blob,
): Promise<RegisterStudentRes> {
  const formData = new FormData();

  // Adiciona todos os parâmetros ao FormData
  formData.append("name", params.name);
  // A API recebe o CPF cru e o hasheia no servidor; enviamos no campo "cpf".
  formData.append("cpf", params.cpf_hash);
  formData.append("email", params.email);
  formData.append("phone", params.phone);
  formData.append("birthdate", params.birthdate);
  formData.append("vip", params.vip.toString());
  formData.append("active", params.active.toString());
  formData.append("level_id", params.level_id.toString());
  if (params.notes) {
    formData.append("notes", params.notes);
  }
  // Turma é opcional: só enviamos class_id quando o aluno for atribuído a uma.
  if (params.class_id != null) {
    formData.append("class_id", params.class_id.toString());
  }

  // Adiciona a foto se fornecida
  if (photoBlob) {
    formData.append("file", photoBlob, "student-photo.jpg");
  }

  const res = await api.post<RegisterStudentRes>("register-student", formData);

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
