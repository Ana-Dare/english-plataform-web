import { createContext } from "react";
import type {
  Class,
  CreateClassParams,
} from "../../interfaces/classes";

/**
 * View-model de turma usado pela UI (derivado de Class).
 */
export interface ClassViewModel extends Class {
  teacherName?: string;
  levelName?: string;
  studentCount?: number;
}

/** Callbacks opcionais para reagir ao resultado de uma operação assíncrona. */
export interface ClassMutationCallbacks {
  onSuccess?: (data: { id: number }) => void;
  onError?: () => void;
}

export interface IClassesContext {
  /** Fonte de dados bruta (formato da API). */
  rawClasses: Class[];
  /** Lista derivada no formato consumido pela UI. */
  classes: ClassViewModel[];
  /** Carregando a lista inicial de turmas. */
  isLoading: boolean;
  /** Erro ao carregar a lista de turmas. */
  isError: boolean;

  /** Cria uma nova turma (persiste via API). */
  addClass: (
    params: CreateClassParams,
    callbacks?: ClassMutationCallbacks,
  ) => void;
  /** Indica criação em andamento. */
  isAdding: boolean;

  /** Deleta uma turma (persiste via API). */
  deleteClass: (id: number, callbacks?: ClassMutationCallbacks) => void;
  /** Indica deleção em andamento. */
  isDeleting: boolean;

  /** Recupera uma turma pelo id (formato de UI). */
  getClassById: (id: number) => ClassViewModel | undefined;
}

export const ClassesContext = createContext<IClassesContext>(
  {} as IClassesContext,
);
