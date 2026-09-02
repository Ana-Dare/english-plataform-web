import React, { useState } from "react";
import { X, Info } from "lucide-react";
import {
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalFooter,
  CloseBtn,
  PrimaryBtn,
  SecondaryBtn,
  FieldGroup,
} from "./style";

interface EvaluateJustificationModalProps {
  studentName: string;
  action: "approve" | "reject";
  onClose: () => void;
  onConfirm: (message: string) => void;
}

const EvaluateJustificationModal: React.FC<EvaluateJustificationModalProps> = ({
  studentName,
  action,
  onClose,
  onConfirm,
}) => {
  const [message, setMessage] = useState("");

  const handleConfirm = () => {
    if (!message.trim()) return;
    onConfirm(message);
  };

  const isApprove = action === "approve";

  return (
    <ModalOverlay onClick={onClose} style={{ backdropFilter: "blur(6px)" }}>
      <ModalContent
        onClick={(e) => e.stopPropagation()}
        style={{ overflow: "hidden", width: "90%", maxWidth: "500px" }}
      >
        <div
          style={{
            background: "#f8f9fc",
            padding: "1.5rem 2rem",
            borderBottom: "1px solid #eaeaea",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTopLeftRadius: "16px",
            borderTopRightRadius: "16px",
          }}
        >
          <h3
            style={{
              margin: 0,
              color: "#08142c",
              fontSize: "1.25rem",
              fontWeight: 700,
            }}
          >
            {isApprove ? "Aprovar Atestado" : "Recusar Atestado"}
          </h3>
          <CloseBtn
            onClick={onClose}
            style={{ background: "transparent", color: "#888" }}
          >
            <X size={20} />
          </CloseBtn>
        </div>

        <ModalBody style={{ padding: "2rem" }}>
          <div
            style={{
              display: "flex",
              gap: "1rem",
              background: "#f8fafc",
              padding: "1rem",
              borderRadius: "12px",
              border: "1px solid #e2e8f0",
              marginBottom: "1.5rem",
            }}
          >
            <Info
              size={20}
              color="#64748b"
              style={{ flexShrink: 0, marginTop: "2px" }}
            />
            <p
              style={{
                color: "#475569",
                margin: 0,
                fontSize: "0.9rem",
                lineHeight: 1.5,
              }}
            >
              Você está prestes a{" "}
              <strong>{isApprove ? "aprovar" : "recusar"}</strong> o atestado do
              aluno <strong>{studentName}</strong>. O feedback abaixo será
              enviado de forma privada para o aluno.
            </p>
          </div>
          <FieldGroup>
            <label
              style={{
                color: "#1e293b",
                fontWeight: 600,
                fontSize: "0.9rem",
                display: "block",
                marginBottom: "0.5rem",
              }}
            >
              Feedback / Mensagem ao Aluno
            </label>
            <textarea
              placeholder={
                isApprove
                  ? "Ex: Atestado recebido e abonado. Melhoras!"
                  : "Ex: O atestado não é legível, por favor envie novamente."
              }
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              autoFocus
              style={{
                width: "100%",
                minHeight: "120px",
                padding: "1rem",
                borderRadius: "8px",
                border: "1px solid #d0d0d0",
                fontSize: "0.95rem",
                fontFamily: "inherit",
                color: "#333",
                resize: "none",
                outline: "none",
                transition: "all 0.2s ease",
                boxSizing: "border-box",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#08142c";
                e.target.style.boxShadow = "0 0 0 3px rgba(8, 20, 44, 0.08)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#d0d0d0";
                e.target.style.boxShadow = "none";
              }}
            />
          </FieldGroup>
        </ModalBody>

        <ModalFooter
          style={{
            padding: "1.25rem 2rem",
            background: "#f8fafc",
            borderTop: "1px solid #e2e8f0",
            display: "flex",
            justifyContent: "flex-end",
            gap: "1rem",
          }}
        >
          <SecondaryBtn onClick={onClose}>Cancelar</SecondaryBtn>
          <PrimaryBtn onClick={handleConfirm}>
            {isApprove ? "Confirmar Aprovação" : "Confirmar Recusa"}
          </PrimaryBtn>
        </ModalFooter>
      </ModalContent>
    </ModalOverlay>
  );
};

export default EvaluateJustificationModal;
