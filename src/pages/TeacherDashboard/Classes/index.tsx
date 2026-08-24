import React, { useState, useMemo } from 'react';
import { Search, Plus, Users } from 'lucide-react';
import {
  Container, HeaderActions, SearchWrapper, RightActions, AddButton, Title,
  ClassesGrid, ClassCard, ClassCardHeader, LevelBadge, ClassCardBody,
  ClassCardInfo, StudentsPreview, StudentAvatarSmall, MoreStudents
} from './style';
import CreateClassModal from './CreateClassModal';
import type { StudentMock } from './CreateClassModal';
import ClassDetail from './ClassDetail';
import type { ClassType } from './types';

const initialMockClasses: ClassType[] = [
  {
    id: '1',
    name: 'Turma Beginner 1',
    level: 'Beginner',
    students: [
      { id: '2', name: 'Carlos Silva', email: 'carlos@email.com', avatarColor: '#e67e22' },
      { id: '4', name: 'Daniel Oliveira', email: 'daniel@email.com', avatarColor: '#1abc9c' },
      { id: '9', name: 'Julia Martins', email: 'julia@email.com', avatarColor: '#2980b9' },
    ]
  },
  {
    id: '2',
    name: 'Turma Intermediate A',
    level: 'Intermediate',
    students: [
      { id: '1', name: 'Ana Souza', email: 'ana@email.com', avatarColor: '#3165e3' },
      { id: '10', name: 'Lucas Pereira', email: 'lucas@email.com', avatarColor: '#d35400' },
    ]
  },
  {
    id: '3',
    name: 'Particular Gabriel',
    level: 'Advanced',
    students: [
      { id: '6', name: 'Gabriel Santos', email: 'gabriel@email.com', avatarColor: '#2c3e50' },
    ]
  }
];

const getInitials = (name: string) => {
  const parts = name.split(' ');
  return parts.length > 1 ? `${parts[0][0]}${parts[parts.length - 1][0]}` : parts[0][0];
};

const ClassesTab: React.FC = () => {
  const [classes, setClasses] = useState<ClassType[]>(initialMockClasses);
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedClass, setSelectedClass] = useState<ClassType | null>(null);

  const filteredClasses = useMemo(() => {
    return classes.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [classes, searchQuery]);

  const handleCreateClass = (data: { name: string; level: string; students: StudentMock[] }) => {
    const newClass: ClassType = {
      id: Date.now().toString(),
      name: data.name,
      level: data.level,
      students: data.students
    };
    setClasses(prev => [newClass, ...prev]);
    setShowCreateModal(false);
  };

  if (selectedClass) {
    return (
      <ClassDetail 
        classData={selectedClass} 
        onBack={() => setSelectedClass(null)} 
      />
    );
  }

  return (
    <Container>
      <HeaderActions>
        <Title>Gerenciar Turmas</Title>
        <RightActions style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <SearchWrapper style={{ width: '340px', flexShrink: 0 }}>
            <Search size={18} />
            <input 
              type="text" 
              placeholder="Pesquisar por nome da turma..." 
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{ padding: '0.85rem 1rem 0.85rem 3rem', borderRadius: '12px', border: '1px solid #eaeaea', width: '100%', boxSizing: 'border-box' }}
            />
          </SearchWrapper>
          <AddButton onClick={() => setShowCreateModal(true)} style={{ flexShrink: 0, borderRadius: '12px', padding: '0.85rem 1.5rem', background: 'linear-gradient(135deg, #08142c 0%, #1a3d6e 100%)', border: 'none', color: '#fff', display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
            <Plus size={18} /> Nova Turma
          </AddButton>
        </RightActions>
      </HeaderActions>

      <ClassesGrid>
        {filteredClasses.map(c => (
          <ClassCard key={c.id} onClick={() => setSelectedClass(c)}>
            <ClassCardHeader $level={c.level}>
              <h3>{c.name}</h3>
              <LevelBadge>{c.level}</LevelBadge>
            </ClassCardHeader>
            <ClassCardBody>
              <ClassCardInfo>
                <Users size={16} />
                <span>{c.students.length} aluno(s) matriculado(s)</span>
              </ClassCardInfo>
              
              {c.students.length > 0 && (
                <StudentsPreview style={{ marginTop: '0.5rem' }}>
                  {c.students.slice(0, 5).map((s, i) => (
                    <StudentAvatarSmall key={s.id} $color={s.avatarColor} $index={i}>
                      {getInitials(s.name)}
                    </StudentAvatarSmall>
                  ))}
                  {c.students.length > 5 && (
                    <MoreStudents>+{c.students.length - 5}</MoreStudents>
                  )}
                </StudentsPreview>
              )}
            </ClassCardBody>
          </ClassCard>
        ))}
      </ClassesGrid>

      {showCreateModal && (
        <CreateClassModal 
          onClose={() => setShowCreateModal(false)}
          onSave={handleCreateClass}
        />
      )}
    </Container>
  );
};

export default ClassesTab;
