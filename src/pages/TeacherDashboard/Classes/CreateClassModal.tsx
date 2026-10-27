import React, { useState, useMemo, useEffect, useRef } from "react";
import {
  X,
  Check,
  GraduationCap,
  Users,
  BookOpen,
  Search,
  ChevronDown,
  Plus,
} from "lucide-react";
import styled from "styled-components";
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

const AVATAR_PALETTES = [
  { bg: "#bfdbfe", text: "#1e40af" }, // Azul suave
  { bg: "#ddd6fe", text: "#6d28d9" }, // Roxo suave
  { bg: "#fbcfe8", text: "#9d174d" }, // Rosa suave
  { bg: "#bbf7d0", text: "#166534" }, // Verde suave
  { bg: "#fed7aa", text: "#9a3412" }, // Laranja suave
  { bg: "#fef08a", text: "#854d0e" }, // Âmbar suave
  { bg: "#cffafe", text: "#0e7490" }, // Ciano suave
];

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 0 || !parts[0]) return "AL";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function getAvatarPalette(identifier: string, index: number) {
  let hash = 0;
  for (let i = 0; i < identifier.length; i++) {
    hash = identifier.charCodeAt(i) + ((hash << 5) - hash);
  }
  const paletteIndex = Math.abs(hash + index) % AVATAR_PALETTES.length;
  return AVATAR_PALETTES[paletteIndex];
}

/* ================= Styled Components ================= */

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.45);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
  animation: fadeIn 0.2s ease-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const ModalCard = styled.div`
  background: #ffffff;
  width: 100%;
  max-width: 530px;
  max-height: 92vh;
  border-radius: 20px;
  box-shadow:
    0 20px 45px -10px rgba(15, 23, 42, 0.2),
    0 0 1px 1px rgba(15, 23, 42, 0.05);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  animation: modalScale 0.25s cubic-bezier(0.16, 1, 0.3, 1);

  @keyframes modalScale {
    from {
      opacity: 0;
      transform: scale(0.97) translateY(8px);
    }
    to {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  }

  @media (max-width: 540px) {
    border-radius: 16px;
    max-height: 96vh;
  }
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 1.75rem 1.25rem;
  background: #ffffff;
  border-bottom: 1px solid #f1f5f9;

  @media (max-width: 540px) {
    padding: 1.2rem 1.25rem 1rem;
  }
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const HeaderIconCircle = styled.div`
  width: 48px;
  height: 48px;
  min-width: 48px;
  border-radius: 50%;
  background: #e0edff;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #1d4ed8;

  @media (max-width: 540px) {
    width: 42px;
    height: 42px;
    min-width: 42px;
  }
