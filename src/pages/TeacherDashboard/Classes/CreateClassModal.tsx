import React, { useState, useMemo } from 'react';
import { X, Check } from 'lucide-react';
import {
  ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter,
  FieldGroup, StudentListSelect, StudentSelectItem, StudentSelectInfo, CheckCircle,
  CloseBtn, PrimaryBtn, SecondaryBtn
} from './style';

export interface StudentMock {
  id: string;
  name: string;
  email: string;
  avatarColor: string;
}

// Mocking available students for the modal
const availableStudents: StudentMock[] = [
  { id: '1', name: 'Ana Souza', email: 'ana.souza@email.com', avatarColor: '#3165e3' },
  { id: '2', name: 'Carlos Silva', email: 'carlos.silva@email.com', avatarColor: '#e67e22' },
  { id: '3', name: 'Beatriz Costa', email: 'beatriz.costa@email.com', avatarColor: '#8e44ad' },
  { id: '4', name: 'Daniel Oliveira', email: 'daniel.oliveira@email.com', avatarColor: '#1abc9c' },
  { id: '5', name: 'Fernanda Lima', email: 'fernanda.lima@email.com', avatarColor: '#e74c3c' },
];

interface CreateClassModalProps {
  onClose: () => void;
  onSave: (data: { name: string; level: string; students: StudentMock[] }) => void;
}

const CreateClassModal: React.FC<CreateClassModalProps> = ({ onClose, onSave }) => {
  const [name, setName] = useState('');
  const [level, setLevel] = useState('Beginner');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');

  const filteredStudents = useMemo(() => {
    return availableStudents.filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [searchQuery]);

  const toggleStudent = (id: string) => {
    const newSet = new Set(selectedIds);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setSelectedIds(newSet);
  };

  const handleSave = () => {
    if (!name.trim()) {
      alert('Por favor, informe o nome da turma.');
      return;
    }
    const selectedStudents = availableStudents.filter(s => selectedIds.has(s.id));
    onSave({ name, level, students: selectedStudents });
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalHeader>
          <h3>Nova Turma</h3>
          <CloseBtn onClick={onClose}><X size={20} /></CloseBtn>
        </ModalHeader>
        <ModalBody>
          <FieldGroup>
            <label>Nome da Turma</label>
            <input 
              type="text" 
              placeholder="Ex: Turma Business 1" 
              value={name} 
              onChange={e => setName(e.target.value)} 
            />
          </FieldGroup>
          <FieldGroup>
            <label>Nível</label>
            <select value={level} onChange={e => setLevel(e.target.value)}>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </FieldGroup>
          <FieldGroup>
            <label>Selecionar Alunos ({selectedIds.size} selecionados)</label>
            <input 
              type="text" 
              placeholder="Buscar aluno por nome..." 
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{ marginBottom: '0.5rem' }}
            />
            <StudentListSelect>
              {filteredStudents.map(student => {
                const isSelected = selectedIds.has(student.id);
                return (
                  <StudentSelectItem 
                    key={student.id} 
                    $selected={isSelected} 
                    onClick={() => toggleStudent(student.id)}
                  >
                    <CheckCircle $selected={isSelected}>
                      {isSelected && <Check size={14} />}
                    </CheckCircle>
                    <StudentSelectInfo>
                      <strong>{student.name}</strong>
                      <span>{student.email}</span>
                    </StudentSelectInfo>
                  </StudentSelectItem>
                );
              })}
            </StudentListSelect>
          </FieldGroup>
        </ModalBody>
        <ModalFooter>
          <SecondaryBtn onClick={onClose}>Cancelar</SecondaryBtn>
          <PrimaryBtn onClick={handleSave}>Criar Turma</PrimaryBtn>
        </ModalFooter>
      </ModalContent>
    </ModalOverlay>
  );
};

export default CreateClassModal;
