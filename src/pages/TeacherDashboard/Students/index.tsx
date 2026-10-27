/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useMemo, useState, useEffect } from "react";
import {
  ArrowLeft,
  Award,
  BookOpen,
  Calendar,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Edit2,
  FileText,
  Mail,
  Phone,
  Plus,
  Search,
  User,
  UserCheck,
  UserX,
  Power,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import CustomDropdown from "../../../components/CustomDropdown";
import MobileCarousel from "../../../components/MobileCarousel";
import {
  ActionsWrapper,
  ActionButtonsGroup,
  ActionIconButton,
  MobileExpandBtn,
  MobileDossierRow,
  MobileDossierBtn,
  AddButton,
  Avatar,
  Container,
  DetailActionBtn,
  DetailActions,
  DetailAvatar,
  DetailBackBtn,
  DetailBody,
  DetailContainer,
  DetailField,
  DetailFieldLabel,
  DetailFieldValue,
  DetailGrid,
  DetailHeader,
  DetailHeaderInfo,
  DetailNameBlock,
  DetailObservationsWrapper,
  DetailSection,
  DetailSectionTitle,
  DetailStatusBadge,
  HeaderActions,
  FiltersRow,
  PaginationFooter,
  PaginationLeft,
  PageSizeSelector,
  ShowingInfo,
  PaginationNav,
  PageNavButton,
  PageNumberButton,
  PageEllipsis,
  PlanBadge,
  ProgressWrapper,
  ProgressBarTrack,
  ProgressBarFill,
  SearchWrapper,
  StatusBadge,
  StudentCell,
  StudentInfo,
  Table,
  TableContainer,
  Td,
  Th,
  Tr,
  LevelBadge,
} from "./style";
import RegisterStudent from "./RegisterStudent";
import type {
  RegisterStudentParams,
  UpdateStudentParams,
} from "../../../interfaces/students";
import { useStudents } from "../../../contexts/Students/hooks/useStudents";
import type { Student } from "../../../contexts/Students/StudentsContext";
import useToast from "../../../contexts/Toast/useToast";
import { listLevels } from "../services/level";

const getInitials = (name: string) => {
  const parts = name.split(" ");
  return parts.length > 1
    ? `${parts[0][0]}${parts[parts.length - 1][0]}`
    : parts[0][0];
};

const formatDate = (value: string) => {
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? value
    : date.toLocaleDateString("pt-BR");
};

const formatLevel = (
  levelId: number | null,
  levelMap: Record<number, string>,
) => {
  if (levelId === null) return "Não definido";
  const levelName = levelMap[levelId];
  return levelName ? levelName : `Nível ${levelId}`;
};

const getLevelColor = (level: string) => {
  if (level.includes("A1") || level.includes("A2")) return "#22C55E";
  if (level.includes("B1") || level.includes("B2")) return "#8B5CF6";
  if (level.includes("C1") || level.includes("C2")) return "#F59E0B";
  return "#64748B";
};

const getLevelShort = (level: string) => {
  const match = level.match(/[A-C][1-2]/);
  return match ? match[0] : "A1";
};

const buildUpdatePayload = (
  current: Student,
  draft: Student,
): UpdateStudentParams => {
  const params: UpdateStudentParams = {};
  const name = draft.name.trim();
  const email = draft.email.trim();

  if (name !== current.name) params.name = name;
  if (email !== current.email) params.email = email;
  if (draft.phone !== current.phone) params.phone = draft.phone || null;
  if (draft.birthdate !== current.birthdate) {
    params.birthdate = draft.birthdate || null;
  }
  if (draft.levelId !== current.levelId) params.level_id = draft.levelId;
  if (draft.plan !== current.plan) params.vip = draft.plan;
  if (draft.observations !== current.observations) {
    params.notes = draft.observations;
  }

  return params;
};

interface StudentsTabProps {
  initialStudentId?: number | null;
  initialStudentData?: any;
  initialShowRegister?: boolean;
  initialTurmaId?: number | string | null;
  initialTurmaName?: string | null;
  onClearInitialState?: () => void;
}

const StudentsTab: React.FC<StudentsTabProps> = ({
  initialStudentId,
  initialStudentData,
  initialShowRegister,
  initialTurmaId,
  initialTurmaName,
  onClearInitialState,
}) => {
  const { addToast } = useToast();
  const {
    students,
    isLoading,
    isError,
    addStudent,
    isAdding,
    updateStudent,
    isUpdating,
    deactivateStudent,
    isDeactivating,
    activateStudent,
    isActivating,
  } = useStudents();

  const { data: levelsData } = useQuery({
    queryKey: ["levels"],
    queryFn: () => listLevels(),
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [filterLevel, setFilterLevel] = useState("todos");
  const [filterTurma] = useState("todas");
  const [filterFreq] = useState("qualquer");
  const [filterStatus, setFilterStatus] = useState("todos");
  const [sortOrder, setSortOrder] = useState("recent");

  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<Student | null>(null);
  const [showRegister, setShowRegister] = useState(false);
  const [expandedStudentIds, setExpandedStudentIds] = useState<Record<number, boolean>>({});

  const toggleStudentExpand = (studentId: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setExpandedStudentIds((prev) => ({
      ...prev,
      [studentId]: !prev[studentId],
    }));
  };

  // Se veio navegação direta para um aluno específico a partir de outra aba (ex: Turmas)
  useEffect(() => {
    if (initialStudentId) {
      const found = students.find((s) => s.id === initialStudentId);
      if (found) {
        setSelectedStudent(found);
      } else if (initialStudentData) {
        setSelectedStudent(initialStudentData);
      }
    } else if (initialStudentData) {
      setSelectedStudent(initialStudentData);
    }
  }, [initialStudentId, initialStudentData, students]);

  useEffect(() => {
    if (initialShowRegister) {
      setShowRegister(true);
      setSelectedStudent(null);
    }
  }, [initialShowRegister]);

  const levelMap = useMemo(() => {
    const map: Record<number, string> = {};
    if (levelsData?.levels) {
      levelsData.levels.forEach((level) => {
        map[level.id] = level.name;
      });
    }
    return map;
  }, [levelsData]);

  const filteredStudents = useMemo(() => {
    const filtered = students.filter((student) => {
      const matchSearch =
        student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.email.toLowerCase().includes(searchQuery.toLowerCase());

      const matchLevel =
        filterLevel === "todos" || student.levelId === Number(filterLevel);

      const matchStatus =
        filterStatus === "todos" ||
        (filterStatus === "ativos" && student.isActive) ||
        (filterStatus === "inativos" && !student.isActive);

      return matchSearch && matchLevel && matchStatus;
    });

    return filtered.sort((a, b) => {
      if (sortOrder === "recent") {
        return (
          new Date(b.rawEnrollDate).getTime() -
          new Date(a.rawEnrollDate).getTime()
        );
      }
      if (sortOrder === "oldest") {
        return (
          new Date(a.rawEnrollDate).getTime() -
          new Date(b.rawEnrollDate).getTime()
        );
      }
      if (sortOrder === "az") {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });
  }, [
    students,
    searchQuery,
    filterLevel,
    filterTurma,
    filterFreq,
    filterStatus,
    sortOrder,
  ]);

  const totalPages = Math.max(1, Math.ceil(filteredStudents.length / itemsPerPage));
  const validCurrentPage = Math.min(Math.max(1, currentPage), totalPages);
  const startIndex = (validCurrentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filteredStudents.length);

  const currentStudents = useMemo(() => {
    return filteredStudents.slice(startIndex, endIndex);
  }, [filteredStudents, startIndex, endIndex]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  const handleSortOrderChange = (val: string) => {
    setSortOrder(val);
    setCurrentPage(1);
  };

  const handleFilterLevelChange = (val: string) => {
    setFilterLevel(val);
    setCurrentPage(1);
  };

  const handleFilterStatusChange = (val: string) => {
    setFilterStatus(val);
    setCurrentPage(1);
  };

  const handleItemsPerPageChange = (val: number) => {
    setItemsPerPage(val);
    setCurrentPage(1);
  };

  const handleOpenDetail = (student: Student) => {
    setSelectedStudent(student);
    setIsEditing(false);
    setEditForm(null);
  };

  const handleStartEdit = () => {
    if (!selectedStudent) return;
    setEditForm({ ...selectedStudent });
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditForm(null);
  };

  const handleBackToList = () => {
    setSelectedStudent(null);
    setIsEditing(false);
    setEditForm(null);
    setShowRegister(false);
    if (onClearInitialState) {
      onClearInitialState();
    }
  };

  const handleRegisterSave = (
    student: RegisterStudentParams,
    photoBlob?: Blob,
  ) => {
    addStudent(
      { ...student, notes: student.notes || "", active: 1 },
      photoBlob,
      {
        onSuccess: () => {
          setShowRegister(false);
          handleBackToList();
          setCurrentPage(1);
          addToast("Aluno cadastrado com sucesso!", "success");
        },
        onError: () =>
          addToast(
            "Não foi possível cadastrar o aluno. Tente novamente.",
            "error",
          ),
      },
    );
  };

  const handleToggleActive = (student: any) => {
    const nextActive = !student.isActive;

    // Se o usuário estiver no filtro "ativos" e desativar um aluno,
    // alternamos o filtro para "todos" para que o aluno continue na tela e
    // o usuário veja claramente o status mudar para Inativo e o botão para Ativar
    if (!nextActive && filterStatus === "ativos") {
      setFilterStatus("todos");
    }

    const mutateFn = nextActive ? activateStudent : deactivateStudent;
    mutateFn(student.id, {
      onSuccess: () => {
        setSelectedStudent((prev) =>
          prev && prev.id === student.id
            ? { ...prev, isActive: nextActive }
            : prev,
        );
        if (editForm && editForm.id === student.id) {
          setEditForm((prev) =>
            prev ? { ...prev, isActive: nextActive } : null,
          );
        }
        const msg = nextActive
          ? `Aluno(a) "${student.name}" ativado com sucesso!`
          : `Aluno(a) "${student.name}" desativado com sucesso!`;
        addToast(msg, "success");
      },
      onError: () =>
        addToast(
          `Não foi possível ${nextActive ? "ativar" : "desativar"} o aluno. Tente novamente.`,
          "error",
        ),
    });
  };

  const handleSaveEdit = () => {
    if (!selectedStudent || !editForm) return;

    if (!editForm.name.trim() || !editForm.email.trim()) {
      addToast("Nome e e-mail são obrigatórios.", "warning");
      return;
    }

    const params = buildUpdatePayload(selectedStudent, editForm);
    if (Object.keys(params).length === 0) {
      handleCancelEdit();
      return;
    }

    updateStudent(selectedStudent.id, params, {
      onSuccess: () => {
        setSelectedStudent(null);
        setEditForm(null);
        setIsEditing(false);
        addToast("Dados atualizados com sucesso!", "success");
      },
      onError: () =>
        addToast(
          "Não foi possível atualizar o aluno. Tente novamente.",
          "error",
        ),
    });
  };

  const renderPageNumbers = () => {
    if (totalPages <= 1) return null;
    const pages: (number | string)[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (validCurrentPage > 3) {
        pages.push("ellipsis-1");
      }
      const start = Math.max(2, validCurrentPage - 1);
      const end = Math.min(totalPages - 1, validCurrentPage + 1);
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      if (validCurrentPage < totalPages - 2) {
        pages.push("ellipsis-2");
      }
      pages.push(totalPages);
    }

    return pages.map((page) => {
      if (typeof page === "string") {
        return <PageEllipsis key={page}>...</PageEllipsis>;
      }
      return (
        <PageNumberButton
          key={page}
          $active={validCurrentPage === page}
          onClick={() => setCurrentPage(page)}
          aria-label={`Ir para a página ${page}`}
          aria-current={validCurrentPage === page ? "page" : undefined}
        >
          {page}
        </PageNumberButton>
      );
    });
  };

  if (showRegister) {
    return (
      <RegisterStudent
        onBack={handleBackToList}
        onSave={(student, photoBlob) => {
          handleRegisterSave(student, photoBlob);
          if (onClearInitialState) {
            onClearInitialState();
          }
        }}
        isSaving={isAdding}
        initialTurmaId={initialTurmaId}
        initialTurmaName={initialTurmaName}
      />
    );
  }

  if (selectedStudent) {
    const displayData = isEditing && editForm ? editForm : selectedStudent;

    return (
      <Container>
        <DetailContainer>
          <DetailHeader>
            <DetailBackBtn onClick={handleBackToList}>
              <ArrowLeft size={18} /> Voltar para lista
            </DetailBackBtn>
            <DetailHeaderInfo>
              <DetailAvatar $color={displayData.avatarColor}>
                {displayData.avatar_url ? (
                  <img
                    src={displayData.avatar_url}
                    alt={displayData.name}
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      const parent = e.currentTarget.parentElement;
                      if (parent) {
                        parent.textContent = getInitials(displayData.name);
                      }
                    }}
                  />
                ) : (
                  getInitials(displayData.name)
                )}
              </DetailAvatar>
              <DetailNameBlock>
                <h2>{displayData.name}</h2>
                <span>
                  ID: #{displayData.id} • Matriculado em{" "}
                  {displayData.enrollDate}
                </span>
                <DetailStatusBadge $active={displayData.isActive}>
                  {displayData.isActive ? "Ativo" : "Inativo"}
                </DetailStatusBadge>
              </DetailNameBlock>
            </DetailHeaderInfo>
          </DetailHeader>

          <DetailBody>
            <DetailSection>
              <DetailSectionTitle $bg="#EEF2FF" $color="#4F46E5">
                <div className="icon-box">
                  <User size={18} />
                </div>
                Informações Pessoais
              </DetailSectionTitle>
              <DetailGrid>
                <DetailField>
                  <div className="field-icon">
                    <User size={20} />
                  </div>
                  <div className="field-content">
                    <DetailFieldLabel>Nome Completo</DetailFieldLabel>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editForm!.name}
                        onChange={(e) =>
                          setEditForm((f) =>
                            f ? { ...f, name: e.target.value } : null,
                          )
                        }
                      />
                    ) : (
                      <DetailFieldValue>{displayData.name}</DetailFieldValue>
                    )}
                  </div>
                </DetailField>
                <DetailField>
                  <div className="field-icon">
                    <Mail size={20} />
                  </div>
                  <div className="field-content">
                    <DetailFieldLabel>E-mail</DetailFieldLabel>
                    {isEditing ? (
                      <input
                        type="email"
                        value={editForm!.email}
                        onChange={(e) =>
                          setEditForm((f) =>
                            f ? { ...f, email: e.target.value } : null,
                          )
                        }
                      />
                    ) : (
                      <DetailFieldValue>{displayData.email}</DetailFieldValue>
                    )}
                  </div>
                </DetailField>
                <DetailField>
                  <div className="field-icon">
                    <Phone size={20} />
                  </div>
                  <div className="field-content">
                    <DetailFieldLabel>Telefone</DetailFieldLabel>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editForm!.phone}
                        onChange={(e) =>
                          setEditForm((f) =>
                            f ? { ...f, phone: e.target.value } : null,
                          )
                        }
                      />
                    ) : (
                      <DetailFieldValue>
                        {displayData.phone || "Não informado"}
                      </DetailFieldValue>
                    )}
                  </div>
                </DetailField>
                <DetailField>
                  <div className="field-icon">
                    <Calendar size={20} />
                  </div>
                  <div className="field-content">
                    <DetailFieldLabel>Data de nascimento</DetailFieldLabel>
                    {isEditing ? (
                      <input
                        type="date"
                        value={editForm!.birthdate}
                        onChange={(e) =>
                          setEditForm((f) =>
                            f ? { ...f, birthdate: e.target.value } : null,
                          )
                        }
                      />
                    ) : (
                      <DetailFieldValue>
                        {displayData.birthdate
                          ? formatDate(displayData.birthdate)
                          : "Não informada"}
                      </DetailFieldValue>
                    )}
                  </div>
                </DetailField>
                <DetailField>
                  <div className="field-icon">
                    <Calendar size={20} />
                  </div>
                  <div className="field-content">
                    <DetailFieldLabel>Data de Matrícula</DetailFieldLabel>
                    <DetailFieldValue>
                      {displayData.enrollDate}
                    </DetailFieldValue>
                  </div>
                </DetailField>
              </DetailGrid>
            </DetailSection>

            <DetailSection>
              <DetailSectionTitle $bg="#FEF6F5" $color="#C57A67">
                <div className="icon-box">
                  <BookOpen size={18} />
                </div>
                Informações Acadêmicas
              </DetailSectionTitle>
              <DetailGrid>
                <DetailField>
                  <div className="field-icon">
                    <BookOpen size={20} />
                  </div>
                  <div className="field-content">
                    <DetailFieldLabel>Turma</DetailFieldLabel>
                    <DetailFieldValue>{displayData.turma}</DetailFieldValue>
                  </div>
                </DetailField>
                <DetailField>
                  <div className="field-icon">
                    <Award size={20} />
                  </div>
                  <div className="field-content">
                    <DetailFieldLabel>Nível</DetailFieldLabel>
                    {isEditing ? (
                      <input
                        type="number"
                        min="1"
                        value={editForm!.levelId ?? ""}
                        onChange={(e) => {
                          const val = e.target.value;
                          const levelId = val === "" ? null : Number(val);
                          setEditForm((f) =>
                            f
                              ? {
                                  ...f,
                                  levelId,
                                  level: formatLevel(levelId, levelMap),
                                }
                              : null,
                          );
                        }}
                      />
                    ) : (
                      <DetailFieldValue>{displayData.level}</DetailFieldValue>
                    )}
                  </div>
                </DetailField>
                <DetailField>
                  <div className="field-icon">
                    <Award size={20} />
                  </div>
                  <div className="field-content">
                    <DetailFieldLabel>Plano</DetailFieldLabel>
                    {isEditing ? (
                      <CustomDropdown
                        value={String(editForm!.plan)}
                        onChange={(val) =>
                          setEditForm((f) =>
                            f ? { ...f, plan: Number(val) as 0 | 1 } : null,
                          )
                        }
                        fullWidth
                        options={[
                          { value: "0", label: "Regular" },
                          { value: "1", label: "VIP" },
                        ]}
                      />
                    ) : (
                      <DetailFieldValue>
                        <PlanBadge $plan={displayData.plan}>
                          {displayData.plan === 1 ? "VIP" : "Regular"}
                        </PlanBadge>
                      </DetailFieldValue>
                    )}
                  </div>
                </DetailField>
                <DetailField>
                  <div className="field-icon">
                    <Award size={20} />
                  </div>
                  <div className="field-content">
                    <DetailFieldLabel>Status</DetailFieldLabel>
                    <DetailFieldValue>
                      <StatusBadge
                        $status={displayData.isActive ? "Ativo" : "Inativo"}
                      >
                        {displayData.isActive ? "Ativo" : "Inativo"}
                      </StatusBadge>
                    </DetailFieldValue>
                  </div>
                </DetailField>
              </DetailGrid>
            </DetailSection>

            <DetailSection>
              <DetailSectionTitle $bg="#F1F5F9" $color="#475569">
                <div className="icon-box">
                  <BookOpen size={18} />
                </div>
                Observações
              </DetailSectionTitle>
              <DetailObservationsWrapper>
                <DetailField className="align-top">
                  <div className="field-icon">
                    <BookOpen size={20} />
                  </div>
                  <div className="field-content">
                    {isEditing ? (
                      <textarea
                        value={editForm!.observations}
                        onChange={(e) =>
                          setEditForm((f) =>
                            f ? { ...f, observations: e.target.value } : null,
                          )
                        }
                        placeholder="Adicionar observações sobre o aluno..."
                      />
                    ) : (
                      <DetailFieldValue
                        style={{
                          color: displayData.observations
                            ? "#1E293B"
                            : "#94A3B8",
                        }}
                      >
                        {displayData.observations ||
                          "Nenhuma observação registrada."}
                      </DetailFieldValue>
                    )}
                  </div>
                </DetailField>
              </DetailObservationsWrapper>
            </DetailSection>
          </DetailBody>

          <DetailActions>
            {isEditing ? (
              <>
                <DetailActionBtn
                  $variant="secondary"
                  onClick={handleCancelEdit}
                  disabled={isUpdating}
                >
                  Cancelar
                </DetailActionBtn>
                <DetailActionBtn
                  $variant="primary"
                  onClick={handleSaveEdit}
                  disabled={isUpdating}
                >
                  {isUpdating ? "Salvando..." : "Salvar Alterações"}
                </DetailActionBtn>
              </>
            ) : (
              <>
                {displayData.isActive ? (
                  <DetailActionBtn
                    $variant="danger"
                    disabled={isUpdating || isDeactivating || isActivating}
                    onClick={() => handleToggleActive(displayData)}
                  >
                    <UserX size={16} />
                    {isDeactivating ? "Desativando..." : "Desativar Aluno"}
                  </DetailActionBtn>
                ) : (
                  <DetailActionBtn
                    $variant="success"
                    disabled={isUpdating || isDeactivating || isActivating}
                    onClick={() => handleToggleActive(displayData)}
                  >
                    <UserCheck size={16} />
                    {isActivating ? "Ativando..." : "Ativar Aluno"}
                  </DetailActionBtn>
                )}
                <DetailActionBtn $variant="primary" onClick={handleStartEdit}>
                  <Edit2 size={16} /> Editar Informações
                </DetailActionBtn>
              </>
            )}
          </DetailActions>
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
            onChange={handleSearchChange}
          />
        </SearchWrapper>

        <FiltersRow>
          <MobileCarousel>
            <CustomDropdown
              value={sortOrder}
              onChange={handleSortOrderChange}
              options={[
                { value: "recent", label: "Mais recentes" },
                { value: "oldest", label: "Mais antigos" },
                { value: "az", label: "Ordem alfabética (A-Z)" },
              ]}
            />

            <CustomDropdown
              value={filterLevel}
              onChange={handleFilterLevelChange}
              options={[
                { value: "todos", label: "Nível: Todos" },
                ...(levelsData?.levels?.map((level) => ({
                  value: String(level.id),
                  label: `Nível: ${level.name}`,
                })) || []),
              ]}
            />

            <CustomDropdown
              value={filterStatus}
              onChange={handleFilterStatusChange}
              menuAlign="right"
              options={[
                { value: "todos", label: "Status: Todos" },
                { value: "ativos", label: "Status: Ativos" },
                { value: "inativos", label: "Status: Inativos" },
              ]}
            />
          </MobileCarousel>

          {(searchQuery.trim() !== "" ||
            filterLevel !== "todos" ||
            filterStatus !== "todos" ||
            sortOrder !== "recent") && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setFilterLevel("todos");
                setFilterStatus("todos");
                setSortOrder("recent");
                setCurrentPage(1);
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
              }}
            >
              Limpar filtro
            </button>
          )}

          <AddButton onClick={() => setShowRegister(true)} type="button">
            <Plus size={18} strokeWidth={2.2} />
            <span>Adicionar aluno</span>
          </AddButton>
        </FiltersRow>
      </HeaderActions>

      <TableContainer>
        <Table>
          <thead>
            <tr>
              <Th>Nome</Th>
              <Th>Nível</Th>
              <Th>Turma</Th>
              <Th>Andamento</Th>
              <Th>Status</Th>
              <Th>Ações</Th>
            </tr>
          </thead>
          <tbody>
            {currentStudents.length > 0 ? (
              currentStudents.map((student) => {
                let statusText = student.isActive ? "Ativo" : "Inativo";
                if (
                  !student.isActive &&
                  student.progress &&
                  student.progress > 0 &&
                  student.progress < 100
                ) {
                  if (student.observations?.includes("Trancado"))
                    statusText = "Trancado";
                }

                const isExpanded = !!expandedStudentIds[student.id];

                return (
                  <Tr
                    key={student.id}
                    $inactive={!student.isActive}
                    $isExpanded={isExpanded}
                    onClick={() => {
                      if (
                        typeof window !== "undefined" &&
                        window.innerWidth <= 768
                      ) {
                        toggleStudentExpand(student.id);
                      } else {
                        handleOpenDetail(student);
                      }
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    <Td data-label="Nome">
                      <StudentCell>
                        <Avatar
                          $color={student.avatarColor}
                          $inactive={!student.isActive}
                        >
                          {student.avatar_url ? (
                            <img
                              src={student.avatar_url}
                              alt={student.name}
                              onError={(e) => {
                                // Se a imagem falhar, oculta e mostra as iniciais
                                e.currentTarget.style.display = "none";
                                const parent = e.currentTarget.parentElement;
                                if (parent) {
                                  parent.textContent = getInitials(
                                    student.name,
                                  );
                                }
                              }}
                            />
                          ) : (
                            getInitials(student.name)
                          )}
                        </Avatar>
                        <StudentInfo $inactive={!student.isActive}>
                          <strong>
                            {student.name}
                            {!student.isActive && (
                              <span className="inactive-tag">Desativado</span>
                            )}
                          </strong>
                        </StudentInfo>
                      </StudentCell>
                    </Td>

                    <Td
                      data-label="Nível"
                      $secondaryOnMobile
                      $isExpanded={isExpanded}
                    >
                      <LevelBadge $color={getLevelColor(student.level)}>
                        {getLevelShort(student.level)}
                      </LevelBadge>
                    </Td>

                    <Td
                      data-label="Turma"
                      $secondaryOnMobile
                      $isExpanded={isExpanded}
                    >
                      <span
                        title={
                          student.turma !== "Não atribuída"
                            ? student.turma
                            : undefined
                        }
                      >
                        {student.turma}
                      </span>
                    </Td>

                    <Td
                      data-label="Andamento"
                      $secondaryOnMobile
                      $isExpanded={isExpanded}
                    >
                      <ProgressWrapper>
                        <span className="progress-percent">
                          {student.progress || 0}%
                        </span>
                        <ProgressBarTrack>
                          <ProgressBarFill $width={student.progress || 0} />
                        </ProgressBarTrack>
                      </ProgressWrapper>
                    </Td>

                    <Td data-label="Status">
                      <StatusBadge $status={statusText}>
                        {statusText}
                      </StatusBadge>
                    </Td>

                    <Td data-label="Ações" onClick={(e) => e.stopPropagation()}>
                      <ActionsWrapper>
                        <MobileExpandBtn
                          type="button"
                          onClick={(e) => toggleStudentExpand(student.id, e)}
                          aria-label={
                            isExpanded ? "Ocultar detalhes" : "Ver mais detalhes"
                          }
                        >
                          {isExpanded ? (
                            <>
                              <span>Menos detalhes</span>
                              <ChevronUp size={14} />
                            </>
                          ) : (
                            <>
                              <span>Ver detalhes</span>
                              <ChevronDown size={14} />
                            </>
                          )}
                        </MobileExpandBtn>

                        <ActionButtonsGroup>
                          <ActionIconButton
                            $variant="edit"
                            title={`Editar aluno ${student.name}`}
                            aria-label={`Editar aluno ${student.name}`}
                            onClick={() => {
                              handleOpenDetail(student);
                              setEditForm({ ...student });
                              setIsEditing(true);
                            }}
                          >
                            <Edit2 size={15} />
                          </ActionIconButton>
                          <ActionIconButton
                            $variant="power"
                            $isActive={student.isActive}
                            title={
                              student.isActive
                                ? `Desativar aluno ${student.name}`
                                : `Ativar aluno ${student.name}`
                            }
                            aria-label={
                              student.isActive
                                ? `Desativar aluno ${student.name}`
                                : `Ativar aluno ${student.name}`
                            }
                            disabled={
                              isUpdating || isDeactivating || isActivating
                            }
                            onClick={() => handleToggleActive(student)}
                          >
                            {student.isActive ? (
                              <Power size={15} />
                            ) : (
                              <UserCheck size={16} strokeWidth={2.3} />
                            )}
                          </ActionIconButton>
                        </ActionButtonsGroup>
                      </ActionsWrapper>

                      <MobileDossierRow $isExpanded={isExpanded}>
                        <MobileDossierBtn
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenDetail(student);
                          }}
                        >
                          <FileText size={15} /> Ver Dossiê Completo
                        </MobileDossierBtn>
                      </MobileDossierRow>
                    </Td>
                  </Tr>
                );
              })
            ) : (
              <tr>
                <Td
                  colSpan={6}
                  style={{
                    textAlign: "center",
                    color: "#888",
                    padding: "3rem",
                  }}
                >
                  {isLoading
                    ? "Carregando alunos..."
                    : isError
                      ? "Não foi possível carregar os alunos. Tente novamente."
                      : "Nenhum aluno encontrado."}
                </Td>
              </tr>
            )}
          </tbody>
        </Table>
      </TableContainer>

      <PaginationFooter>
        <PaginationLeft>
          <PageSizeSelector>
            <span className="label">Mostrar</span>
            <CustomDropdown
              size="compact"
              menuDirection="up"
              minWidth="60px"
              value={String(itemsPerPage)}
              onChange={(val) => handleItemsPerPageChange(Number(val))}
              options={[
                { value: "10", label: "10" },
                { value: "25", label: "25" },
                { value: "50", label: "50" },
                { value: "100", label: "100" },
              ]}
              ariaLabel="Alunos por página"
            />
            <span>por página</span>
          </PageSizeSelector>

          <ShowingInfo>
            {filteredStudents.length === 0
              ? "Nenhum aluno encontrado"
              : `Mostrando ${startIndex + 1}–${endIndex} de ${filteredStudents.length} alunos`}
          </ShowingInfo>
        </PaginationLeft>

        <PaginationNav>
          <PageNavButton
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={validCurrentPage === 1}
            aria-label="Página anterior"
          >
            <ChevronLeft size={18} />
          </PageNavButton>

          {renderPageNumbers()}

          <PageNavButton
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={validCurrentPage === totalPages || totalPages === 0}
            aria-label="Próxima página"
          >
            <ChevronRight size={18} />
          </PageNavButton>
        </PaginationNav>
      </PaginationFooter>
    </Container>
  );
};

export default StudentsTab;
