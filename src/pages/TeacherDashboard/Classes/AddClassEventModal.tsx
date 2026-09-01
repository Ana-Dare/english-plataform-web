import React, { useState } from "react";
import { X } from "lucide-react";
import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FieldGroup,
  CloseBtn,
  PrimaryBtn,
  SecondaryBtn,
} from "./style";
import styled from "styled-components";
import useToast from "../../../contexts/Toast/useToast";

const CheckboxGroup = styled.label`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  cursor: pointer;
  margin-top: 0.5rem;

  input[type="checkbox"] {
    width: 18px;
    height: 18px;
    accent-color: #08142c;
    cursor: pointer;
  }

  span {
    font-size: 0.95rem;
    color: #333;
    font-weight: 500;
  }
`;

export interface ClassEventData {
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  syncAgenda: boolean;
}

interface AddClassEventModalProps {
  onClose: () => void;
  onSave: (data: ClassEventData) => void;
}

const AddClassEventModal: React.FC<AddClassEventModalProps> = ({
  onClose,
  onSave,
}) => {
  const { addToast } = useToast();
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [syncAgenda, setSyncAgenda] = useState(true);

  const handleSave = () => {
    if (!title.trim() || !date || !startTime || !endTime) {
      addToast(
        "Por favor, preencha todos os campos obrigatórios (título, data e horários).",
        "warning",
      );
      return;
    }
    onSave({ title, date, startTime, endTime, syncAgenda });
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalHeader>
          <h3>Agendar Nova Aula</h3>
          <CloseBtn onClick={onClose}>
            <X size={20} />
          </CloseBtn>
        </ModalHeader>
        <ModalBody>
          <FieldGroup>
            <label>Título da Aula</label>
            <input
              type="text"
              placeholder="Ex: Aula 03 - Phrasal Verbs"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </FieldGroup>
          <FieldGroup>
            <label>Data</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </FieldGroup>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1rem",
            }}
          >
            <FieldGroup>
              <label>Início</label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </FieldGroup>
            <FieldGroup>
              <label>Término</label>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </FieldGroup>
          </div>

          <CheckboxGroup>
            <input
              type="checkbox"
              checked={syncAgenda}
              onChange={(e) => setSyncAgenda(e.target.checked)}
            />
            <span>Adicionar à minha agenda principal</span>
          </CheckboxGroup>
        </ModalBody>
        <ModalFooter>
          <SecondaryBtn onClick={onClose}>Cancelar</SecondaryBtn>
          <PrimaryBtn onClick={handleSave}>Agendar Aula</PrimaryBtn>
        </ModalFooter>
      </ModalContent>
    </ModalOverlay>
  );
};

export default AddClassEventModal;
