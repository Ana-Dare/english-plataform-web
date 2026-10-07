import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
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
} from "lucide-react";
import { Check, X } from "lucide-react";
import { motion } from "framer-motion";
import AddMaterialModal from "./AddMaterialModal";
import AddClassEventModal from "./AddClassEventModal";
import type { ClassEventData } from "./AddClassEventModal";
import EvaluateJustificationModal from "./EvaluateJustificationModal";
import useToast from "../../../contexts/Toast/useToast";
import { getInitials } from "../../../utils/avatar";
import {
  listClassLessons,
  listLessonMaterials,
  uploadLessonMaterial,
  deleteLessonMaterial,
  createClassLesson,
  type Lesson,
  type LessonMaterial,
  type LessonStatus,
} from "../services/material";
import { listClassStudents, type ClassStudent } from "../services/class";
import { listLevels } from "../services/level";
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
  CefrBadge,
  ExtraBadge,
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
  MaterialRow,
  FileGlyph,
  FileMeta,
  RowActions,
  RowIconBtn,
  StudentList,
  StudentRow,
  BackLink,
} from "./classDetail.styles";

interface ClassDetailProps {
  classData: {
    id?: number;
    name?: string;
    level_id?: number;
  };
  onBack: () => void;
}

type TabId = "mural" | "materiais" | "agenda" | "alunos" | "atestados";

// Alunos fictícios usados apenas na turma de demonstração (id <= 0).
const DEMO_STUDENTS = [
  { id: 1, name: "Ana Souza", color: "#3B82F6" },
  { id: 2, name: "Carlos Silva", color: "#F59E0B" },
];

const AVATAR_COLORS = [
  "#3B82F6",
  "#F59E0B",
  "#8B5CF6",
  "#10B981",
  "#EF4444",
  "#0EA5E9",
];

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