`;

const HeaderTitleGroup = styled.div`
  display: flex;
  flex-direction: column;

  h3 {
    margin: 0;
    font-size: 1.28rem;
    font-weight: 700;
    color: #0f172a;
    letter-spacing: -0.3px;
    font-family: inherit;
  }

  p {
    margin: 3px 0 0 0;
    font-size: 0.85rem;
    color: #64748b;
    font-weight: 400;
  }

  @media (max-width: 540px) {
    h3 {
      font-size: 1.15rem;
    }
    p {
      font-size: 0.78rem;
    }
  }
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: #94a3b8;
  padding: 6px;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &:hover {
    color: #0f172a;
    background: #f1f5f9;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ModalBody = styled.div`
  padding: 1.25rem 1.75rem 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1.15rem;
  overflow-y: auto;
  flex: 1;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 999px;
  }

  @media (max-width: 540px) {
    padding: 1rem 1.25rem;
    gap: 1rem;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
`;

const FormLabel = styled.label`
  font-size: 0.86rem;
  font-weight: 700;
  color: #0f172a;
  display: flex;
  align-items: center;
  gap: 2px;

  span.required {
    color: #ef4444;
    font-weight: 800;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  border: 1.5px solid #e2e8f0;
  border-radius: 12px;
  padding: 0.7rem 0.95rem;
  background: #ffffff;
  transition: all 0.2s ease;

  &:focus-within {
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.12);
  }

  svg {
    color: #94a3b8;
    flex-shrink: 0;
  }

  input {
    border: none;
    outline: none;
    background: transparent;
    width: 100%;
    font-size: 0.92rem;
    color: #0f172a;
    font-family: inherit;

    &::placeholder {
      color: #94a3b8;
      font-weight: 400;
    }
  }
`;

const DropdownWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const DropdownTrigger = styled.div<{ $isOpen: boolean; $hasValue: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1.5px solid ${({ $isOpen }) => ($isOpen ? "#2563eb" : "#e2e8f0")};
  box-shadow: ${({ $isOpen }) =>
    $isOpen ? "0 0 0 3px rgba(37, 99, 235, 0.12)" : "none"};
  border-radius: 12px;
  padding: 0.7rem 0.95rem;
  background: #ffffff;
  cursor: pointer;
  transition: all 0.2s ease;
  user-select: none;

  &:hover {
    border-color: #cbd5e1;
  }

  .left-content {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    color: ${({ $hasValue }) => ($hasValue ? "#0f172a" : "#94a3b8")};
    font-size: 0.92rem;
    font-weight: ${({ $hasValue }) => ($hasValue ? "500" : "400")};

    svg {
      color: #94a3b8;
      flex-shrink: 0;
    }
  }

  .chevron-icon {
    color: #94a3b8;
    transition: transform 0.2s ease;
    transform: ${({ $isOpen }) => ($isOpen ? "rotate(180deg)" : "rotate(0deg)")};
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  right: 0;
  background: #ffffff;
  border: 1.5px solid #e2e8f0;
  border-radius: 12px;
  box-shadow: 0 10px 25px -5px rgba(15, 23, 42, 0.12);
  z-index: 60;
  max-height: 200px;
  overflow-y: auto;
  padding: 6px;
  animation: fadeIn 0.15s ease-out;

  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 999px;
  }
`;

const DropdownItem = styled.div<{ $selected: boolean }>`
  padding: 0.65rem 0.85rem;
  border-radius: 8px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.15s ease;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${({ $selected }) => ($selected ? "#2563eb" : "#1e293b")};
  background: ${({ $selected }) => ($selected ? "#eff6ff" : "transparent")};
  font-weight: ${({ $selected }) => ($selected ? "600" : "400")};

  &:hover {
    background: #f1f5f9;
    color: #2563eb;
  }
`;

const StudentsHeaderRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 0.1rem;

  h4 {
    margin: 0;
    font-size: 0.95rem;
    font-weight: 700;
    color: #0f172a;
  }
`;

const SelectedBadge = styled.span`
  background: #eff6ff;
  color: #2563eb;
  font-size: 0.74rem;
  font-weight: 700;
  padding: 0.2rem 0.65rem;
  border-radius: 9999px;
`;

const StudentListBox = styled.div`
  border: 1.5px solid #e2e8f0;
  border-radius: 14px;
  background: #f8fafc;
  padding: 6px;
  max-height: 230px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 4px;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 999px;
  }
`;

const StudentItemCard = styled.div<{ $selected: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  border-radius: 10px;
  background: #ffffff;
  border: 1px solid ${({ $selected }) => ($selected ? "#dbeafe" : "#f1f5f9")};
  box-shadow: 0 1px 3px rgba(15, 23, 42, 0.02);
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    background: #f8fafc;
    border-color: #cbd5e1;
  }
`;

const StudentLeftArea = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  overflow: hidden;
`;

const StudentAvatar = styled.div<{ $bg: string; $color: string }>`
  width: 38px;
  height: 38px;
  min-width: 38px;
  border-radius: 50%;
  background-color: ${({ $bg }) => $bg};
  color: ${({ $color }) => $color};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.82rem;
  letter-spacing: 0.5px;
  user-select: none;
`;

const StudentTextDetails = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;

  strong {
    font-size: 0.88rem;
    font-weight: 600;
    color: #0f172a;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  span {
    font-size: 0.77rem;
    color: #64748b;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const ModernCheckbox = styled.div<{ $selected: boolean }>`
  width: 20px;
  height: 20px;
  min-width: 20px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.18s ease;
  background: ${({ $selected }) => ($selected ? "#2563eb" : "#ffffff")};
  border: ${({ $selected }) =>
    $selected ? "none" : "1.5px solid #cbd5e1"};
  color: #ffffff;

  &:hover {
    border-color: #94a3b8;
  }
