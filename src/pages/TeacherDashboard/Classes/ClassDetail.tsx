import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Mail,
  MessageSquare,
  FileText,
  Calendar,
  Users,
  Stethoscope,
  Paperclip,
  Clock,
  CheckCircle,
  MoreHorizontal,
  Plus,
  Download,
  Trash2,
  Video,
  Loader2,
  Check,
  X,
  Eye,
  Edit2,
  Search,
  BookOpen,
  Folder,
  ExternalLink,
  Film,
  Image as ImageIcon,
  Music,
  FileSpreadsheet,
  Presentation,
  Tag,
  UserMinus,
  UserX,
} from "lucide-react";
import { motion } from "framer-motion";
import AddMaterialModal, { type MaterialSubmitData } from "./AddMaterialModal";
import DocumentViewerModal from "./DocumentViewerModal";
import DeleteConfirmModal from "./DeleteConfirmModal";
import AddClassEventModal from "./AddClassEventModal";
import type { ClassEventData } from "./AddClassEventModal";
import EvaluateJustificationModal from "./EvaluateJustificationModal";
import AddStudentToClassModal from "./AddStudentToClassModal";
import CustomDropdown from "../../../components/CustomDropdown";
import useToast from "../../../contexts/Toast/useToast";
import { useStudents } from "../../../contexts/Students/hooks/useStudents";
import { getInitials } from "../../../utils/avatar";
import {
  listClassLessons,
  listLessonMaterials,
  uploadLessonMaterial,
  deleteLessonMaterial,
  createClassLesson,
  formatBytes,
  formatMaterialDateTime,
  loadCustomCategories,
  type Lesson,
  type LessonMaterial,
  type LessonStatus,
} from "../services/material";
import { listClassStudents, type ClassStudent } from "../services/class";
import { listLevels } from "../services/level";
import MobileCarousel from "../../../components/MobileCarousel";
import {
  JustificationList,
  JustificationItem,
  JustificationInfo,
  JustificationStatus,
  ActionGroup,
  JustificationActionBtn,
} from "./style";
import {
  ClassWorkspace,
  ClassBanner,
  ClassBannerTop,
  ClassBannerTitle,
  ClassBannerMeta,
  SoftBadge,
  StudentsCount,
  AvatarStack,
  StackAvatar,
  TabsBar,
  ClassTab,
  WorkspaceBody,
  PanelTitle,
  PanelHeaderRow,
  ComposeRow,
  PublishBtn,
  NoticeList,
  NoticeCard,
  NoticeHead,
  NoticeAuthor,
  IconGhostBtn,
  NoticeText,
  ScheduleCard,
  ScheduleIcon,
  ScheduleCol,
  UpcomingList,
  UpcomingRow,
  DateChip,
  UpcomingInfo,
  UpcomingActions,
  StatusHint,
  HistoryWrap,
  HistoryTable,
  DoneBadge,
  AddPill,
  LessonBlock,
  RowIconBtn,
  StudentList,
  StudentRow,
  StudentRowStatus,
  BackLink,
  MaterialsFilterBar,
  MaterialsFilterGroup,
  MaterialSearchBox,
  MaterialsEmptyState,
  MaterialCard,
  MaterialCardLeft,
  MaterialCardGlyph,
  MaterialCardContent,
  ViewDocPill,
  TeacherSectionWrap,
  TeacherCard,
  TeacherAvatar,
  TeacherBadge,
  EmptyTeacherCard,
} from "./classDetail.styles";

interface ClassDetailProps {
  classData: {
    id?: number;
    name?: string;
    level_id?: number;
  };
  onBack: () => void;
  onNavigateStudent?: (studentId: number, studentData?: any) => void;
  onNavigateRegisterStudent?: (
    turmaId?: number | string,
    turmaName?: string,
  ) => void;
}

type TabId = "mural" | "materiais" | "agenda" | "alunos" | "atestados";

const DEFAULT_STUDENT_PROFILES: Record<
  string,
  { name: string; email: string; color: string; phone?: string; gender?: string }
> = {
  EB: {
    name: "Eduardo Barros",
    email: "eduardo.barros@email.com",
    color: "#8B5CF6",
    phone: "(11) 98765-4321",
    gender: "Masculino",
  },
  GH: {
    name: "Gabriela Helena",
    email: "gabriela.helena@email.com",
    color: "#10B981",
    phone: "(11) 97654-3210",
    gender: "Feminino",
  },
  KO: {
    name: "Kauê Oliveira",
    email: "kaue.oliveira@email.com",
    color: "#C57A67",
    phone: "(11) 96543-2109",
    gender: "Masculino",
  },
  MS: {
    name: "Mariana Santos",
    email: "mariana.santos@email.com",
    color: "#4A72FF",
    phone: "(11) 95432-1098",
    gender: "Feminino",
  },
  AC: {
    name: "Arthur Carvalho",
    email: "arthur.carvalho@email.com",
    color: "#10B981",
    phone: "(11) 94321-0987",
    gender: "Masculino",
  },
  LG: {
    name: "Luiza Gomes",
    email: "luiza.gomes@email.com",
    color: "#C57A67",
    phone: "(11) 93210-9876",
    gender: "Feminino",
  },
  RC: {
    name: "Rafael Costa",
    email: "rafael.costa@email.com",
    color: "#8B5CF6",
    phone: "(11) 92109-8765",
    gender: "Masculino",
  },
  TL: {
    name: "Thiago Lima",
    email: "thiago.lima@email.com",
    color: "#0284C7",
    phone: "(11) 91098-7654",
    gender: "Masculino",
  },
  FB: {
    name: "Fernanda Barbosa",
    email: "fernanda.barbosa@email.com",
    color: "#EC4899",
    phone: "(11) 90987-6543",
    gender: "Feminino",
  },
  AS: {
    name: "Ana Souza",
    email: "ana.souza@email.com",
    color: "#4A72FF",
    phone: "(11) 99876-5432",
    gender: "Feminino",
  },
  LP: {
    name: "Lucas Pereira",
    email: "lucas.pereira@email.com",
    color: "#C57A67",
    phone: "(11) 98765-4321",
    gender: "Masculino",
  },
  DR: {
    name: "Daniela Rocha",
    email: "daniela.rocha@email.com",
    color: "#10B981",
    phone: "(11) 97654-3210",
    gender: "Feminino",
  },
  JL: {
    name: "Juliana Lopes",
    email: "juliana.lopes@email.com",
    color: "#F59E0B",
    phone: "(11) 96543-2109",
    gender: "Feminino",
  },
  MA: {
    name: "Matheus Alves",
    email: "matheus.alves@email.com",
    color: "#0284C7",
    phone: "(11) 95432-1098",
    gender: "Masculino",
  },
  CS: {
    name: "Carlos Silva",
    email: "carlos.silva@email.com",
    color: "#8B5CF6",
    phone: "(11) 94321-0987",
    gender: "Masculino",
  },
  AL: {
    name: "Alexandre Lima",
    email: "alexandre.lima@email.com",
    color: "#4A72FF",
    phone: "(11) 93210-9876",
    gender: "Masculino",
  },
  RT: {
    name: "Renata Teixeira",
    email: "renata.teixeira@email.com",
    color: "#EC4899",
    phone: "(11) 92109-8765",
    gender: "Feminino",
  },
  JP: {
    name: "João Pedro",
    email: "joao.pedro@email.com",
    color: "#F59E0B",
    phone: "(11) 91098-7654",
    gender: "Masculino",
  },
};

// Alunos fictícios usados quando a turma não possui alunos cadastrados no banco.
const DEMO_STUDENTS = [
  {
    id: 1,
    name: "Ana Souza",
    email: "ana.souza@email.com",
    color: "#4A72FF",
    phone: "(11) 99876-5432",
    gender: "Feminino",
  },
  {
    id: 2,
    name: "Lucas Pereira",
    email: "lucas.pereira@email.com",
    color: "#C57A67",
    phone: "(11) 98765-4321",
    gender: "Masculino",
  },
];

const AVATAR_COLORS = [
  "#4A72FF",
  "#C57A67",
  "#10B981",
  "#8B5CF6",
  "#F59E0B",
  "#EC4899",
  "#0284C7",
];

const getAvatarInitials = (name: string): string => {
  if (!name) return "";
  const trimmed = name.trim();
  if (trimmed.length <= 2) return trimmed.toUpperCase();
  return getInitials(trimmed);
};

const WEEKDAYS = [
  "Domingo",
  "Segunda",
  "Terça",
  "Quarta",
  "Quinta",
  "Sexta",
  "Sábado",
];

const MONTHS_SHORT = [
  "JAN",
  "FEV",
  "MAR",
  "ABR",
  "MAI",
  "JUN",
  "JUL",
  "AGO",
  "SET",
  "OUT",
  "NOV",
  "DEZ",
];

const WEEKDAYS_FULL = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
];

