import React, { useMemo, useState } from "react";
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
  Pencil,
  Trash2,
  Video,
} from "lucide-react";
import { Check, X } from "lucide-react";
import { motion } from "framer-motion";
import AddMaterialModal from "./AddMaterialModal";
import type { MaterialData } from "./AddMaterialModal";
import EvaluateJustificationModal from "./EvaluateJustificationModal";
import useToast from "../../../contexts/Toast/useToast";
import { getInitials } from "../../../utils/avatar";
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
  ConfirmBtn,
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

const MOCK_STUDENTS = [
  { id: 1, name: "Ana Souza", color: "#3B82F6" },
  { id: 2, name: "Carlos Silva", color: "#F59E0B" },
];

const LESSONS = [
  { id: "aula-2", label: "Aula 2", selectLabel: "Terça, 01/09 - 19:00" },
  { id: "aula-1", label: "Aula 1", selectLabel: "Quinta, 27/08 - 19:00" },
];

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
  const [materials, setMaterials] = useState<MaterialData[]>([
    {
      id: "m1",
      title: "Vocabulary List — Travel.docx",
      type: "docx",
      url: "#",
      lessonId: "aula-2",
      addedAt: "22/08",
    },
    {
      id: "m2",
      title: "Verbs activity — Weather.docx",
      type: "docx",
      url: "#",
      lessonId: "aula-2",
      addedAt: "22/08",
    },
    {
      id: "m3",
      title: "Present perfect.docx",
      type: "docx",
      url: "#",
      lessonId: "aula-1",
      addedAt: "22/08",
    },
  ]);

  const [upcoming] = useState([
    {
      id: 1,
      day: "12",
      month: "SET",
      weekday: "Terça-feira",
      time: "18:30 – 19:30",
      confirmed: 2,
      total: 2,
      status: "ready" as const,
    },
    {
      id: 2,
      day: "14",
      month: "SET",
      weekday: "Quinta-feira",
      time: "18:30 – 19:30",
      confirmed: 1,
      total: 2,
      status: "partial" as const,
    },
    {
      id: 3,
      day: "04",
      month: "SET",
      weekday: "Terça-feira",
      time: "18:30 – 19:30",
      confirmed: 0,
      total: 2,
      status: "waiting" as const,
    },
  ]);

  const history = [
    {
      date: "07 set 2026",
      time: "18:30 – 19:30",
      presence: "2 presentes",
      status: "Concluída",
    },
    {
      date: "05 set 2026",
      time: "18:30 – 19:30",
      presence: "1 presente • 1 falta",
      status: "Concluída",
    },
    {
      date: "31 ago 2026",
      time: "18:30 – 19:30",
      presence: "2 presentes",
      status: "Concluída",
    },
  ];

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

  const materialsByLesson = useMemo(() => {
    return LESSONS.map((lesson) => ({
      ...lesson,
      items: materials.filter((m) => m.lessonId === lesson.id),
    })).filter((g) => g.items.length > 0);
  }, [materials]);

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
            <ClassBannerTitle style={{ marginTop: "0.4rem" }}>{className}</ClassBannerTitle>
            <ClassBannerMeta>
              <SoftBadge>Intermediate</SoftBadge>
              <CefrBadge>{cefr}</CefrBadge>
              <ExtraBadge>+</ExtraBadge>
              <StudentsCount>
                <AvatarStack>
                  {MOCK_STUDENTS.map((s, i) => (
                    <StackAvatar key={s.id} $color={s.color} $index={i}>
                      {getInitials(s.name)}
                    </StackAvatar>
                  ))}
                </AvatarStack>
                {MOCK_STUDENTS.length} alunos
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
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
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
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
            <PanelHeaderRow>
              <PanelTitle style={{ margin: 0 }}>Materiais & atividades</PanelTitle>
              <AddPill onClick={() => setShowMaterialModal(true)}>
                <Plus size={14} /> Adicionar
              </AddPill>
            </PanelHeaderRow>
            {materialsByLesson.map((group) => (
              <LessonBlock key={group.id}>
                <h3>{group.label}</h3>
                {group.items.map((mat) => (
                  <MaterialRow key={mat.id}>
                    <FileGlyph>
                      {mat.type === "video" ? (
                        <Video size={16} />
                      ) : (
                        <FileText size={16} />
                      )}
                    </FileGlyph>
                    <FileMeta>
                      <strong>{mat.title}</strong>
                      <span>Adicionado em {mat.addedAt}</span>
                    </FileMeta>
                    <RowActions>
                      <RowIconBtn
                        type="button"
                        title="Baixar"
                        onClick={() => addToast("Download iniciado (demo).", "info")}
                      >
                        <Download size={16} />
                      </RowIconBtn>
                      <RowIconBtn
                        type="button"
                        title="Editar"
                        onClick={() => setShowMaterialModal(true)}
                      >
                        <Pencil size={16} />
                      </RowIconBtn>
                      <RowIconBtn
                        $danger
                        type="button"
                        title="Excluir"
                        onClick={() =>
                          setMaterials((prev) => prev.filter((m) => m.id !== mat.id))
                        }
                      >
                        <Trash2 size={16} />
                      </RowIconBtn>
                    </RowActions>
                  </MaterialRow>
                ))}
              </LessonBlock>
            ))}
          </motion.div>
        )}

        {activeTab === "agenda" && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
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

            <PanelTitle>Próximas Aulas</PanelTitle>
            <UpcomingList>
              {upcoming.map((ev) => (
                <UpcomingRow key={ev.id}>
                  <DateChip>
                    <strong>{ev.day}</strong>
                    <span>{ev.month}</span>
                  </DateChip>
                  <UpcomingInfo>
                    <strong>{ev.weekday}</strong>
                    <span>{ev.time}</span>
                  </UpcomingInfo>
                  <UpcomingActions>
                    {ev.status === "ready" && (
                      <>
                        <StatusHint $tone="ok">
                          {ev.confirmed}/{ev.total} confirmados
                        </StatusHint>
                        <ConfirmBtn
                          onClick={() =>
                            addToast("Presença confirmada (demo).", "success")
                          }
                        >
                          Confirmar presença
                        </ConfirmBtn>
                      </>
                    )}
                    {ev.status === "partial" && (
                      <StatusHint $tone="warn">
                        <Video size={14} /> {ev.confirmed}/{ev.total} confirmado
                      </StatusHint>
                    )}
                    {ev.status === "waiting" && (
                      <StatusHint $tone="wait">Aguardando respostas</StatusHint>
                    )}
                  </UpcomingActions>
                </UpcomingRow>
              ))}
            </UpcomingList>

            <PanelTitle>Histórico de Aulas</PanelTitle>
            <HistoryWrap>
              <HistoryTable>
                <thead>
                  <tr>
                    <th>Data</th>
                    <th>Horário</th>
                    <th>Presenças</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((row) => (
                    <tr key={row.date}>
                      <td>{row.date}</td>
                      <td>{row.time}</td>
                      <td>{row.presence}</td>
                      <td>
                        <DoneBadge>{row.status}</DoneBadge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </HistoryTable>
            </HistoryWrap>
          </motion.div>
        )}

        {activeTab === "alunos" && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
            <PanelTitle>Alunos da Turma</PanelTitle>
            <StudentList>
              {MOCK_STUDENTS.map((s) => (
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
          </motion.div>
        )}

        {activeTab === "atestados" && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
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
                          <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                            <CheckCircle size={14} /> Aceito
                          </span>
                        ) : just.status === "Recusado" ? (
                          <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                            <X size={14} /> Recusado
                          </span>
                        ) : (
                          <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
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
          lessons={LESSONS}
          materials={materials}
          onClose={() => setShowMaterialModal(false)}
          onAddFiles={(lessonId, files) => {
            const added = files.map((file) => ({
              id: `${Date.now()}-${file.name}`,
              title: file.name,
              type: file.name.toLowerCase().endsWith(".pdf")
                ? ("pdf" as const)
                : ("docx" as const),
              url: URL.createObjectURL(file),
              lessonId,
              addedAt: new Date().toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "2-digit",
              }),
            }));
            setMaterials((prev) => [...added, ...prev]);
            addToast("Material adicionado (somente nesta tela).", "success");
          }}
          onRename={(id, title) =>
            setMaterials((prev) =>
              prev.map((m) => (m.id === id ? { ...m, title } : m)),
            )
          }
          onDelete={(id) =>
            setMaterials((prev) => prev.filter((m) => m.id !== id))
          }
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
