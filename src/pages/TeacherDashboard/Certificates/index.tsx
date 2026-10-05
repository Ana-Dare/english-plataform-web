import React, { useState } from "react";
import { Search, Upload } from "lucide-react";
import {
  Container,
  HeaderActions,
  FilterSelect,
  SearchWrapper,
  CardsList,
  CertificateCard,
  Avatar,
  CardInfo,
  StudentName,
  LevelBadge,
  CardMeta,
  MetaItem,
  ViewProfileBtn,
  DetailContainer,
  BackButton,
  DetailSection,
  SectionTitle,
  ProgressWrapper,
  ProgressBarContainer,
  ProgressBarFill,
  SendCertificateBtn,
  InfoGrid,
  InfoGroup,
  InfoLabel,
  InfoValue,
  ProfileHeader,
  ProfileAvatar,
  ProfileInfo,
  ProfileName,
  BadgeRow,
  PremiumCard,
  Timeline,
  TimelineItem,
  TimelineIcon,
  TimelineContent,
  TimelineHeader,
  TimelineTitle,
  TimelineDate,
  MaterialGrid,
  MaterialCard,
  MaterialIcon,
  MaterialInfo,
  MaterialTitle,
  MaterialMeta,
  ActionButtonsWrapper,
} from "./style";
import {
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
} from "lucide-react";
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
      { title: "Workbook 2", type: "PDF", date: "12/02/2023" },
      {
        title: "Audio Exercises - Intermediate",
        type: "Audio",
        date: "18/03/2023",
      },
      { title: "Grammar Cheat Sheet", type: "Document", date: "22/04/2023" },
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
      { title: "Starter Guide", type: "PDF", date: "22/02/2023" },
      { title: "Flashcards", type: "Document", date: "28/03/2023" },
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
      { title: "Business Cases PDF", type: "PDF", date: "28/03/2023" },
      { title: "Advanced Grammar Book", type: "PDF", date: "12/05/2023" },
      { title: "TED Talks Transcripts", type: "Document", date: "18/06/2023" },
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
          <ChevronLeft size={18} /> Voltar para a lista
        </BackButton>

        <DetailContainer>
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
                <LevelBadge>
                  <Award size={12} style={{ marginRight: "4px" }} />{" "}
                  {selectedStudent.level}
                </LevelBadge>
                <LevelBadge
                  style={{
                    background: "rgba(59, 130, 246, 0.1)",
                    color: "#3b82f6",
                  }}
                >
                  {selectedStudent.plan}
                </LevelBadge>
                {selectedStudent.status === "Ativo" && (
                  <LevelBadge
                    style={{
                      background: "rgba(34, 197, 94, 0.1)",
                      color: "#22c55e",
                    }}
                  >
                    Ativo
                  </LevelBadge>
                )}
              </BadgeRow>
            </ProfileInfo>
          </ProfileHeader>

          <PremiumCard>
            <DetailSection>
              <SectionTitle>
                <User size={18} /> Perfil Acadêmico e Pessoal
              </SectionTitle>
              <InfoGrid>
                <InfoGroup>
                  <InfoLabel>Email</InfoLabel>
                  <InfoValue>{selectedStudent.email}</InfoValue>
                </InfoGroup>
                <InfoGroup>
                  <InfoLabel>Telefone</InfoLabel>
                  <InfoValue>{selectedStudent.phone}</InfoValue>
                </InfoGroup>
                <InfoGroup>
                  <InfoLabel>CPF</InfoLabel>
                  <InfoValue>{selectedStudent.cpf}</InfoValue>
                </InfoGroup>
                <InfoGroup>
                  <InfoLabel>Data de Nascimento</InfoLabel>
                  <InfoValue>{selectedStudent.birthdate}</InfoValue>
                </InfoGroup>
                <InfoGroup>
                  <InfoLabel>Data da Matrícula</InfoLabel>
                  <InfoValue>{selectedStudent.enrollmentDate}</InfoValue>
                </InfoGroup>
              </InfoGrid>
            </DetailSection>
          </PremiumCard>

          <PremiumCard>
            <DetailSection>
              <SectionTitle>
                <Activity size={18} /> Desempenho e Andamento
              </SectionTitle>
              <InfoGrid style={{ gap: "2rem", marginBottom: "1.5rem" }}>
                <InfoGroup>
                  <InfoLabel>Duração do Curso</InfoLabel>
                  <InfoValue>{selectedStudent.durationMonths} meses</InfoValue>
                </InfoGroup>
                <InfoGroup>
                  <InfoLabel>Aulas Concluídas</InfoLabel>
                  <InfoValue>
                    {selectedStudent.classesAttended} aulas realizadas
                  </InfoValue>
                </InfoGroup>
              </InfoGrid>
              <InfoGrid style={{ gap: "3rem" }}>
                <ProgressWrapper style={{ flex: 1 }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "0.5rem",
                    }}
                  >
                    <InfoLabel>Progresso do Nível</InfoLabel>
                    <InfoValue style={{ color: "#3b82f6", fontWeight: 700 }}>
                      {selectedStudent.progress}%
                    </InfoValue>
                  </div>
                  <ProgressBarContainer>
                    <ProgressBarFill
                      $progress={selectedStudent.progress}
                      style={{
                        background:
                          "linear-gradient(90deg, #60a5fa 0%, #3b82f6 100%)",
                      }}
                    />
                  </ProgressBarContainer>
                </ProgressWrapper>
              </InfoGrid>
            </DetailSection>
          </PremiumCard>

          <PremiumCard>
            <DetailSection>
              <SectionTitle>
                <BookOpen size={18} /> Linha do Tempo Acadêmica
              </SectionTitle>
              <Timeline>
                {selectedStudent.pastClasses.map((aula, index) => (
                  <TimelineItem
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                  >
                    <TimelineIcon>
                      <CheckCircle size={14} />
                    </TimelineIcon>
                    <TimelineContent>
                      <TimelineHeader>
                        <TimelineTitle>{aula.name}</TimelineTitle>
                      </TimelineHeader>
                      <TimelineDate>
                        <Calendar size={12} /> Concluída em {aula.date}
                      </TimelineDate>
                    </TimelineContent>
                  </TimelineItem>
                ))}
              </Timeline>
            </DetailSection>
          </PremiumCard>

          <PremiumCard>
            <DetailSection>
              <SectionTitle>
                <FileBadge size={18} /> Dossiê de Materiais
              </SectionTitle>
              <MaterialGrid>
                {selectedStudent.materials.map((mat, index) => (
                  <MaterialCard
                    key={index}
                    onClick={() =>
                      addToast(`Visualizando material: ${mat.title}`, "info")
                    }
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                  >
                    <MaterialIcon $type={mat.type}>
                      {mat.type === "PDF" ? (
                        <FileText size={20} />
                      ) : mat.type === "Audio" ? (
                        <FileAudio size={20} />
                      ) : (
                        <BookOpen size={20} />
                      )}
                    </MaterialIcon>
                    <MaterialInfo>
                      <MaterialTitle>{mat.title}</MaterialTitle>
                      <MaterialMeta>Acessado em {mat.date}</MaterialMeta>
                    </MaterialInfo>
                    <div
                      style={{
                        marginLeft: "auto",
                        color: "#1F2B45",
                        fontSize: "0.85rem",
                        fontWeight: 600,
                        display: "flex",
                        alignItems: "center",
                        gap: "0.4rem",
                        textDecoration: "underline",
                      }}
                    >
                      <Eye size={14} /> Visualizar
                    </div>
                  </MaterialCard>
                ))}
              </MaterialGrid>
            </DetailSection>
          </PremiumCard>

          <ActionButtonsWrapper>
            <SendCertificateBtn
              onClick={() =>
                addToast(
                  `Certificado de ${selectedStudent.name} emitido com sucesso!`,
                  "success",
                )
              }
              style={{ padding: "1rem 2.5rem", fontSize: "1.05rem" }}
            >
              <Upload size={20} /> Emitir Certificado Oficial
            </SendCertificateBtn>
            <SendCertificateBtn
              onClick={() =>
                addToast(
                  `Baixando certificado de ${selectedStudent.name}...`,
                  "info",
                )
              }
              style={{
                padding: "1rem 2.5rem",
                fontSize: "1.05rem",
                background: "#f0f4f8",
                color: "#1F2B45",
                border: "1px solid #d0d5dd",
                boxShadow: "none",
              }}
            >
              <Download size={20} /> Baixar Certificado
            </SendCertificateBtn>
          </ActionButtonsWrapper>
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

        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <FilterSelect
            value={levelFilter}
            onChange={(e) => setLevelFilter(e.target.value)}
          >
            <option value="all">Todos os Níveis</option>
            <option value="Beginner 2">Beginner</option>
            <option value="Intermediate 2">Intermediate</option>
            <option value="Advanced 1">Advanced</option>
          </FilterSelect>

          <FilterSelect
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="recentes">Matrículas Recentes</option>
            <option value="antigos">Matrículas Antigas</option>
            <option value="progresso">Maior Progresso</option>
          </FilterSelect>
        </div>
      </HeaderActions>

      <CardsList>
        {filteredStudents.length > 0 ? (
          filteredStudents.map((student, index) => (
            <CertificateCard
              key={student.id}
              onClick={() => setSelectedStudent(student)}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Avatar $bg={student.bg} $color={student.color}>
                {student.initials}
              </Avatar>
              <CardInfo>
                <StudentName>{student.name}</StudentName>
                <div
                  style={{
                    display: "flex",
                    gap: "0.5rem",
                    alignItems: "center",
                  }}
                >
                  <LevelBadge>{student.level}</LevelBadge>
                  {student.status === "Ativo" && (
                    <span
                      style={{
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        color: "#22c55e",
                        background: "rgba(34, 197, 94, 0.1)",
                        padding: "0.2rem 0.6rem",
                        borderRadius: "20px",
                      }}
                    >
                      Ativo
                    </span>
                  )}
                </div>
              </CardInfo>

              <CardMeta>
                <MetaItem>
                  <span>Matrícula</span>
                  <span>{student.enrollmentDate}</span>
                </MetaItem>
                <MetaItem>
                  <span>Progresso</span>
                  <span style={{ color: "#3b82f6" }}>{student.progress}%</span>
                </MetaItem>
              </CardMeta>

              <ViewProfileBtn>
                Ver Dossiê <Eye size={16} />
              </ViewProfileBtn>
            </CertificateCard>
          ))
        ) : (
          <div
            style={{
              padding: "2rem",
              textAlign: "center",
              color: "#888",
              fontFamily: "Rubik",
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
