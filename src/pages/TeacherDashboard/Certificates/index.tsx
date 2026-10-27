import React, { useState } from "react";
import {
  Search,
  Upload,
  ChevronLeft,
  CheckCircle,
  FileText,
  User,
  Award,
  BookOpen,
  FileAudio,
  FileBadge,
  Calendar,
  Activity,
  Download,
  Eye,
  Mail,
  Phone,
  Clock,
  CheckCircle2,
} from "lucide-react";
import CustomDropdown from "../../../components/CustomDropdown";
import MobileCarousel from "../../../components/MobileCarousel";
import DocumentViewerModal from "../Classes/DocumentViewerModal";
import type { LessonMaterial } from "../services/material";
import {
  Container,
  HeaderActions,
  SearchWrapper,
  CardsList,
  CertificateCard,
  CardIdentity,
  Avatar,
  CardInfo,
  StudentName,
  BadgesContainer,
  LevelBadge,
  PlanBadge,
  StatusBadge,
  CardMeta,
  MetaItem,
  ProgressIndicator,
  MiniProgressBar,
  CardAction,
  ViewProfileBtn,
  DetailContainer,
  BackButton,
  ProfileHeader,
  ProfileAvatar,
  ProfileInfo,
  ProfileName,
  BadgeRow,
  SectionWrapper,
  SectionTitle,
  InfoGrid,
  InfoGroup,
  InfoLabel,
  InfoValue,
  PerformanceGrid,
  ProgressContainer,
  ProgressHeader,
  ProgressPercentage,
  ProgressBarContainer,
  ProgressBarFill,
  Timeline,
  TimelineItem,
  TimelineIcon,
  TimelineContent,
  TimelineInfo,
  TimelineTitle,
  TimelineDate,
  TimelineStatus,
  MaterialGrid,
  MaterialCard,
  MaterialIcon,
  MaterialInfo,
  MaterialTitle,
  MaterialMeta,
  MaterialActionBtn,
  ActionButtonsWrapper,
  SendCertificateBtn,
  DownloadCertificateBtn,
} from "./style";
import useToast from "../../../contexts/Toast/useToast";

