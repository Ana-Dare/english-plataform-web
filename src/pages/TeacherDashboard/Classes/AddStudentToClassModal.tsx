/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  UserPlus,
  Users,
  Search,
  Check,
  Plus,
  Mail,
  GraduationCap,
} from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useToast from "../../../contexts/Toast/useToast";
import { useStudents } from "../../../contexts/Students/hooks/useStudents";
import { addStudentToClass } from "../services/class";

interface AddStudentToClassModalProps {
  isOpen: boolean;
  onClose: () => void;
  classData: {
    id?: number;
    name?: string;
    level_id?: number;
    [key: string]: any;
  };
  currentStudents: {
    id: number;
    name: string;
    email?: string;
  }[];
  onStudentEnrolled: (student: {
    id: number;
    name: string;
    email: string;
    phone?: string;
    gender?: string;
    level?: string;
    turma?: string;
    isActive?: boolean;
    color?: string;
  }) => void;
  onNavigateToRegister?: () => void;
}

const getInitials = (name: string) => {
  const parts = name.trim().split(" ").filter(Boolean);
  if (parts.length === 0) return "A";
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
};

export const AddStudentToClassModal: React.FC<AddStudentToClassModalProps> = ({
  isOpen,
  onClose,
  classData,
  currentStudents,
  onStudentEnrolled,
  onNavigateToRegister,
}) => {
  const { addToast } = useToast();
  const { students, updateStudent } = useStudents();
  const queryClient = useQueryClient();
  const enrollMutation = useMutation({
    mutationFn: async (payload: { classId: number; studentIds: number[] }) => {
      await Promise.all(
        payload.studentIds.map((studentId) =>
          addStudentToClass(payload.classId, studentId),
        ),
      );
    },
    onSuccess: (_data, variables) => {
      void queryClient.invalidateQueries({
        queryKey: ["classStudents", variables.classId],
      });
      void queryClient.invalidateQueries({ queryKey: ["classesList"] });
      void queryClient.invalidateQueries({ queryKey: ["studentsList"] });
    },
  });

  const [searchExisting, setSearchExisting] = useState("");
  const [selectedExistingIds, setSelectedExistingIds] = useState<number[]>([]);

  const targetClassName = classData.name || "Turma";
  const targetClassId = classData.id && classData.id > 0 ? classData.id : null;

  // Resetar ao abrir
  useEffect(() => {
    if (isOpen) {
      setSelectedExistingIds([]);
      setSearchExisting("");
    }
  }, [isOpen]);

  // Alunos existentes disponíveis para vincular (que ainda não estão nesta turma)
  const availableExistingStudents = useMemo(() => {
    return students.filter((s) => {
      const alreadyIn = currentStudents.some(
        (cs) =>
          cs.id === s.id ||
          cs.name.toLowerCase() === s.name.toLowerCase() ||
          (cs.email &&
            s.email &&
            cs.email.toLowerCase() === s.email.toLowerCase()),
      );
      return !alreadyIn;
    });
  }, [students, currentStudents]);

  const filteredExistingStudents = useMemo(() => {
    if (!searchExisting.trim()) return availableExistingStudents;
    const q = searchExisting.toLowerCase().trim();
    return availableExistingStudents.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.email.toLowerCase().includes(q) ||
        (s.phone && s.phone.includes(q)),
    );
  }, [availableExistingStudents, searchExisting]);

  const toggleSelectExisting = (id: number) => {
    setSelectedExistingIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const handleSelectAllFiltered = () => {
    const ids = filteredExistingStudents.map((s) => s.id);
    const allSelected = ids.every((id) => selectedExistingIds.includes(id));
    if (allSelected) {
      setSelectedExistingIds((prev) => prev.filter((id) => !ids.includes(id)));
    } else {
      setSelectedExistingIds((prev) => Array.from(new Set([...prev, ...ids])));
    }
  };

  const handleLinkExistingStudents = async () => {
    if (selectedExistingIds.length === 0 || !targetClassId) {
      addToast("Selecione ao menos um aluno e uma turma válida.", "warning");
      return;
    }

    const toLink = availableExistingStudents.filter((s) =>
      selectedExistingIds.includes(s.id),
    );
    const missingAcademicId = toLink.filter((std) => !std.studentId);
    if (missingAcademicId.length > 0) {
      addToast(
        "Não foi possível identificar o perfil acadêmico de um dos alunos.",
        "error",
      );
      return;
    }

    enrollMutation.mutate(
      {
        classId: targetClassId,
        studentIds: toLink.map((std) => std.studentId!),
      },
      {
        onSuccess: () => {
          toLink.forEach((std) => {
            updateStudent(std.id, { class_id: targetClassId });
            onStudentEnrolled({
              id: std.id,
              name: std.name,
              email: std.email,
              phone: std.phone,
              level: std.level,
              turma: targetClassName,
              isActive: std.isActive,
              color: std.avatarColor,
            });
          });
          addToast(
            `${toLink.length} aluno${toLink.length > 1 ? "s" : ""} vinculado${toLink.length > 1 ? "s" : ""} com sucesso à turma!`,
            "success",
          );
          onClose();
        },
        onError: () => {
          addToast(
            "Não foi possível vincular os alunos à turma. Tente novamente.",
            "error",
          );
        },
      },
    );
  };

  const handleGoToOfficialRegister = () => {
    onClose();
    if (onNavigateToRegister) {
      onNavigateToRegister();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <ModalOverlay
        as={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <ModalCard
          as={motion.div}
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 16 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Cabeçalho */}
          <ModalHeader>
            <HeaderLeft>
              <TitleRow>
                <HeaderIconWrap>
                  <GraduationCap size={20} />
                </HeaderIconWrap>
                <div>
                  <ModalTitle>Adicionar Aluno à Turma</ModalTitle>
                  <ModalSubtitle>
                    Turma: <strong>{targetClassName}</strong> •{" "}
                    <span>Selecione alunos existentes ou cadastre um novo</span>
                  </ModalSubtitle>
                </div>
              </TitleRow>
            </HeaderLeft>

            <CloseButton type="button" onClick={onClose} title="Fechar modal">
              <X size={18} />
            </CloseButton>
          </ModalHeader>

          {/* Barra de Ações Rápidas: Busca + Botão Cadastrar Novo Aluno */}
          <TopActionBar>
            <SearchBox>
              <Search size={16} />
              <input
                type="text"
                placeholder="Buscar aluno por nome, e-mail ou telefone..."
                value={searchExisting}
                onChange={(e) => setSearchExisting(e.target.value)}
                autoFocus
              />
              {searchExisting && (
                <ClearSearchBtn
                  type="button"
                  onClick={() => setSearchExisting("")}
                >
                  <X size={14} />
                </ClearSearchBtn>
              )}
            </SearchBox>

            <TopButtonsGroup>
              <NewStudentButton
                type="button"
                onClick={handleGoToOfficialRegister}
                title="Abrir o cadastro oficial de novo aluno"
              >
                <UserPlus size={15} /> Cadastrar Novo Aluno
              </NewStudentButton>

              {filteredExistingStudents.length > 0 && (
                <SelectAllBtn
                  type="button"
                  onClick={handleSelectAllFiltered}
                  title="Marcar ou desmarcar todos os alunos da lista"
                >
                  {filteredExistingStudents.every((s) =>
                    selectedExistingIds.includes(s.id),
                  )
                    ? "Desmarcar todos"
                    : "Marcar todos"}
                </SelectAllBtn>
              )}
            </TopButtonsGroup>
          </TopActionBar>

          {/* Corpo do Modal: Apenas Alunos Existentes para Vincular */}
          <ModalBody>
            {filteredExistingStudents.length === 0 ? (
              <EmptyExistingNotice>
                <Users size={36} />
                <strong>Nenhum aluno disponível para vincular</strong>
                <p>
                  {searchExisting
                    ? "Nenhum aluno encontrado correspondente à sua busca."
                    : "Todos os alunos cadastrados na plataforma já estão vinculados a esta turma."}
                </p>
                <EmptyRegisterBtn
                  type="button"
                  onClick={handleGoToOfficialRegister}
                >
                  <UserPlus size={16} /> Cadastrar Novo Aluno
                </EmptyRegisterBtn>
              </EmptyExistingNotice>
            ) : (
              <ExistingStudentsGrid>
                {filteredExistingStudents.map((std) => {
                  const isSelected = selectedExistingIds.includes(std.id);
                  return (
                    <ExistingStudentCard
                      key={std.id}
                      $selected={isSelected}
                      onClick={() => toggleSelectExisting(std.id)}
                    >
                      <SelectionCheckmark $selected={isSelected}>
                        {isSelected && <Check size={13} strokeWidth={3} />}
                      </SelectionCheckmark>

                      <StudentCardAvatar
                        style={{
                          backgroundColor: std.avatarColor || "#2563eb",
                        }}
                      >
                        {getInitials(std.name)}
                      </StudentCardAvatar>

                      <StudentCardInfo>
                        <span className="name">{std.name}</span>
                        <span className="email">
                          <Mail size={12} /> {std.email}
                        </span>
                        <span className="badge">
                          {std.level || "Básico"} • {std.turma || "Sem turma"}
                        </span>
                      </StudentCardInfo>
                    </ExistingStudentCard>
                  );
                })}
              </ExistingStudentsGrid>
            )}
          </ModalBody>

          {/* Rodapé com Contador e Botões */}
          <ModalFooter>
            <FooterActionsRow>
              <SelectedCounter>
                {selectedExistingIds.length === 0 ? (
                  <span style={{ color: "#64748b" }}>
                    Selecione um ou mais alunos para vincular à turma
                  </span>
                ) : (
                  <>
                    <strong>{selectedExistingIds.length}</strong>{" "}
                    {selectedExistingIds.length === 1
                      ? "aluno selecionado"
                      : "alunos selecionados"}
                  </>
                )}
              </SelectedCounter>

              <div style={{ display: "flex", gap: "0.75rem" }}>
                <SecondaryButton type="button" onClick={onClose}>
                  Cancelar
                </SecondaryButton>
                <PrimaryButton
                  type="button"
                  onClick={handleLinkExistingStudents}
                  disabled={
                    selectedExistingIds.length === 0 || enrollMutation.isPending
                  }
                >
                  <Plus size={16} />{" "}
                  {enrollMutation.isPending ? "Vinculando..." : "Vincular à Turma"}
                </PrimaryButton>
              </div>
            </FooterActionsRow>
          </ModalFooter>
        </ModalCard>
      </ModalOverlay>
    </AnimatePresence>
  );
};

export default AddStudentToClassModal;

/* ====== STYLED COMPONENTS ====== */

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.55);
  backdrop-filter: blur(4px);
  z-index: 1200;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  box-sizing: border-box;

  @media (max-width: 640px) {
    padding: 0.5rem;
  }
