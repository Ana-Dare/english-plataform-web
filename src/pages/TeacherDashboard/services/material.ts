import { api } from "../../../services/api";

export type LessonStatus = "scheduled" | "completed" | "cancelled";

export interface Lesson {
  id: number;
  classId: number;
  teacherId: number;
  classTeacherId: number;
  title: string;
  description: string | null;
  startTime: string;
  duration: string;
  status: LessonStatus;
  type: "online";
}

export type MaterialType = "pdf" | "image" | "document";

export interface LessonMaterial {
  id: number;
  lessonId: number;
  type: MaterialType;
  link: string;
  file: string;
}

interface ListLessonsRes {
  lessons: Lesson[];
}

interface ListMaterialsRes {
  materials: LessonMaterial[];
}

interface CreateMaterialRes {
  material: LessonMaterial;
}

interface CreateLessonRes {
  lesson: Lesson;
}

export interface CreateLessonParams {
  title: string;
  // Data no formato YYYY-MM-DD.
  date: string;
  // Horário de início no formato HH:MM.
  startTime: string;
  // Horário de término no formato HH:MM.
  endTime: string;
}

// Monta o start_time e a duração HH:MM:SS exigidos pela API a partir dos
// campos de data/horário do formulário.
//
// A API valida start_time com a regex /^\d{4}-\d{2}-\d{2}T/, então mantemos o
// "T". Porém o MySQL (coluna DATETIME) não aceita o sufixo "Z" nem os
// milissegundos do toISOString(), e converter para UTC deslocaria o horário
// local informado pelo professor. Por isso enviamos o horário local no formato
// "YYYY-MM-DDTHH:MM:SS", preservando exatamente o que foi digitado.
function buildLessonPayload(params: CreateLessonParams): {
  title: string;
  start_time: string;
  duration: string;
} {
  const toMinutes = (time: string): number => {
    const [h, m] = time.split(":");
    return Number(h) * 60 + Number(m);
  };

  let diffMinutes = toMinutes(params.endTime) - toMinutes(params.startTime);
  // Se o término for menor ou igual ao início, assume uma aula de 1 hora.
  if (!Number.isFinite(diffMinutes) || diffMinutes <= 0) diffMinutes = 60;

  const hours = String(Math.floor(diffMinutes / 60)).padStart(2, "0");
  const minutes = String(diffMinutes % 60).padStart(2, "0");

  // Normaliza "HH:MM" para "HH:MM:SS".
  const startSeconds =
    params.startTime.length === 5 ? `${params.startTime}:00` : params.startTime;

  return {
    title: params.title,
    start_time: `${params.date}T${startSeconds}`,
    duration: `${hours}:${minutes}:00`,
  };
}

// Lista as aulas de uma turma, ordenadas por data de início.
export async function listClassLessons(classId: number): Promise<Lesson[]> {
  const res = await api.get<ListLessonsRes>("/lessons", {
    params: { class_id: classId },
  });

  return res.data?.lessons ?? [];
}

// Lista os materiais cadastrados para uma aula.
export async function listLessonMaterials(
  lessonId: number,
): Promise<LessonMaterial[]> {
  const res = await api.get<ListMaterialsRes>(`/lessons/${lessonId}/materials`);

  return res.data?.materials ?? [];
}

// Envia um arquivo de material para uma aula (multipart/form-data).
export async function uploadLessonMaterial(
  lessonId: number,
  file: File,
): Promise<LessonMaterial> {
  const formData = new FormData();
  formData.append("file", file);

  const res = await api.post<CreateMaterialRes>(
    `/lessons/${lessonId}/materials`,
    formData,
    { headers: { "Content-Type": "multipart/form-data" } },
  );

  return res.data.material;
}

// Remove um material de uma aula.
export async function deleteLessonMaterial(
  lessonId: number,
  materialId: number,
): Promise<void> {
  await api.delete(`/lessons/${lessonId}/materials/${materialId}`);
}

// Cria uma aula online para a turma.
export async function createClassLesson(
  classId: number,
  params: CreateLessonParams,
): Promise<Lesson> {
  const res = await api.post<CreateLessonRes>(
    `/classes/${classId}/lessons`,
    buildLessonPayload(params),
  );

  return res.data.lesson;
}