const MOCK_CERTIFICATES = [
  {
    id: 1,
    name: "Ana Clara Silva",
    email: "ana.clara@example.com",
    phone: "(11) 98765-4321",
    cpf: "123.456.789-00",
    birthdate: "15/05/2000",
    enrollmentDate: "10/01/2023",
    status: "Ativo",
    level: "Intermediate 2",
    initials: "AC",
    bg: "#cce0ff",
    color: "#1F2B45",
    progress: 100,
    attendance: 95,
    durationMonths: 6,
    classesAttended: 42,
    plan: "VIP",
    pastClasses: [
      { name: "Grammar Fundamentals", date: "10/02/2023", score: 95 },
      { name: "Speaking Practice 1", date: "15/03/2023", score: 88 },
      { name: "Reading Comprehension", date: "20/04/2023", score: 92 },
      { name: "Vocabulary Building", date: "25/05/2023", score: 100 },
      { name: "Listening Exercises B1", date: "30/06/2023", score: 90 },
    ],
    materials: [
      {
        id: 101,
        lessonId: 0,
        title: "Workbook 2",
        type: "pdf" as const,
        date: "12/02/2023",
        category: "Gramática",
        file: "workbook_2.pdf",
        sizeFormatted: "2.4 MB",
        link: "/sample-material.pdf",
        createdAt: "2023-02-12T10:00:00",
        description: "Apostila com exercícios práticos e revisão gramatical nível intermediário.",
      },
      {
        id: 102,
        lessonId: 0,
        title: "Audio Exercises - Intermediate",
        type: "audio" as const,
        date: "18/03/2023",
        category: "Listening",
        file: "audio_exercises_intermediate.mp3",
        sizeFormatted: "4.8 MB",
        link: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        createdAt: "2023-03-18T14:30:00",
        description: "Exercícios de escuta e pronúncia com diálogos do dia a dia.",
      },
      {
        id: 103,
        lessonId: 0,
        title: "Grammar Cheat Sheet",
        type: "document" as const,
        date: "22/04/2023",
        category: "Gramática",
        file: "grammar_cheat_sheet.docx",
        sizeFormatted: "1.2 MB",
        link: "/sample-material.pdf",
        createdAt: "2023-04-22T09:15:00",
        description: "Guia rápido de consulta para tempos verbais e conectivos.",
      },
    ],
  },
  {
    id: 2,
    name: "Pedro Henrique Santos",
    email: "pedro.hs@example.com",
    phone: "(21) 99888-7777",
    cpf: "098.765.432-11",
    birthdate: "22/10/1995",
    enrollmentDate: "15/02/2023",
    status: "Ativo",
    level: "Beginner 2",
    initials: "PH",
    bg: "#d4f5d4",
    color: "#1F2B45",
    progress: 100,
    attendance: 85,
    durationMonths: 3,
    classesAttended: 20,
    plan: "Regular",
    pastClasses: [
      { name: "Verb to be", date: "20/02/2023", score: 85 },
      { name: "Basic Vocabulary", date: "25/03/2023", score: 70 },
      { name: "Listening 1", date: "10/04/2023", score: 90 },
      { name: "Simple Present", date: "15/05/2023", score: 65 },
    ],
    materials: [
      {
        id: 201,
        lessonId: 0,
        title: "Starter Guide",
        type: "pdf" as const,
        date: "22/02/2023",
        category: "Iniciante",
        file: "starter_guide.pdf",
        sizeFormatted: "3.1 MB",
        link: "/sample-material.pdf",
        createdAt: "2023-02-22T08:00:00",
        description: "Guia introdutório com vocabulário essencial e primeiras frases.",
      },
      {
        id: 202,
        lessonId: 0,
        title: "Flashcards",
        type: "document" as const,
        date: "28/03/2023",
        category: "Vocabulário",
        file: "flashcards_beginner.docx",
        sizeFormatted: "950 KB",
        link: "/sample-material.pdf",
        createdAt: "2023-03-28T11:20:00",
        description: "Cartões para fixação e memorização de vocabulário básico.",
      },
    ],
  },
  {
    id: 3,
    name: "Maria Eduarda Costa",
    email: "maria.eduarda@example.com",
    phone: "(31) 91234-5678",
    cpf: "456.789.123-22",
    birthdate: "10/08/2001",
    enrollmentDate: "20/03/2023",
    status: "Ativo",
    level: "Advanced 1",
    initials: "ME",
    bg: "#fff3cc",
    color: "#1F2B45",
    progress: 100,
    attendance: 98,
    durationMonths: 12,
    classesAttended: 88,
    plan: "VIP",
    pastClasses: [
      { name: "Business English", date: "25/03/2023", score: 98 },
      { name: "Advanced Speaking", date: "10/05/2023", score: 95 },
      { name: "Idioms and Phrasal Verbs", date: "15/06/2023", score: 100 },
      { name: "Debate Prep", date: "20/07/2023", score: 96 },
    ],
    materials: [
      {
        id: 301,
        lessonId: 0,
        title: "Business Cases PDF",
        type: "pdf" as const,
        date: "28/03/2023",
        category: "Business",
        file: "business_cases.pdf",
        sizeFormatted: "2.5 MB",
        link: "/sample-material.pdf",
        createdAt: "2023-03-28T14:00:00",
        description: "Estudos de caso reais para negociações e apresentações em inglês corporativo.",
      },
      {
        id: 302,
        lessonId: 0,
        title: "Advanced Grammar Book",
        type: "pdf" as const,
        date: "12/05/2023",
        category: "Gramática",
        file: "advanced_grammar_book.pdf",
        sizeFormatted: "5.1 MB",
        link: "/sample-material.pdf",
        createdAt: "2023-05-12T16:30:00",
        description: "Livro de gramática avançada com foco em fluência e estruturas complexas.",
      },
      {
        id: 303,
        lessonId: 0,
        title: "TED Talks Transcripts",
        type: "document" as const,
        date: "18/06/2023",
        category: "Listening",
        file: "ted_talks_transcripts.docx",
        sizeFormatted: "1.8 MB",
        link: "/sample-material.pdf",
        createdAt: "2023-06-18T10:45:00",
        description: "Transcrições anotadas de palestras do TED Talks para análise discursiva.",
      },
    ],
  },
];

