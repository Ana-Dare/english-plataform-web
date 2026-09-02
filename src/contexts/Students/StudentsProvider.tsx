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
} from "../../interfaces/students";
import {
  desactive,
  listStudent,
  registerStudent,
  updateStudent as updateStudentService,
} from "../../pages/TeacherDashboard/services/student";
import { listClasses } from "../../pages/TeacherDashboard/services/class";
import { listLevels } from "../../pages/TeacherDashboard/services/level";

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

const formatLevel = (
  levelId: number | null,
  levelMap?: Record<number, string>,
) => {
  if (levelId === null) return "Não definido";
  if (levelMap && levelMap[levelId]) {
    return levelMap[levelId];
  }
  return `Nível ${levelId}`;
};

const truncateText = (text: string, maxLength: number = 20) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
};

/** Converte o formato da API (IStudents) para o view-model consumido pela UI. */
const toStudent = (
  student: IStudents,
  classNameMap?: Record<number, string>,
  levelMap?: Record<number, string>,
): Student => {
  const classId = student.profile.classId;
  const turmaName = classId && classNameMap ? classNameMap[classId] : null;

  return {
    id: student.id,
    name: student.name,
    email: student.email,
    phone: student.phone ?? "",
    birthdate: toDateInputValue(student.birthdate),
    isActive: student.active,
    avatarColor: avatarColors[student.id % avatarColors.length],
    level: formatLevel(student.profile.levelId, levelMap),
    levelId: student.profile.levelId,
    plan: student.profile.vip ? 1 : 0,
    turma: turmaName ? truncateText(turmaName) : "Não atribuída",
    classId: classId,
    enrollDate: formatDate(student.createdAt),
    rawEnrollDate: student.createdAt,
    observations: student.profile.notes ?? "",
    progress: Math.floor(Math.random() * 40) + 60,
  };
};

export interface StudentsProviderProps {
  children: React.ReactNode;
}

const StudentsProvider: React.FC<StudentsProviderProps> = ({ children }) => {
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: STUDENTS_QUERY_KEY,
    queryFn: listStudent,
  });

  const { data: classesData } = useQuery({
    queryKey: ["classes"],
    queryFn: listClasses,
  });

  const { data: levelsData } = useQuery({
    queryKey: ["levels"],
    queryFn: listLevels,
  });

  const rawStudents = useMemo(() => data?.students ?? [], [data]);

  // Criar mapa de class_id -> nome da turma
  const classNameMap = useMemo(() => {
    const map: Record<number, string> = {};
    if (classesData?.classes) {
      classesData.classes.forEach((cls) => {
        map[cls.id] = cls.name;
      });
    }
    return map;
  }, [classesData]);

  // Criar mapa de level_id -> nome do nível
  const levelNameMap = useMemo(() => {
    const map: Record<number, string> = {};
    if (levelsData?.levels) {
      levelsData.levels.forEach((level) => {
        map[level.id] = level.name;
      });
    }
    return map;
  }, [levelsData]);

  // Mapear estudantes com os mapas de classes e níveis
  const students = useMemo(
    () =>
      rawStudents.map((student) =>
        toStudent(student, classNameMap, levelNameMap),
      ),
    [rawStudents, classNameMap, levelNameMap],
  );

  const invalidateStudents = useCallback(() => {
    void queryClient.invalidateQueries({ queryKey: STUDENTS_QUERY_KEY });
  }, [queryClient]);

  const registerMutation = useMutation({
    mutationFn: ({
      params,
      photoBlob,
    }: {
      params: RegisterStudentParams;
      photoBlob?: Blob;
    }) => registerStudent(params, photoBlob),
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
    (
      params: RegisterStudentParams,
      callbacks?: MutationCallbacks | Blob,
      callbacks2?: MutationCallbacks,
    ) => {
      // Suportar ambos os casos: (params, callbacks) e (params, photoBlob, callbacks)
      let photoBlob: Blob | undefined;
      let finalCallbacks: MutationCallbacks | undefined;

      if (callbacks instanceof Blob) {
        photoBlob = callbacks;
        finalCallbacks = callbacks2;
      } else {
        finalCallbacks = callbacks;
      }

      registerMutation.mutate(
        { params, photoBlob },
        {
          onSuccess: (response) => {
            finalCallbacks?.onSuccess?.({ student_id: response.student_id });
          },
          onError: () => finalCallbacks?.onError?.(),
        },
      );
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
          onSuccess: () => callbacks?.onSuccess?.({ student_id: id }),
          onError: () => callbacks?.onError?.(),
        },
      );
    },
    [updateMutation],
  );

  const deactivateStudent = useCallback(
    (id: number, callbacks?: MutationCallbacks) => {
      deactivateMutation.mutate(id, {
        onSuccess: () => callbacks?.onSuccess?.({ student_id: id }),
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
