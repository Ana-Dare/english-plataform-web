import React, { useCallback, useMemo } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ClassesContext,
  type ClassViewModel,
  type IClassesContext,
  type ClassMutationCallbacks,
} from "./ClassesContext";
import type {
  Class,
  CreateClassParams,
} from "../../interfaces/classes";
import {
  createClass,
  listClasses,
  deleteClass as deleteClassService,
} from "../../pages/TeacherDashboard/services/class";

const CLASSES_QUERY_KEY = ["classesList"] as const;

export interface ClassesProviderProps {
  children: React.ReactNode;
}

/**
 * Provider que gerencia o estado de turmas usando React Query + useMutation.
 * Centraliza requisições à API e sincronização de cache.
 */
export default function ClassesProvider({ children }: ClassesProviderProps) {
  const queryClient = useQueryClient();

  /** Invalida o cache de turmas, forçando nova busca. */
  const invalidateClasses = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: CLASSES_QUERY_KEY });
  }, [queryClient]);

  // Busca inicial de turmas
  const {
    data = { classes: [] },
    isLoading,
    isError,
  } = useQuery({
    queryKey: CLASSES_QUERY_KEY,
    queryFn: listClasses,
  });

  const rawClasses = data.classes ?? [];

  // Transforma dados brutos em view-model
  const classes: ClassViewModel[] = useMemo(() => {
    return rawClasses.map((cls: Class) => ({
      ...cls,
    }));
  }, [rawClasses]);

  // Mutation para criar turma
  const createMutation = useMutation({
    mutationFn: (params: CreateClassParams) => createClass(params),
    onSuccess: invalidateClasses,
  });

  // Mutation para deletar turma
  const deleteMutation = useMutation({
    mutationFn: deleteClassService,
    onSuccess: invalidateClasses,
  });

  // Callback para adicionar turma
  const addClass = useCallback(
    (params: CreateClassParams, callbacks?: ClassMutationCallbacks) => {
      createMutation.mutate(params, {
        onSuccess: (data) => {
          callbacks?.onSuccess?.({ id: data.id });
        },
        onError: () => {
          callbacks?.onError?.();
        },
      });
    },
    [createMutation],
  );

  // Callback para deletar turma
  const deleteClass = useCallback(
    (id: number, callbacks?: ClassMutationCallbacks) => {
      deleteMutation.mutate(id, {
        onSuccess: () => {
          callbacks?.onSuccess?.({ id });
        },
        onError: () => {
          callbacks?.onError?.();
        },
      });
    },
    [deleteMutation],
  );

  // Recupera turma pelo id
  const getClassById = useCallback(
    (id: number) => classes.find((cls) => cls.id === id),
    [classes],
  );

  const value: IClassesContext = {
    rawClasses,
    classes,
    isLoading,
    isError,
    addClass,
    isAdding: createMutation.isPending,
    deleteClass,
    isDeleting: deleteMutation.isPending,
    getClassById,
  };

  return (
    <ClassesContext.Provider value={value}>
      {children}
    </ClassesContext.Provider>
  );
}
