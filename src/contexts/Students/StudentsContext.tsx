import { createContext } from "react";
import type {
  IStudents,
  RegisterStudentParams,
  UpdateStudentParams,
} from "../../interfaces/students";

/**
 * View-model de aluno usado pela UI (derivado de IStudents).
 * Centraliza o formato consumido pelas telas do dashboard.
 */
export interface Student {
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

/** Callbacks opcionais para reagir ao resultado de uma operação assíncrona. */
export interface MutationCallbacks {
  onSuccess?: (data: { student_id: number }) => void;
  onError?: () => void;
}

export interface IStudentsContext {
  /** Fonte de dados bruta (formato da API). */
  rawStudents: IStudents[];
  /** Lista derivada no formato consumido pela UI. */
  students: Student[];
  /** Carregando a lista inicial de alunos. */
  isLoading: boolean;
  /** Erro ao carregar a lista de alunos. */
  isError: boolean;

  /** Cadastra um novo aluno (persiste via API). */
  addStudent: (
    params: RegisterStudentParams,
    callbacks?: MutationCallbacks,
  ) => void;
  /** Indica cadastro em andamento. */
  isAdding: boolean;

  /** Atualiza os dados de um aluno existente (persiste via API). */
  updateStudent: (
    id: number,
    params: UpdateStudentParams,
    callbacks?: MutationCallbacks,
  ) => void;
  /** Indica atualização em andamento. */
  isUpdating: boolean;

  /** Desativa um aluno (persiste via API). */
  deactivateStudent: (id: number, callbacks?: MutationCallbacks) => void;
  /** Indica desativação em andamento. */
  isDeactivating: boolean;

  /** Recupera um aluno pelo id (formato de UI). */
  getStudentById: (id: number) => Student | undefined;
}

export const StudentsContext = createContext<IStudentsContext>(
  {} as IStudentsContext,
);