const ClassDetail: React.FC<ClassDetailProps> = ({ classData, onBack }) => {
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
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [materials, setMaterials] = useState<LessonMaterial[]>([]);
  const [classStudents, setClassStudents] = useState<ClassStudent[]>([]);
  const [materialsLoading, setMaterialsLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [creatingLesson, setCreatingLesson] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

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
  // Turmas de demonstração usam id <= 0 e não aceitam operações reais na API.
  const canManageLessons = !!classData.id && classData.id > 0;

  // Alunos exibidos: reais quando a turma existe, fictícios na demonstração.
  const displayStudents = useMemo(() => {
    if (!canManageLessons) return DEMO_STUDENTS;
    return classStudents.map((s, i) => ({
      id: s.studentId,
      name: s.name,
      color: AVATAR_COLORS[i % AVATAR_COLORS.length],
    }));
  }, [canManageLessons, classStudents]);

  const lessonOptions = useMemo(
    () =>
      lessons.map((lesson) => ({
        id: String(lesson.id),
        label: lesson.title,
        selectLabel: formatLessonLabel(lesson),
      })),
    [lessons],
  );

  const materialsByLesson = useMemo(() => {
    return lessons
      .map((lesson) => ({
        id: lesson.id,
        label: formatLessonLabel(lesson),
        items: materials.filter((m) => m.lessonId === lesson.id),
      }))
      .filter((g) => g.items.length > 0);
  }, [lessons, materials]);

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
        const [classLessons, students] = await Promise.all([
          listClassLessons(classId),
          listClassStudents(classId),
        ]);
        setLessons(classLessons);
        setClassStudents(students);
        const perLesson = await Promise.all(
          classLessons.map((lesson) => listLessonMaterials(lesson.id)),
        );
        setMaterials(perLesson.flat());
      } catch {
        addToast("Não foi possível carregar os dados da turma.", "error");
      } finally {
        setMaterialsLoading(false);
      }
    },
    [addToast],
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
    const classId = classData.id;
    // Turmas de demonstração usam id <= 0 e não têm aulas reais no banco.
    if (!classId || classId <= 0) return;
    let active = true;
    (async () => {
      if (active) await loadLessonsAndMaterials(classId);
    })();
    return () => {
      active = false;
    };
  }, [classData.id, loadLessonsAndMaterials]);

  const handleCreateLesson = async (data: ClassEventData) => {
    const classId = classData.id;
    if (!classId || classId <= 0) {
      addToast(
        "Salve a turma antes de agendar aulas (turma de demonstração).",
        "warning",
      );
      return;
    }
    setCreatingLesson(true);
    try {
      const lesson = await createClassLesson(classId, {
        title: data.title,
        date: data.date,
        startTime: data.startTime,
        endTime: data.endTime,
      });
      setLessons((prev) =>
        [...prev, lesson].sort(
          (a, b) =>
            new Date(a.startTime).getTime() - new Date(b.startTime).getTime(),
        ),
      );
      addToast("Aula agendada com sucesso!", "success");
      setShowLessonModal(false);
    } catch {
      addToast("Não foi possível agendar a aula. Tente novamente.", "error");
    } finally {
      setCreatingLesson(false);
    }
  };

  const handleUploadMaterials = async (lessonId: number, files: File[]) => {
    setUploading(true);
    try {
      const created: LessonMaterial[] = [];
      for (const file of files) {
        created.push(await uploadLessonMaterial(lessonId, file));
      }
      setMaterials((prev) => [...created, ...prev]);
      addToast(
        files.length > 1
          ? "Materiais enviados com sucesso!"
          : "Material enviado com sucesso!",
        "success",
      );
    } catch {
      addToast("Não foi possível enviar o material. Tente novamente.", "error");
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteMaterial = async (material: LessonMaterial) => {
    setDeletingId(material.id);
    try {
      await deleteLessonMaterial(material.lessonId, material.id);
      setMaterials((prev) => prev.filter((m) => m.id !== material.id));
      addToast("Material removido.", "success");
    } catch {
      addToast("Não foi possível remover o material.", "error");
    } finally {
      setDeletingId(null);
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
          <div>
            <BackLink onClick={onBack}>
              <ArrowLeft size={14} /> Voltar
            </BackLink>
            <ClassBannerTitle style={{ marginTop: "0.4rem" }}>
              {className}
            </ClassBannerTitle>
            <ClassBannerMeta>
              <SoftBadge>{levelName || "Sem nível"}</SoftBadge>
              <CefrBadge>{cefr}</CefrBadge>
              <ExtraBadge>+</ExtraBadge>
              <StudentsCount>
                <AvatarStack>
                  {displayStudents.slice(0, 5).map((s, i) => (
                    <StackAvatar key={s.id} $color={s.color} $index={i}>
                      {getInitials(s.name)}
                    </StackAvatar>
                  ))}
                </AvatarStack>
                {displayStudents.length}{" "}
                {displayStudents.length === 1 ? "aluno" : "alunos"}
              </StudentsCount>
            </ClassBannerMeta>
          </div>
        </ClassBannerTop>

        <TabsBar>
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
        </TabsBar>
      </ClassBanner>

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
            <PanelHeaderRow>
              <PanelTitle style={{ margin: 0 }}>
                Materiais & atividades
              </PanelTitle>
              <AddPill
                onClick={() => setShowMaterialModal(true)}
                disabled={!canManageLessons || lessons.length === 0}
              >
                <Plus size={14} /> Adicionar
              </AddPill>
            </PanelHeaderRow>
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
            ) : materialsByLesson.length === 0 ? (
              <LessonBlock>
                <p style={{ color: "#64748b", marginBottom: "0.75rem" }}>
                  {!canManageLessons
                    ? "Turma de demonstração — salve a turma para gerenciar aulas e materiais."
                    : lessons.length === 0
                      ? "Nenhuma aula cadastrada ainda. Agende uma aula para poder enviar materiais."
                      : "Nenhum material enviado. Use o botão Adicionar para enviar o primeiro."}
                </p>
                {canManageLessons && lessons.length === 0 && (
                  <AddPill
                    onClick={() => setShowLessonModal(true)}
                    disabled={creatingLesson}
                  >
                    <Plus size={14} /> Agendar aula
                  </AddPill>
                )}
              </LessonBlock>
            ) : (
              materialsByLesson.map((group) => (
                <LessonBlock key={group.id}>
                  <h3>{group.label}</h3>
                  {group.items.map((mat) => (
                    <MaterialRow key={mat.id}>
                      <FileGlyph>
                        {mat.type === "image" ? (
                          <Video size={16} />
                        ) : (
                          <FileText size={16} />
                        )}
                      </FileGlyph>
                      <FileMeta>
                        <strong>{mat.file}</strong>
                        <span>{mat.type.toUpperCase()}</span>
                      </FileMeta>
                      <RowActions>
                        <RowIconBtn
                          as="a"
                          href={mat.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Baixar"
                        >
                          <Download size={16} />
                        </RowIconBtn>
                        <RowIconBtn
                          $danger
                          type="button"
                          title="Excluir"
                          disabled={deletingId === mat.id}
                          onClick={() => handleDeleteMaterial(mat)}
                        >
                          {deletingId === mat.id ? (
                            <Loader2 size={16} className="spin" />
                          ) : (
                            <Trash2 size={16} />
                          )}
                        </RowIconBtn>
                      </RowActions>
                    </MaterialRow>
                  ))}
                </LessonBlock>
              ))
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
            <PanelTitle>Alunos da Turma</PanelTitle>
            {materialsLoading ? (
              <StatusHint $tone="wait">
                <Loader2 size={14} className="spin" /> Carregando alunos...
              </StatusHint>
            ) : displayStudents.length === 0 ? (
              <StatusHint $tone="wait">
                Nenhum aluno vinculado a esta turma ainda.
              </StatusHint>
            ) : (
              <StudentList>
                {displayStudents.map((s) => (
                  <StudentRow key={s.id}>
                    <StackAvatar $color={s.color} $index={0}>
                      {getInitials(s.name)}
                    </StackAvatar>
                    <div>
                      <strong style={{ color: "#1f2b45" }}>{s.name}</strong>
                      <div style={{ fontSize: "0.75rem", color: "#94a3b8" }}>
                        Aluno ativo
                      </div>
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

      {showMaterialModal && (
        <AddMaterialModal
          lessons={lessonOptions}
          materials={materials}
          uploading={uploading}
          deletingId={deletingId}
          onClose={() => setShowMaterialModal(false)}
          onAddFiles={handleUploadMaterials}
          onDelete={handleDeleteMaterial}
        />
      )}

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
    </ClassWorkspace>
  );
};

export default ClassDetail;
