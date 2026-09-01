import { AnimatePresence } from "framer-motion";
import {
  CloseButton,
  ToastCard,
  ToastContainer,
  ToastIcon,
  ToastMessageText,
} from "./style";
import { AlertCircle, AlertTriangle, CheckCircle, Info, X } from "lucide-react";
import type { IToast, ToasVariants } from "./type";
import { createPortal } from "react-dom";

const toastViewport = document.getElementById("toast-viewport");

const getIcon = (type: ToasVariants) => {
  switch (type) {
    case "success":
      return <CheckCircle size={22} />;
    case "error":
      return <AlertCircle size={22} />;
    case "warning":
      return <AlertTriangle size={22} />;
    case "info":
    default:
      return <Info size={22} />;
  }
};

export interface ToastProps {
  /** Lista de toasts ativos. */
  toasts: IToast[];
  /** Remove um toast pelo id. */
  onClose: (id: string) => void;
}

const Toast = ({ toasts, onClose }: ToastProps) => {
  return createPortal(
    <ToastContainer>
      <AnimatePresence>
        {toasts.map((toast) => (
          <ToastCard
            key={toast.id}
            $type={toast.type}
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <ToastIcon $type={toast.type}>{getIcon(toast.type)}</ToastIcon>
            <ToastMessageText>{toast.message}</ToastMessageText>
            {toast.isClosable !== false && (
              <CloseButton onClick={() => onClose(toast.id)}>
                <X size={16} />
              </CloseButton>
            )}
          </ToastCard>
        ))}
      </AnimatePresence>
    </ToastContainer>,
    toastViewport ?? document.body,
  );
};

export default Toast;
