import { createContext } from "react";
import type { IToast, ToasVariants } from "../../components/Toast/type";

export type { IToast, ToasVariants } from "../../components/Toast/type";

/** Dados para criar um toast (sem o id, gerado internamente). */
export type AddToastInput = Omit<IToast, "id">;

export interface ToastContextType {
  toasts: IToast[];
  /**
   * Adiciona um toast. Aceita dois formatos:
   * - addToast("mensagem", "success")
   * - addToast({ message: "mensagem", type: "success" })
   */
  addToast: (toast: AddToastInput | string, type?: ToasVariants) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType>({} as ToastContextType);

export default ToastContext;
