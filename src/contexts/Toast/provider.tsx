import React, { useCallback, useMemo, useState } from "react";
import ToastContext, {
  type AddToastInput,
  type ToastContextType,
} from "./context";
import type { IToast, ToasVariants } from "../../components/Toast/type";
import Toast from "../../components/Toast";

export interface ToastProviderProps {
  children?: React.ReactNode;
}

const DEFAULT_DURATION = 4000;

const generateId = () => Math.random().toString(36).slice(2, 11);

export default function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<IToast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const addToast = useCallback(
    (toast: AddToastInput | string, type?: ToasVariants) => {
      const input: AddToastInput =
        typeof toast === "string"
          ? { message: toast, type: type ?? "info" }
          : toast;

      const id = generateId();
      const newToast: IToast = {
        id,
        message: input.message,
        title: input.title,
        type: input.type ?? "info",
        duration: input.duration ?? DEFAULT_DURATION,
        isClosable: input.isClosable ?? true,
      };

      setToasts((prev) => [...prev, newToast]);

      if (newToast.duration && newToast.duration > 0) {
        setTimeout(() => removeToast(id), newToast.duration);
      }
    },
    [removeToast],
  );

  const value = useMemo<ToastContextType>(
    () => ({ toasts, addToast, removeToast }),
    [toasts, addToast, removeToast],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <Toast toasts={toasts} onClose={removeToast} />
    </ToastContext.Provider>
  );
}
