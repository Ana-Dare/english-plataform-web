import React, { useState, useMemo, useEffect } from "react";
import { X, Check } from "lucide-react";
import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FieldGroup,
  StudentListSelect,
  StudentSelectItem,
  StudentSelectInfo,
  CheckCircle,
  CloseBtn,
  PrimaryBtn,
  SecondaryBtn,
} from "./style";
import CustomDropdown from "../../../components/CustomDropdown";
import useToast from "../../../contexts/Toast/useToast";
import { useStudents } from "../../../contexts/Students/hooks/useStudents";
import { listLevels } from "../services/level";
import type { ILevel } from "../../../interfaces/levels";

export interface StudentMock {
  id: string;
  name: string;
  email: string;
  avatarColor: string;
}

interface CreateClassModalProps {
  onClose: () => void;
  onSave: (data: {
    name: string;
    level: string;
    students: StudentMock[];
  }) => void;
  isLoading?: boolean;
}

const CreateClassModal: React.FC<CreateClassModalProps> = ({
  onClose,
  onSave,
  isLoading = false,
}) => {
  const { addToast } = useToast();
  const { students } = useStudents();
  const [name, setName] = useState("");
  const [level, setLevel] = useState("");
  const [levels, setLevels] = useState<ILevel[]>([]);
  const [levelsLoading, setLevelsLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");

  // Carregar níveis ao montar
  useEffect(() => {
    const fetchLevels = async () => {
      try {
        const data = await listLevels();
        setLevels(data.levels);
        if (data.levels.length > 0) {
          setLevel(data.levels[0].id.toString());
        }
      } catch (error) {
        addToast("Erro ao carregar níveis", "error");
      } finally {
        setLevelsLoading(false);
      }
    };

    fetchLevels();
  }, [addToast]);

  // Converter students do contexto para StudentMock
  const studentsList: StudentMock[] = useMemo(() => {
    return students.map((s) => ({
      id: s.id.toString(),
      name: s.name,
      email: s.email,
      avatarColor: s.avatarColor,
    }));
  }, [students]);

  const filteredStudents = useMemo(() => {
    return studentsList.filter((s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery, studentsList]);

  const toggleStudent = (id: string) => {
    const newSet = new Set(selectedIds);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setSelectedIds(newSet);
  };

  const handleSave = () => {
    if (!name.trim()) {
      addToast("Por favor, informe o nome da turma.", "warning");
      return;
    }
    if (!level) {
      addToast("Por favor, selecione um nível.", "warning");
      return;
    }
    const selectedStudents = studentsList.filter((s) => selectedIds.has(s.id));
    onSave({ name, level, students: selectedStudents });
  };

  const levelOptions = levels.map((l) => ({
    value: l.id.toString(),
    label: l.name,
  }));

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalHeader>
          <h3>Nova Turma</h3>
          <CloseBtn onClick={onClose} disabled={isLoading}>
            <X size={20} />
          </CloseBtn>
        </ModalHeader>
        <ModalBody style={{ opacity: isLoading || levelsLoading ? 0.5 : 1 }}>
          <FieldGroup>
            <label>Nome da Turma</label>
            <input
              type="text"
              placeholder="Ex: Turma Business 1"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isLoading || levelsLoading}
            />
          </FieldGroup>
          <FieldGroup>
            <label>Nível</label>
            <CustomDropdown
              value={level}
              onChange={(val) => setLevel(val)}
              options={levelOptions}
              disabled={isLoading || levelsLoading}
            />
          </FieldGroup>
          <FieldGroup>
            <label>Selecionar Alunos ({selectedIds.size} selecionados)</label>
            <input
              type="text"
              placeholder="Buscar aluno por nome..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ marginBottom: "0.5rem" }}
              disabled={isLoading}
            />
            <StudentListSelect>
              {filteredStudents.length === 0 ? (
                <div
                  style={{
                    padding: "1rem",
                    textAlign: "center",
                    color: "#999",
                  }}
                >
                  {studentsList.length === 0
                    ? "Nenhum aluno disponível"
                    : "Nenhum aluno encontrado"}
                </div>
              ) : (
                filteredStudents.map((student) => {
                  const isSelected = selectedIds.has(student.id);
                  return (
                    <StudentSelectItem
                      key={student.id}
                      $selected={isSelected}
                      onClick={() => !isLoading && toggleStudent(student.id)}
                      style={{ opacity: isLoading ? 0.6 : 1 }}
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
                })
              )}
            </StudentListSelect>
          </FieldGroup>
        </ModalBody>
        <ModalFooter>
          <SecondaryBtn onClick={onClose} disabled={isLoading}>
            Cancelar
          </SecondaryBtn>
          <PrimaryBtn
            onClick={handleSave}
            disabled={isLoading || levelsLoading}
          >
            {isLoading ? "Criando..." : "Criar Turma"}
          </PrimaryBtn>
        </ModalFooter>
      </ModalContent>
    </ModalOverlay>
  );
};

export default CreateClassModal;