type StudentMock = (typeof MOCK_CERTIFICATES)[0];

const CertificatesTab: React.FC = () => {
  const { addToast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("recentes");
  const [levelFilter, setLevelFilter] = useState("all");
  const [selectedStudent, setSelectedStudent] = useState<StudentMock | null>(
    null,
  );
  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewerInitialId, setViewerInitialId] = useState<number | undefined>(
    undefined,
  );

  const handleOpenMaterialViewer = (materialId: number) => {
    setViewerInitialId(materialId);
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
        `Download de "${material.title || material.file}" iniciado!`,
        "success",
      );
    } catch {
      window.open(material.link, "_blank");
    }
  };

  const filteredStudents = MOCK_CERTIFICATES.filter((student) => {
    const matchesSearch = student.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesLevel = levelFilter === "all" || student.level === levelFilter;
    return matchesSearch && matchesLevel;
  }).sort((a, b) => {
    if (sortBy === "recentes") {
      return (
        new Date(b.enrollmentDate.split("/").reverse().join("-")).getTime() -
        new Date(a.enrollmentDate.split("/").reverse().join("-")).getTime()
      );
    } else if (sortBy === "antigos") {
      return (
        new Date(a.enrollmentDate.split("/").reverse().join("-")).getTime() -
        new Date(b.enrollmentDate.split("/").reverse().join("-")).getTime()
      );
    } else if (sortBy === "progresso") {
      return b.progress - a.progress;
    }
    return 0;
  });

  if (selectedStudent) {
    return (
      <Container>
        <BackButton onClick={() => setSelectedStudent(null)}>
          <ChevronLeft size={16} /> Voltar para a lista
        </BackButton>

        <DetailContainer>
          {/* Header do Aluno em Azul Escuro Oficial */}
          <ProfileHeader>
            <ProfileAvatar
              $bg={selectedStudent.bg}
              $color={selectedStudent.color}
            >
              {selectedStudent.initials}
            </ProfileAvatar>
            <ProfileInfo>
              <ProfileName>{selectedStudent.name}</ProfileName>
              <BadgeRow>
                <LevelBadge $onDark>
                  <Award size={13} />
                  {selectedStudent.level}
                </LevelBadge>
                <PlanBadge $onDark>{selectedStudent.plan}</PlanBadge>
                {selectedStudent.status === "Ativo" && (
                  <StatusBadge $onDark>
                    <span className="dot" />
                    Ativo
                  </StatusBadge>
                )}
              </BadgeRow>
            </ProfileInfo>
          </ProfileHeader>

          {/* 1. Perfil Acadêmico e Pessoal (5 cartões brancos diretos) */}
          <SectionWrapper>
            <SectionTitle>
              <User size={18} /> Perfil Acadêmico e Pessoal
            </SectionTitle>
            <InfoGrid>
              <InfoGroup>
                <InfoLabel>
                  <Mail size={13} /> Email
                </InfoLabel>
                <InfoValue title={selectedStudent.email}>
                  {selectedStudent.email}
                </InfoValue>
              </InfoGroup>
              <InfoGroup>
                <InfoLabel>
                  <Phone size={13} /> Telefone
                </InfoLabel>
                <InfoValue>{selectedStudent.phone}</InfoValue>
              </InfoGroup>
              <InfoGroup>
                <InfoLabel>
                  <FileText size={13} /> CPF
                </InfoLabel>
                <InfoValue>{selectedStudent.cpf}</InfoValue>
              </InfoGroup>
              <InfoGroup>
                <InfoLabel>
                  <Calendar size={13} /> Data de Nascimento
                </InfoLabel>
                <InfoValue>{selectedStudent.birthdate}</InfoValue>
              </InfoGroup>
              <InfoGroup>
                <InfoLabel>
                  <Award size={13} /> Data da Matrícula
                </InfoLabel>
                <InfoValue>{selectedStudent.enrollmentDate}</InfoValue>
              </InfoGroup>
            </InfoGrid>
          </SectionWrapper>

          {/* 2. Desempenho e Andamento */}
          <SectionWrapper>
            <SectionTitle>
              <Activity size={18} /> Desempenho e Andamento
            </SectionTitle>
            <PerformanceGrid>
              <InfoGroup>
                <InfoLabel>
                  <Clock size={13} /> Duração do Curso
                </InfoLabel>
                <InfoValue>{selectedStudent.durationMonths} meses</InfoValue>
              </InfoGroup>
              <InfoGroup>
                <InfoLabel>
                  <CheckCircle2 size={13} /> Aulas Concluídas
                </InfoLabel>
                <InfoValue>
                  {selectedStudent.classesAttended} aulas realizadas
                </InfoValue>
              </InfoGroup>
            </PerformanceGrid>

            <ProgressContainer>
              <ProgressHeader>
                <InfoLabel>Progresso do Nível</InfoLabel>
                <ProgressPercentage>
                  {selectedStudent.progress}%
                </ProgressPercentage>
              </ProgressHeader>
              <ProgressBarContainer>
                <ProgressBarFill $progress={selectedStudent.progress} />
              </ProgressBarContainer>
            </ProgressContainer>
          </SectionWrapper>

          {/* 3. Linha do Tempo Acadêmica */}
          <SectionWrapper>
            <SectionTitle>
              <BookOpen size={18} /> Linha do Tempo Acadêmica
            </SectionTitle>
            <Timeline>
              {selectedStudent.pastClasses.map((aula, index) => (
                <TimelineItem
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                >
                  <TimelineIcon>
                    <CheckCircle size={14} />
                  </TimelineIcon>
                  <TimelineContent>
                    <TimelineInfo>
                      <TimelineTitle>{aula.name}</TimelineTitle>
                      <TimelineDate>
                        <Calendar size={13} /> Concluída em {aula.date}
                      </TimelineDate>
                    </TimelineInfo>
                    <TimelineStatus>
                      <CheckCircle size={13} /> Concluída
                    </TimelineStatus>
                  </TimelineContent>
                </TimelineItem>
              ))}
            </Timeline>
          </SectionWrapper>

          {/* 4. Dossiê de Materiais */}
          <SectionWrapper>
            <SectionTitle>
              <FileBadge size={18} /> Dossiê de Materiais
            </SectionTitle>
            <MaterialGrid>
              {selectedStudent.materials.map((mat, index) => (
                <MaterialCard
                  key={mat.id || index}
                  onClick={() => handleOpenMaterialViewer(mat.id)}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                >
                  <MaterialIcon $type={mat.type}>
                    {mat.type.toLowerCase() === "pdf" ? (
                      <FileText size={20} />
                    ) : mat.type.toLowerCase() === "audio" ? (
                      <FileAudio size={20} />
                    ) : (
                      <BookOpen size={20} />
                    )}
                  </MaterialIcon>
                  <MaterialInfo>
                    <MaterialTitle>{mat.title}</MaterialTitle>
                    <MaterialMeta>Acessado em {mat.date}</MaterialMeta>
                  </MaterialInfo>
                  <MaterialActionBtn
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenMaterialViewer(mat.id);
                    }}
                  >
                    <Eye size={14} /> Visualizar
                  </MaterialActionBtn>
                </MaterialCard>
              ))}
            </MaterialGrid>
          </SectionWrapper>

          {/* 5. Ações de Certificado */}
          <ActionButtonsWrapper>
            <SendCertificateBtn
              onClick={() =>
                addToast(
                  `Certificado de ${selectedStudent.name} emitido com sucesso!`,
                  "success",
                )
              }
            >
              <Upload size={18} /> Emitir Certificado Oficial
            </SendCertificateBtn>
            <DownloadCertificateBtn
              onClick={() => {
                try {
                  const a = document.createElement("a");
                  a.href = "/certificate.png";
                  a.download = `Certificado_${selectedStudent.name.replace(/\s+/g, "_")}.png`;
                  document.body.appendChild(a);
                  a.click();
                  document.body.removeChild(a);
                  addToast(
                    `Download do certificado de ${selectedStudent.name} iniciado!`,
                    "success",
                  );
                } catch {
                  addToast(
                    `Baixando certificado de ${selectedStudent.name}...`,
                    "info",
                  );
                }
              }}
            >
              <Download size={18} /> Baixar Certificado
            </DownloadCertificateBtn>
          </ActionButtonsWrapper>

          {/* 6. Modal de Visualização de Documentos / Materiais */}
          <DocumentViewerModal
            isOpen={viewerOpen}
            onClose={() => setViewerOpen(false)}
            materials={selectedStudent.materials as unknown as LessonMaterial[]}
            initialMaterialId={viewerInitialId}
            onDownload={handleDownloadMaterial}
          />
        </DetailContainer>
      </Container>
    );
  }

  return (
    <Container>
      <HeaderActions>
        <SearchWrapper>
          <Search size={18} />
          <input
            type="text"
            placeholder="Pesquisar aluno"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </SearchWrapper>

        <MobileCarousel gap="0.85rem" mobileGap="0.5rem">
          <CustomDropdown
            value={levelFilter}
            onChange={(val) => setLevelFilter(val)}
            leadingIcon={<Award size={15} strokeWidth={2} />}
            options={[
              { value: "all", label: "Todos os Níveis" },
              { value: "Beginner 2", label: "Beginner" },
              { value: "Intermediate 2", label: "Intermediate" },
              { value: "Advanced 1", label: "Advanced" },
            ]}
          />

          <CustomDropdown
            value={sortBy}
            onChange={(val) => setSortBy(val)}
            leadingIcon={<Calendar size={15} strokeWidth={2} />}
            menuAlign="right"
            options={[
              { value: "recentes", label: "Matrículas Recentes" },
              { value: "antigos", label: "Matrículas Antigas" },
              { value: "progresso", label: "Maior Progresso" },
            ]}
          />
        </MobileCarousel>

        {(searchQuery.trim() !== "" ||
          levelFilter !== "all" ||
          sortBy !== "recentes") && (
          <button
            type="button"
            onClick={() => {
              setSearchQuery("");
              setLevelFilter("all");
              setSortBy("recentes");
            }}
            style={{
              background: "transparent",
              border: "none",
              color: "#2563eb",
              fontSize: "0.875rem",
              fontWeight: 600,
              cursor: "pointer",
              padding: "4px 8px",
              fontFamily: "inherit",
              whiteSpace: "nowrap",
              alignSelf: "flex-end",
            }}
          >
            Limpar filtro
          </button>
        )}
      </HeaderActions>

      <CardsList>
        {filteredStudents.length > 0 ? (
          filteredStudents.map((student, index) => (
            <CertificateCard
              key={student.id}
              onClick={() => setSelectedStudent(student)}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.04 }}
            >
              <CardIdentity>
                <Avatar $bg={student.bg} $color={student.color}>
                  {student.initials}
                </Avatar>
                <CardInfo>
                  <StudentName>{student.name}</StudentName>
                  <BadgesContainer>
                    <LevelBadge>
                      <Award size={12} />
                      {student.level}
                    </LevelBadge>
                    {student.status === "Ativo" && (
                      <StatusBadge>
                        <span className="dot" />
                        Ativo
                      </StatusBadge>
                    )}
                  </BadgesContainer>
                </CardInfo>
              </CardIdentity>

              <CardMeta>
                <MetaItem>
                  <span>Matrícula</span>
                  <span>{student.enrollmentDate}</span>
                </MetaItem>
                <MetaItem>
                  <span>Progresso</span>
                  <ProgressIndicator>
                    <span style={{ color: "#1f2b45", fontWeight: 700 }}>
                      {student.progress}%
                    </span>
                    <MiniProgressBar>
                      <div style={{ width: `${student.progress}%` }} />
                    </MiniProgressBar>
                  </ProgressIndicator>
                </MetaItem>
              </CardMeta>

              <CardAction>
                <ViewProfileBtn>
                  Ver Dossiê <Eye size={15} />
                </ViewProfileBtn>
              </CardAction>
            </CertificateCard>
          ))
        ) : (
          <div
            style={{
              padding: "3rem",
              textAlign: "center",
              color: "#94a3b8",
              fontFamily: "Rubik",
              background: "#ffffff",
              borderRadius: "16px",
              border: "1.5px solid #e2e8f0",
              fontWeight: 500,
            }}
          >
            Nenhum aluno encontrado.
          </div>
        )}
      </CardsList>
    </Container>
  );
};

export default CertificatesTab;
