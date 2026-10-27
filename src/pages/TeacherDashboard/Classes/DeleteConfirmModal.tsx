import React from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Trash2 } from "lucide-react";

interface DeleteConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  isDeleting?: boolean;
}

const Overlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.45);
  backdrop-filter: blur(4px);
  z-index: 1300;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`;

const ModalBox = styled(motion.div)`
  width: 100%;
  max-width: 440px;
  background: #ffffff;
  border-radius: 18px;
  padding: 1.75rem;
  box-shadow: 0 20px 40px rgba(15, 23, 42, 0.2);
  border: 1.5px solid #f1f5f9;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  position: relative;
`;

const IconCircle = styled.div`
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: #fef2f2;
  color: #ef4444;
  border: 1.5px solid #fee2e2;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;

  h3 {
    margin: 0;
    font-size: 1.15rem;
    font-weight: 700;
    color: #1f2b45;
    font-family: "Rubik", sans-serif;
  }

  p {
    margin: 0;
    font-size: 0.9rem;
    color: #64748b;
    line-height: 1.5;
  }
`;

const ButtonRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.75rem;
  margin-top: 0.5rem;
`;

const CancelBtn = styled.button`
  height: 42px;
  padding: 0 1.25rem;
  border-radius: 999px;
  background: #ffffff;
  border: 1.5px solid #cbd5e1;
  color: #475569;
  font-size: 0.88rem;
  font-weight: 600;
  font-family: "Rubik", sans-serif;
  cursor: pointer;
  transition: all 0.18s ease;

  &:hover:not(:disabled) {
    background: #f8fafc;
    color: #1f2b45;
    border-color: #94a3b8;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ConfirmBtn = styled.button`
  height: 42px;
  padding: 0 1.25rem;
  border-radius: 999px;
  background: #dc2626;
  border: none;
  color: #ffffff;
  font-size: 0.88rem;
  font-weight: 600;
  font-family: "Rubik", sans-serif;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  box-shadow: 0 2px 6px rgba(220, 38, 38, 0.25);
  transition: all 0.18s ease;

  &:hover:not(:disabled) {
    background: #b91c1c;
    transform: translateY(-1px);
    box-shadow: 0 4px 10px rgba(220, 38, 38, 0.35);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  isDeleting = false,
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <Overlay
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onCancel}
      >
        <ModalBox
          initial={{ scale: 0.95, opacity: 0, y: 10 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 10 }}
          onClick={(e) => e.stopPropagation()}
        >
          <IconCircle>
            <AlertTriangle size={26} />
          </IconCircle>

          <Content>
            <h3>{title}</h3>
            <p>{message}</p>
          </Content>

          <ButtonRow>
            <CancelBtn type="button" onClick={onCancel} disabled={isDeleting}>
              Cancelar
            </CancelBtn>
            <ConfirmBtn type="button" onClick={onConfirm} disabled={isDeleting}>
              <Trash2 size={15} />
              {isDeleting ? "Excluindo..." : "Sim, excluir"}
            </ConfirmBtn>
          </ButtonRow>
        </ModalBox>
      </Overlay>
    </AnimatePresence>
  );
};

export default DeleteConfirmModal;
