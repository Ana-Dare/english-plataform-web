import { useContext } from "react";
import { ClassesContext } from "./ClassesContext";

/**
 * Hook para acessar o contexto de turmas.
 * @returns Contexto com lista de turmas e funções de mutação.
 */
export function useClasses() {
  const context = useContext(ClassesContext);

  if (!context) {
    throw new Error(
      "useClasses deve ser usado dentro de um ClassesProvider",
    );
  }

  return context;
}
