import React, { useState } from "react";
import {
  ArrowLeft,
  MessageSquare,
  FileText,
  Calendar,
  ExternalLink,
  CalendarPlus,
  FileUp,
} from "lucide-react";
import {
  DetailContainer,
  DetailHeader,
  DetailBackBtn,
  DetailHeaderTitle,
  LevelBadge,
  StudentsPreview,
  StudentAvatarSmall,
  MoreStudents,
  DetailTabs,
  TabBtn,
  DetailContent,
  PostCard,
  PostHeader,
  PostAvatar,
  PostMeta,
  PostBody,
  CreatePostBox,
  PrimaryBtn,
  MaterialsGrid,
  MaterialCard,
  MaterialIcon,
  MaterialInfo,
  ClassAgendaList,
  AgendaItem,
  AgendaItemInfo,
  AgendaDateBox,
  AgendaDetails,
} from "./style";
import type { ClassType } from "./types";
import AddMaterialModal from "./AddMaterialModal";
import type { MaterialData } from "./AddMaterialModal";
import AddClassEventModal from "./AddClassEventModal";
import type { ClassEventData } from "./AddClassEventModal";

interface ClassDetailProps {
  classData: ClassType;
  onBack: () => void;
}

const getInitials = (name: string) => {
  const parts = name.split(" ");
  return parts.length > 1
    ? `${parts[0][0]}${parts[parts.length - 1][0]}`
    : parts[0][0];
};

const ClassDetail: React.FC<ClassDetailProps> = ({ classData, onBack }) => {
  const [activeTab, setActiveTab] = useState<"mural" | "materiais" | "agenda">(
    "mural",
  );
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

  const handleAddMaterial = (data: MaterialData) => {
    setMaterials([data, ...materials]);
    setShowMaterialModal(false);
  };

  const handleAddEvent = (data: ClassEventData) => {
    setEvents([data, ...events]);
    setShowEventModal(false);
    if (data.syncAgenda) {
      alert(
        `Aula "${data.title}" agendada e adicionada à sua agenda pessoal com sucesso!`,
      );
    } else {
      alert(`Aula "${data.title}" agendada com sucesso!`);
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
              <LevelBadge>{classData.level}</LevelBadge>
              <StudentsPreview>
                {classData.students.slice(0, 3).map((s, i) => (
                  <StudentAvatarSmall
                    key={s.id}
                    $color={s.avatarColor}
                    $index={i}
                  >
                    {getInitials(s.name)}
                  </StudentAvatarSmall>
                ))}
                {classData.students.length > 3 && (
                  <MoreStudents>+{classData.students.length - 3}</MoreStudents>
                )}
                <span
                  style={{
                    marginLeft: "12px",
                    fontSize: "0.85rem",
                    color: "rgba(255,255,255,0.8)",
                  }}
                >
                  {classData.students.length} alunos
                </span>
              </StudentsPreview>
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
      </DetailTabs>

      <DetailContent>
        {activeTab === "mural" && (
          <div>
            <CreatePostBox>
              <textarea
                placeholder="Escreva um aviso para a turma..."
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
              />
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <PrimaryBtn onClick={handleCreatePost}>
                  Publicar Aviso
                </PrimaryBtn>
              </div>
            </CreatePostBox>

            {posts.map((post) => (
              <PostCard key={post.id}>
                <PostHeader>
                  <PostAvatar>{getInitials(post.author)}</PostAvatar>
                  <PostMeta>
                    <strong>{post.author}</strong>
                    <span>{post.date}</span>
                  </PostMeta>
                </PostHeader>
                <PostBody>{post.content}</PostBody>
              </PostCard>
            ))}
          </div>
        )}

        {activeTab === "materiais" && (
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "2rem",
              }}
            >
              <h3 style={{ margin: 0, color: "#08142c" }}>
                Materiais da Turma
              </h3>
              <PrimaryBtn
                style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
                onClick={() => setShowMaterialModal(true)}
              >
                <FileUp size={16} /> Adicionar Material
              </PrimaryBtn>
            </div>

            <MaterialsGrid>
              {materials.map((mat, idx) => (
                <MaterialCard key={idx}>
                  <MaterialIcon $type={mat.type}>
                    {mat.type === "pdf" ? (
                      <FileText size={24} />
                    ) : (
                      <ExternalLink size={24} />
                    )}
                  </MaterialIcon>
                  <MaterialInfo>
                    <h4>{mat.title}</h4>
                    <p>{mat.description || "Nenhuma descrição"}</p>
                  </MaterialInfo>
                </MaterialCard>
              ))}
            </MaterialsGrid>
          </div>
        )}

        {activeTab === "agenda" && (
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "2rem",
              }}
            >
              <h3 style={{ margin: 0, color: "#08142c" }}>Próximas Aulas</h3>
              <PrimaryBtn
                style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
                onClick={() => setShowEventModal(true)}
              >
                <CalendarPlus size={16} /> Nova Aula
              </PrimaryBtn>
            </div>

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
                    <AgendaItemInfo>
                      <AgendaDateBox>
                        <strong>{day}</strong>
                        <span>{month}</span>
                      </AgendaDateBox>
                      <AgendaDetails>
                        <h4>{ev.title}</h4>
                        <span>
                          <Calendar size={14} /> {ev.startTime} - {ev.endTime}
                        </span>
                      </AgendaDetails>
                    </AgendaItemInfo>
                  </AgendaItem>
                );
              })}
            </ClassAgendaList>
          </div>
        )}
      </DetailContent>

      {showMaterialModal && (
        <AddMaterialModal
          onClose={() => setShowMaterialModal(false)}
          onSave={handleAddMaterial}
        />
      )}

      {showEventModal && (
        <AddClassEventModal
          onClose={() => setShowEventModal(false)}
          onSave={handleAddEvent}
        />
      )}
    </DetailContainer>
  );
};

export default ClassDetail;
