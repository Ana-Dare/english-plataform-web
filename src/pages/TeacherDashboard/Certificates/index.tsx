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
import { formatMaterialDateTime } from "../services/material";
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
import { useStudents } from "../../../contexts/Students/hooks/useStudents";
import { getInitials } from "../../../utils/avatar";

interface StudentMock {
  id: number;
  name: string;
  email: string;
  phone: string;
  cpf: string;
  birthdate: string;
  enrollmentDate: string;
  status: string;
  level: string;
  initials: string;
  bg: string;
  color: string;
  progress: number;
  attendance: number;
  durationMonths: number;
  classesAttended: number;
  plan: string;
  pastClasses: Array<{ name: string; date: string; score: number }>;
  materials: LessonMaterial[];
}

const CertificatesTab: React.FC = () => {
  const { addToast } = useToast();
  const { students } = useStudents();
  const certificateStudents: StudentMock[] = students.map((s) => ({
    id: s.id,
    name: s.name,
    email: s.email,
    phone: s.phone,
    cpf: "",
    birthdate: s.birthdate,
    enrollmentDate: s.enrollDate,
    status: s.isActive ? "Ativo" : "Inativo",
    level: s.level,
    initials: getInitials(s.name),
    bg: s.avatarColor || "#cce0ff",
    color: "#1F2B45",
    progress: s.progress ?? 0,
    attendance: 0,
    durationMonths: 0,
    classesAttended: 0,
    plan: s.plan === 1 ? "VIP" : "Regular",
    pastClasses: [],
    materials: [],
  }));
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

  const filteredStudents = certificateStudents.filter((student) => {
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
                    <MaterialMeta>
                      Acessado em {formatMaterialDateTime(mat.createdAt) || "--"}
                    </MaterialMeta>
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
