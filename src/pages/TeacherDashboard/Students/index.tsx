import React, { useMemo, useState, useEffect } from "react";
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
  MapPin,
  Users
} from "lucide-react";
import CustomDropdown from '../../../components/CustomDropdown';
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
  FilterSelect,
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
  registerStudent,
  updateStudent,
} from "../services";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "../../../contexts/ToastContext";

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
  rawEnrollDate: string;
  observations: string;
  progress?: number;
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
  rawEnrollDate: student.createdAt,
  observations: student.profile.notes ?? "",
  progress: (student as any).progress ?? Math.floor(Math.random() * 40) + 60,
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

const MOCK_STUDENTS: IStudents[] = [
  {
    id: 1,
    name: "João Silva",
    email: "joao.silva@example.com",
    phone: "11999999999",
    birthdate: "2000-05-15T00:00:00.000Z",
    active: true,
    createdAt: "2023-01-10T10:00:00.000Z",
    role: "student",
    profile: {
      levelId: 2,
      vip: true,
      notes: "Aluno dedicado, prefere aulas à noite.",
    },
  },
  {
    id: 2,
    name: "Maria Oliveira",
    email: "maria.oliveira@example.com",
    phone: "11888888888",
    birthdate: "1995-10-20T00:00:00.000Z",
    active: false,
    createdAt: "2023-02-15T10:00:00.000Z",
    role: "student",
    profile: {
      levelId: null,
      vip: false,
      notes: null,
    },
  },
  {
    id: 3,
    name: "Carlos Santos",
    email: "carlos@example.com",
    phone: "11777777777",
    birthdate: "2001-08-10T00:00:00.000Z",
    active: true,
    createdAt: "2023-03-20T10:00:00.000Z",
    role: "student",
    profile: {
      levelId: 1,
      vip: true,
      notes: null,
    },
  }
];

interface StudentsTabProps {
  initialStudentId?: number | null;
}

const StudentsTab: React.FC<StudentsTabProps> = ({ initialStudentId }) => {
  const { addToast } = useToast();
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
  const [studentsList, setStudentsList] = useState(MOCK_STUDENTS);
  const queryClient = useQueryClient();

  const students = useMemo(() => studentsList.map(toStudent), [studentsList]);

  useEffect(() => {
    if (initialStudentId) {
      const student = students.find(s => s.id === initialStudentId);
      if (student) {
        setSelectedStudent(student);
        setIsEditing(false);
        setEditForm(null);
      }
    }
  }, [initialStudentId, students]);

  const filteredStudents = useMemo(() => {
    const filtered = students.filter((student) => {
      const matchSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          student.email.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchLevel = filterLevel === "todos" || student.levelId === Number(filterLevel);
      
      const matchStatus = filterStatus === "todos" || 
                          (filterStatus === "ativos" && student.isActive) ||
                          (filterStatus === "inativos" && !student.isActive);
                          
      return matchSearch && matchLevel && matchStatus;
    });

    return filtered.sort((a, b) => {
      if (sortOrder === "recent") {
        return new Date(b.rawEnrollDate).getTime() - new Date(a.rawEnrollDate).getTime();
      }
      if (sortOrder === "oldest") {
        return new Date(a.rawEnrollDate).getTime() - new Date(b.rawEnrollDate).getTime();
      }
      if (sortOrder === "az") {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });
  }, [students, searchQuery, filterLevel, filterTurma, filterFreq, filterStatus, sortOrder]);
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
      addToast("Aluno cadastrado com sucesso!", "success");
    },
    onError: () => {
      addToast("Não foi possível cadastrar o aluno. Tente novamente.", "error");
    },
  });

  const { mutate: deactivateStudent, isPending: isDeactivating } = useMutation({
    mutationFn: desactive,
    onSuccess: () => {
      setSelectedStudent(null);
      void queryClient.invalidateQueries({ queryKey: ["studentsList"] });
      addToast("Status do aluno atualizado com sucesso!", "success");
    },
    onError: () => {
      addToast("Não foi possível desativar o aluno. Tente novamente.", "error");
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
      addToast("Dados atualizados com sucesso!", "success");
    },
    onError: () => {
      addToast("Não foi possível atualizar o aluno. Tente novamente.", "error");
    },
  });

  const handleRegisterSave = (student: RegisterStudentParams) => {
    register({ ...student, notes: student.notes || "", active: 1 });
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

    saveStudent({ userId: selectedStudent.id, params });
  };

  if (showRegister) {
    return (
      <RegisterStudent onBack={handleBackToList} onSave={handleRegisterSave} />
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

  const toggleStudentStatus = (id: number) => {
    setStudentsList(prev => prev.map(s => 
      s.id === id ? { ...s, active: !s.active } : s
    ));
  };

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
        
        <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <CustomDropdown 
            value={sortOrder} 
            onChange={setSortOrder} 
            options={[
              { value: "recent", label: "Mais recentes" },
              { value: "oldest", label: "Mais antigos" },
              { value: "az", label: "Ordem alfabética (A-Z)" }
            ]}
          />

          <CustomDropdown 
            value={filterLevel} 
            onChange={setFilterLevel} 
            options={[
              { value: "todos", label: "Nível: Todos" },
              { value: "1", label: "Nível: 1" },
              { value: "2", label: "Nível: 2" }
            ]}
          />

          <CustomDropdown 
            value={filterStatus} 
            onChange={setFilterStatus} 
            options={[
              { value: "ativos", label: "Status: Ativos" },
              { value: "inativos", label: "Status: Inativos" },
              { value: "todos", label: "Status: Todos" }
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
              <Th>Aluno</Th>
              <Th>Plano</Th>
              <Th>Nível</Th>
              <Th>Turma</Th>
              <Th>Andamento</Th>
              <Th>Telefone</Th>
              <Th>Status</Th>
              <Th>Ações</Th>
            </tr>
          </thead>
          <tbody>
            {currentStudents.length > 0 ? (
              currentStudents.map((student) => (
                <Tr 
                  key={student.id}
                  onClick={() => handleOpenDetail(student)}
                  style={{ cursor: 'pointer' }}
                >
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
                  <Td>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#333' }}>{student.progress}%</span>
                      <div style={{ width: '60px', height: '4px', background: '#e0e0e0', borderRadius: '4px', overflow: 'hidden' }}>
                        <div style={{ width: `${student.progress}%`, height: '100%', background: '#f59e0b', borderRadius: '4px' }} />
                      </div>
                    </div>
                  </Td>
                  <Td>{student.phone || "Não informado"}</Td>
                  <Td>
                    <StatusBadge $active={student.isActive}>
                      {student.isActive ? "Ativo" : "Inativo"}
                    </StatusBadge>
                  </Td>
                  <Td onClick={(e) => e.stopPropagation()}>
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
                          title={student.isActive ? "Desativar Aluno" : "Reativar Aluno"}
                          onClick={() => toggleStudentStatus(student.id)}
                          style={{ color: student.isActive ? '#ef4444' : '#22c55e' }}
                        >
                          <Power size={16} />
                        </IconButton>
                      </div>
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
      
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
        <PaginationContainer>
          <span>
            Mostrando {(validCurrentPage - 1) * ITEMS_PER_PAGE + 1} a {Math.min(validCurrentPage * ITEMS_PER_PAGE, filteredStudents.length)} de {filteredStudents.length} alunos
          </span>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
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
          </div>
        </PaginationContainer>
      </div>
    </Container>
  );
};

export default StudentsTab;
