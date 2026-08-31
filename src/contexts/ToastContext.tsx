import React, { createContext, useContext, useState, useCallback } from "react";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle, AlertCircle, Info, AlertTriangle, X } from "lucide-react";

export type ToastType = "success" | "error" | "info" | "warning";

interface ToastMessage {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextData {
  addToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextData>({} as ToastContextData);

const ToastContainer = styled.div`
  position: fixed;
  top: 2rem;
  right: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  z-index: 9999;
  pointer-events: none;

  @media (max-width: 768px) {
    top: 1rem;
    right: 1rem;
    left: 1rem;
    align-items: center;
  }
`;

const ToastCard = styled(motion.div)<{ $type: ToastType }>`
  background: #ffffff;
  border-radius: 12px;
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border-left: 6px solid
    ${({ $type }) => {
      switch ($type) {
        case "success":
          return "#22c55e";
        case "error":
          return "#ef4444";
        case "warning":
          return "#f59e0b";
        case "info":
        default:
          return "#3b82f6";
      }
    }};
  pointer-events: auto;
  min-width: 320px;
  max-width: 450px;

  @media (max-width: 768px) {
    width: 100%;
    min-width: unset;
  }
`;

const ToastIcon = styled.div<{ $type: ToastType }>`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ $type }) => {
    switch ($type) {
      case "success":
        return "#22c55e";
      case "error":
        return "#ef4444";
      case "warning":
        return "#f59e0b";
      case "info":
      default:
        return "#3b82f6";
    }
  }};
`;

const ToastMessageText = styled.p`
  margin: 0;
  color: #1a1a1a;
  font-size: 0.95rem;
  font-weight: 500;
  flex: 1;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #999;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s;

  &:hover {
    background: #f0f0f0;
    color: #333;
  }
`;

const getIcon = (type: ToastType) => {
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

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<ToastMessage[]>([]);

  const addToast = useCallback((message: string, type: ToastType = "info") => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast = { id, message, type };
    
    setMessages((prev) => [...prev, newToast]);

    setTimeout(() => {
      setMessages((prev) => prev.filter((msg) => msg.id !== id));
    }, 4000);
  }, []);

  const removeToast = (id: string) => {
    setMessages((prev) => prev.filter((msg) => msg.id !== id));
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <ToastContainer>
        <AnimatePresence>
          {messages.map((msg) => (
            <ToastCard
              key={msg.id}
              $type={msg.type}
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <ToastIcon $type={msg.type}>{getIcon(msg.type)}</ToastIcon>
              <ToastMessageText>{msg.message}</ToastMessageText>
              <CloseButton onClick={() => removeToast(msg.id)}>
                <X size={16} />
              </CloseButton>
            </ToastCard>
          ))}
        </AnimatePresence>
      </ToastContainer>
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextData => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
