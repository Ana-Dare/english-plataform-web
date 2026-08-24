import React, { useState, useMemo } from 'react';
import { 
  Search, Plus, ChevronLeft, ChevronRight, Edit2, UserCheck, UserX, ArrowLeft, 
  Mail, Phone, BookOpen, Award, Calendar, User
} from 'lucide-react';
import {
  Container, HeaderActions, SearchWrapper, RightActions, 
  PaginationContainer, IconButton, AddButton, TableContainer,
  Table, Th, Tr, Td, PlanBadge, StatusBadge, ActionIconBtn, ActionsWrapper,
  StudentCell, Avatar, StudentInfo,
  // Detail View
  DetailContainer, DetailHeader, DetailBackBtn, DetailHeaderInfo,
  DetailAvatar, DetailNameBlock, DetailStatusBadge,
  DetailBody, DetailSection, DetailSectionTitle, DetailGrid, DetailField, DetailFieldLabel, DetailFieldValue,
  DetailActions, DetailActionBtn
} from './style';
import RegisterStudent from './RegisterStudent';
import type { RegisterFormData } from './RegisterStudent';

// Mock Data Structure
interface Student {
  id: string;
  name: string;
  email: string;
  plan: 'VIP' | 'Regular';
  phone: string;
  isActive: boolean;
  avatarColor: string;
  level: string;
  turma: string;
  enrollDate: string;
  observations: string;
  photoUrl?: string;
}

// Colors for avatar backgrounds
const avatarColors = ['#3165e3', '#e67e22', '#8e44ad', '#1abc9c', '#e74c3c', '#2c3e50', '#c0392b', '#16a085', '#2980b9', '#d35400', '#27ae60', '#7f8c8d'];

const initialMockData: Student[] = [
  { id: '1', name: 'Ana Souza', email: 'ana.souza@email.com', plan: 'VIP', phone: '(11) 98765-4321', isActive: true, avatarColor: avatarColors[0], level: 'Intermediate', turma: 'Turma Intermediate A', enrollDate: '15/03/2025', observations: 'Aluna dedicada, ótimo desempenho em conversação.' },
  { id: '2', name: 'Carlos Silva', email: 'carlos.silva@email.com', plan: 'Regular', phone: '(21) 99876-5432', isActive: true, avatarColor: avatarColors[1], level: 'Beginner', turma: 'Turma Beginner 1', enrollDate: '20/01/2026', observations: '' },
  { id: '3', name: 'Beatriz Costa', email: 'beatriz.costa@email.com', plan: 'VIP', phone: '(31) 91234-5678', isActive: false, avatarColor: avatarColors[2], level: 'Advanced', turma: 'Turma Advanced', enrollDate: '10/06/2024', observations: 'Pausou as aulas temporariamente.' },
  { id: '4', name: 'Daniel Oliveira', email: 'daniel.oliveira@email.com', plan: 'Regular', phone: '(41) 98765-1234', isActive: true, avatarColor: avatarColors[3], level: 'Beginner', turma: 'Turma Beginner 1', enrollDate: '05/02/2026', observations: '' },
  { id: '5', name: 'Fernanda Lima', email: 'fernanda.lima@email.com', plan: 'Regular', phone: '(51) 93456-7890', isActive: true, avatarColor: avatarColors[4], level: 'Intermediate', turma: 'Turma Intermediate B', enrollDate: '12/08/2025', observations: 'Precisa de reforço em gramática.' },
  { id: '6', name: 'Gabriel Santos', email: 'gabriel.santos@email.com', plan: 'VIP', phone: '(61) 95678-1234', isActive: true, avatarColor: avatarColors[5], level: 'Advanced', turma: 'Particular', enrollDate: '01/04/2025', observations: 'Aulas particulares, foco em IELTS.' },
  { id: '7', name: 'Helena Mendes', email: 'helena.mendes@email.com', plan: 'Regular', phone: '(71) 96543-2109', isActive: false, avatarColor: avatarColors[6], level: 'Beginner', turma: 'Turma Beginner 2', enrollDate: '22/09/2025', observations: 'Inativa desde janeiro.' },
  { id: '8', name: 'Igor Ferreira', email: 'igor.ferreira@email.com', plan: 'VIP', phone: '(81) 97654-3210', isActive: true, avatarColor: avatarColors[7], level: 'Intermediate', turma: 'Particular', enrollDate: '18/11/2025', observations: 'Preparação para viagem corporativa.' },
  { id: '9', name: 'Julia Martins', email: 'julia.martins@email.com', plan: 'Regular', phone: '(11) 91234-8765', isActive: true, avatarColor: avatarColors[8], level: 'Beginner', turma: 'Turma Beginner 1', enrollDate: '03/01/2026', observations: '' },
  { id: '10', name: 'Lucas Pereira', email: 'lucas.pereira@email.com', plan: 'Regular', phone: '(21) 92345-6789', isActive: true, avatarColor: avatarColors[9], level: 'Intermediate', turma: 'Turma Intermediate A', enrollDate: '14/05/2025', observations: 'Bom progresso, pronto para avançar de nível.' },
  { id: '11', name: 'Mariana Almeida', email: 'mariana.almeida@email.com', plan: 'VIP', phone: '(31) 93456-7890', isActive: true, avatarColor: avatarColors[10], level: 'Advanced', turma: 'Turma Advanced', enrollDate: '07/07/2024', observations: '' },
  { id: '12', name: 'Nicolas Gomes', email: 'nicolas.gomes@email.com', plan: 'Regular', phone: '(41) 94567-8901', isActive: true, avatarColor: avatarColors[11], level: 'Beginner', turma: 'Turma Beginner 2', enrollDate: '28/02/2026', observations: '' },
];

