import React, { useCallback, useMemo } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  StudentsContext,
  type MutationCallbacks,
  type Student,
} from "./StudentsContext";
import type {
  IStudents,
  RegisterStudentParams,
  UpdateStudentParams,
} from "../../pages/TeacherDashboard/types";
import {
  desactive,
  listStudent,
  registerStudent,
  updateStudent as updateStudentService,
} from "../../pages/TeacherDashboard/services";

const STUDENTS_QUERY_KEY = ["studentsList"] as const;

const avatarColors = [
  "#3165e3",
  "#e67e22",
  "#8e44ad",
  "#1abc9c",
  "#e74c3c",
  "#2c3e50",
];

const toDateInputValue = (value: string | null) => value?.split("T")[0] ?? "";

const formatDate = (value: string) => {
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? value
    : date.toLocaleDateString("pt-BR");
};

const formatLevel = (levelId: number | null) =>
  levelId === null ? "Não definido" : `Nível ${levelId}`;

/** Converte o formato da API (IStudents) para o view-model consumido pela UI. */
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
  progress: Math.floor(Math.random() * 40) + 60,
});

export interface StudentsProviderProps {
  children: React.ReactNode;
}

const StudentsProvider: React.FC<StudentsProviderProps> = ({ children }) => {
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: STUDENTS_QUERY_KEY,
    queryFn: listStudent,
  });

  const rawStudents = useMemo(() => data?.students ?? [], [data]);

  const students = useMemo(() => rawStudents.map(toStudent), [rawStudents]);

  const invalidateStudents = useCallback(() => {
    void queryClient.invalidateQueries({ queryKey: STUDENTS_QUERY_KEY });
  }, [queryClient]);

  const registerMutation = useMutation({
    mutationFn: registerStudent,
    onSuccess: invalidateStudents,
  });

  const updateMutation = useMutation({
    mutationFn: ({
      userId,
      params,
    }: {
      userId: number;
      params: UpdateStudentParams;
    }) => updateStudentService(userId, params),
    onSuccess: invalidateStudents,
  });

  const deactivateMutation = useMutation({
    mutationFn: desactive,
    onSuccess: invalidateStudents,
  });

  const addStudent = useCallback(
    (params: RegisterStudentParams, callbacks?: MutationCallbacks) => {
      registerMutation.mutate(params, {
        onSuccess: () => callbacks?.onSuccess?.(),
        onError: () => callbacks?.onError?.(),
      });
    },
    [registerMutation],
  );

  const updateStudent = useCallback(
    (
      id: number,
      params: UpdateStudentParams,
      callbacks?: MutationCallbacks,
    ) => {
      updateMutation.mutate(
        { userId: id, params },
        {
          onSuccess: () => callbacks?.onSuccess?.(),
          onError: () => callbacks?.onError?.(),
        },
      );
    },
    [updateMutation],
  );

  const deactivateStudent = useCallback(
    (id: number, callbacks?: MutationCallbacks) => {
      deactivateMutation.mutate(id, {
        onSuccess: () => callbacks?.onSuccess?.(),
        onError: () => callbacks?.onError?.(),
      });
    },
    [deactivateMutation],
  );

  const getStudentById = useCallback(
    (id: number) => students.find((student) => student.id === id),
    [students],
  );

  const value = useMemo(
    () => ({
      rawStudents,
      students,
      isLoading,
      isError,
      addStudent,
      isAdding: registerMutation.isPending,
      updateStudent,
      isUpdating: updateMutation.isPending,
      deactivateStudent,
      isDeactivating: deactivateMutation.isPending,
      getStudentById,
    }),
    [
      rawStudents,
      students,
      isLoading,
      isError,
      addStudent,
      registerMutation.isPending,
      updateStudent,
      updateMutation.isPending,
      deactivateStudent,
      deactivateMutation.isPending,
      getStudentById,
    ],
  );

  return (
    <StudentsContext.Provider value={value}>
      {children}
    </StudentsContext.Provider>
  );
};

export default StudentsProvider;
