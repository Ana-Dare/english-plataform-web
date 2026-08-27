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
} from "lucide-react";
import {
  ActionIconBtn,
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
  Loading,
  PaginationContainer,
  PlanBadge,
  RightActions,
  SearchWrapper,
  StatusBadge,
  StudentCell,
  StudentInfo,
  Table,
  TableContainer,
  Td,
  Th,
  Tr,
} from "./style";
import RegisterStudent from "./RegisterStudent";
import type {
  IStudents,
  RegisterStudentParams,
  UpdateStudentParams,
  UpdateStudentVariables,
} from "../types";
import {
  desactive,
  listStudent,
  registerStudent,
  updateStudent,
} from "../services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface Student {
  id: number;
  name: string;
  email: string;
  phone: string;
  birthdate: string;
  isActive: boolean;
  avatarColor: string;
  level: string;
  levelId: number | null;
  plan: 0 | 1;
  turma: string;
  enrollDate: string;
  observations: string;
}

const ITEMS_PER_PAGE = 10;
const avatarColors = [
  "#3165e3",
  "#e67e22",
  "#8e44ad",
  "#1abc9c",
  "#e74c3c",
  "#2c3e50",
];

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

const toDateInputValue = (value: string | null) => value?.split("T")[0] ?? "";

const formatLevel = (levelId: number | null) =>
  levelId === null ? "Não definido" : `Nível ${levelId}`;

const toStudent = (student: IStudents): Student => ({
  id: student.id,
  name: student.name,
  email: student.email,
  phone: student.phone ?? "",
  birthdate: toDateInputValue(student.birthdate),
  isActive: student.active,
  avatarColor: avatarColors[student.id % avatarColors.length],
  level: formatLevel(student.profile.levelId),
  levelId: student.profile.levelId,
  plan: student.profile.vip ? 1 : 0,
  turma: "Não atribuída",
  enrollDate: formatDate(student.createdAt),
  observations: student.profile.notes ?? "",
});

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

