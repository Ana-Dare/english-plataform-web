import React, { useState } from "react";
import {
  ArrowLeft,
  MessageSquare,
  FileText,
  Calendar,
  ExternalLink,
  FileUp,
  Users,
  Stethoscope,
  Paperclip,
  Clock,
  CheckCircle,
  Edit2,
} from "lucide-react";
import {
  DetailContainer,
  DetailHeader,
  DetailBackBtn,
  DetailHeaderTitle,
  LevelBadge,
  DetailTabs,
  TabBtn,
  DetailContent,
  PostCard,
  PostHeader,
  CreatePostBox,
  PrimaryBtn,
  MaterialsGrid,
  MaterialCard,
  MaterialIcon,
  MaterialInfo,
  ClassAgendaList,
  AgendaItem,
  AgendaDateBox,
  AgendaContent,
  StudentsGrid,
  JustificationList,
  JustificationItem,
  JustificationInfo,
  JustificationStatus,
  ActionGroup,
  JustificationActionBtn,
  SectionHeader,
  SectionTitle,
  PostList,
  PostAuthor,
  PostContent,
  StudentAvatarSmall,
} from "./style";
import AddMaterialModal from "./AddMaterialModal";
import type { MaterialData } from "./AddMaterialModal";
import AddClassEventModal from "./AddClassEventModal";
import type { ClassEventData } from "./AddClassEventModal";
import EvaluateJustificationModal from "./EvaluateJustificationModal";
import { Check, X } from "lucide-react";
import { motion } from "framer-motion";
import useToast from "../../../contexts/Toast/useToast";

interface ClassDetailProps {
  classData: any;
  onBack: () => void;
}

const getInitials = (name: string) => {
  const parts = name.split(" ");
  return parts.length > 1
    ? `${parts[0][0]}${parts[parts.length - 1][0]}`
    : parts[0][0];
};