const ITEMS_PER_PAGE = 10;

const getInitials = (name: string) => {
  const parts = name.split(' ');
  return parts.length > 1 ? `${parts[0][0]}${parts[parts.length - 1][0]}` : parts[0][0];
};

const StudentsTab: React.FC = () => {
  const [students, setStudents] = useState<Student[]>(initialMockData);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Detail/Edit View State
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<Student | null>(null);

  // Registration View State
  const [showRegister, setShowRegister] = useState(false);

  // Search filter
  const filteredStudents = useMemo(() => {
    return students.filter(student => 
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [students, searchQuery]);

  // Pagination logic
  const totalPages = Math.ceil(filteredStudents.length / ITEMS_PER_PAGE);
  const validCurrentPage = Math.min(currentPage, Math.max(totalPages, 1));
  
  const currentStudents = useMemo(() => {
    const startIndex = (validCurrentPage - 1) * ITEMS_PER_PAGE;
    return filteredStudents.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredStudents, validCurrentPage]);

  // Actions
  const handleToggleStatus = (id: string) => {
    setStudents(prev => prev.map(s => 
      s.id === id ? { ...s, isActive: !s.isActive } : s
    ));
    // Update selected student view if it's the same student
    if (selectedStudent?.id === id) {
      setSelectedStudent(prev => prev ? { ...prev, isActive: !prev.isActive } : null);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
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

  const handleSaveEdit = () => {
    if (!editForm) return;
    setStudents(prev => prev.map(s => s.id === editForm.id ? editForm : s));
    setSelectedStudent(editForm);
    setIsEditing(false);
    setEditForm(null);
  };

  const handleBackToList = () => {
    setSelectedStudent(null);
    setIsEditing(false);
    setEditForm(null);
  };

  const handleRegisterSave = (data: RegisterFormData) => {
    const newId = (students.length + 1).toString();
    const colorIndex = students.length % avatarColors.length;
    const today = new Date();
    const enrollDate = `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`;
    const newStudent: Student = {
      id: newId,
      name: data.name,
      email: data.email,
      plan: data.plan,
      phone: data.phone,
      isActive: true,
      avatarColor: avatarColors[colorIndex],
      level: data.level || 'Beginner',
      turma: data.turma || 'A definir',
      enrollDate,
      observations: data.observations,
    };
    setStudents(prev => [...prev, newStudent]);
    setShowRegister(false);
  };

  // =========== REGISTRATION VIEW ===========
  if (showRegister) {
    return <RegisterStudent onBack={() => setShowRegister(false)} onSave={handleRegisterSave} />;
  }

  // =========== DETAIL VIEW ===========
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
                <span>ID: #{displayData.id.padStart(4, '0')} • Matriculado em {displayData.enrollDate}</span>
                <DetailStatusBadge $active={displayData.isActive}>
                  {displayData.isActive ? 'Ativo' : 'Inativo'}
                </DetailStatusBadge>
              </DetailNameBlock>
            </DetailHeaderInfo>
          </DetailHeader>

          <DetailBody>
            {/* Informações Pessoais */}
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
                      onChange={e => setEditForm(f => f ? { ...f, name: e.target.value } : null)} 
                    />
                  ) : (
                    <DetailFieldValue>{displayData.name}</DetailFieldValue>
                  )}
                </DetailField>
                <DetailField>
                  <DetailFieldLabel><Mail size={14} /> E-mail</DetailFieldLabel>
                  {isEditing ? (
                    <input 
                      type="email" 
                      value={editForm!.email} 
                      onChange={e => setEditForm(f => f ? { ...f, email: e.target.value } : null)} 
                    />
                  ) : (
                    <DetailFieldValue>{displayData.email}</DetailFieldValue>
                  )}
                </DetailField>
                <DetailField>
                  <DetailFieldLabel><Phone size={14} /> Telefone</DetailFieldLabel>
                  {isEditing ? (
                    <input 
                      type="text" 
                      value={editForm!.phone} 
                      onChange={e => setEditForm(f => f ? { ...f, phone: e.target.value } : null)} 
                    />
                  ) : (
                    <DetailFieldValue>{displayData.phone}</DetailFieldValue>
                  )}
                </DetailField>
                <DetailField>
                  <DetailFieldLabel><Calendar size={14} /> Data de Matrícula</DetailFieldLabel>
                  {isEditing ? (
                    <input 
                      type="text" 
                      value={editForm!.enrollDate} 
                      onChange={e => setEditForm(f => f ? { ...f, enrollDate: e.target.value } : null)} 
                    />
                  ) : (
                    <DetailFieldValue>{displayData.enrollDate}</DetailFieldValue>
                  )}
                </DetailField>
              </DetailGrid>
            </DetailSection>

            {/* Informações Acadêmicas */}
            <DetailSection>
              <DetailSectionTitle>
                <BookOpen size={18} /> Informações Acadêmicas
              </DetailSectionTitle>
              <DetailGrid>
                <DetailField>
                  <DetailFieldLabel>Turma</DetailFieldLabel>
                  {isEditing ? (
                    <select 
                      value={editForm!.turma} 
                      onChange={e => setEditForm(f => f ? { ...f, turma: e.target.value } : null)}
                    >
                      <option value="Turma Beginner 1">Turma Beginner 1</option>
                      <option value="Turma Beginner 2">Turma Beginner 2</option>
                      <option value="Turma Intermediate A">Turma Intermediate A</option>
                      <option value="Turma Intermediate B">Turma Intermediate B</option>
                      <option value="Turma Advanced">Turma Advanced</option>
                      <option value="Particular">Particular</option>
                    </select>
                  ) : (
                    <DetailFieldValue>{displayData.turma}</DetailFieldValue>
                  )}
                </DetailField>
                <DetailField>
                  <DetailFieldLabel><Award size={14} /> Nível</DetailFieldLabel>
                  {isEditing ? (
                    <select 
                      value={editForm!.level} 
                      onChange={e => setEditForm(f => f ? { ...f, level: e.target.value } : null)}
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                  ) : (
                    <DetailFieldValue>{displayData.level}</DetailFieldValue>
                  )}
                </DetailField>
                <DetailField>
                  <DetailFieldLabel>Plano</DetailFieldLabel>
                  {isEditing ? (
                    <select 
                      value={editForm!.plan} 
                      onChange={e => setEditForm(f => f ? { ...f, plan: e.target.value as 'VIP' | 'Regular' } : null)}
                    >
                      <option value="Regular">Regular</option>
                      <option value="VIP">VIP</option>
                    </select>
                  ) : (
                    <DetailFieldValue>
                      <PlanBadge $plan={displayData.plan}>{displayData.plan}</PlanBadge>
                    </DetailFieldValue>
                  )}
                </DetailField>
                <DetailField>
                  <DetailFieldLabel>Status</DetailFieldLabel>
                  {isEditing ? (
                    <select 
                      value={editForm!.isActive ? 'active' : 'inactive'} 
                      onChange={e => setEditForm(f => f ? { ...f, isActive: e.target.value === 'active' } : null)}
                    >
                      <option value="active">Ativo</option>
                      <option value="inactive">Inativo</option>
                    </select>
                  ) : (
                    <DetailFieldValue>
                      <StatusBadge $active={displayData.isActive}>
                        {displayData.isActive ? 'Ativo' : 'Inativo'}
                      </StatusBadge>
                    </DetailFieldValue>
                  )}
                </DetailField>
              </DetailGrid>
            </DetailSection>

            {/* Observações */}
            <DetailSection>
              <DetailSectionTitle>
                Observações
              </DetailSectionTitle>
              <DetailField>
                {isEditing ? (
                  <textarea 
                    value={editForm!.observations} 
                    onChange={e => setEditForm(f => f ? { ...f, observations: e.target.value } : null)}
                    placeholder="Adicionar observações sobre o aluno..."
                  />
                ) : (
                  <DetailFieldValue style={{ color: displayData.observations ? '#1a1a1a' : '#aaa' }}>
                    {displayData.observations || 'Nenhuma observação registrada.'}
                  </DetailFieldValue>
                )}
              </DetailField>
            </DetailSection>
          </DetailBody>

          <DetailActions>
            {isEditing ? (
              <>
                <DetailActionBtn $variant="secondary" onClick={handleCancelEdit}>
                  Cancelar
                </DetailActionBtn>
                <DetailActionBtn $variant="primary" onClick={handleSaveEdit}>
                  Salvar Alterações
                </DetailActionBtn>
              </>
            ) : (
              <>
                <DetailActionBtn 
                  $variant={selectedStudent.isActive ? 'danger' : 'success'}
                  onClick={() => handleToggleStatus(selectedStudent.id)}
                >
                  {selectedStudent.isActive ? <><UserX size={16} /> Desativar Aluno</> : <><UserCheck size={16} /> Ativar Aluno</>}
                </DetailActionBtn>
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

  // =========== TABLE LIST VIEW ===========
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
            <span>Página {validCurrentPage} de {Math.max(totalPages, 1)}</span>
            <IconButton 
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={validCurrentPage === 1}
            >
              <ChevronLeft size={18} />
            </IconButton>
            <IconButton 
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
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
              currentStudents.map(student => (
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
                    <PlanBadge $plan={student.plan}>{student.plan}</PlanBadge>
                  </Td>
                  <Td>{student.level}</Td>
                  <Td>{student.turma}</Td>
                  <Td>{student.phone}</Td>
                  <Td>
                    <StatusBadge $active={student.isActive}>
                      {student.isActive ? 'Ativo' : 'Inativo'}
                    </StatusBadge>
                  </Td>
                  <Td>
                    <ActionsWrapper>
                      <ActionIconBtn title="Ver detalhes / Editar" onClick={() => handleOpenDetail(student)}>
                        <Edit2 size={16} />
                      </ActionIconBtn>
                      <ActionIconBtn 
                        title={student.isActive ? "Desativar" : "Ativar"} 
                        $danger={student.isActive}
                        $success={!student.isActive}
                        onClick={() => handleToggleStatus(student.id)}
                      >
                        {student.isActive ? <UserX size={16} /> : <UserCheck size={16} />}
                      </ActionIconBtn>
                    </ActionsWrapper>
                  </Td>
                </Tr>
              ))
            ) : (
              <tr>
                <Td colSpan={7} style={{ textAlign: 'center', color: '#888', padding: '3rem' }}>
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
