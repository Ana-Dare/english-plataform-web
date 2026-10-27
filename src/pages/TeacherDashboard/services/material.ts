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

export type MaterialType =
  | "pdf"
  | "image"
  | "document"
  | "link"
  | "audio"
  | "video"
  | "presentation"
  | "spreadsheet";

export interface LessonMaterial {
  id: number;
  lessonId: number; // 0 ou null para materiais gerais da turma
  classId?: number;
  title: string;
  description?: string | null;
  category: string;
  type: MaterialType;
  link: string;
  file: string;
  fileSize?: number;
  sizeFormatted?: string;
  createdAt?: string;
  isExternalLink?: boolean;
}

export function formatBytes(bytes?: number): string {
  if (!bytes || bytes <= 0) return "--";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

export function parseMaterialDateTime(
  raw?: string,
): { date: string; time?: string } | null {
  if (!raw) return null;
  const d = new Date(raw);
  if (Number.isNaN(d.valueOf())) {
    return { date: raw };
  }
  const date = d.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  const hasTime = raw.includes("T") || raw.includes(":");
  const time = hasTime
    ? d.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      })
    : undefined;
  return { date, time };
}

export function formatMaterialDateTime(raw?: string): string {
  const parsed = parseMaterialDateTime(raw);
  if (!parsed) return "";
  return parsed.time ? `${parsed.date} às ${parsed.time}` : parsed.date;
}

export function detectMaterialType(filename: string): MaterialType {
  const ext = filename.split(".").pop()?.toLowerCase() || "";
  if (ext === "pdf") return "pdf";
  if (["png", "jpg", "jpeg", "webp", "svg", "gif"].includes(ext)) return "image";
  if (["ppt", "pptx", "key"].includes(ext)) return "presentation";
  if (["xls", "xlsx", "csv"].includes(ext)) return "spreadsheet";
  if (["mp3", "wav", "m4a", "ogg"].includes(ext)) return "audio";
  if (["mp4", "mov", "avi", "webm"].includes(ext)) return "video";
  return "document";
}

export const DEFAULT_MATERIAL_CATEGORIES = [
  "Exercício / Atividade",
  "Apostila / Leitura",
  "Gramática",
  "Vocabulário",
  "Vídeo / Multimídia",
  "Áudio / Listening",
  "Conversação / Speaking",
  "Pronúncia / Phonics",
  "Redação / Writing",
  "Outros",
];

const CATEGORIES_STORAGE_KEY = "@App:custom_material_categories";

export function loadCustomCategories(): string[] {
  try {
    const raw = localStorage.getItem(CATEGORIES_STORAGE_KEY);
    if (!raw) return DEFAULT_MATERIAL_CATEGORIES;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return DEFAULT_MATERIAL_CATEGORIES;
    const combined = Array.from(new Set([...DEFAULT_MATERIAL_CATEGORIES, ...parsed]));
    return combined;
  } catch {
    return DEFAULT_MATERIAL_CATEGORIES;
  }
}

export function saveCustomCategory(newCategory: string): string[] {
  try {
    const trimmed = newCategory.trim();
    if (!trimmed) return loadCustomCategories();
    const current = loadCustomCategories();
    if (!current.includes(trimmed)) {
      const updated = [...current, trimmed];
      localStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify(updated));
      return updated;
    }
    return current;
  } catch {
    return DEFAULT_MATERIAL_CATEGORIES;
  }
}

export function getYouTubeOrVimeoEmbed(url: string): string | null {
  if (!url) return null;
  const ytMatch = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/,
  );
  if (ytMatch && ytMatch[1]) {
    return `https://www.youtube.com/embed/${ytMatch[1]}`;
  }
  const vimeoMatch = url.match(
    /vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^\/]*)\/videos\/|album\/(?:\d+)\/video\/|)(\d+)/,
  );
  if (vimeoMatch && vimeoMatch[1]) {
    return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
  }
  return null;
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
