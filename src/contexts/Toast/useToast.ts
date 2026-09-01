import { useContext } from "react";
import ToastContext, { type ToastContextType } from "./context";

/**
 * Hook para acessar o contexto de toasts.
 * Deve ser usado dentro de um <ToastProvider>.
 */
export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);

  if (!context || Object.keys(context).length === 0) {
    throw new Error("useToast must be used within a ToastProvider");
  }

  return context;
};

export default useToast;