function formatLessonLabel(lesson: Lesson): string {
  const date = new Date(lesson.startTime);
  if (Number.isNaN(date.valueOf())) return lesson.title;
  const weekday = WEEKDAYS[date.getDay()];
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const time = date.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return `${lesson.title} — ${weekday}, ${day}/${month} ${time}`;
}

// Soma a duração HH:MM:SS ao horário inicial para obter o fim da aula.
function lessonTimeRange(lesson: Lesson): string {
  const start = new Date(lesson.startTime);
  if (Number.isNaN(start.valueOf())) return "";
  const [h = "0", m = "0"] = lesson.duration.split(":");
  const end = new Date(start.getTime() + (Number(h) * 60 + Number(m)) * 60000);
  const fmt = (d: Date) =>
    d.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
  return `${fmt(start)} – ${fmt(end)}`;
}

interface LessonCardView {
  id: number;
  day: string;
  month: string;
  weekday: string;
  time: string;
  title: string;
  status: LessonStatus;
}

function toLessonCard(lesson: Lesson): LessonCardView {
  const date = new Date(lesson.startTime);
  const valid = !Number.isNaN(date.valueOf());
  return {
    id: lesson.id,
    day: valid ? String(date.getDate()).padStart(2, "0") : "--",
    month: valid ? MONTHS_SHORT[date.getMonth()] : "",
    weekday: valid ? WEEKDAYS_FULL[date.getDay()] : lesson.title,
    time: lessonTimeRange(lesson),
    title: lesson.title,
    status: lesson.status,
  };
}

function getLessonsStorageKey(classId: number) {
  return `@App:class_lessons_${classId}`;
}

function getMaterialsStorageKey(classId: number) {
  return `@App:class_materials_${classId}`;
}