`;

const EmptyStateText = styled.div`
  padding: 1.5rem 1rem;
  text-align: center;
  color: #94a3b8;
  font-size: 0.88rem;
`;

const ModalFooter = styled.div`
  padding: 1.15rem 1.75rem;
  border-top: 1px solid #f1f5f9;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  background: #ffffff;

  @media (max-width: 540px) {
    padding: 1rem 1.25rem;
    flex-direction: column-reverse;
    align-items: stretch;
    gap: 0.85rem;
  }
`;

const FooterCounter = styled.div`
  display: flex;
  align-items: center;
  gap: 0.55rem;
  color: #64748b;
  font-size: 0.84rem;
  font-weight: 500;

  svg {
    color: #64748b;
    flex-shrink: 0;
  }

  @media (max-width: 540px) {
    justify-content: center;
  }
`;

const FooterButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;

  @media (max-width: 540px) {
    width: 100%;
    justify-content: stretch;
  }
`;

const CancelBtn = styled.button`
  background: #f1f5f9;
  color: #334155;
  font-size: 0.9rem;
  font-weight: 600;
  padding: 0.65rem 1.25rem;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;

  &:hover {
    background: #e2e8f0;
    color: #0f172a;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  @media (max-width: 540px) {
    flex: 1;
  }
`;

const SubmitBtn = styled.button`
  background: #0b2347;
  color: #ffffff;
  font-size: 0.9rem;
  font-weight: 600;
  padding: 0.65rem 1.35rem;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  transition: all 0.2s ease;
  font-family: inherit;
  box-shadow: 0 4px 12px rgba(11, 35, 71, 0.15);

  &:hover {
    background: #071730;
    transform: translateY(-1px);
    box-shadow: 0 6px 16px rgba(11, 35, 71, 0.25);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }

  @media (max-width: 540px) {
    flex: 1.5;
  }
`;