const StudentsTab: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<Student | null>(null);
  const [showRegister, setShowRegister] = useState(false);
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["studentsList"],
    queryFn: listStudent,
  });

  const students = useMemo(() => (data?.students ?? []).map(toStudent), [data]);
  const filteredStudents = useMemo(
    () =>
      students.filter(
        (student) =>
          student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          student.email.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    [students, searchQuery],
  );
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

  const { mutate: register } = useMutation({
    mutationFn: registerStudent,
    onSuccess: () => {
      setShowRegister(false);
      void queryClient.invalidateQueries({ queryKey: ["studentsList"] });
    },
    onError: () => {
      alert("Não foi possível cadastrar o aluno. Tente novamente.");
    },
  });

  const { mutate: deactivateStudent, isPending: isDeactivating } = useMutation({
    mutationFn: desactive,
    onSuccess: () => {
      setSelectedStudent(null);
      void queryClient.invalidateQueries({ queryKey: ["studentsList"] });
    },
    onError: () => {
      alert("Não foi possível desativar o aluno. Tente novamente.");
    },
  });

  const { mutate: saveStudent, isPending: isSaving } = useMutation({
    mutationFn: ({ userId, params }: UpdateStudentVariables) =>
      updateStudent(userId, params),
    onSuccess: () => {
      setSelectedStudent(null);
      setEditForm(null);
      setIsEditing(false);
      void queryClient.invalidateQueries({ queryKey: ["studentsList"] });
    },
    onError: () => {
      alert("Não foi possível atualizar o aluno. Tente novamente.");
    },
  });

  const handleRegisterSave = (student: RegisterStudentParams) => {
    register({ ...student, notes: student.notes || "", active: 1 });
  };

  const handleSaveEdit = () => {
    if (!selectedStudent || !editForm) return;

    if (!editForm.name.trim() || !editForm.email.trim()) {
      alert("Nome e e-mail são obrigatórios.");
      return;
    }

    const params = buildUpdatePayload(selectedStudent, editForm);
    if (Object.keys(params).length === 0) {
      handleCancelEdit();
      return;
    }

    saveStudent({ userId: selectedStudent.id, params });
  };

  if (showRegister) {
    return (
      <RegisterStudent onBack={handleBackToList} onSave={handleRegisterSave} />
    );
  }

  if (isLoading)
    return (
      <Container>
        <Loading />
      </Container>
    );
  if (isError)
    return <Container>Não foi possível carregar os alunos.</Container>;

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
              <DetailSectionTitle>
                <User size={18} /> Informações Pessoais
              </DetailSectionTitle>
              <DetailGrid>
                <DetailField>
                  <DetailFieldLabel>Nome Completo</DetailFieldLabel>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editForm!.name}
                      onChange={(event) =>
                        setEditForm((form) =>
                          form ? { ...form, name: event.target.value } : null,
                        )
                      }
                    />
                  ) : (
                    <DetailFieldValue>{displayData.name}</DetailFieldValue>
                  )}
                </DetailField>
                <DetailField>
                  <DetailFieldLabel>
                    <Mail size={14} /> E-mail
                  </DetailFieldLabel>
                  {isEditing ? (
                    <input
                      type="email"
                      value={editForm!.email}
                      onChange={(event) =>
                        setEditForm((form) =>
                          form ? { ...form, email: event.target.value } : null,
                        )
                      }
                    />
                  ) : (
                    <DetailFieldValue>{displayData.email}</DetailFieldValue>
                  )}
                </DetailField>
                <DetailField>
                  <DetailFieldLabel>
                    <Phone size={14} /> Telefone
                  </DetailFieldLabel>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editForm!.phone}
                      onChange={(event) =>
                        setEditForm((form) =>
                          form ? { ...form, phone: event.target.value } : null,
                        )
                      }
                    />
                  ) : (
                    <DetailFieldValue>
                      {displayData.phone || "Não informado"}
                    </DetailFieldValue>
                  )}
                </DetailField>
                <DetailField>
                  <DetailFieldLabel>Data de nascimento</DetailFieldLabel>
                  {isEditing ? (
                    <input
                      type="date"
                      value={editForm!.birthdate}
                      onChange={(event) =>
                        setEditForm((form) =>
                          form
                            ? { ...form, birthdate: event.target.value }
                            : null,
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
                </DetailField>
                <DetailField>
                  <DetailFieldLabel>
                    <Calendar size={14} /> Data de Matrícula
                  </DetailFieldLabel>
                  <DetailFieldValue>{displayData.enrollDate}</DetailFieldValue>
                </DetailField>
              </DetailGrid>
            </DetailSection>

            <DetailSection>
              <DetailSectionTitle>
                <BookOpen size={18} /> Informações Acadêmicas
              </DetailSectionTitle>
              <DetailGrid>
                <DetailField>
                  <DetailFieldLabel>Turma</DetailFieldLabel>
                  <DetailFieldValue>{displayData.turma}</DetailFieldValue>
                </DetailField>
                <DetailField>
                  <DetailFieldLabel>
                    <Award size={14} /> Nível
                  </DetailFieldLabel>
                  {isEditing ? (
                    <input
                      type="number"
                      min="1"
                      value={editForm!.levelId ?? ""}
                      onChange={(event) => {
                        const value = event.target.value;
                        const levelId = value === "" ? null : Number(value);
                        setEditForm((form) =>
                          form
                            ? { ...form, levelId, level: formatLevel(levelId) }
                            : null,
                        );
                      }}
                    />
                  ) : (
                    <DetailFieldValue>{displayData.level}</DetailFieldValue>
                  )}
                </DetailField>
                <DetailField>
                  <DetailFieldLabel>Plano</DetailFieldLabel>
                  {isEditing ? (
                    <select
                      value={editForm!.plan}
                      onChange={(event) =>
                        setEditForm((form) =>
                          form
                            ? {
                                ...form,
                                plan: Number(event.target.value) as 0 | 1,
                              }
                            : null,
                        )
                      }
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
                </DetailField>
                <DetailField>
                  <DetailFieldLabel>Status</DetailFieldLabel>
                  <DetailFieldValue>
                    <StatusBadge $active={displayData.isActive}>
                      {displayData.isActive ? "Ativo" : "Inativo"}
                    </StatusBadge>
                  </DetailFieldValue>
                </DetailField>
              </DetailGrid>
            </DetailSection>

            <DetailSection>
              <DetailSectionTitle>Observações</DetailSectionTitle>
              <DetailField>
                {isEditing ? (
                  <textarea
                    value={editForm!.observations}
                    onChange={(event) =>
                      setEditForm((form) =>
                        form
                          ? { ...form, observations: event.target.value }
                          : null,
                      )
                    }
                    placeholder="Adicionar observações sobre o aluno..."
                  />
                ) : (
                  <DetailFieldValue
                    style={{
                      color: displayData.observations ? "#1a1a1a" : "#aaa",
                    }}
                  >
                    {displayData.observations ||
                      "Nenhuma observação registrada."}
                  </DetailFieldValue>
                )}
              </DetailField>
            </DetailSection>
          </DetailBody>

          <DetailActions>
            {isEditing ? (
              <>
                <DetailActionBtn
                  $variant="secondary"
                  onClick={handleCancelEdit}
                  disabled={isSaving}
                >
                  Cancelar
                </DetailActionBtn>
                <DetailActionBtn
                  $variant="primary"
                  onClick={handleSaveEdit}
                  disabled={isSaving}
                >
                  {isSaving ? "Salvando..." : "Salvar Alterações"}
                </DetailActionBtn>
              </>
            ) : (
              <>
                {selectedStudent.isActive && (
                  <DetailActionBtn
                    $variant="danger"
                    disabled={isDeactivating}
                    onClick={() => deactivateStudent(selectedStudent.id)}
                  >
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
            placeholder="Pesquisar por nome ou email..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </SearchWrapper>
        <RightActions>
          <PaginationContainer>
            <span>
              Página {validCurrentPage} de {Math.max(totalPages, 1)}
            </span>
            <IconButton
              onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
              disabled={validCurrentPage === 1}
            >
              <ChevronLeft size={18} />
            </IconButton>
            <IconButton
              onClick={() =>
                setCurrentPage((page) => Math.min(totalPages, page + 1))
              }
              disabled={validCurrentPage >= totalPages}
            >
              <ChevronRight size={18} />
            </IconButton>
          </PaginationContainer>
          <AddButton onClick={() => setShowRegister(true)}>
            <Plus size={18} /> Cadastrar Aluno
          </AddButton>
        </RightActions>
      </HeaderActions>

      <TableContainer>
        <Table>
          <thead>
            <tr>
              <Th>Aluno</Th>
              <Th>Plano</Th>
              <Th>Nível</Th>
              <Th>Turma</Th>
              <Th>Telefone</Th>
              <Th>Status</Th>
              <Th>Ações</Th>
            </tr>
          </thead>
          <tbody>
            {currentStudents.length > 0 ? (
              currentStudents.map((student) => (
                <Tr key={student.id}>
                  <Td>
                    <StudentCell>
                      <Avatar $color={student.avatarColor}>
                        {getInitials(student.name)}
                      </Avatar>
                      <StudentInfo>
                        <strong>{student.name}</strong>
                        <span>{student.email}</span>
                      </StudentInfo>
                    </StudentCell>
                  </Td>
                  <Td>
                    <PlanBadge $plan={student.plan}>
                      {student.plan === 1 ? "VIP" : "Regular"}
                    </PlanBadge>
                  </Td>
                  <Td>{student.level}</Td>
                  <Td>{student.turma}</Td>
                  <Td>{student.phone || "Não informado"}</Td>
                  <Td>
                    <StatusBadge $active={student.isActive}>
                      {student.isActive ? "Ativo" : "Inativo"}
                    </StatusBadge>
                  </Td>
                  <Td>
                    <ActionsWrapper>
                      <ActionIconBtn
                        title="Ver detalhes / Editar"
                        onClick={() => handleOpenDetail(student)}
                      >
                        <Edit2 size={16} />
                      </ActionIconBtn>
                    </ActionsWrapper>
                  </Td>
                </Tr>
              ))
            ) : (
              <tr>
                <Td
                  colSpan={7}
                  style={{
                    textAlign: "center",
                    color: "#888",
                    padding: "3rem",
                  }}
                >
                  Nenhum aluno encontrado.
                </Td>
              </tr>
            )}
          </tbody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default StudentsTab;