function loadStoredLessons(classId: number): Lesson[] {
  try {
    const raw = localStorage.getItem(getLessonsStorageKey(classId));
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveStoredLessons(classId: number, lessons: Lesson[]) {
  try {
    localStorage.setItem(getLessonsStorageKey(classId), JSON.stringify(lessons));
  } catch (e) {
    console.warn("Failed to save lessons in localStorage:", e);
  }
}

function loadStoredMaterials(classId: number): LessonMaterial[] {
  try {
    const raw = localStorage.getItem(getMaterialsStorageKey(classId));
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveStoredMaterials(classId: number, materials: LessonMaterial[]) {
  try {
    localStorage.setItem(
      getMaterialsStorageKey(classId),
      JSON.stringify(materials),
    );
  } catch (e) {
    console.warn("Failed to save materials in localStorage:", e);
  }
}

function getClassStudentsStorageKey(classId: number) {
  return `@App:class_students_${classId}`;
}

function loadStoredClassStudents(classId: number): ClassStudent[] {
  try {
    const raw = localStorage.getItem(getClassStudentsStorageKey(classId));
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveStoredClassStudents(classId: number, students: ClassStudent[]) {
  try {
    localStorage.setItem(
      getClassStudentsStorageKey(classId),
      JSON.stringify(students),
    );
  } catch (e) {
    console.warn("Failed to save class students in localStorage:", e);
  }
}

function getClassTeacherStorageKey(classId: number) {
  return `@App:class_teacher_${classId}`;
}

function loadStoredClassTeacher(
  classId: number,
): { name: string; email: string } | null {
  try {
    const raw = localStorage.getItem(getClassTeacherStorageKey(classId));
    if (raw === "none") return null;
    return raw
      ? JSON.parse(raw)
      : {
          name: "Prof.ª Lara Charantola",
          email: "lara.charantola@plataforma.com",
        };
  } catch {
    return {
      name: "Prof.ª Lara Charantola",
      email: "lara.charantola@plataforma.com",
    };
  }
}

function saveStoredClassTeacher(
  classId: number,
  teacher: { name: string; email: string } | null,
) {
  try {
    if (teacher === null) {
      localStorage.setItem(getClassTeacherStorageKey(classId), "none");
    } else {
      localStorage.setItem(
        getClassTeacherStorageKey(classId),
        JSON.stringify(teacher),
      );
    }
  } catch (e) {
    console.warn("Failed to save class teacher in localStorage:", e);
  }
}

const CEFR_BY_LEVEL: Record<number, string> = {
  1: "A1",
  2: "A2",
  3: "B1",
  4: "B2",
  5: "C1",
};

const ClassDetail: React.FC<ClassDetailProps> = ({
  classData,
  onBack,
  onNavigateStudent,
  onNavigateRegisterStudent,
}) => {
  const { students, updateStudent } = useStudents();
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState<TabId>("mural");
  const [newPost, setNewPost] = useState("");
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: "Prof.ª Lara Charantola",
      date: "Hoje, 10:32",
      content:
        "Pessoal, nesta aula vamos revisar os tempos verbais após a atividade da aula passada.",
    },
    {
      id: 2,
      author: "Prof.ª Lara Charantola",
      date: "2 set 2026, 19:15",
      content:
        "O material complementar da última aula já está disponível. Recomendo a leitura antes da nossa próxima aula.",
    },
  ]);

  const [showMaterialModal, setShowMaterialModal] = useState(false);
  const [showLessonModal, setShowLessonModal] = useState(false);
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [materials, setMaterials] = useState<LessonMaterial[]>([]);
  const [classStudents, setClassStudents] = useState<ClassStudent[]>([]);
  const [materialsLoading, setMaterialsLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [creatingLesson, setCreatingLesson] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  // Estados para Visualizador de Documentos, Edição, Exclusão e Filtros
  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewerMaterials, setViewerMaterials] = useState<LessonMaterial[]>([]);
  const [viewerInitialId, setViewerInitialId] = useState<number | undefined>(
    undefined,
  );
  const [materialToDelete, setMaterialToDelete] =
    useState<LessonMaterial | null>(null);
  const [editingMaterial, setEditingMaterial] =
    useState<LessonMaterial | null>(null);
  const [defaultMaterialLessonId, setDefaultMaterialLessonId] =
    useState<number>(0);
  const [materialFilterLesson, setMaterialFilterLesson] =
    useState<string>("all");
  const [materialFilterCategory, setMaterialFilterCategory] =
    useState<string>("all");
  const [materialSearchQuery, setMaterialSearchQuery] = useState<string>("");

  const [justifications, setJustifications] = useState([
    {
      id: 1,
      student: "Carlos Silva",
      date: "2026-08-12",
      reason: "Consulta médica de emergência",
      status: "Em Análise",
      document: "atestado_medico.pdf",
      feedback: "",
    },
    {
      id: 2,
      student: "Ana Souza",
      date: "2026-08-05",
      reason: "Exames de sangue",
      status: "Aceito",
      document: "exames_ana.png",
      feedback: "Atestado recebido e abonado.",
    },
  ]);

  const [evaluatingJustification, setEvaluatingJustification] = useState<{
    id: number;
    action: "approve" | "reject";
    student: string;
  } | null>(null);

  const cefr = CEFR_BY_LEVEL[classData.level_id || 2] || "A2";
  const className = classData.name || "Turma Intermediate A";
  const [levelName, setLevelName] = useState<string | null>(null);
  // Identificador efetivo para persistência mesmo em turmas de demonstração
  const effectiveClassId =
    classData.id && classData.id > 0 ? classData.id : 999;
  const canManageLessons = true;

  const displayLevel =
    levelName ||
    (classData as any).level_code ||
    (className.includes("A1")
      ? "Iniciante"
      : className.includes("A2")
      ? "Básico"
      : className.includes("B1")
      ? "Intermediate"
      : className.includes("B2")
      ? "Intermediário Superior"
      : className.includes("C1")
      ? "Avançado"
      : cefr || "Intermediate");

  interface DisplayStudent {
    id: number;
    name: string;
    email: string;
    color: string;
    phone?: string;
    gender?: string;
    level?: string;
    turma?: string;
    isActive?: boolean;
  }

  const [studentToRemove, setStudentToRemove] = useState<DisplayStudent | null>(
    null,
  );
  const [isRemovingStudent, setIsRemovingStudent] = useState(false);
  const [teacherToRemove, setTeacherToRemove] = useState<{
    name: string;
    email: string;
  } | null>(null);
  const [isRemovingTeacher, setIsRemovingTeacher] = useState(false);
  const [classTeacher, setClassTeacher] = useState<{
    name: string;
    email: string;
  } | null>(() => loadStoredClassTeacher(effectiveClassId));

  // Alunos exibidos: reais quando a turma existe com alunos, ou da lista de demonstração.
  const displayStudents: DisplayStudent[] = useMemo(() => {
    if (classStudents.length > 0) {
      return classStudents.map((s: any, i: number) => {
        const matching = students.find(
          (std) =>
            std.id === s.studentId ||
            std.name.toLowerCase() === (s.name || "").toLowerCase(),
        );
        const studentName = s.name || matching?.name || "Aluno";
        return {
          id: s.studentId || s.id || (matching ? matching.id : i + 1),
          name: studentName,
          email:
            s.email ||
            matching?.email ||
            `${studentName.toLowerCase().replace(/[^a-z0-9]/g, ".")}@email.com`,
          color:
            matching?.avatarColor || AVATAR_COLORS[i % AVATAR_COLORS.length],
          phone: matching?.phone,
          gender: (matching as any)?.gender,
          level: matching?.level || displayLevel,
          turma: matching?.turma || className,
          isActive: matching ? matching.isActive : true,
        };
      });
    }

    if ((classData as any).avatars && (classData as any).avatars.length > 0) {
      return (classData as any).avatars.map((av: any, i: number) => {
        const strongColor =
          av.bg &&
          !av.bg.toLowerCase().startsWith("#e") &&
          !av.bg.toLowerCase().startsWith("#f") &&
          !av.bg.toLowerCase().startsWith("#d")
            ? av.bg
            : AVATAR_COLORS[i % AVATAR_COLORS.length];

        const preset = av.initials
          ? DEFAULT_STUDENT_PROFILES[av.initials]
          : null;
        const fallbackName =
          preset?.name ||
          (av.initials === "AS"
            ? "Ana Souza"
            : av.initials === "LP"
            ? "Lucas Pereira"
            : av.name || av.initials || `Aluno ${i + 1}`);

        const matching = students.find(
          (std) =>
            (av.initials && getAvatarInitials(std.name) === av.initials) ||
            std.name.toLowerCase() === fallbackName.toLowerCase(),
        );

        const finalName = matching?.name || preset?.name || fallbackName;
        const finalEmail =
          matching?.email ||
          preset?.email ||
          av.email ||
          `${finalName.toLowerCase().replace(/[^a-z0-9]/g, ".")}@email.com`;
        const finalColor =
          matching?.avatarColor || preset?.color || strongColor;

        return {
          id: matching?.id || 1000 + i + 1,
          name: finalName,
          email: finalEmail,
          color: finalColor,
          phone: matching?.phone || preset?.phone,
          gender: (matching as any)?.gender || preset?.gender,
          level: matching?.level || displayLevel,
          turma: matching?.turma || className,
          isActive: matching ? matching.isActive : true,
        };
      });
    }

    return DEMO_STUDENTS.map((demo) => {
      const matching = students.find(
        (std) => std.name.toLowerCase() === demo.name.toLowerCase(),
      );
      return {
        ...demo,
        id: matching?.id || demo.id,
        level: matching?.level || displayLevel,
        turma: matching?.turma || className,
        isActive: matching ? matching.isActive : true,
      };
    });
  }, [classStudents, classData, students, displayLevel, className]);

  const handleStudentClick = (student: DisplayStudent) => {
    const matching = students.find(
      (s) =>
        s.id === student.id ||
        s.name.toLowerCase() === student.name.toLowerCase(),
    );

    const fullStudentModel = matching || {
      id: student.id,
      name: student.name,
      email: student.email,
      phone: student.phone || "(11) 98765-4321",
      cpf: "123.456.789-00",
      birthdate: "1998-05-15",
      isActive: student.isActive !== false,
      avatarColor: student.color,
      level: student.level || displayLevel,
      turma: student.turma || className,
      progress: 75,
      enrollDate: "10/02/2026",
      observations: "Aluno matriculado nesta turma.",
      plan: 1,
      frequency: "Semanal",
      gender: student.gender || "Não informado",
    };

    if (onNavigateStudent) {
      onNavigateStudent(fullStudentModel.id, fullStudentModel);
    }
  };

  const handleStudentEnrolled = (enrolledStudent: any) => {
    setClassStudents((prev) => {
      const baseList = prev.length > 0 ? prev : (displayStudents as any[]);
      const exists = baseList.some(
        (s: any) =>
          s.id === enrolledStudent.id ||
          (s.studentId && s.studentId === enrolledStudent.id) ||
          s.name.toLowerCase() === enrolledStudent.name.toLowerCase(),
      );
      if (exists) {
        return prev;
      }
      const newEntry: ClassStudent = {
        id: enrolledStudent.id,
        studentId: enrolledStudent.id,
        userId: enrolledStudent.id,
        name: enrolledStudent.name,
        email: enrolledStudent.email,
      };
      const updated = [...baseList, newEntry];
      saveStoredClassStudents(effectiveClassId, updated);
      return updated;
    });
  };

  const handleConfirmRemoveStudent = () => {
    if (!studentToRemove) return;
    setIsRemovingStudent(true);
    try {
      const studentId = studentToRemove.id;
      const studentName = studentToRemove.name;

      // 1. Desvincular no contexto geral de estudantes (se existir)
      const matchingContextStudent = students.find(
        (std) =>
          std.id === studentId ||
          std.name.toLowerCase() === studentName.toLowerCase(),
      );
      if (matchingContextStudent) {
        updateStudent(matchingContextStudent.id, {
          class_id: null,
        });
      }

      // 2. Atualizar lista de alunos da turma e persistir no localStorage
      setClassStudents((prev) => {
        const baseList = prev.length > 0 ? prev : (displayStudents as any[]);
        const updated = baseList.filter(
          (s: any) =>
            s.id !== studentId &&
            s.studentId !== studentId &&
            s.name.toLowerCase() !== studentName.toLowerCase(),
        );
        saveStoredClassStudents(effectiveClassId, updated);
        return updated;
      });

      addToast(
        `Aluno(a) "${studentName}" foi removido(a) da turma com sucesso!`,
        "success",
      );
      setStudentToRemove(null);
    } catch (e) {
      console.error("Erro ao remover aluno da turma:", e);
      addToast("Não foi possível remover o aluno da turma.", "error");
    } finally {
      setIsRemovingStudent(false);
    }
  };

  const handleConfirmRemoveTeacher = () => {
    if (!teacherToRemove) return;
    setIsRemovingTeacher(true);
    try {
      setClassTeacher(null);
      saveStoredClassTeacher(effectiveClassId, null);
      addToast(
        `Professora "${teacherToRemove.name}" foi desvinculada desta turma.`,
        "success",
      );
      setTeacherToRemove(null);
    } catch (e) {
      console.error("Erro ao desvincular professora:", e);
      addToast("Não foi possível desvincular a professora da turma.", "error");
    } finally {
      setIsRemovingTeacher(false);
    }
  };

  const handleAssignTeacher = () => {
    const defaultTeacher = {
      name: "Prof.ª Lara Charantola",
      email: "lara.charantola@plataforma.com",
    };
    setClassTeacher(defaultTeacher);
    saveStoredClassTeacher(effectiveClassId, defaultTeacher);
    addToast("Professora vinculada com sucesso à turma!", "success");
  };

  const lessonOptions = useMemo(
    () =>
      lessons.map((lesson) => ({
        id: String(lesson.id),
        label: lesson.title,
        selectLabel: formatLessonLabel(lesson),
      })),
    [lessons],
  );

  const filterLessonOptions = useMemo(
    () => [
      { value: "all", label: "Todas as aulas e materiais gerais" },
      { value: "general", label: "Materiais Gerais da Turma" },
      ...lessons.map((l) => ({
        value: String(l.id),
        label: l.title,
      })),
    ],
    [lessons],
  );

  const filterCategoryOptions = useMemo(() => {
    const loadedCategories = loadCustomCategories();
    const categoriesFromMaterials = materials
      .map((m) => m.category)
      .filter(Boolean);
    const unique = Array.from(
      new Set([...loadedCategories, ...categoriesFromMaterials]),
    );
    return [
      { value: "all", label: "Todas as categorias" },
      ...unique.map((cat) => ({
        value: cat,
        label: cat,
      })),
    ];
  }, [materials, showMaterialModal]);

  // Filtro inteligente de materiais
  const filteredMaterials = useMemo(() => {
    return materials.filter((m) => {
      if (materialFilterLesson === "general" && m.lessonId !== 0) return false;
      if (
        materialFilterLesson !== "all" &&
        materialFilterLesson !== "general" &&
        String(m.lessonId) !== materialFilterLesson
      ) {
        return false;
      }

      if (
        materialFilterCategory !== "all" &&
        m.category !== materialFilterCategory
      ) {
        return false;
      }

      if (materialSearchQuery.trim()) {
        const q = materialSearchQuery.toLowerCase().trim();
        const matchTitle = (m.title || "").toLowerCase().includes(q);
        const matchFile = (m.file || "").toLowerCase().includes(q);
        const matchDesc = (m.description || "").toLowerCase().includes(q);
        const matchCat = (m.category || "").toLowerCase().includes(q);
        if (!matchTitle && !matchFile && !matchDesc && !matchCat) return false;
      }

      return true;
    });
  }, [
    materials,
    materialFilterLesson,
    materialFilterCategory,
    materialSearchQuery,
  ]);

  const generalMaterials = useMemo(() => {
    return filteredMaterials.filter((m) => !m.lessonId || m.lessonId === 0);
  }, [filteredMaterials]);

  const lessonsWithMaterials = useMemo(() => {
    return lessons.map((lesson) => ({
      lesson,
      items: filteredMaterials.filter((m) => m.lessonId === lesson.id),
    }));
  }, [lessons, filteredMaterials]);

  // Aulas agendadas, exibidas em "Próximas Aulas".
  const upcoming = useMemo(
    () => lessons.filter((l) => l.status === "scheduled").map(toLessonCard),
    [lessons],
  );

  // Aulas já realizadas ou canceladas, exibidas no "Histórico de Aulas".
  const history = useMemo(() => {
    return lessons
      .filter((l) => l.status === "completed" || l.status === "cancelled")
      .map((l) => {
        const date = new Date(l.startTime);
        const valid = !Number.isNaN(date.valueOf());
        return {
          id: l.id,
          date: valid
            ? date.toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })
            : "--",
          time: lessonTimeRange(l),
          title: l.title,
          status: l.status === "cancelled" ? "Cancelada" : "Concluída",
        };
      });
  }, [lessons]);

  const loadLessonsAndMaterials = useCallback(
    async (classId: number) => {
      setMaterialsLoading(true);
      try {
        let classLessons: Lesson[] = [];
        let students: ClassStudent[] = [];

        if (classData.id && classData.id > 0) {
          try {
            const [resLessons, resStudents] = await Promise.all([
              listClassLessons(classData.id),
              listClassStudents(classData.id),
            ]);
            classLessons = resLessons;
            students = resStudents;
          } catch (e) {
            console.warn("API load fallback to local storage:", e);
          }
        }

        const storedLessons = loadStoredLessons(classId);
        const allLessonsMap = new Map<number, Lesson>();
        storedLessons.forEach((l) => allLessonsMap.set(l.id, l));
        classLessons.forEach((l) => allLessonsMap.set(l.id, l));
        const combinedLessons = Array.from(allLessonsMap.values()).sort(
          (a, b) =>
            new Date(a.startTime).getTime() - new Date(b.startTime).getTime(),
        );

        setLessons(combinedLessons);
        const storedStudents = loadStoredClassStudents(classId);
        if (storedStudents.length > 0) {
          setClassStudents(storedStudents);
        } else if (students.length > 0) {
          setClassStudents(students);
        }
        const storedTeacher = loadStoredClassTeacher(classId);
        setClassTeacher(storedTeacher);

        let apiMaterials: LessonMaterial[] = [];
        if (classData.id && classData.id > 0 && classLessons.length > 0) {
          try {
            const perLesson = await Promise.all(
              classLessons.map((lesson) => listLessonMaterials(lesson.id)),
            );
            apiMaterials = perLesson.flat();
          } catch (e) {
            console.warn("API materials load fallback:", e);
          }
        }

        const storedMaterials = loadStoredMaterials(classId);
        const allMaterialsMap = new Map<number, LessonMaterial>();
        storedMaterials.forEach((m) => allMaterialsMap.set(m.id, m));
        apiMaterials.forEach((m) => allMaterialsMap.set(m.id, m));

        setMaterials(Array.from(allMaterialsMap.values()));
      } catch {
        addToast("Não foi possível carregar os dados da turma.", "error");
      } finally {
        setMaterialsLoading(false);
      }
    },
    [addToast, classData.id],
  );

  // Busca o nome real do nível da turma para exibir no banner.
  useEffect(() => {
    const levelId = classData.level_id;
    if (!levelId) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLevelName(null);
      return;
    }
    let active = true;
    (async () => {
      try {
        const { levels } = await listLevels();
        if (!active) return;
        const match = levels.find((l) => l.id === levelId);
        setLevelName(match?.name ?? null);
      } catch {
        if (active) setLevelName(null);
      }
    })();
    return () => {
      active = false;
    };
  }, [classData.level_id]);

  useEffect(() => {
    let active = true;
    (async () => {
      if (active) await loadLessonsAndMaterials(effectiveClassId);
    })();
    return () => {
      active = false;
    };
  }, [effectiveClassId, loadLessonsAndMaterials]);

  const handleCreateLesson = async (data: ClassEventData) => {
    setCreatingLesson(true);
    try {
      let lesson: Lesson;
      if (classData.id && classData.id > 0) {
        try {
          lesson = await createClassLesson(classData.id, {
            title: data.title,
            date: data.date,
            startTime: data.startTime,
            endTime: data.endTime,
          });
        } catch (err) {
          console.warn("API lesson create fallback:", err);
          lesson = {
            id: Date.now(),
            classId: effectiveClassId,
            teacherId: 1,
            classTeacherId: 1,
            title: data.title,
            description: null,
            startTime: `${data.date}T${data.startTime}:00`,
            duration: "01:00:00",
            status: "scheduled",
            type: "online",
          };
        }
      } else {
        lesson = {
          id: Date.now(),
          classId: effectiveClassId,
          teacherId: 1,
          classTeacherId: 1,
          title: data.title,
          description: null,
          startTime: `${data.date}T${data.startTime}:00`,
          duration: "01:00:00",
          status: "scheduled",
          type: "online",
        };
      }

      setLessons((prev) => {
        const updated = [...prev, lesson].sort(
          (a, b) =>
            new Date(a.startTime).getTime() - new Date(b.startTime).getTime(),
        );
        saveStoredLessons(effectiveClassId, updated);
        return updated;
      });
      addToast("Aula agendada com sucesso!", "success");
      setShowLessonModal(false);
    } catch {
      addToast("Não foi possível agendar a aula. Tente novamente.", "error");
    } finally {
      setCreatingLesson(false);
    }
  };

  const handleOpenViewer = (
    materialsToView: LessonMaterial[],
    initialId?: number,
  ) => {
    if (!materialsToView || materialsToView.length === 0) {
      addToast("Nenhum documento disponível para visualização.", "info");
      return;
    }
    setViewerMaterials(materialsToView);
    setViewerInitialId(initialId ?? materialsToView[0]?.id);
    setViewerOpen(true);
  };

  const handleDownloadMaterial = (material: LessonMaterial) => {
    if (material.isExternalLink || material.type === "link") {
      window.open(material.link, "_blank", "noopener,noreferrer");
      return;
    }

    try {
      const a = document.createElement("a");
      a.href = material.link;
      a.download = material.file || `${material.title || "documento"}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      addToast(
        `Download de "${material.file || material.title}" iniciado.`,
        "success",
      );
    } catch (err) {
      console.error("Error downloading file:", err);
      window.open(material.link, "_blank");
    }
  };

  const handleDeleteClick = (material: LessonMaterial) => {
    setMaterialToDelete(material);
  };

  const handleConfirmDelete = async () => {
    if (!materialToDelete) return;
    setDeletingId(materialToDelete.id);
    try {
      if (classData.id && classData.id > 0 && materialToDelete.lessonId > 0) {
        try {
          await deleteLessonMaterial(
            materialToDelete.lessonId,
            materialToDelete.id,
          );
        } catch (err) {
          console.warn("API delete fallback:", err);
        }
      }
      setMaterials((prev) => {
        const updated = prev.filter((m) => m.id !== materialToDelete.id);
        saveStoredMaterials(effectiveClassId, updated);
        return updated;
      });
      addToast("Material excluído com sucesso.", "success");
    } catch {
      addToast("Não foi possível excluir o material.", "error");
    } finally {
      setDeletingId(null);
      setMaterialToDelete(null);
    }
  };

  const handleSaveMaterial = async (data: MaterialSubmitData) => {
    setUploading(true);
    try {
      if (data.existingId && data.items.length > 0) {
        // Modo de edição de material existente
        const firstItem = data.items[0];
        let fileUrl = firstItem.externalLink || "";
        let fileName = firstItem.file?.name || firstItem.title;
        let fileSize = firstItem.file?.size || firstItem.fileSize || 0;
        let sizeFormatted =
          firstItem.sizeFormatted ||
          (fileSize > 0 ? formatBytes(fileSize) : "Link externo");

        if (firstItem.file) {
          fileUrl = await new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = () => resolve(URL.createObjectURL(firstItem.file!));
            reader.readAsDataURL(firstItem.file!);
          });
        }

        setMaterials((prev) => {
          const updated = prev.map((m) => {
            if (m.id === data.existingId) {
              return {
                ...m,
                title: data.title,
                description: data.description,
                category: data.category,
                lessonId: data.lessonId,
                type: firstItem.type,
                link: fileUrl || m.link,
                file: fileName || m.file,
                fileSize: fileSize || m.fileSize,
                sizeFormatted: sizeFormatted || m.sizeFormatted,
                isExternalLink: !firstItem.file && !!firstItem.externalLink,
              };
            }
            return m;
          });
          saveStoredMaterials(effectiveClassId, updated);
          return updated;
        });
        addToast("Material atualizado com sucesso!", "success");
      } else {
        // Criando 1 ou múltiplos materiais adicionados pela professora
        const createdMaterials: LessonMaterial[] = [];

        for (let i = 0; i < data.items.length; i++) {
          const item = data.items[i];
          let fileUrl = item.externalLink || "";
          let fileName = item.file?.name || item.title;
          let fileSize = item.file?.size || item.fileSize || 0;
          let sizeFormatted =
            item.sizeFormatted ||
            (fileSize > 0 ? formatBytes(fileSize) : "Recurso online");

          if (item.file) {
            fileUrl = await new Promise<string>((resolve) => {
              const reader = new FileReader();
              reader.onload = () => resolve(reader.result as string);
              reader.onerror = () => resolve(URL.createObjectURL(item.file!));
              reader.readAsDataURL(item.file!);
            });
          }

          const itemTitle =
            data.items.length === 1
              ? data.title
              : item.title && item.title !== data.title
              ? `${data.title} — ${item.title}`
              : `${data.title} (${i + 1})`;

          const newMat: LessonMaterial = {
            id: Date.now() + i,
            lessonId: data.lessonId,
            title: itemTitle,
            description: data.description,
            category: data.category,
            file: fileName || itemTitle,
            link: fileUrl,
            type: item.type,
            fileSize: fileSize,
            sizeFormatted: sizeFormatted,
            createdAt: new Date().toISOString(),
            isExternalLink: !item.file && !!item.externalLink,
          };

          if (
            classData.id &&
            classData.id > 0 &&
            data.lessonId > 0 &&
            item.file
          ) {
            try {
              await uploadLessonMaterial(data.lessonId, item.file);
            } catch (e) {
              console.warn("API upload fallback to local storage:", e);
            }
          }

          createdMaterials.push(newMat);
        }

        setMaterials((prev) => {
          const updated = [...createdMaterials, ...prev];
          saveStoredMaterials(effectiveClassId, updated);
          return updated;
        });

        addToast(
          createdMaterials.length > 1
            ? `${createdMaterials.length} conteúdos publicados com sucesso!`
            : "Material publicado com sucesso!",
          "success",
        );
      }

      setShowMaterialModal(false);
      setEditingMaterial(null);
    } catch (error) {
      console.error("Error saving material:", error);
      addToast("Erro ao salvar material. Tente novamente.", "error");
    } finally {
      setUploading(false);
    }
  };

  const renderMaterialGlyph = (type: string) => {
    switch (type) {
      case "pdf":
        return (
          <MaterialCardGlyph $type="pdf" title="Documento PDF">
            <FileText size={20} />
          </MaterialCardGlyph>
        );
      case "presentation":
        return (
          <MaterialCardGlyph
            $type="presentation"
            title="Apresentação PPT / Slides"
          >
            <Presentation size={20} />
          </MaterialCardGlyph>
        );
      case "spreadsheet":
        return (
          <MaterialCardGlyph $type="spreadsheet" title="Planilha Excel">
            <FileSpreadsheet size={20} />
          </MaterialCardGlyph>
        );
      case "image":
        return (
          <MaterialCardGlyph $type="image" title="Imagem">
            <ImageIcon size={20} />
          </MaterialCardGlyph>
        );
      case "video":
        return (
          <MaterialCardGlyph $type="video" title="Vídeo">
            <Film size={20} />
          </MaterialCardGlyph>
        );
      case "audio":
        return (
          <MaterialCardGlyph $type="audio" title="Áudio">
            <Music size={20} />
          </MaterialCardGlyph>
        );
      case "link":
        return (
          <MaterialCardGlyph $type="link" title="Link externo">
            <ExternalLink size={20} />
          </MaterialCardGlyph>
        );
      default:
        return (
          <MaterialCardGlyph $type="document" title="Documento">
            <FileText size={20} />
          </MaterialCardGlyph>
        );
    }
  };

  const handleCreatePost = () => {
    if (!newPost.trim()) return;
    setPosts([
      {
        id: Date.now(),
        author: "Prof.ª Lara Charantola",
        date: "Agora",
        content: newPost,
      },
      ...posts,
    ]);
    setNewPost("");
  };

  const handleEvaluateJustification = (message: string) => {
    if (!evaluatingJustification) return;
    const { id, action } = evaluatingJustification;
    const newStatus = action === "approve" ? "Aceito" : "Recusado";
    setJustifications((prev) =>
      prev.map((j) =>
        j.id === id ? { ...j, status: newStatus, feedback: message } : j,
      ),
    );
    addToast(
      `Atestado ${newStatus.toLowerCase()} com sucesso! Feedback enviado ao aluno.`,
      "success",
    );
    setEvaluatingJustification(null);
  };

  const tabs: { id: TabId; label: string; icon: React.ReactNode }[] = [
    { id: "mural", label: "Mural de Avisos", icon: <MessageSquare /> },
    { id: "materiais", label: "Materiais & atividades", icon: <FileText /> },
    { id: "agenda", label: "Agenda da Turma", icon: <Calendar /> },
    { id: "alunos", label: "Alunos da Turma", icon: <Users /> },
    { id: "atestados", label: "Atestados Médicos", icon: <Stethoscope /> },
  ];

  return (
    <ClassWorkspace>
      <ClassBanner>
        <ClassBannerTop>
          <BackLink onClick={onBack}>
            <ArrowLeft size={16} /> Voltar para turmas
          </BackLink>
          <ClassBannerTitle>{className}</ClassBannerTitle>
          <ClassBannerMeta>
            <SoftBadge $bgColor={(classData as any).level_color || "#C57A67"}>
              {displayLevel}
            </SoftBadge>
            <StudentsCount>
              <AvatarStack>
                {displayStudents.slice(0, 5).map((s, i) => (
                  <StackAvatar key={s.id} $color={s.color} $index={i}>
                    {getAvatarInitials(s.name)}
                  </StackAvatar>
                ))}
              </AvatarStack>
              <span>
                {displayStudents.length}{" "}
                {displayStudents.length === 1 ? "aluno" : "alunos"}
              </span>
            </StudentsCount>
          </ClassBannerMeta>
        </ClassBannerTop>
      </ClassBanner>

      <TabsBar>
        <MobileCarousel gap="clamp(1rem, 2.5vw, 2rem)" mobileGap="1.25rem">
          {tabs.map((tab) => (
            <ClassTab
              key={tab.id}
              $active={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.icon}
              {tab.label}
            </ClassTab>
          ))}
        </MobileCarousel>
      </TabsBar>

      <WorkspaceBody>
        {activeTab === "mural" && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <PanelTitle>Avisos para a turma</PanelTitle>
            <ComposeRow>
              <input
                placeholder="Escreva um aviso para a turma..."
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleCreatePost()}
              />
              <PublishBtn onClick={handleCreatePost}>Publicar</PublishBtn>
            </ComposeRow>
            <NoticeList>
              {posts.map((post) => (
                <NoticeCard key={post.id}>
                  <NoticeHead>
                    <NoticeAuthor>
                      <div className="avatar">{getInitials(post.author)}</div>
                      <div>
                        <strong>{post.author}</strong>
                        <span>{post.date}</span>
                      </div>
                    </NoticeAuthor>
                    <IconGhostBtn
                      type="button"
                      aria-label="Mais opções"
                      onClick={() =>
                        setPosts((prev) => prev.filter((p) => p.id !== post.id))
                      }
                    >
                      <MoreHorizontal size={18} />
                    </IconGhostBtn>
                  </NoticeHead>
                  <NoticeText>{post.content}</NoticeText>
                </NoticeCard>
              ))}
            </NoticeList>
          </motion.div>
        )}

        {activeTab === "materiais" && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <PanelHeaderRow style={{ marginBottom: "1.25rem" }}>
              <div>
                <PanelTitle style={{ margin: 0 }}>
                  Materiais & atividades
                </PanelTitle>
                <p
                  style={{
                    margin: "0.25rem 0 0",
                    fontSize: "0.85rem",
                    color: "#64748b",
                  }}
                >
                  Publique e visualize materiais, apostilas, exercícios e links para sua turma.
                </p>
              </div>
              <AddPill
                onClick={() => {
                  setEditingMaterial(null);
                  setDefaultMaterialLessonId(
                    materialFilterLesson !== "all" &&
                      materialFilterLesson !== "general"
                      ? Number(materialFilterLesson)
                      : 0,
                  );
                  setShowMaterialModal(true);
                }}
              >
                <Plus size={15} /> Adicionar material
              </AddPill>
            </PanelHeaderRow>

            {/* Filtros e Busca de Materiais */}
            {(lessons.length > 0 || materials.length > 0) && (
              <MaterialsFilterBar>
                <MaterialSearchBox>
                  <Search size={16} />
                  <input
                    type="text"
                    placeholder="Pesquisar material..."
                    value={materialSearchQuery}
                    onChange={(e) => setMaterialSearchQuery(e.target.value)}
                  />
                  {materialSearchQuery && (
                    <button
                      type="button"
                      onClick={() => setMaterialSearchQuery("")}
                      style={{
                        background: "transparent",
                        border: "none",
                        cursor: "pointer",
                        padding: "2px",
                        display: "flex",
                        color: "#94a3b8",
                      }}
                    >
                      <X size={14} />
                    </button>
                  )}
                </MaterialSearchBox>

                <MaterialsFilterGroup>
                  <MobileCarousel>
                    <CustomDropdown
                      value={materialFilterLesson}
                      onChange={(val) => setMaterialFilterLesson(val)}
                      options={filterLessonOptions}
                      placeholder="Filtrar por aula"
                    />
                    <CustomDropdown
                      value={materialFilterCategory}
                      onChange={(val) => setMaterialFilterCategory(val)}
                      options={filterCategoryOptions}
                      menuAlign="right"
                      placeholder="Categoria"
                    />
                    {(materialFilterLesson !== "all" ||
                      materialFilterCategory !== "all" ||
                      materialSearchQuery.trim() !== "") && (
                      <button
                        type="button"
                        onClick={() => {
                          setMaterialFilterLesson("all");
                          setMaterialFilterCategory("all");
                          setMaterialSearchQuery("");
                        }}
                        style={{
                          background: "transparent",
                          border: "none",
                          color: "#ef4444",
                          fontSize: "0.8125rem",
                          fontWeight: 600,
                          fontFamily: "'Rubik', sans-serif",
                          cursor: "pointer",
                          whiteSpace: "nowrap",
                          padding: "0.35rem 0.5rem",
                          borderRadius: "999px",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.25rem",
                          flexShrink: 0,
                        }}
                      >
                        <X size={14} />
                        Limpar filtro
                      </button>
                    )}
                  </MobileCarousel>
                </MaterialsFilterGroup>
              </MaterialsFilterBar>
            )}

            {materialsLoading ? (
              <LessonBlock>
                <p
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    color: "#64748b",
                  }}
                >
                  <Loader2 size={16} className="spin" /> Carregando materiais...
                </p>
              </LessonBlock>
            ) : lessons.length === 0 && materials.length === 0 ? (
              /* Caso ainda não existam aulas: mensagem informativa + 2 opções claras */
              <MaterialsEmptyState>
                <div className="icon-wrapper">
                  <BookOpen size={28} />
                </div>
                <h4>Nenhuma aula ou material cadastrado</h4>
                <p>
                  Esta turma ainda não possui aulas agendadas nem materiais publicados.
                  Você pode agendar a primeira aula ou publicar materiais gerais diretamente para a turma.
                </p>
                <div className="buttons-row">
                  <AddPill
                    onClick={() => setShowLessonModal(true)}
                    disabled={creatingLesson}
                  >
                    <Plus size={15} /> Agendar aula
                  </AddPill>
                  <AddPill
                    style={{ background: "#C57A67" }}
                    onClick={() => {
                      setEditingMaterial(null);
                      setDefaultMaterialLessonId(0);
                      setShowMaterialModal(true);
                    }}
                  >
                    <Plus size={15} /> Adicionar materiais gerais à turma
                  </AddPill>
                </div>
              </MaterialsEmptyState>
            ) : filteredMaterials.length === 0 ? (
              <MaterialsEmptyState>
                <div className="icon-wrapper">
                  <Search size={26} />
                </div>
                <h4>Nenhum material encontrado</h4>
                <p>
                  Nenhum material corresponde aos filtros de busca selecionados.
                  Tente ajustar os filtros ou pesquisar outro termo.
                </p>
                <div className="buttons-row">
                  <button
                    type="button"
                    onClick={() => {
                      setMaterialFilterLesson("all");
                      setMaterialFilterCategory("all");
                      setMaterialSearchQuery("");
                    }}
                    style={{
                      padding: "0.5rem 1.25rem",
                      background: "#1F2B45",
                      color: "#fff",
                      border: "none",
                      borderRadius: "999px",
                      fontWeight: 600,
                      fontSize: "0.85rem",
                      cursor: "pointer",
                    }}
                  >
                    Limpar filtros
                  </button>
                </div>
              </MaterialsEmptyState>
            ) : (
              <>
                {/* 1. Materiais Gerais da Turma */}
                {(materialFilterLesson === "all" ||
                  materialFilterLesson === "general") &&
                  generalMaterials.length > 0 && (
                    <LessonBlock key="general-materials">
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          flexWrap: "wrap",
                          gap: "0.5rem",
                          marginBottom: "0.85rem",
                        }}
                      >
                        <h3 style={{ margin: 0 }}>
                          <Folder size={18} color="#C57A67" /> Materiais Gerais da
                          Turma
                          <span
                            style={{
                              fontSize: "0.8rem",
                              color: "#64748b",
                              fontWeight: 500,
                            }}
                          >
                            ({generalMaterials.length}{" "}
                            {generalMaterials.length === 1
                              ? "documento"
                              : "documentos"}
                            )
                          </span>
                        </h3>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                          }}
                        >
                          <ViewDocPill
                            style={{ height: "32px", fontSize: "0.78rem" }}
                            onClick={() =>
                              handleOpenViewer(
                                generalMaterials,
                                generalMaterials[0].id,
                              )
                            }
                          >
                            <Eye size={13} /> Visualizar documentos (
                            {generalMaterials.length})
                          </ViewDocPill>
                          <button
                            type="button"
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "0.3rem",
                              background: "transparent",
                              border: "1.5px dashed #cbd5e1",
                              borderRadius: "999px",
                              padding: "0.3rem 0.75rem",
                              fontSize: "0.78rem",
                              color: "#1f2b45",
                              fontWeight: 600,
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              setEditingMaterial(null);
                              setDefaultMaterialLessonId(0);
                              setShowMaterialModal(true);
                            }}
                          >
                            <Plus size={13} /> Adicionar geral
                          </button>
                        </div>
                      </div>

                      {generalMaterials.map((mat) => (
                        <MaterialCard key={mat.id}>
                          <MaterialCardLeft>
                            {renderMaterialGlyph(mat.type)}
                            <MaterialCardContent>
                              <h4 title={mat.title || mat.file}>
                                {mat.title || mat.file}
                              </h4>
                              {mat.description && (
                                <p className="desc">{mat.description}</p>
                              )}
                              <div className="badges-line">
                                <span
                                  style={{
                                    background: "#f1f5f9",
                                    color: "#475569",
                                    padding: "0.15rem 0.55rem",
                                    borderRadius: "999px",
                                    fontSize: "0.72rem",
                                    fontWeight: 600,
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "0.25rem",
                                  }}
                                >
                                  <Tag size={11} /> {mat.category || "Geral"}
                                </span>
                                <span
                                  style={{
                                    background: "#eef2f9",
                                    color: "#1F2B45",
                                    padding: "0.15rem 0.55rem",
                                    borderRadius: "999px",
                                    fontSize: "0.72rem",
                                    fontWeight: 700,
                                  }}
                                >
                                  {mat.type.toUpperCase()}
                                </span>
                                {mat.sizeFormatted && (
                                  <span
                                    style={{
                                      fontSize: "0.72rem",
                                      color: "#64748b",
                                    }}
                                  >
                                    {mat.sizeFormatted}
                                  </span>
                                )}
                                {mat.createdAt && (
                                  <span
                                    style={{
                                      fontSize: "0.72rem",
                                      color: "#94a3b8",
                                    }}
                                  >
                                    • {formatMaterialDateTime(mat.createdAt)}
                                  </span>
                                )}
                                {mat.isExternalLink && (
                                  <span
                                    style={{
                                      color: "#3b82f6",
                                      fontSize: "0.72rem",
                                      display: "inline-flex",
                                      alignItems: "center",
                                      gap: "0.2rem",
                                    }}
                                  >
                                    <ExternalLink size={11} /> Link externo
                                  </span>
                                )}
                              </div>
                            </MaterialCardContent>
                          </MaterialCardLeft>

                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "0.5rem",
                              flexWrap: "wrap",
                            }}
                          >
                            <ViewDocPill
                              onClick={() =>
                                handleOpenViewer(generalMaterials, mat.id)
                              }
                            >
                              <Eye size={14} /> Visualizar documento
                            </ViewDocPill>
                            <RowIconBtn
                              type="button"
                              title="Baixar material"
                              onClick={() => handleDownloadMaterial(mat)}
                            >
                              <Download size={16} />
                            </RowIconBtn>
                            <RowIconBtn
                              type="button"
                              title="Editar informações"
                              onClick={() => {
                                setEditingMaterial(mat);
                                setDefaultMaterialLessonId(mat.lessonId || 0);
                                setShowMaterialModal(true);
                              }}
                            >
                              <Edit2 size={16} />
                            </RowIconBtn>
                            <RowIconBtn
                              $danger
                              type="button"
                              title="Excluir material"
                              onClick={() => handleDeleteClick(mat)}
                            >
                              <Trash2 size={16} />
                            </RowIconBtn>
                          </div>
                        </MaterialCard>
                      ))}
                    </LessonBlock>
                  )}

                {/* 2. Blocos por Aula */}
                {lessonsWithMaterials
                  .filter(({ lesson, items }) => {
                    if (materialFilterLesson === "general") return false;
                    if (
                      materialFilterLesson !== "all" &&
                      String(lesson.id) !== materialFilterLesson
                    ) {
                      return false;
                    }
                    return (
                      items.length > 0 ||
                      materialFilterLesson === String(lesson.id)
                    );
                  })
                  .map(({ lesson, items }) => (
                    <LessonBlock key={lesson.id}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          flexWrap: "wrap",
                          gap: "0.5rem",
                          marginBottom: "0.85rem",
                        }}
                      >
                        <h3 style={{ margin: 0 }}>
                          <BookOpen size={18} color="#1F2B45" /> {lesson.title}
                          <span
                            style={{
                              fontSize: "0.8rem",
                              color: "#64748b",
                              fontWeight: 500,
                            }}
                          >
                            ({lessonTimeRange(lesson)})
                          </span>
                        </h3>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                          }}
                        >
                          {items.length > 0 && (
                            <ViewDocPill
                              style={{ height: "32px", fontSize: "0.78rem" }}
                              onClick={() =>
                                handleOpenViewer(items, items[0].id)
                              }
                            >
                              <Eye size={13} /> Visualizar documentos (
                              {items.length})
                            </ViewDocPill>
                          )}
                          <button
                            type="button"
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "0.3rem",
                              background: "transparent",
                              border: "1.5px dashed #cbd5e1",
                              borderRadius: "999px",
                              padding: "0.3rem 0.75rem",
                              fontSize: "0.78rem",
                              color: "#1f2b45",
                              fontWeight: 600,
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              setEditingMaterial(null);
                              setDefaultMaterialLessonId(lesson.id);
                              setShowMaterialModal(true);
                            }}
                          >
                            <Plus size={13} /> Adicionar a esta aula
                          </button>
                        </div>
                      </div>

                      {items.length === 0 ? (
                        <div
                          style={{
                            background: "#f8fafc",
                            border: "1px dashed #cbd5e1",
                            borderRadius: "14px",
                            padding: "1.25rem",
                            textAlign: "center",
                            color: "#64748b",
                            fontSize: "0.86rem",
                          }}
                        >
                          Nenhum material publicado nesta aula ainda.
                        </div>
                      ) : (
                        items.map((mat) => (
                          <MaterialCard key={mat.id}>
                            <MaterialCardLeft>
                              {renderMaterialGlyph(mat.type)}
                              <MaterialCardContent>
                                <h4 title={mat.title || mat.file}>
                                  {mat.title || mat.file}
                                </h4>
                                {mat.description && (
                                  <p className="desc">{mat.description}</p>
                                )}
                                <div className="badges-line">
                                  <span
                                    style={{
                                      background: "#f1f5f9",
                                      color: "#475569",
                                      padding: "0.15rem 0.55rem",
                                      borderRadius: "999px",
                                      fontSize: "0.72rem",
                                      fontWeight: 600,
                                      display: "inline-flex",
                                      alignItems: "center",
                                      gap: "0.25rem",
                                    }}
                                  >
                                    <Tag size={11} /> {mat.category || "Geral"}
                                  </span>
                                  <span
                                    style={{
                                      background: "#eef2f9",
                                      color: "#1F2B45",
                                      padding: "0.15rem 0.55rem",
                                      borderRadius: "999px",
                                      fontSize: "0.72rem",
                                      fontWeight: 700,
                                    }}
                                  >
                                    {mat.type.toUpperCase()}
                                  </span>
                                  {mat.sizeFormatted && (
                                    <span
                                      style={{
                                        fontSize: "0.72rem",
                                        color: "#64748b",
                                      }}
                                    >
                                      {mat.sizeFormatted}
                                    </span>
                                  )}
                                  {mat.createdAt && (
                                    <span
                                      style={{
                                        fontSize: "0.72rem",
                                        color: "#94a3b8",
                                      }}
                                    >
                                      • {formatMaterialDateTime(mat.createdAt)}
                                    </span>
                                  )}
                                  {mat.isExternalLink && (
                                    <span
                                      style={{
                                        color: "#3b82f6",
                                        fontSize: "0.72rem",
                                        display: "inline-flex",
                                        alignItems: "center",
                                        gap: "0.2rem",
                                      }}
                                    >
                                      <ExternalLink size={11} /> Link externo
                                    </span>
                                  )}
                                </div>
                              </MaterialCardContent>
                            </MaterialCardLeft>

                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "0.5rem",
                                flexWrap: "wrap",
                              }}
                            >
                              <ViewDocPill
                                onClick={() =>
                                  handleOpenViewer(items, mat.id)
                                }
                              >
                                <Eye size={14} /> Visualizar documento
                              </ViewDocPill>
                              <RowIconBtn
                                type="button"
                                title="Baixar material"
                                onClick={() => handleDownloadMaterial(mat)}
                              >
                                <Download size={16} />
                              </RowIconBtn>
                              <RowIconBtn
                                type="button"
                                title="Editar informações"
                                onClick={() => {
                                  setEditingMaterial(mat);
                                  setDefaultMaterialLessonId(
                                    mat.lessonId || 0,
                                  );
                                  setShowMaterialModal(true);
                                }}
                              >
                                <Edit2 size={16} />
                              </RowIconBtn>
                              <RowIconBtn
                                $danger
                                type="button"
                                title="Excluir material"
                                onClick={() => handleDeleteClick(mat)}
                              >
                                <Trash2 size={16} />
                              </RowIconBtn>
                            </div>
                          </MaterialCard>
                        ))
                      )}
                    </LessonBlock>
                  ))}
              </>
            )}
          </motion.div>
        )}

        {activeTab === "agenda" && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <PanelTitle>Agenda da Turma</PanelTitle>
            <ScheduleCard>
              <ScheduleIcon>
                <Calendar size={20} />
              </ScheduleIcon>
              <ScheduleCol>
                <small>Horário fixo</small>
                <strong>Terça e Quinta</strong>
              </ScheduleCol>
              <ScheduleCol>
                <small>Início — Fim</small>
                <strong>18:30 — 19:30</strong>
              </ScheduleCol>
            </ScheduleCard>

            <PanelHeaderRow>
              <PanelTitle style={{ margin: 0 }}>Próximas Aulas</PanelTitle>
              <AddPill
                onClick={() => setShowLessonModal(true)}
                disabled={creatingLesson || !canManageLessons}
              >
                <Plus size={14} /> Agendar aula
              </AddPill>
            </PanelHeaderRow>
            {materialsLoading ? (
              <StatusHint $tone="wait">
                <Loader2 size={14} className="spin" /> Carregando aulas...
              </StatusHint>
            ) : upcoming.length === 0 ? (
              <StatusHint $tone="wait">
                {canManageLessons
                  ? "Nenhuma aula agendada. Use o botão Agendar aula."
                  : "Turma de demonstração — salve a turma para agendar aulas."}
              </StatusHint>
            ) : (
              <UpcomingList>
                {upcoming.map((ev) => (
                  <UpcomingRow key={ev.id}>
                    <DateChip>
                      <strong>{ev.day}</strong>
                      <span>{ev.month}</span>
                    </DateChip>
                    <UpcomingInfo>
                      <strong>{ev.title}</strong>
                      <span>
                        {ev.weekday} • {ev.time}
                      </span>
                    </UpcomingInfo>
                    <UpcomingActions>
                      <StatusHint $tone="ok">
                        <Video size={14} /> Agendada
                      </StatusHint>
                    </UpcomingActions>
                  </UpcomingRow>
                ))}
              </UpcomingList>
            )}

            <PanelTitle>Histórico de Aulas</PanelTitle>
            {history.length === 0 ? (
              <StatusHint $tone="wait">Nenhuma aula no histórico.</StatusHint>
            ) : (
              <HistoryWrap>
                <HistoryTable>
                  <thead>
                    <tr>
                      <th>Aula</th>
                      <th>Data</th>
                      <th>Horário</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {history.map((row) => (
                      <tr key={row.id}>
                        <td>{row.title}</td>
                        <td>{row.date}</td>
                        <td>{row.time}</td>
                        <td>
                          <DoneBadge>{row.status}</DoneBadge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </HistoryTable>
              </HistoryWrap>
            )}
          </motion.div>
        )}

        {activeTab === "alunos" && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <PanelHeaderRow style={{ marginBottom: "1.25rem" }}>
              <div>
                <PanelTitle style={{ margin: 0 }}>Alunos da Turma</PanelTitle>
                <p
                  style={{
                    margin: "0.25rem 0 0",
                    fontSize: "0.85rem",
                    color: "#64748b",
                  }}
                >
                  Visualize os estudantes matriculados e adicione novos alunos à turma.
                </p>
              </div>
              <AddPill onClick={() => setShowAddStudentModal(true)}>
                <Plus size={15} /> Adicionar aluno
              </AddPill>
            </PanelHeaderRow>

            {/* Professora da Turma */}
            <TeacherSectionWrap>
              {classTeacher ? (
                <TeacherCard>
                  <div className="left-content">
                    <TeacherAvatar>
                      {getAvatarInitials(classTeacher.name)}
                    </TeacherAvatar>
                    <div className="info-content">
                      <div className="title-row">
                        <strong>{classTeacher.name}</strong>
                        <TeacherBadge>Professora Responsável</TeacherBadge>
                      </div>
                      <div className="email-row">
                        <Mail size={14} />
                        <span>{classTeacher.email}</span>
                      </div>
                    </div>
                  </div>
                  <div className="right-content">
                    <button
                      type="button"
                      className="remove-teacher-btn"
                      onClick={() => setTeacherToRemove(classTeacher)}
                    >
                      <UserMinus size={14} /> Remover professora da turma
                    </button>
                  </div>
                </TeacherCard>
              ) : (
                <EmptyTeacherCard>
                  <div className="info">
                    <UserX size={18} />
                    <span>
                      Nenhuma professora vinculada a esta turma no momento.
                    </span>
                  </div>
                  <button type="button" onClick={handleAssignTeacher}>
                    <Plus size={14} /> Vincular professora
                  </button>
                </EmptyTeacherCard>
              )}
            </TeacherSectionWrap>

            {materialsLoading ? (
              <StatusHint $tone="wait">
                <Loader2 size={14} className="spin" /> Carregando alunos...
              </StatusHint>
            ) : displayStudents.length === 0 ? (
              <StatusHint $tone="wait">
                Nenhum aluno vinculado a esta turma ainda. Clique no botão acima para adicionar alunos.
              </StatusHint>
            ) : (
              <StudentList>
                {displayStudents.map((s) => (
                  <StudentRow
                    key={s.id}
                    onClick={() => handleStudentClick(s)}
                    title={`Clique para abrir o perfil de ${s.name}`}
                  >
                    <div className="left-content">
                      <StackAvatar $color={s.color} $index={0}>
                        {getAvatarInitials(s.name)}
                      </StackAvatar>
                      <div className="info-content">
                        <strong>{s.name}</strong>
                        <div className="email-row">
                          <Mail size={14} />
                          <span>{s.email}</span>
                        </div>
                      </div>
                    </div>

                    <div className="right-content">
                      <StudentRowStatus $active={s.isActive !== false}>
                        {s.isActive !== false ? "Aluno ativo" : "Aluno inativo"}
                      </StudentRowStatus>
                      <button
                        type="button"
                        className="view-profile-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleStudentClick(s);
                        }}
                      >
                        Ver perfil <ArrowRight size={14} />
                      </button>
                      <button
                        type="button"
                        className="remove-student-btn"
                        title={`Remover ${s.name} desta turma`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setStudentToRemove(s);
                        }}
                      >
                        <UserMinus size={13} /> Remover da turma
                      </button>
                    </div>
                  </StudentRow>
                ))}
              </StudentList>
            )}
          </motion.div>
        )}

        {activeTab === "atestados" && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <PanelTitle>Atestados Médicos</PanelTitle>
            <JustificationList>
              {justifications.map((just) => (
                <JustificationItem key={just.id}>
                  <JustificationInfo>
                    <h4>{just.student}</h4>
                    <span>
                      <Calendar size={14} /> Falta referente ao dia: {just.date}
                    </span>
                    <span>
                      <Stethoscope size={14} /> Motivo: {just.reason}
                    </span>
                  </JustificationInfo>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-end",
                      gap: "0.5rem",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "1rem",
                        flexWrap: "wrap",
                        justifyContent: "flex-end",
                      }}
                    >
                      <span
                        style={{
                          color: "#3b82f6",
                          fontSize: "0.9rem",
                          display: "flex",
                          alignItems: "center",
                          gap: "0.4rem",
                        }}
                      >
                        <Paperclip size={14} /> {just.document}
                      </span>
                      <JustificationStatus $status={just.status}>
                        {just.status === "Aceito" ? (
                          <span
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 4,
                            }}
                          >
                            <CheckCircle size={14} /> Aceito
                          </span>
                        ) : just.status === "Recusado" ? (
                          <span
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 4,
                            }}
                          >
                            <X size={14} /> Recusado
                          </span>
                        ) : (
                          <span
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 4,
                            }}
                          >
                            <Clock size={14} /> Em Análise
                          </span>
                        )}
                      </JustificationStatus>
                      {just.status === "Em Análise" && (
                        <ActionGroup>
                          <JustificationActionBtn
                            $type="approve"
                            onClick={() =>
                              setEvaluatingJustification({
                                id: just.id,
                                action: "approve",
                                student: just.student,
                              })
                            }
                          >
                            <Check size={16} /> Aprovar
                          </JustificationActionBtn>
                          <JustificationActionBtn
                            $type="reject"
                            onClick={() =>
                              setEvaluatingJustification({
                                id: just.id,
                                action: "reject",
                                student: just.student,
                              })
                            }
                          >
                            <X size={16} /> Recusar
                          </JustificationActionBtn>
                        </ActionGroup>
                      )}
                    </div>
                    {just.feedback && (
                      <span
                        style={{
                          fontSize: "0.85rem",
                          color: "#666",
                          background: "#f8f9fc",
                          padding: "0.4rem 0.8rem",
                          borderRadius: "8px",
                        }}
                      >
                        <strong>Feedback:</strong> {just.feedback}
                      </span>
                    )}
                  </div>
                </JustificationItem>
              ))}
            </JustificationList>
          </motion.div>
        )}
      </WorkspaceBody>

      <AddMaterialModal
        isOpen={showMaterialModal}
        onClose={() => {
          setShowMaterialModal(false);
          setEditingMaterial(null);
        }}
        lessons={lessonOptions}
        uploading={uploading}
        onSaveMaterial={handleSaveMaterial}
        editingMaterial={editingMaterial}
        defaultLessonId={defaultMaterialLessonId}
      />

      <DocumentViewerModal
        isOpen={viewerOpen}
        onClose={() => setViewerOpen(false)}
        materials={viewerMaterials}
        initialMaterialId={viewerInitialId}
        onDownload={handleDownloadMaterial}
      />

      <DeleteConfirmModal
        isOpen={!!materialToDelete}
        title="Excluir material"
        message={`Tem certeza que deseja excluir "${materialToDelete?.title || materialToDelete?.file || "este material"}"? Esta ação não pode ser desfeita.`}
        onConfirm={handleConfirmDelete}
        onCancel={() => setMaterialToDelete(null)}
        isDeleting={deletingId !== null}
      />

      {showLessonModal && (
        <AddClassEventModal
          onClose={() => setShowLessonModal(false)}
          onSave={handleCreateLesson}
        />
      )}

      {evaluatingJustification && (
        <EvaluateJustificationModal
          studentName={evaluatingJustification.student}
          action={evaluatingJustification.action}
          onClose={() => setEvaluatingJustification(null)}
          onConfirm={handleEvaluateJustification}
        />
      )}

      <AddStudentToClassModal
        isOpen={showAddStudentModal}
        onClose={() => setShowAddStudentModal(false)}
        classData={classData}
        currentStudents={displayStudents}
        onStudentEnrolled={handleStudentEnrolled}
        onNavigateToRegister={() => {
          setShowAddStudentModal(false);
          if (onNavigateRegisterStudent) {
            onNavigateRegisterStudent(effectiveClassId, className);
          }
        }}
      />

      <DeleteConfirmModal
        isOpen={!!studentToRemove}
        title="Remover aluno da turma"
        message={`Tem certeza que deseja remover "${studentToRemove?.name}" desta turma? O aluno continuará cadastrado na plataforma, mas não fará mais parte desta turma.`}
        onConfirm={handleConfirmRemoveStudent}
        onCancel={() => setStudentToRemove(null)}
        isDeleting={isRemovingStudent}
      />

      <DeleteConfirmModal
        isOpen={!!teacherToRemove}
        title="Remover professora da turma"
        message={`Tem certeza que deseja desvincular a professora "${teacherToRemove?.name}" desta turma?`}
        onConfirm={handleConfirmRemoveTeacher}
        onCancel={() => setTeacherToRemove(null)}
        isDeleting={isRemovingTeacher}
      />
    </ClassWorkspace>
  );
};

export default ClassDetail;
