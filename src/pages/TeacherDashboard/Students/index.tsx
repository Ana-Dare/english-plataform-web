/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useMemo, useState } from "react";
import {
  ArrowLeft,
  Award,
  BookOpen,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Edit2,
  Mail,
  Phone,
  Plus,
  Search,
  User,
  UserX,
  Power,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import CustomDropdown from "../../../components/CustomDropdown";
import {
  ActionsWrapper,
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
  DetailSection,
  DetailSectionTitle,
  DetailStatusBadge,
  HeaderActions,
  IconButton,
  PaginationContainer,
  PlanBadge,
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
  PageNumber
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

const ITEMS_PER_PAGE = 10;

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
  if (level.includes('A1') || level.includes('A2')) return '#22C55E';
  if (level.includes('B1') || level.includes('B2')) return '#8B5CF6';
  if (level.includes('C1') || level.includes('C2')) return '#F59E0B';
  return '#64748B';
};

const getLevelShort = (level: string) => {
  const match = level.match(/[A-C][1-2]/);
  return match ? match[0] : 'A1';
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
}

const StudentsTab: React.FC<StudentsTabProps> = () => {
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
  } = useStudents();

  const { data: levelsData } = useQuery({
    queryKey: ["levels"],
    queryFn: () => listLevels(),
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [filterLevel, setFilterLevel] = useState("todos");
  const [filterTurma] = useState("todas");
  const [filterFreq] = useState("qualquer");
  const [filterStatus, setFilterStatus] = useState("ativos");
  const [sortOrder, setSortOrder] = useState("recent");

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<Student | null>(null);
  const [showRegister, setShowRegister] = useState(false);

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
  const totalPages = Math.ceil(filteredStudents.length / ITEMS_PER_PAGE);
  const validCurrentPage = Math.min(currentPage, Math.max(totalPages, 1));
  const currentStudents = useMemo(() => {
    const startIndex = (validCurrentPage - 1) * ITEMS_PER_PAGE;
    return filteredStudents.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredStudents, validCurrentPage]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
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
  };

  const handleRegisterSave = (student: RegisterStudentParams) => {
    addStudent(
      { ...student, notes: student.notes || "", active: 1 },
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
    updateStudent(
      {
        userId: student.id,
        params: { active: student.isActive ? 0 : 1 },
      },
      {
        onSuccess: () => {
          setSelectedStudent(null);
          addToast("Status do aluno atualizado com sucesso!", "success");
        },
        onError: () =>
          addToast(
            "Não foi possível atualizar o status do aluno. Tente novamente.",
            "error",
          ),
      }
    );
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

  if (showRegister) {
    return (
      <RegisterStudent
        onBack={handleBackToList}
        onSave={handleRegisterSave}
        isSaving={isAdding}
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
                {getInitials(displayData.name)}
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
                <div className="icon-box"><User size={18} /></div>
                Informações Pessoais
              </DetailSectionTitle>
              <DetailGrid>
                <DetailField>
                  <div className="field-icon"><User size={20} /></div>
                  <div className="field-content">
                    <DetailFieldLabel>Nome Completo</DetailFieldLabel>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editForm!.name}
                        onChange={(e) => setEditForm(f => f ? { ...f, name: e.target.value } : null)}
                      />
                    ) : (
                      <DetailFieldValue>{displayData.name}</DetailFieldValue>
                    )}
                  </div>
                </DetailField>
                <DetailField>
                  <div className="field-icon"><Mail size={20} /></div>
                  <div className="field-content">
                    <DetailFieldLabel>E-mail</DetailFieldLabel>
                    {isEditing ? (
                      <input
                        type="email"
                        value={editForm!.email}
                        onChange={(e) => setEditForm(f => f ? { ...f, email: e.target.value } : null)}
                      />
                    ) : (
                      <DetailFieldValue>{displayData.email}</DetailFieldValue>
                    )}
                  </div>
                </DetailField>
                <DetailField>
                  <div className="field-icon"><Phone size={20} /></div>
                  <div className="field-content">
                    <DetailFieldLabel>Telefone</DetailFieldLabel>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editForm!.phone}
                        onChange={(e) => setEditForm(f => f ? { ...f, phone: e.target.value } : null)}
                      />
                    ) : (
                      <DetailFieldValue>{displayData.phone || "Não informado"}</DetailFieldValue>
                    )}
                  </div>
                </DetailField>
                <DetailField>
                  <div className="field-icon"><Calendar size={20} /></div>
                  <div className="field-content">
                    <DetailFieldLabel>Data de nascimento</DetailFieldLabel>
                    {isEditing ? (
                      <input
                        type="date"
                        value={editForm!.birthdate}
                        onChange={(e) => setEditForm(f => f ? { ...f, birthdate: e.target.value } : null)}
                      />
                    ) : (
                      <DetailFieldValue>
                        {displayData.birthdate ? formatDate(displayData.birthdate) : "Não informada"}
                      </DetailFieldValue>
                    )}
                  </div>
                </DetailField>
                <DetailField>
                  <div className="field-icon"><Calendar size={20} /></div>
                  <div className="field-content">
                    <DetailFieldLabel>Data de Matrícula</DetailFieldLabel>
                    <DetailFieldValue>{displayData.enrollDate}</DetailFieldValue>
                  </div>
                </DetailField>
              </DetailGrid>
            </DetailSection>

            <DetailSection>
              <DetailSectionTitle $bg="#FEF6F5" $color="#C57A67">
                <div className="icon-box"><BookOpen size={18} /></div>
                Informações Acadêmicas
              </DetailSectionTitle>
              <DetailGrid>
                <DetailField>
                  <div className="field-icon"><BookOpen size={20} /></div>
                  <div className="field-content">
                    <DetailFieldLabel>Turma</DetailFieldLabel>
                    <DetailFieldValue>{displayData.turma}</DetailFieldValue>
                  </div>
                </DetailField>
                <DetailField>
                  <div className="field-icon"><Award size={20} /></div>
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
                          setEditForm(f => f ? { ...f, levelId, level: formatLevel(levelId, levelMap) } : null);
                        }}
                      />
                    ) : (
                      <DetailFieldValue>{displayData.level}</DetailFieldValue>
                    )}
                  </div>
                </DetailField>
                <DetailField>
                  <div className="field-icon"><Award size={20} /></div>
                  <div className="field-content">
                    <DetailFieldLabel>Plano</DetailFieldLabel>
                    {isEditing ? (
                      <select
                        value={editForm!.plan}
                        onChange={(e) => setEditForm(f => f ? { ...f, plan: Number(e.target.value) as 0 | 1 } : null)}
                      >
                        <option value={0}>Regular</option>
                        <option value={1}>VIP</option>
                      </select>
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
                  <div className="field-icon"><Award size={20} /></div>
                  <div className="field-content">
                    <DetailFieldLabel>Status</DetailFieldLabel>
                    <DetailFieldValue>
                      <StatusBadge $status={displayData.isActive ? 'Ativo' : 'Inativo'}>
                        {displayData.isActive ? "Ativo" : "Inativo"}
                      </StatusBadge>
                    </DetailFieldValue>
                  </div>
                </DetailField>
              </DetailGrid>
            </DetailSection>

            <DetailSection>
              <DetailSectionTitle $bg="#F1F5F9" $color="#475569">
                <div className="icon-box"><BookOpen size={18} /></div>
                Observações
              </DetailSectionTitle>
              <div style={{ padding: '24px' }}>
                <DetailField className="align-top">
                  <div className="field-icon"><BookOpen size={20} /></div>
                  <div className="field-content">
                    {isEditing ? (
                      <textarea
                        value={editForm!.observations}
                        onChange={(e) => setEditForm(f => f ? { ...f, observations: e.target.value } : null)}
                        placeholder="Adicionar observações sobre o aluno..."
                      />
                    ) : (
                      <DetailFieldValue style={{ color: displayData.observations ? "#1E293B" : "#94A3B8" }}>
                        {displayData.observations || "Nenhuma observação registrada."}
                      </DetailFieldValue>
                    )}
                  </div>
                </DetailField>
              </div>
            </DetailSection>
          </DetailBody>

          <DetailActions>
            {isEditing ? (
              <>
                <DetailActionBtn $variant="secondary" onClick={handleCancelEdit} disabled={isUpdating}>
                  Cancelar
                </DetailActionBtn>
                <DetailActionBtn $variant="primary" onClick={handleSaveEdit} disabled={isUpdating}>
                  {isUpdating ? "Salvando..." : "Salvar Alterações"}
                </DetailActionBtn>
              </>
            ) : (
              <>
                {selectedStudent.isActive && (
                  <DetailActionBtn $variant="danger" disabled={isDeactivating} onClick={() => handleDeactivate(selectedStudent.id)}>
                    <UserX size={16} />
                    {isDeactivating ? "Desativando..." : "Desativar Aluno"}
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

        <div
          style={{
            display: "flex",
            gap: "0.8rem",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <CustomDropdown
            value={sortOrder}
            onChange={setSortOrder}
            options={[
              { value: "recent", label: "Mais recentes" },
              { value: "oldest", label: "Mais antigos" },
              { value: "az", label: "Ordem alfabética (A-Z)" },
            ]}
          />

          <CustomDropdown
            value={filterLevel}
            onChange={setFilterLevel}
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
            onChange={setFilterStatus}
            options={[
              { value: "ativos", label: "Status: Ativos" },
              { value: "inativos", label: "Status: Inativos" },
              { value: "todos", label: "Status: Todos" },
            ]}
          />

          <AddButton onClick={() => setShowRegister(true)}>
            Adicionar aluno <Plus size={16} />
          </AddButton>
        </div>
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
                let statusText = student.isActive ? 'Ativo' : 'Inativo';
                if (!student.isActive && student.progress && student.progress > 0 && student.progress < 100) {
                    if (student.observations?.includes('Trancado')) statusText = 'Trancado';
                }

                return (
                <Tr
                  key={student.id}
                  onClick={() => handleOpenDetail(student)}
                  style={{ cursor: "pointer" }}
                >
                  <Td data-label="Nome">
                    <StudentCell>
                      <Avatar $color={student.avatarColor}>
                        {getInitials(student.name)}
                      </Avatar>
                      <StudentInfo>
                        <strong>{student.name}</strong>
                      </StudentInfo>
                    </StudentCell>
                  </Td>
                  <Td data-label="Nível">
                    <LevelBadge $color={getLevelColor(student.level)}>
                      {getLevelShort(student.level)}
                    </LevelBadge>
                  </Td>
                  <Td data-label="Turma">
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
                  <Td data-label="Andamento">
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "6px",
                        width: "80px"
                      }}
                    >
                      <span
                        style={{
                          fontSize: "0.85rem",
                          fontWeight: 800,
                          color: "#1F2B45",
                        }}
                      >
                        {student.progress}%
                      </span>
                      <div
                        style={{
                          width: "100%",
                          height: "3px",
                          background: "#F1F5F9",
                          borderRadius: "3px",
                          overflow: "hidden",
                        }}
                      >
                        <div
                          style={{
                            width: `${student.progress}%`,
                            height: "100%",
                            background: "#C57A67",
                            borderRadius: "3px",
                          }}
                        />
                      </div>
                    </div>
                  </Td>
                  <Td data-label="Status">
                    <StatusBadge $status={statusText}>
                      {statusText}
                    </StatusBadge>
                  </Td>
                  <Td data-label="Ações" onClick={(e) => e.stopPropagation()}>
                    <ActionsWrapper>
                      <div style={{ display: "flex", gap: "0.5rem" }}>
                        <IconButton
                          title="Editar Aluno"
                          onClick={() => {
                            handleOpenDetail(student);
                            setEditForm({ ...student });
                            setIsEditing(true);
                          }}
                        >
                          <Edit2 size={16} />
                        </IconButton>
                        <IconButton
                          title={
                            student.isActive
                              ? "Desativar Aluno"
                              : "Ativar Aluno"
                          }
                          disabled={isUpdating}
                          onClick={() => handleToggleActive(student)}
                          style={{
                            color: student.isActive ? "#ef4444" : "#22c55e",
                          }}
                        >
                          <Power size={16} />
                        </IconButton>
                      </div>
                    </ActionsWrapper>
                  </Td>
                </Tr>
              )})
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

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "8px" }}>
        <span style={{ color: "#64748B", fontSize: "0.9rem" }}>
          Mostrando {(validCurrentPage - 1) * ITEMS_PER_PAGE + 1}-{Math.min(validCurrentPage * ITEMS_PER_PAGE, filteredStudents.length)} de {filteredStudents.length} resultados
        </span>
        
        <PaginationContainer style={{ marginTop: 0 }}>
          <IconButton onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={validCurrentPage === 1}>
            <ChevronLeft size={18} />
          </IconButton>
          
          {[...Array(Math.min(5, totalPages))].map((_, i) => (
             <PageNumber key={i} $active={validCurrentPage === i + 1} onClick={() => setCurrentPage(i + 1)}>
               {i + 1}
             </PageNumber>
          ))}
          {totalPages > 5 && <span style={{ padding: "0 4px" }}>..</span>}
          
          <IconButton onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={validCurrentPage === totalPages || totalPages === 0}>
            <ChevronRight size={18} />
          </IconButton>
        </PaginationContainer>
      </div>
    </Container>
  );
};

export default StudentsTab;
