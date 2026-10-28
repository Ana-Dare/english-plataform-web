import { api } from "../../../services/api";
import type {
  Class,
  CreateClassParams,
  CreateClassRes,
  ListClassesRes,
} from "../../../interfaces/classes";

export interface ClassStudent {
  id: number;
  studentId: number;
  userId: number;
  name: string;
  email: string;
}

interface ApiClass {
  id: number;
  name: string;
  level_id?: number;
  levelId?: number;
  vip?: boolean;
  status?: "active" | "inactive";
  teacher_id?: number;
  teacherId?: number;
  students_quantity?: number;
  studentsQuantity?: number;
}

function mapClass(raw: ApiClass): Class {
  return {
    id: raw.id,
    name: raw.name,
    level_id: raw.level_id ?? raw.levelId ?? 0,
    vip: Boolean(raw.vip),
    status: raw.status === "inactive" ? "inactive" : "active",
    teacher_id: raw.teacher_id ?? raw.teacherId,
    students_count: raw.students_quantity ?? raw.studentsQuantity ?? 0,
  };
}

export async function createClass(
  params: CreateClassParams,
): Promise<CreateClassRes> {
  const res = await api.post<{ class?: ApiClass; id?: number; message?: string }>(
    "/classes",
    params,
  );
  const created = res.data?.class;
  return {
    id: created?.id ?? res.data?.id ?? 0,
    message: res.data?.message ?? "Turma criada com sucesso.",
  };
}

export async function listClasses(): Promise<ListClassesRes> {
  const res = await api.get<{ classes?: ApiClass[] }>("/classes");
  return { classes: (res.data?.classes ?? []).map(mapClass) };
}

export async function getClass(classId: number): Promise<Class> {
  const res = await api.get<{ class: ApiClass }>(`/classes/${classId}`);
  return mapClass(res.data.class);
}

export async function listStudentClasses(studentId: number): Promise<Class[]> {
  const res = await api.get<{ classes?: ApiClass[] }>(
    `/students/${studentId}/classes`,
  );
  return (res.data?.classes ?? []).map(mapClass);
}

export async function updateClassStatus(
  classId: number,
  status: "active" | "inactive",
): Promise<Class> {
  const res = await api.patch<{ class: ApiClass }>(
    `/classes/${classId}/status`,
    { status },
  );
  return mapClass(res.data.class);
}

export async function updateClass(
  classId: number,
  params: Partial<CreateClassParams>,
): Promise<Class> {
  const res = await api.patch<{ class: ApiClass }>(`/classes/${classId}`, params);
  return mapClass(res.data.class);
}

export async function deleteClass(classId: number): Promise<void> {
  await api.delete(`/classes/${classId}`);
}

export async function listClassStudents(
  classId: number,
): Promise<ClassStudent[]> {
  const res = await api.get<{
    students?: Array<{
      id?: number;
      studentId?: number;
      student_id?: number;
      userId?: number;
      user_id?: number;
      name?: string;
      email?: string;
    }>;
  }>(`/classes/${classId}/students`);
  return (res.data?.students ?? []).map((student) => ({
    id: student.id ?? student.studentId ?? student.student_id ?? 0,
    studentId: student.studentId ?? student.student_id ?? student.id ?? 0,
    userId: student.userId ?? student.user_id ?? student.id ?? 0,
    name: student.name ?? "",
    email: student.email ?? "",
  }));
}

export async function addStudentToClass(
  classId: number,
  studentId: number,
): Promise<void> {
  await api.post(`/classes/${classId}/students`, { student_id: studentId });
}

export async function removeStudentFromClass(
  classId: number,
  studentId: number,
): Promise<void> {
  await api.delete(`/classes/${classId}/students/${studentId}`);
}