const ClassDetail: React.FC<ClassDetailProps> = ({ classData, onBack }) => {
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState<
    "mural" | "materiais" | "agenda" | "alunos" | "atestados"
  >("mural");
  const [newPost, setNewPost] = useState("");
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: "Ms. Charantola",
      date: "Hoje, 10:30",
      content:
        "Bem-vindos à turma! Não se esqueçam de revisar o material da primeira aula que já está na aba de materiais.",
    },
  ]);

  const handleCreatePost = () => {
    if (!newPost.trim()) return;
    setPosts([
      {
        id: Date.now(),
        author: "Ms. Charantola",
        date: "Agora",
        content: newPost,
      },
      ...posts,
    ]);
    setNewPost("");
  };

  const [showMaterialModal, setShowMaterialModal] = useState(false);
  const [editingMaterialIndex, setEditingMaterialIndex] = useState<
    number | null
  >(null);
  const [materials, setMaterials] = useState<MaterialData[]>([
    {
      title: "Guia de Estudos - Módulo 1",
      type: "pdf",
      url: "#",
      description: "PDF • 2.4 MB • Adicionado ontem",
    },
    {
      title: "Vídeo: Tempos Verbais (Revisão)",
      type: "video",
      url: "#",
      description: "Link do YouTube • Adicionado há 3 dias",
    },
  ]);

  const [showEventModal, setShowEventModal] = useState(false);
  const [events, setEvents] = useState<ClassEventData[]>([
    {
      title: "Aula 01 - Introdução",
      date: "2026-08-15",
      startTime: "14:00",
      endTime: "15:30",
      syncAgenda: true,
    },
    {
      title: "Aula 02 - Prática de Conversação",
      date: "2026-08-17",
      startTime: "14:00",
      endTime: "15:30",
      syncAgenda: true,
    },
  ]);

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

  const handleAddMaterial = (data: MaterialData) => {
    if (editingMaterialIndex !== null) {
      const newMaterials = [...materials];
      newMaterials[editingMaterialIndex] = data;
      setMaterials(newMaterials);
      setEditingMaterialIndex(null);
    } else {
      setMaterials([data, ...materials]);
    }
    setShowMaterialModal(false);
  };

  const handleAddEvent = (data: ClassEventData) => {
    setEvents([data, ...events]);
    setShowEventModal(false);
    if (data.syncAgenda) {
      addToast(
        `Aula "${data.title}" agendada e adicionada à sua agenda pessoal com sucesso!`,
        "success",
      );
    } else {
      addToast(`Aula "${data.title}" agendada com sucesso!`, "success");
    }
  };

  return (
    <DetailContainer>
      <DetailHeader>
        <DetailBackBtn onClick={onBack}>
          <ArrowLeft size={16} /> Voltar para turmas
        </DetailBackBtn>
        <DetailHeaderTitle>
          <div>
            <h1>{classData.name}</h1>
            <div
              style={{
                marginTop: "0.8rem",
                display: "flex",
                gap: "1rem",
                alignItems: "center",
              }}
            >
              <LevelBadge>{classData.level_id || 1}</LevelBadge>
              <span
                style={{
                  marginLeft: "12px",
                  fontSize: "0.85rem",
                  color: "rgba(255,255,255,0.8)",
                }}
              >
                Turma ativa
              </span>
            </div>
          </div>
        </DetailHeaderTitle>
      </DetailHeader>

      <DetailTabs>
        <TabBtn
          $active={activeTab === "mural"}
          onClick={() => setActiveTab("mural")}
        >
          <MessageSquare size={18} /> Mural de Avisos
        </TabBtn>
        <TabBtn
          $active={activeTab === "materiais"}
          onClick={() => setActiveTab("materiais")}
        >
          <FileText size={18} /> Materiais & Atividades
        </TabBtn>
        <TabBtn
          $active={activeTab === "agenda"}
          onClick={() => setActiveTab("agenda")}
        >
          <Calendar size={18} /> Agenda da Turma
        </TabBtn>
        <TabBtn
          $active={activeTab === "alunos"}
          onClick={() => setActiveTab("alunos")}
        >
          <Users size={18} /> Alunos da Turma
        </TabBtn>
        <TabBtn
          $active={activeTab === "atestados"}
          onClick={() => setActiveTab("atestados")}
        >
          <Stethoscope size={18} /> Atestados Médicos
        </TabBtn>
      </DetailTabs>

      <DetailContent>
        {activeTab === "mural" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <SectionHeader>
              <SectionTitle>
                <MessageSquare size={24} /> Mural de Avisos
              </SectionTitle>
            </SectionHeader>
            <CreatePostBox>
              <textarea
                placeholder="Escreva um aviso para a turma..."
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
              />
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <PrimaryBtn onClick={handleCreatePost}>Publicar</PrimaryBtn>
              </div>
            </CreatePostBox>

            <PostList>
              {posts.map((post) => (
                <PostCard key={post.id}>
                  <PostHeader>
                    <PostAuthor>
                      <StudentAvatarSmall
                        $color="#08142c"
                        $index={0}
                        style={{ width: "40px", height: "40px" }}
                      >
                        {getInitials(post.author)}
                      </StudentAvatarSmall>
                      <div>
                        <strong>{post.author}</strong>
                        <br />
                        <span>{post.date}</span>
                      </div>
                    </PostAuthor>
                  </PostHeader>
                  <PostContent>{post.content}</PostContent>
                </PostCard>
              ))}
            </PostList>
          </motion.div>
        )}

        {activeTab === "materiais" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <SectionHeader>
              <SectionTitle>
                <FileText size={24} /> Materiais & Atividades
              </SectionTitle>
              <PrimaryBtn
                style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
                onClick={() =>
                  addToast("Em breve: Upload de materiais", "info")
                }
              >
                <FileUp size={16} /> Novo Material
              </PrimaryBtn>
            </SectionHeader>
            <MaterialsGrid>
              {materials.map((mat, idx) => (
                <MaterialCard
                  key={idx}
                  onClick={() => {
                    if (mat.url && mat.url !== "#") {
                      window.open(mat.url, "_blank");
                    } else {
                      addToast(
                        "Este material é apenas um exemplo e não possui link válido.",
                        "info",
                      );
                    }
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      width: "100%",
                    }}
                  >
                    <MaterialIcon $type={mat.type}>
                      {mat.type === "pdf" ? (
                        <FileText size={24} />
                      ) : (
                        <ExternalLink size={24} />
                      )}
                    </MaterialIcon>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingMaterialIndex(idx);
                        setShowMaterialModal(true);
                      }}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        color: "#888",
                        padding: "4px",
                      }}
                      title="Editar Material"
                    >
                      <Edit2 size={16} />
                    </button>
                  </div>
                  <MaterialInfo
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.4rem",
                    }}
                  >
                    <h4>{mat.title}</h4>
                    <div
                      style={{
                        fontSize: "0.85rem",
                        color: "#666",
                        lineHeight: 1.4,
                        margin: 0,
                      }}
                      dangerouslySetInnerHTML={{
                        __html: mat.description || "Nenhuma descrição",
                      }}
                    />
                  </MaterialInfo>
                </MaterialCard>
              ))}
            </MaterialsGrid>
          </motion.div>
        )}

        {activeTab === "agenda" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <SectionHeader>
              <SectionTitle>
                <Calendar size={24} /> Próximas Aulas
              </SectionTitle>
              <PrimaryBtn
                style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
                onClick={() =>
                  addToast("Em breve: Agendamento de aulas", "info")
                }
              >
                <Calendar size={16} /> Nova Aula
              </PrimaryBtn>
            </SectionHeader>
            <ClassAgendaList>
              {events.map((ev, idx) => {
                const dateObj = new Date(ev.date + "T00:00:00");
                const day = isNaN(dateObj.getTime())
                  ? ev.date.split("-")[2] || "?"
                  : dateObj.getDate().toString().padStart(2, "0");
                const month = isNaN(dateObj.getTime())
                  ? "Mês"
                  : dateObj.toLocaleString("pt-BR", { month: "short" });
                return (
                  <AgendaItem key={idx}>
                    <AgendaDateBox>
                      <strong>{day}</strong>
                      <span>{month}</span>
                    </AgendaDateBox>
                    <AgendaContent>
                      <strong>{ev.title}</strong>
                      <span>
                        <Clock size={14} /> {ev.startTime} - {ev.endTime}
                      </span>
                    </AgendaContent>
                  </AgendaItem>
                );
              })}
            </ClassAgendaList>
          </motion.div>
        )}

        {activeTab === "alunos" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <SectionHeader>
              <SectionTitle>
                <Users size={24} /> Alunos Matriculados
              </SectionTitle>
            </SectionHeader>
            <StudentsGrid>
              <div
                style={{ textAlign: "center", color: "#999", padding: "2rem" }}
              >
                <Users
                  size={48}
                  style={{ opacity: 0.3, marginBottom: "1rem" }}
                />
                <p>
                  Alunos desta turma serão exibidos aqui quando disponíveis na
                  API.
                </p>
              </div>
            </StudentsGrid>
          </motion.div>
        )}

        {activeTab === "atestados" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <SectionHeader>
              <SectionTitle>
                <Stethoscope size={24} /> Atestados e Justificativas de Faltas
              </SectionTitle>
            </SectionHeader>

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
                        gap: "1.5rem",
                      }}
                    >
                      <span
                        style={{
                          color: "#3b82f6",
                          fontSize: "0.9rem",
                          display: "flex",
                          alignItems: "center",
                          gap: "0.4rem",
                          cursor: "pointer",
                          textDecoration: "underline",
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
                              gap: "4px",
                            }}
                          >
                            <CheckCircle size={14} /> Aceito
                          </span>
                        ) : just.status === "Recusado" ? (
                          <span
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "4px",
                            }}
                          >
                            <X size={14} /> Recusado
                          </span>
                        ) : (
                          <span
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "4px",
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
                          maxWidth: "300px",
                          textAlign: "right",
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
      </DetailContent>

      {showMaterialModal && (
        <AddMaterialModal
          onClose={() => {
            setShowMaterialModal(false);
            setEditingMaterialIndex(null);
          }}
          onSave={handleAddMaterial}
          initialData={
            editingMaterialIndex !== null
              ? materials[editingMaterialIndex]
              : undefined
          }
        />
      )}

      {showEventModal && (
        <AddClassEventModal
          onClose={() => setShowEventModal(false)}
          onSave={handleAddEvent}
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
    </DetailContainer>
  );
};

export default ClassDetail;
