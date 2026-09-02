import { api } from "../../../services/api";
import type {
  CreateClassParams,
  CreateClassRes,
  ListClassesRes,
} from "../../../interfaces/classes";

export async function createClass(
  params: CreateClassParams,
): Promise<CreateClassRes> {
  const res = await api.post<CreateClassRes>("/classes", params);

  return res.data ?? { id: 0, message: "" };
}

export async function listClasses(): Promise<ListClassesRes> {
  const res = await api.get<ListClassesRes>("/classes");

  return res.data ?? { classes: [] };
}

export async function deleteClass(classId: number): Promise<void> {
  await api.delete(`/classes/${classId}`);
}

export async function updateClass(
  classId: number,
  params: Partial<CreateClassParams>,
): Promise<void> {
  await api.patch(`/classes/${classId}`, params);
}
