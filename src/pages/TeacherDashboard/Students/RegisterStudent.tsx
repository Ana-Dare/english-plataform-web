import React, { useState } from "react";
import { ArrowLeft, User, BookOpen, Check } from "lucide-react";
import {
  Container,
  RegisterContainer,
  RegisterHeader,
  RegisterHeaderLeft,
  RegisterSteps,
  StepDot,
  RegisterBody,
  RegisterSection,
  RegisterSectionTitle,
  RegisterGrid,
  RegisterField,
  RegisterLabel,
  RegisterInput,
  RegisterSelect,
  RegisterTextarea,
  PlanSelector,
  PlanCard,
  PlanCheck,
  RegisterFooter,
  DetailActionBtn,
} from "./style";
import type { RegisterStudentParams } from "../types";

interface RegisterStudentProps {
  onBack: () => void;
  onSave: (data: RegisterStudentParams) => void;
}

const formatCPF = (value: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 3)}.${digits.slice(3)}`;
  if (digits.length <= 9)
    return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`;
  return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9)}`;
};

const formatPhone = (value: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return `(${digits}`;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
};

const RegisterStudent: React.FC<RegisterStudentProps> = ({
  onBack,
  onSave,
}) => {
  const [step] = useState(1);
  const [form, setForm] = useState<RegisterStudentParams>({
    name: "",
    cpf_hash: "",
    email: "",
    phone: "",
    birthdate: "",
    vip: 0,
    level_id: 1,
    notes: "",
    active: 1,
  });

  const handleSubmit = () => {
    if (!form.name.trim() || !form.email.trim() || !form.phone.trim()) {
      alert("Por favor, preencha os campos obrigatórios.");
      return;
    }
    onSave(form);
  };

  return (
    <Container>
      <RegisterContainer>
        <RegisterHeader>
          <RegisterHeaderLeft>
            <h2>Cadastrar Novo Aluno</h2>
            <p>Preencha as informações do aluno para realizar a matrícula</p>
          </RegisterHeaderLeft>
          <RegisterSteps>
            <StepDot $active={step === 1} $done={step > 1} />
            <StepDot $active={step === 2} $done={step > 2} />
            <StepDot $active={step === 3} $done={false} />
          </RegisterSteps>
        </RegisterHeader>

        <RegisterBody>
          {" "}
          {/* Dados Pessoais */}
          <RegisterSection>
            <RegisterSectionTitle>
              <User size={16} /> Dados Pessoais
            </RegisterSectionTitle>
            <RegisterGrid>
              <RegisterField>
                <RegisterLabel>
                  Nome Completo <span>*</span>
                </RegisterLabel>
                <RegisterInput
                  type="text"
                  placeholder="Ex: Maria da Silva"
                  value={form.name}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, name: e.target.value }))
                  }
                />
              </RegisterField>
              <RegisterField>
                <RegisterLabel>CPF</RegisterLabel>
                <RegisterInput
                  type="text"
                  placeholder="000.000.000-00"
                  value={form.cpf_hash}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      cpf_hash: formatCPF(e.target.value),
                    }))
                  }
                />
              </RegisterField>
              <RegisterField>
                <RegisterLabel>
                  E-mail <span>*</span>
                </RegisterLabel>
                <RegisterInput
                  type="email"
                  placeholder="aluno@email.com"
                  value={form.email}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, email: e.target.value }))
                  }
                />
              </RegisterField>
              <RegisterField>
                <RegisterLabel>
                  Telefone / WhatsApp <span>*</span>
                </RegisterLabel>
                <RegisterInput
                  type="text"
                  placeholder="(00) 00000-0000"
                  value={form.phone}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      phone: formatPhone(e.target.value),
                    }))
                  }
                />
              </RegisterField>
              <RegisterField>
                <RegisterLabel>Data de Nascimento</RegisterLabel>
                <RegisterInput
                  type="date"
                  value={form.birthdate}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, birthdate: e.target.value }))
                  }
                />
              </RegisterField>
            </RegisterGrid>
          </RegisterSection>
          {/* Plano */}
          <RegisterSection>
            <RegisterSectionTitle>
              <BookOpen size={16} /> Plano e Turma
            </RegisterSectionTitle>
            <RegisterLabel style={{ marginBottom: "0.2rem" }}>
              Tipo de Plano
            </RegisterLabel>
            <PlanSelector>
              <PlanCard
                $selected={form.vip === 0}
                $type="Regular"
                onClick={() => setForm((f) => ({ ...f, vip: 0 }))}
              >
                <PlanCheck $selected={form.vip === 0}>
                  <Check size={12} />
                </PlanCheck>
                <h5>Regular</h5>
                <p>
                  Aulas em turma, material didático incluso, acesso à plataforma
                  de exercícios.
                </p>
              </PlanCard>
              <PlanCard
                $selected={form.vip === 1}
                $type={1}
                onClick={() => setForm((f) => ({ ...f, vip: 1 }))}
              >
                <PlanCheck $selected={form.vip === 1}>
                  <Check size={12} />
                </PlanCheck>
                <h5>VIP</h5>
                <p>
                  Aulas particulares, horários flexíveis, acompanhamento
                  personalizado e prioridade.
                </p>
              </PlanCard>
            </PlanSelector>

            <RegisterGrid>
              <RegisterField>
                <RegisterLabel>Nível</RegisterLabel>
                <RegisterSelect
                  value={form.level_id}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      level_id: Number(e.target.value),
                    }))
                  }
                >
                  <option value={1}>A1</option>
                </RegisterSelect>
              </RegisterField>
              {/* <RegisterField>
                <RegisterLabel>Turma</RegisterLabel>
                <RegisterSelect
                  value={form.turma}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, turma: e.target.value }))
                  }
                >
                  <option value="1">A1</option>
                  <option value="Turma Beginner 1">Turma Beginner 1</option>
                  <option value="Turma Beginner 2">Turma Beginner 2</option>
                  <option value="Turma Intermediate A">
                    Turma Intermediate A
                  </option>
                  <option value="Turma Intermediate B">
                    Turma Intermediate B
                  </option>
                  <option value="Turma Advanced">Turma Advanced</option>
                  <option value="Particular">Particular</option>
                </RegisterSelect>
              </RegisterField> */}
            </RegisterGrid>
          </RegisterSection>
          {/* Observações */}
          <RegisterSection>
            <RegisterSectionTitle>Observações</RegisterSectionTitle>
            <RegisterTextarea
              placeholder="Informações adicionais sobre o aluno, objetivos, disponibilidade..."
              value={form.notes}
              onChange={(e) =>
                setForm((f) => ({ ...f, notes: e.target.value }))
              }
            />
          </RegisterSection>
        </RegisterBody>

        <RegisterFooter>
          <DetailActionBtn $variant="secondary" onClick={onBack}>
            <ArrowLeft size={16} /> Cancelar
          </DetailActionBtn>
          <DetailActionBtn $variant="primary" onClick={handleSubmit}>
            Cadastrar Aluno
          </DetailActionBtn>
        </RegisterFooter>
      </RegisterContainer>
    </Container>
  );
};

export default RegisterStudent;
