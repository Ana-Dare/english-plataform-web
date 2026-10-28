import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getClass,
  listClassStudents,
  removeStudentFromClass,
} from "../../services/class";
import { listLevels } from "../../services/level";
import {
  cancelClassLesson,
  createClassLesson,
  deleteLessonMaterial,
  listClassLessons,
  listLessonMaterials,
  updateClassLesson,
  uploadLessonMaterial,
  type CreateLessonParams,
  type LessonStatus,
} from "../../services/material";

export function useClassDetail(classId: number) {
  const queryClient = useQueryClient();
  const enabled = classId > 0;

  const invalidateClassData = () => {
    void queryClient.invalidateQueries({ queryKey: ["classLessons", classId] });
    void queryClient.invalidateQueries({ queryKey: ["classMaterials", classId] });
    void queryClient.invalidateQueries({ queryKey: ["classStudents", classId] });
    void queryClient.invalidateQueries({ queryKey: ["classesList"] });
    void queryClient.invalidateQueries({ queryKey: ["studentsList"] });
    void queryClient.invalidateQueries({ queryKey: ["lessons"] });
    void queryClient.invalidateQueries({ queryKey: ["class", classId] });
  };

  const classQuery = useQuery({
    queryKey: ["class", classId],
    queryFn: () => getClass(classId),
    enabled,
  });

  const lessonsQuery = useQuery({
    queryKey: ["classLessons", classId],
    queryFn: () => listClassLessons(classId),
    enabled,
  });

  const lessons = [...(lessonsQuery.data ?? [])].sort(
    (a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime(),
  );

  const studentsQuery = useQuery({
    queryKey: ["classStudents", classId],
    queryFn: () => listClassStudents(classId),
    enabled,
  });

  const materialsQuery = useQuery({
    queryKey: ["classMaterials", classId, lessons.map((lesson) => lesson.id)],
    queryFn: async () => {
      const perLesson = await Promise.all(
        lessons.map((lesson) => listLessonMaterials(lesson.id)),
      );
      return perLesson.flat();
    },
    enabled: enabled && lessonsQuery.isSuccess,
  });

  const levelsQuery = useQuery({
    queryKey: ["levels"],
    queryFn: listLevels,
  });

  const createLessonMutation = useMutation({
    mutationFn: (params: CreateLessonParams) => createClassLesson(classId, params),
    onSuccess: invalidateClassData,
  });

  const updateLessonMutation = useMutation({
    mutationFn: ({
      lessonId,
      params,
    }: {
      lessonId: number;
      params: Partial<CreateLessonParams> & { status?: LessonStatus };
    }) => updateClassLesson(lessonId, params),
    onSuccess: invalidateClassData,
  });

  const cancelLessonMutation = useMutation({
    mutationFn: (lessonId: number) => cancelClassLesson(lessonId),
    onSuccess: invalidateClassData,
  });

  const uploadMaterialsMutation = useMutation({
    mutationFn: async ({
      lessonId,
      files,
    }: {
      lessonId: number;
      files: File[];
    }) => {
      for (const file of files) {
        await uploadLessonMaterial(lessonId, file);
      }
    },
    onSuccess: invalidateClassData,
  });

  const deleteMaterialMutation = useMutation({
    mutationFn: ({
      lessonId,
      materialId,
    }: {
      lessonId: number;
      materialId: number;
    }) => deleteLessonMaterial(lessonId, materialId),
    onSuccess: invalidateClassData,
  });

  const removeStudentMutation = useMutation({
    mutationFn: (studentId: number) =>
      removeStudentFromClass(classId, studentId),
    onSuccess: invalidateClassData,
  });

  return {
    classDetails: classQuery.data ?? null,
    lessons,
    materials: materialsQuery.data ?? [],
    classStudents: studentsQuery.data ?? [],
    levels: levelsQuery.data?.levels ?? [],
    isLoading:
      lessonsQuery.isLoading ||
      studentsQuery.isLoading ||
      materialsQuery.isLoading,
    isError:
      lessonsQuery.isError ||
      studentsQuery.isError ||
      materialsQuery.isError,
    createLesson: createLessonMutation.mutate,
    isCreatingLesson: createLessonMutation.isPending,
    updateLesson: updateLessonMutation.mutate,
    isUpdatingLesson: updateLessonMutation.isPending,
    cancelLesson: cancelLessonMutation.mutate,
    isCancellingLesson: cancelLessonMutation.isPending,
    uploadMaterials: uploadMaterialsMutation.mutate,
    isUploading: uploadMaterialsMutation.isPending,
    deleteMaterial: deleteMaterialMutation.mutate,
    deletingId: deleteMaterialMutation.isPending
      ? deleteMaterialMutation.variables?.materialId ?? null
      : null,
    removeStudent: removeStudentMutation.mutate,
    isRemovingStudent: removeStudentMutation.isPending,
  };
}
