import styled from "styled-components";
import { motion } from "framer-motion";
import type { ToasVariants } from "./type";

export const ToastContainer = styled.div`
  position: absolute;
  top: 3rem;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  z-index: 9999;
  pointer-events: none;
  align-items: center;

  @media (max-width: 768px) {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    right: auto;
    align-items: center;
  }
`;

export const ToastCard = styled(motion.div)<{ $type: ToasVariants }>`
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

export const ToastIcon = styled.div<{ $type: ToasVariants }>`
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

export const ToastMessageText = styled.p`
  margin: 0;
  color: #1a1a1a;
  font-size: 0.95rem;
  font-weight: 500;
  flex: 1;
`;

export const CloseButton = styled.button`
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
