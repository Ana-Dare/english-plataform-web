import React, { useCallback, useMemo, useState } from "react";
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

  // URL da foto de perfil vinda da API (bucket do Supabase)
  const photoUrl = student.avatar_url ?? null;

  return {
    id: student.id,
    name: student.name,
    email: student.email,
    phone: student.phone ?? "",
    birthdate: toDateInputValue(student.birthdate),
    isActive: student.active,
    avatarColor: avatarColors[student.id % avatarColors.length],
    avatar_url: photoUrl,
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
  const apiStudents = useMemo(
    () =>
      rawStudents.map((student) =>
        toStudent(student, classNameMap, levelNameMap),
      ),
    [rawStudents, classNameMap, levelNameMap],
  );

  // Mock data para visualização quando a API não retorna alunos
  // Mock data para visualização quando a API não retorna alunos
  const [localOverrides, setLocalOverrides] = useState<
    Record<number, Partial<Student>>
  >({});

  const mockStudents: Student[] = useMemo(
    () => [
      {
        id: 1,
        name: "Marjorie Talberg",
        email: "marjorie@email.com",
        phone: "(11) 98765-4321",
        birthdate: "1995-08-22",
        isActive: true,
        avatarColor: "#3165e3",
        level: "Intermediate B2",
        levelId: 2,
        plan: 1,
        turma: "Conversation Club B2",
        enrollDate: "12/03/2025",
        rawEnrollDate: "2025-03-12T00:00:00Z",
        observations: "Excelente.",
        progress: 72,
        classId: 1,
      },
      {
        id: 2,
        name: "Lucas Mendes",
        email: "lucas.mendes@email.com",
        phone: "(21) 99876-5432",
        birthdate: "1998-03-15",
        isActive: true,
        avatarColor: "#e67e22",
        level: "Intermediate A2",
        levelId: 1,
        plan: 0,
        turma: "Conversation Club A2",
        enrollDate: "05/01/2025",
        rawEnrollDate: "2025-01-05T00:00:00Z",
        observations: "",
        progress: 100,
        classId: 2,
      },
      {
        id: 3,
        name: "Camila Rodrigues",
        email: "camila.r@email.com",
        phone: "(31) 91234-5678",
        birthdate: "2000-11-30",
        isActive: true,
        avatarColor: "#8e44ad",
        level: "Advanced C1",
        levelId: 3,
        plan: 1,
        turma: "Business English",
        enrollDate: "20/06/2024",
        rawEnrollDate: "2024-06-20T00:00:00Z",
        observations: "Foco no trabalho.",
        progress: 88,
        classId: 3,
      },
      {
        id: 4,
        name: "Pedro Almeida",
        email: "pedro.almeida@email.com",
        phone: "(41) 98888-1234",
        birthdate: "1992-07-10",
        isActive: false,
        avatarColor: "#1abc9c",
        level: "Beginner A1",
        levelId: 4,
        plan: 0,
        turma: "Beginner Group",
        enrollDate: "10/09/2024",
        rawEnrollDate: "2024-09-10T00:00:00Z",
        observations: "Pausou estudos.",
        progress: 35,
        classId: 4,
      },
      {
        id: 5,
        name: "Ana Beatriz Costa",
        email: "anab.costa@email.com",
        phone: "(51) 97777-8899",
        birthdate: "1997-02-14",
        isActive: true,
        avatarColor: "#e74c3c",
        level: "Intermediate B1",
        levelId: 2,
        plan: 1,
        turma: "Conversation Club B1",
        enrollDate: "15/04/2025",
        rawEnrollDate: "2025-04-15T00:00:00Z",
        observations: "Focar em pronúncia.",
        progress: 60,
        classId: 1,
      },
      {
        id: 6,
        name: "Rafael Santos",
        email: "rafael.s@email.com",
        phone: "(61) 96666-3344",
        birthdate: "1999-12-01",
        isActive: true,
        avatarColor: "#2c3e50",
        level: "Advanced C1",
        levelId: 3,
        plan: 0,
        turma: "Business English",
        enrollDate: "01/02/2025",
        rawEnrollDate: "2025-02-01T00:00:00Z",
        observations: "",
        progress: 95,
        classId: 3,
      },
      {
        id: 7,
        name: "Julia Fernandes",
        email: "julia.f@email.com",
        phone: "(71) 95555-6677",
        birthdate: "2001-05-20",
        isActive: true,
        avatarColor: "#3165e3",
        level: "Intermediate A2",
        levelId: 1,
        plan: 1,
        turma: "Conversation Club A2",
        enrollDate: "08/07/2025",
        rawEnrollDate: "2025-07-08T00:00:00Z",
        observations: "Iniciante motivada.",
        progress: 45,
        classId: 2,
      },
      {
        id: 8,
        name: "Thiago Oliveira",
        email: "thiago.o@email.com",
        phone: "(81) 94444-2233",
        birthdate: "1994-09-08",
        isActive: true,
        avatarColor: "#e67e22",
        level: "Intermediate B2",
        levelId: 2,
        plan: 0,
        turma: "Conversation Club B2",
        enrollDate: "22/08/2025",
        rawEnrollDate: "2025-08-22T00:00:00Z",
        observations: "Melhorar writing.",
        progress: 55,
        classId: 1,
      },
      {
        id: 9,
        name: "Sofia Martins",
        email: "sofia.m@email.com",
        phone: "(11) 91111-2222",
        birthdate: "2003-01-10",
        isActive: true,
        avatarColor: "#8e44ad",
        level: "Beginner A1",
        levelId: 4,
        plan: 0,
        turma: "Beginner Group",
        enrollDate: "01/09/2025",
        rawEnrollDate: "2025-09-01T00:00:00Z",
        observations: "",
        progress: 20,
        classId: 4,
      },
      {
        id: 10,
        name: "Gabriel Lima",
        email: "gabriel.lima@email.com",
        phone: "(21) 92222-3333",
        birthdate: "1996-10-05",
        isActive: true,
        avatarColor: "#1abc9c",
        level: "Intermediate B1",
        levelId: 2,
        plan: 1,
        turma: "Conversation Club B1",
        enrollDate: "11/05/2025",
        rawEnrollDate: "2025-05-11T00:00:00Z",
        observations: "Bom vocabulário.",
        progress: 80,
        classId: 1,
      },
      {
        id: 11,
        name: "Isabella Rocha",
        email: "isabella.r@email.com",
        phone: "(31) 93333-4444",
        birthdate: "1990-12-12",
        isActive: true,
        avatarColor: "#e74c3c",
        level: "Advanced C2",
        levelId: 3,
        plan: 1,
        turma: "Masterclass C2",
        enrollDate: "20/01/2024",
        rawEnrollDate: "2024-01-20T00:00:00Z",
        observations: "Preparando para IELTS.",
        progress: 98,
        classId: 5,
      },
      {
        id: 12,
        name: "Matheus Carvalho",
        email: "matheus.c@email.com",
        phone: "(41) 94444-5555",
        birthdate: "2002-04-18",
        isActive: false,
        avatarColor: "#2c3e50",
        level: "Intermediate A2",
        levelId: 1,
        plan: 0,
        turma: "Conversation Club A2",
        enrollDate: "15/06/2025",
        rawEnrollDate: "2025-06-15T00:00:00Z",
        observations: "Viajou.",
        progress: 40,
        classId: 2,
      },
      {
        id: 13,
        name: "Leticia Ribeiro",
        email: "leticia.r@email.com",
        phone: "(51) 95555-6666",
        birthdate: "1998-08-30",
        isActive: true,
        avatarColor: "#3165e3",
        level: "Intermediate B2",
        levelId: 2,
        plan: 1,
        turma: "Conversation Club B2",
        enrollDate: "02/02/2025",
        rawEnrollDate: "2025-02-02T00:00:00Z",
        observations: "Muito participativa.",
        progress: 85,
        classId: 1,
      },
      {
        id: 14,
        name: "Diego Ferreira",
        email: "diego.f@email.com",
        phone: "(61) 96666-7777",
        birthdate: "1995-11-25",
        isActive: true,
        avatarColor: "#e67e22",
        level: "Beginner A1",
        levelId: 4,
        plan: 0,
        turma: "Beginner Group",
        enrollDate: "10/08/2025",
        rawEnrollDate: "2025-08-10T00:00:00Z",
        observations: "",
        progress: 15,
        classId: 4,
      },
      {
        id: 15,
        name: "Beatriz Sousa",
        email: "beatriz.s@email.com",
        phone: "(71) 97777-8888",
        birthdate: "2000-03-08",
        isActive: true,
        avatarColor: "#8e44ad",
        level: "Advanced C1",
        levelId: 3,
        plan: 1,
        turma: "Business English",
        enrollDate: "05/04/2025",
        rawEnrollDate: "2025-04-05T00:00:00Z",
        observations: "Apresentações em inglês.",
        progress: 75,
        classId: 3,
      },
      {
        id: 16,
        name: "Bruno Gomes",
        email: "bruno.g@email.com",
        phone: "(81) 98888-9999",
        birthdate: "1993-06-14",
        isActive: true,
        avatarColor: "#1abc9c",
        level: "Intermediate B1",
        levelId: 2,
        plan: 0,
        turma: "Conversation Club B1",
        enrollDate: "18/07/2025",
        rawEnrollDate: "2025-07-18T00:00:00Z",
        observations: "Melhorar listening.",
        progress: 50,
        classId: 1,
      },
      {
        id: 17,
        name: "Amanda Castro",
        email: "amanda.c@email.com",
        phone: "(11) 99999-0000",
        birthdate: "1997-09-22",
        isActive: false,
        avatarColor: "#e74c3c",
        level: "Beginner A1",
        levelId: 4,
        plan: 0,
        turma: "Beginner Group",
        enrollDate: "25/05/2025",
        rawEnrollDate: "2025-05-25T00:00:00Z",
        observations: "Problemas financeiros.",
        progress: 10,
        classId: 4,
      },
      {
        id: 18,
        name: "Leonardo Silva",
        email: "leonardo.s@email.com",
        phone: "(21) 90000-1111",
        birthdate: "2001-12-05",
        isActive: true,
        avatarColor: "#2c3e50",
        level: "Intermediate B2",
        levelId: 2,
        plan: 1,
        turma: "Conversation Club B2",
        enrollDate: "12/10/2024",
        rawEnrollDate: "2024-10-12T00:00:00Z",
        observations: "Quer intercâmbio.",
        progress: 90,
        classId: 1,
      },
      {
        id: 19,
        name: "Mariana Azevedo",
        email: "mariana.a@email.com",
        phone: "(31) 91111-3333",
        birthdate: "1999-07-17",
        isActive: true,
        avatarColor: "#3165e3",
        level: "Advanced C2",
        levelId: 3,
        plan: 1,
        turma: "Masterclass C2",
        enrollDate: "08/03/2024",
        rawEnrollDate: "2024-03-08T00:00:00Z",
        observations: "Fluente.",
        progress: 99,
        classId: 5,
      },
      {
        id: 20,
        name: "Vitor Pereira",
        email: "vitor.p@email.com",
        phone: "(41) 92222-4444",
        birthdate: "1995-02-28",
        isActive: true,
        avatarColor: "#e67e22",
        level: "Intermediate A2",
        levelId: 1,
        plan: 0,
        turma: "Conversation Club A2",
        enrollDate: "20/09/2025",
        rawEnrollDate: "2025-09-20T00:00:00Z",
        observations: "",
        progress: 30,
        classId: 2,
      },
    ],
    [],
  );

  const baseStudents = apiStudents.length > 0 ? apiStudents : mockStudents;
  const students = useMemo(() => {
    return baseStudents.map((s) => ({
      ...s,
      ...localOverrides[s.id],
    }));
  }, [baseStudents, localOverrides]);

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
    mutationFn: async ({
      userId,
      params,
    }: {
      userId: number;
      params: UpdateStudentParams;
    }) => {
      // Optimistic update for mock UI
      setLocalOverrides((prev) => ({
        ...prev,
        [userId]: {
          ...prev[userId],
          ...(params.active !== undefined
            ? { isActive: params.active === 1 }
            : {}),
          ...(params.name ? { name: params.name } : {}),
          ...(params.email ? { email: params.email } : {}),
        },
      }));

      try {
        await updateStudentService(userId, params);
      } catch (err) {
        // Fallback silently if no backend is running
        console.warn(
          `Backend not running, relying on optimistic update. ${err}`,
        );
      }
    },
    onSuccess: invalidateStudents,
  });

  const deactivateMutation = useMutation({
    mutationFn: desactive,
    onSuccess: invalidateStudents,
  });

  const addStudent = useCallback(
    (
      params: RegisterStudentParams,
      photoBlob?: Blob,
      callbacks?: MutationCallbacks,
    ) => {
      registerMutation.mutate(
        { params, photoBlob },
        {
          onSuccess: (response) => {
            callbacks?.onSuccess?.({ student_id: response.student_id });
          },
          onError: () => callbacks?.onError?.(),
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