`;

const ModalCard = styled.div`
  background: #ffffff;
  border-radius: 20px;
  width: 100%;
  max-width: 820px;
  max-height: 88vh;
  box-shadow: 0 25px 60px rgba(15, 23, 42, 0.25);
  border: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-sizing: border-box;

  @media (max-width: 640px) {
    border-radius: 16px;
    max-height: 94vh;
  }
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.15rem 1.5rem;
  background: linear-gradient(180deg, #f8fafc 0%, #ffffff 100%);
  border-bottom: 1px solid #e2e8f0;
  flex-shrink: 0;

  @media (max-width: 640px) {
    padding: 1rem;
  }
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  min-width: 0;
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.85rem;
`;

const HeaderIconWrap = styled.div`
  width: 42px;
  height: 42px;
  border-radius: 12px;
  background: #08142c;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(8, 20, 44, 0.15);
`;

const ModalTitle = styled.h2`
  margin: 0;
  font-size: 1.25rem;
  font-weight: 700;
  color: #08142c;
  line-height: 1.3;

  @media (max-width: 640px) {
    font-size: 1.1rem;
  }
`;

const ModalSubtitle = styled.p`
  margin: 0.2rem 0 0;
  font-size: 0.825rem;
  color: #64748b;

  strong {
    color: #1e293b;
    font-weight: 600;
  }
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #64748b;
  transition: all 0.2s ease;
  flex-shrink: 0;

  &:hover {
    background: #f1f5f9;
    color: #08142c;
  }
`;

const TopActionBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 0.9rem 1.5rem;
  background: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
  flex-wrap: wrap;

  @media (max-width: 640px) {
    padding: 0.75rem 1rem;
  }
`;

const SearchBox = styled.div`
  flex: 1;
  min-width: 240px;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.65rem 1rem;
  background: #ffffff;
  border: 1px solid #cbd5e1;
  border-radius: 10px;
  transition: all 0.2s ease;

  &:focus-within {
    border-color: #08142c;
    box-shadow: 0 0 0 3px rgba(8, 20, 44, 0.08);
  }

  input {
    border: none;
    outline: none;
    background: transparent;
    font-size: 0.875rem;
    color: #1e293b;
    width: 100%;
    font-family: inherit;

    &::placeholder {
      color: #94a3b8;
    }
  }

  svg {
    color: #64748b;
    flex-shrink: 0;
  }
`;

const ClearSearchBtn = styled.button`
  background: none;
  border: none;
  color: #94a3b8;
  cursor: pointer;
  padding: 2px;
  display: flex;
  align-items: center;

  &:hover {
    color: #1e293b;
  }
`;

const TopButtonsGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  flex-wrap: wrap;

  @media (max-width: 640px) {
    width: 100%;
    justify-content: stretch;

    button {
      flex: 1;
    }
  }
`;

const NewStudentButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.45rem;
  padding: 0.65rem 1.05rem;
  background: #08142c;
  color: #ffffff;
  border: none;
  border-radius: 9px;
  font-size: 0.84rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  box-shadow: 0 2px 8px rgba(8, 20, 44, 0.15);

  &:hover {
    background: #112347;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(8, 20, 44, 0.22);
  }
`;

const SelectAllBtn = styled.button`
  background: #ffffff;
  border: 1px solid #cbd5e1;
  border-radius: 9px;
  padding: 0.65rem 0.9rem;
  font-size: 0.84rem;
  font-weight: 600;
  color: #475569;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;

  &:hover {
    background: #f1f5f9;
    color: #08142c;
    border-color: #94a3b8;
  }
`;

const ModalBody = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1.25rem 1.5rem;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;

  @media (max-width: 640px) {
    padding: 0.85rem 1rem;
  }
`;

const EmptyExistingNotice = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 3rem 1.5rem;
  background: #f8fafc;
  border-radius: 14px;
  border: 1px dashed #cbd5e1;
  color: #64748b;
  margin: auto;
  width: 100%;
  box-sizing: border-box;

  svg {
    color: #94a3b8;
    margin-bottom: 0.75rem;
  }

  strong {
    color: #1e293b;
    font-size: 1rem;
    margin-bottom: 0.35rem;
  }

  p {
    font-size: 0.85rem;
    margin: 0 0 1.25rem;
    max-width: 440px;
    line-height: 1.5;
  }
`;

const EmptyRegisterBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.7rem 1.25rem;
  background: #08142c;
  color: #ffffff;
  border: none;
  border-radius: 9px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #112347;
    transform: translateY(-1px);
  }
