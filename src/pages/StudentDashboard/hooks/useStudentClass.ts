import { useQuery } from "@tanstack/react-query";
import { getMe } from "../../../services/user";
import {
  getClass,
  listClassStudents,
  listClasses,
  listStudentClasses,
} from "../../TeacherDashboard/services/class";
import {
  listClassLessons,
  listLessonMaterials,
} from "../../TeacherDashboard/services/material";

export function useStudentClass() {
  const meQuery = useQuery({
    queryKey: ["me"],
    queryFn: getMe,
  });

  const studentId = meQuery.data?.profile?.studentId ?? null;

  const enrolledQuery = useQuery({
    queryKey: ["studentClasses", studentId],
    queryFn: () => listStudentClasses(studentId!),
    enabled: Boolean(studentId),
  });

  const fallbackClassesQuery = useQuery({
    queryKey: ["classesList"],
    queryFn: listClasses,
    enabled: !studentId && meQuery.isSuccess,
  });

  const enrolledClassId =
    enrolledQuery.data?.[0]?.id ??
    fallbackClassesQuery.data?.classes?.[0]?.id ??
    null;

  const classQuery = useQuery({
    queryKey: ["class", enrolledClassId],
    queryFn: () => getClass(enrolledClassId!),
    enabled: Boolean(enrolledClassId),
  });

  const currentClass =
    classQuery.data ??
    enrolledQuery.data?.[0] ??
    fallbackClassesQuery.data?.classes?.[0] ??
    null;
  const classId = currentClass?.id;

  const lessonsQuery = useQuery({
    queryKey: ["classLessons", classId],
    queryFn: () => listClassLessons(classId!),
    enabled: Boolean(classId),
  });

  const classmatesQuery = useQuery({
    queryKey: ["classStudents", classId],
    queryFn: () => listClassStudents(classId!),
    enabled: Boolean(classId),
  });

  const lessons = lessonsQuery.data ?? [];

  const materialsQuery = useQuery({
    queryKey: ["classMaterials", classId, lessons.map((lesson) => lesson.id)],
    queryFn: async () => {
      const perLesson = await Promise.all(
        lessons.map((lesson) => listLessonMaterials(lesson.id)),
      );
      return perLesson.flat();
    },
    enabled: Boolean(classId) && lessonsQuery.isSuccess,
  });

  return {
    currentClass,
    classId,
    lessons,
    materials: materialsQuery.data ?? [],
    classmates: classmatesQuery.data ?? [],
    isLoading:
      meQuery.isLoading ||
      enrolledQuery.isLoading ||
      fallbackClassesQuery.isLoading ||
      classQuery.isLoading ||
      lessonsQuery.isLoading ||
      classmatesQuery.isLoading ||
      materialsQuery.isLoading,
    isError:
      meQuery.isError ||
      enrolledQuery.isError ||
      fallbackClassesQuery.isError ||
      classQuery.isError ||
      lessonsQuery.isError ||
      classmatesQuery.isError ||
      materialsQuery.isError,
  };
}