/* ================= Component ================= */

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
  const [isLevelDropdownOpen, setIsLevelDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fecha o dropdown se clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsLevelDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

  const studentsList: StudentMock[] = useMemo(() => {
    return (students ?? []).map((s) => ({
      id: s.id.toString(),
      name: s.name,
      email: s.email,
      avatarColor: s.avatarColor,
    }));
  }, [students]);



  const filteredStudents = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return studentsList;
    return studentsList.filter(
      (s) =>
        s.name.toLowerCase().includes(query) ||
        s.email.toLowerCase().includes(query),
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
      addToast("Por favor, selecione um nível de inglês.", "warning");
      return;
    }
    const selectedStudents = studentsList.filter((s) => selectedIds.has(s.id));
    onSave({ name: name.trim(), level, students: selectedStudents });
  };

  const selectedLevelObj = levels.find((l) => l.id.toString() === level);

  return (
    <ModalOverlay onClick={onClose}>
      <ModalCard onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <HeaderLeft>
            <HeaderIconCircle>
              <GraduationCap size={24} strokeWidth={2.2} />
            </HeaderIconCircle>
            <HeaderTitleGroup>
              <h3>Criar nova turma</h3>
              <p>Organize alunos por nível e acompanhe o progresso</p>
            </HeaderTitleGroup>
          </HeaderLeft>
          <CloseButton onClick={onClose} disabled={isLoading} aria-label="Fechar">
            <X size={20} />
          </CloseButton>
        </ModalHeader>

        <ModalBody style={{ opacity: isLoading ? 0.6 : 1 }}>
          {/* Nome da Turma */}
          <FormGroup>
            <FormLabel>
              Nome da turma <span className="required">*</span>
            </FormLabel>
            <InputWrapper>
              <Users size={18} />
              <input
                type="text"
                placeholder="Ex.: Business 1 • Noite"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isLoading}
                autoFocus
              />
            </InputWrapper>
          </FormGroup>

          {/* Nível de inglês */}
          <FormGroup>
            <FormLabel>
              Nível de inglês <span className="required">*</span>
            </FormLabel>
            <DropdownWrapper ref={dropdownRef}>
              <DropdownTrigger
                $isOpen={isLevelDropdownOpen}
                $hasValue={!!level}
                onClick={() =>
                  !isLoading &&
                  !levelsLoading &&
                  setIsLevelDropdownOpen((prev) => !prev)
                }
              >
                <div className="left-content">
                  <BookOpen size={18} />
                  <span>
                    {levelsLoading
                      ? "Carregando níveis..."
                      : selectedLevelObj?.name || "Selecione o nível"}
                  </span>
                </div>
                <ChevronDown size={18} className="chevron-icon" />
              </DropdownTrigger>

              {isLevelDropdownOpen && (
                <DropdownMenu>
                  {levels.length === 0 ? (
                    <EmptyStateText>Nenhum nível cadastrado</EmptyStateText>
                  ) : (
                    levels.map((lvl) => {
                      const isSelected = lvl.id.toString() === level;
                      return (
                        <DropdownItem
                          key={lvl.id}
                          $selected={isSelected}
                          onClick={() => {
                            setLevel(lvl.id.toString());
                            setIsLevelDropdownOpen(false);
                          }}
                        >
                          <span>{lvl.name}</span>
                          {isSelected && <Check size={16} strokeWidth={2.5} />}
                        </DropdownItem>
                      );
                    })
                  )}
                </DropdownMenu>
              )}
            </DropdownWrapper>
          </FormGroup>

          {/* Adicionar Alunos */}
          <FormGroup>
            <StudentsHeaderRow>
              <h4>Adicionar alunos</h4>
              <SelectedBadge>
                {selectedIds.size} selecionado{selectedIds.size !== 1 ? "s" : ""}
              </SelectedBadge>
            </StudentsHeaderRow>

            <InputWrapper style={{ marginBottom: "0.2rem" }}>
              <Search size={18} />
              <input
                type="text"
                placeholder="Buscar por nome ou e-mail..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                disabled={isLoading}
              />
            </InputWrapper>

            <StudentListBox>
              {filteredStudents.length === 0 ? (
                <EmptyStateText>
                  {studentsList.length === 0
                    ? "Nenhum aluno disponível"
                    : "Nenhum aluno encontrado"}
                </EmptyStateText>
              ) : (
                filteredStudents.map((student, idx) => {
                  const isSelected = selectedIds.has(student.id);
                  const palette = getAvatarPalette(student.id, idx);
                  const initials = getInitials(student.name);

                  return (
                    <StudentItemCard
                      key={student.id}
                      $selected={isSelected}
                      onClick={() => !isLoading && toggleStudent(student.id)}
                    >
                      <StudentLeftArea>
                        <StudentAvatar
                          $bg={palette.bg}
                          $color={palette.text}
                          title={student.name}
                        >
                          {initials}
                        </StudentAvatar>
                        <StudentTextDetails>
                          <strong>{student.name}</strong>
                          <span>{student.email}</span>
                        </StudentTextDetails>
                      </StudentLeftArea>

                      <ModernCheckbox $selected={isSelected}>
                        {isSelected && <Check size={14} strokeWidth={3} />}
                      </ModernCheckbox>
                    </StudentItemCard>
                  );
                })
              )}
            </StudentListBox>
          </FormGroup>
        </ModalBody>

        <ModalFooter>
          <FooterCounter>
            <Users size={18} />
            <span>
              {selectedIds.size === 0
                ? "0 alunos serão adicionados à turma"
                : `${selectedIds.size} ${
                    selectedIds.size === 1
                      ? "aluno será adicionado"
                      : "alunos serão adicionados"
                  } à turma`}
            </span>
          </FooterCounter>

          <FooterButtons>
            <CancelBtn onClick={onClose} disabled={isLoading} type="button">
              Cancelar
            </CancelBtn>
            <SubmitBtn
              onClick={handleSave}
              disabled={isLoading || levelsLoading}
              type="button"
            >
              <Plus size={16} strokeWidth={2.5} />
              {isLoading ? "Criando..." : "Criar turma"}
            </SubmitBtn>
          </FooterButtons>
        </ModalFooter>
      </ModalCard>
    </ModalOverlay>
  );
};

export default CreateClassModal;