`;

const ExistingStudentsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 0.75rem;
  overflow-y: auto;
  padding-right: 4px;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 4px;
  }
`;

const ExistingStudentCard = styled.div<{ $selected: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.85rem 1rem;
  border-radius: 12px;
  border: 1.5px solid
    ${({ $selected }) => ($selected ? "#08142c" : "#e2e8f0")};
  background: ${({ $selected }) => ($selected ? "#f8fafc" : "#ffffff")};
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;

  &:hover {
    border-color: ${({ $selected }) => ($selected ? "#08142c" : "#94a3b8")};
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
  }
`;

const SelectionCheckmark = styled.div<{ $selected: boolean }>`
  width: 20px;
  height: 20px;
  border-radius: 6px;
  border: 1.5px solid
    ${({ $selected }) => ($selected ? "#08142c" : "#cbd5e1")};
  background: ${({ $selected }) => ($selected ? "#08142c" : "transparent")};
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.15s ease;
`;

const StudentCardAvatar = styled.div`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  color: #ffffff;
  font-weight: 700;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const StudentCardInfo = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
  flex: 1;

  .name {
    font-size: 0.875rem;
    font-weight: 600;
    color: #0f172a;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .email {
    font-size: 0.75rem;
    color: #64748b;
    display: flex;
    align-items: center;
    gap: 0.35rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-top: 1px;
  }

  .badge {
    font-size: 0.7rem;
    font-weight: 500;
    color: #2563eb;
    margin-top: 3px;
  }
`;

const ModalFooter = styled.div`
  padding: 1rem 1.5rem;
  background: #f8fafc;
  border-top: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-shrink: 0;

  @media (max-width: 640px) {
    padding: 0.85rem 1rem;
  }
`;

const FooterActionsRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 1rem;
  flex-wrap: wrap;

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const SelectedCounter = styled.div`
  font-size: 0.85rem;
  color: #64748b;
  display: flex;
  align-items: center;
  gap: 0.4rem;

  strong {
    color: #08142c;
  }
`;

const PrimaryButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.7rem 1.35rem;
  background: #08142c;
  color: #ffffff;
  border: none;
  border-radius: 10px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px rgba(8, 20, 44, 0.15);

  &:hover:not(:disabled) {
    background: #112347;
    transform: translateY(-1px);
    box-shadow: 0 6px 16px rgba(8, 20, 44, 0.22);
  }

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }

  @media (max-width: 640px) {
    width: 100%;
    padding: 0.8rem 1rem;
  }
`;

const SecondaryButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.7rem 1.15rem;
  background: #ffffff;
  color: #475569;
  border: 1px solid #cbd5e1;
  border-radius: 10px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #f1f5f9;
    color: #08142c;
    border-color: #94a3b8;
  }

  @media (max-width: 640px) {
    width: 100%;
    padding: 0.8rem 1rem;
  }
`;
