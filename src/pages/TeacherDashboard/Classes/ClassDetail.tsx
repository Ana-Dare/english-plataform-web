import React, { useMemo, useState } from "react";
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
  formatMaterialDateTime,
  loadCustomCategories,
  type Lesson,
  type LessonMaterial,
  type LessonStatus,
} from "../services/material";
import { useClassDetail } from "./hooks/useClassDetail";
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
  const className = classData.name || "Turma";
  const effectiveClassId = classData.id && classData.id > 0 ? classData.id : 0;
  const canManageLessons = effectiveClassId > 0;
  const {
    lessons,
    materials,
    classStudents,
    levels,
    isLoading: materialsLoading,
    isError: isClassDetailError,
    createLesson,
    isCreatingLesson: creatingLesson,
    uploadMaterials,
    isUploading: uploading,
    deleteMaterial,
    deletingId,
    removeStudent,
    isRemovingStudent,
    updateLesson,
    isUpdatingLesson,
    cancelLesson,
    isCancellingLesson,
  } = useClassDetail(effectiveClassId);

  const levelName = useMemo(() => {
    const levelId = classData.level_id;
    if (!levelId) return null;
    return levels.find((level) => level.id === levelId)?.name ?? null;
  }, [classData.level_id, levels]);

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
    studentId?: number;
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
  const [teacherToRemove, setTeacherToRemove] = useState<{
    name: string;
    email: string;
  } | null>(null);
  const [isRemovingTeacher, setIsRemovingTeacher] = useState(false);
  const [classTeacher, setClassTeacher] = useState<{
    name: string;
    email: string;
  } | null>(null);

  const displayStudents: DisplayStudent[] = useMemo(() => {
    return classStudents.map((s: any, i: number) => {
      const matching = students.find(
        (std) =>
          std.id === s.studentId ||
          std.id === s.userId ||
          std.name.toLowerCase() === (s.name || "").toLowerCase(),
      );
      const studentName = s.name || matching?.name || "Aluno";
      return {
        id: s.userId || matching?.id || s.id || i + 1,
        studentId: s.studentId || matching?.studentId || undefined,
        name: studentName,
        email: s.email || matching?.email || "",
        color: matching?.avatarColor || AVATAR_COLORS[i % AVATAR_COLORS.length],
        phone: matching?.phone,
        gender: (matching as any)?.gender,
        level: matching?.level || displayLevel,
        turma: matching?.turma || className,
        isActive: matching ? matching.isActive : true,
      };
    });
  }, [classStudents, students, displayLevel, className]);

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
      phone: student.phone || "",
      isActive: student.isActive !== false,
      avatarColor: student.color,
      level: student.level || displayLevel,
      turma: student.turma || className,
      enrollDate: "",
      observations: "",
      plan: 0,
      gender: student.gender || "Não informado",
    };

    if (onNavigateStudent) {
      onNavigateStudent(fullStudentModel.id, fullStudentModel);
    }
  };

  const handleStudentEnrolled = () => {
    // A lista é atualizada pela invalidação do React Query após o POST.
  };

  const handleConfirmRemoveStudent = () => {
    if (!studentToRemove) return;
    const academicId = studentToRemove.studentId;
    if (!academicId) {
      addToast(
        "Não foi possível identificar o perfil acadêmico deste aluno.",
        "error",
      );
      return;
    }

    const studentName = studentToRemove.name;
    removeStudent(academicId, {
      onSuccess: () => {
        const matchingContextStudent = students.find(
          (std) =>
            std.id === studentToRemove.id ||
            std.studentId === academicId ||
            std.name.toLowerCase() === studentName.toLowerCase(),
        );
        if (matchingContextStudent) {
          updateStudent(matchingContextStudent.id, {
            class_id: null,
          });
        }
        addToast(
          `Aluno(a) "${studentName}" foi removido(a) da turma com sucesso!`,
          "success",
        );
        setStudentToRemove(null);
      },
      onError: () => {
        addToast("Não foi possível remover o aluno da turma.", "error");
      },
    });
  };

  const handleConfirmRemoveTeacher = () => {
    if (!teacherToRemove) return;
    setIsRemovingTeacher(true);
    try {
      setClassTeacher(null);
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

  const handleCreateLesson = (data: ClassEventData) => {
    if (!canManageLessons) {
      addToast("Não foi possível identificar a turma para agendar a aula.", "error");
      return;
    }
    createLesson(
      {
        title: data.title,
        date: data.date,
        startTime: data.startTime,
        endTime: data.endTime,
      },
      {
        onSuccess: () => {
          addToast("Aula agendada com sucesso!", "success");
          setShowLessonModal(false);
        },
        onError: () => {
          addToast("Não foi possível agendar a aula. Tente novamente.", "error");
        },
      },
    );
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

  const handleConfirmDelete = () => {
    if (!materialToDelete) return;
    if (!materialToDelete.lessonId) {
      addToast("Não foi possível excluir o material.", "error");
      return;
    }
    deleteMaterial(
      {
        lessonId: materialToDelete.lessonId,
        materialId: materialToDelete.id,
      },
      {
        onSuccess: () => {
          addToast("Material excluído com sucesso.", "success");
          setMaterialToDelete(null);
        },
        onError: () => {
          addToast("Não foi possível excluir o material.", "error");
        },
      },
    );
  };

  const handleSaveMaterial = (data: MaterialSubmitData) => {
    if (!canManageLessons || data.lessonId <= 0) {
      addToast("Selecione uma aula para publicar o material.", "warning");
      return;
    }

    const files = data.items.map((item) => item.file).filter(Boolean) as File[];
    if (files.length === 0) {
      addToast("Envie um arquivo para publicar o material no backend.", "warning");
      return;
    }

    uploadMaterials(
      { lessonId: data.lessonId, files },
      {
        onSuccess: () => {
          addToast(
            files.length > 1
              ? `${files.length} conteúdos publicados com sucesso!`
              : "Material publicado com sucesso!",
            "success",
          );
          setShowMaterialModal(false);
          setEditingMaterial(null);
        },
        onError: () => {
          addToast("Erro ao salvar material. Tente novamente.", "error");
        },
      },
    );
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
            ) : isClassDetailError ? (
              <LessonBlock>
                <p style={{ color: "#b91c1c" }}>
                  Não foi possível carregar os dados da turma. Tente novamente.
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
            ) : isClassDetailError ? (
              <StatusHint $tone="wait">
                Não foi possível carregar as aulas desta turma.
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
                      <AddPill
                        type="button"
                        disabled={isUpdatingLesson}
                        onClick={() =>
                          updateLesson(
                            {
                              lessonId: ev.id,
                              params: { status: "completed" },
                            },
                            {
                              onSuccess: () =>
                                addToast("Aula marcada como concluída.", "success"),
                              onError: () =>
                                addToast(
                                  "Não foi possível concluir a aula.",
                                  "error",
                                ),
                            },
                          )
                        }
                      >
                        Concluir
                      </AddPill>
                      <AddPill
                        type="button"
                        disabled={isCancellingLesson}
                        onClick={() =>
                          cancelLesson(ev.id, {
                            onSuccess: () =>
                              addToast("Aula cancelada com sucesso.", "success"),
                            onError: () =>
                              addToast(
                                "Não foi possível cancelar a aula.",
                                "error",
                              ),
                          })
                        }
                      >
                        Cancelar
                      </AddPill>
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
            ) : isClassDetailError ? (
              <StatusHint $tone="wait">
                Não foi possível carregar os alunos desta turma.
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
