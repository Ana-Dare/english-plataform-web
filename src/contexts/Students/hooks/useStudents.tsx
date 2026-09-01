import { useContext } from "react";
import {
  StudentsContext,
  type IStudentsContext,
} from "../StudentsContext";

/**
 * Hook para acessar a fonte central de dados dos alunos.
 * Deve ser usado dentro de um <StudentsProvider>.
 */
export const useStudents = (): IStudentsContext => {
  const context = useContext(StudentsContext);

  if (!context || Object.keys(context).length === 0) {
    throw new Error("useStudents must be used within a StudentsProvider");
  }

  return context;
};

export default useStudents;
