import React, { useState, useRef } from "react";
import { ArrowLeft, User, BookOpen, Check, Plus, X, Save, Camera, Upload, MapPin, Phone, Mail, Calendar, FileText } from "lucide-react";
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

  RegisterTextarea,
  PlanSelector,
  PlanCard,
  PlanCheck,
  RegisterFooter,
  DetailActionBtn,
  FieldError,
} from "./style";
import type { RegisterStudentParams } from "../types";
import { useToast } from "../../../contexts/ToastContext";
import CustomDropdown from "../../../components/CustomDropdown";
import styled, { keyframes } from "styled-components";

/* ====== LOCAL STYLED COMPONENTS ====== */

const pulseGlow = keyframes`
  0%, 100% { box-shadow: 0 0 0 0 rgba(197, 122, 103, 0.3); }
  50% { box-shadow: 0 0 0 10px rgba(197, 122, 103, 0); }
`;

const ProfilePhotoArea = styled.div`
  display: flex;
  align-items: center;
  gap: 1.1rem;
  padding: 0.7rem 1.1rem;
  background: #fff;
  border-radius: 12px;
  border: 1.5px solid #9ca3af;
  position: relative;
  overflow: hidden;

  @media (max-width: 600px) {
    flex-direction: column;
    text-align: center;
    padding: 0.85rem;
    gap: 0.7rem;
  }
`;

const PhotoCircle = styled.div<{ $hasImage: boolean }>`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  cursor: pointer;
  position: relative;
  background: ${({ $hasImage }) => $hasImage
    ? '#fff'
    : 'linear-gradient(135deg, #e8e0dc 0%, #d4c8c2 100%)'};
  border: 3px solid ${({ $hasImage }) => $hasImage ? '#C57A67' : 'rgba(197, 122, 103, 0.3)'};
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  animation: ${({ $hasImage }) => $hasImage ? 'none' : pulseGlow} 2.5s ease-in-out infinite;

  &:hover {
    transform: scale(1.05);
    border-color: #C57A67;
    box-shadow: 0 8px 24px rgba(197, 122, 103, 0.25);

    .overlay {
      opacity: 1;
    }
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  svg {
    color: #C57A67;
    opacity: 0.5;
  }
`;

const PhotoOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(8, 20, 44, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  opacity: 0;
  transition: opacity 0.25s;
  backdrop-filter: blur(2px);

  svg {
    color: #fff !important;
    opacity: 1 !important;
  }
`;

const PhotoTextBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  z-index: 1;

  h4 {
    margin: 0;
    font-size: 0.92rem;
    color: #1F2B45;
    font-weight: 700;
    display: flex;
    align-items: center;
    gap: 0.4rem;
  }

  p {
    margin: 0;
    font-size: 0.78rem;
    color: #666;
    line-height: 1.35;
  }
`;

const UploadBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, #1F2B45 0%, #2a3d5f 100%);
  color: #fff;
  border: none;
  border-radius: 999px;
  padding: 0.4rem 1rem;
  font-size: 0.78rem;
  font-weight: 600;
  cursor: pointer;
  font-family: inherit;
  margin-top: 0.15rem;
  transition: all 0.25s;
  box-shadow: 0 3px 10px rgba(31, 43, 69, 0.2);

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 5px 16px rgba(31, 43, 69, 0.3);
    background: linear-gradient(135deg, #2a3d5f 0%, #3a4f72 100%);
  }
`;

const RemovePhotoBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background: transparent;
  color: #d93025;
  border: 1px solid rgba(217, 48, 37, 0.3);
  border-radius: 999px;
  padding: 0.35rem 0.9rem;
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  font-family: inherit;
  transition: all 0.2s;

  &:hover {
    background: #fce8e6;
    border-color: #d93025;
  }
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 0.6rem;
  flex-wrap: wrap;
  margin-top: 0.2rem;

  @media (max-width: 600px) {
    justify-content: center;
  }
`;

const InputIcon = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  svg {
    position: absolute;
    left: 0.9rem;
    color: #C57A67;
    opacity: 0.6;
    z-index: 1;
    pointer-events: none;
  }

  input {
    padding-left: 2.6rem !important;
  }
`;

const GenderSelector = styled.div`
  display: flex;
  gap: 0.6rem;
`;

const GenderOption = styled.button<{ $selected: boolean }>`
  flex: 1;
  padding: 0.65rem 1rem;
  border-radius: 999px;
  font-size: 0.85rem;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1.5px solid ${({ $selected }) => $selected ? '#C57A67' : '#8d8d8d'};
  background: ${({ $selected }) => $selected
    ? 'linear-gradient(135deg, #C57A67 0%, #d4937e 100%)'
    : '#fff'};
  color: ${({ $selected }) => $selected ? '#fff' : '#666'};
  box-shadow: ${({ $selected }) => $selected
    ? '0 3px 10px rgba(197, 122, 103, 0.3)'
    : '0 1px 3px rgba(0,0,0,0.05)'};

  &:hover {
    border-color: #C57A67;
    ${({ $selected }) => !$selected && `
      background: #fff8f6;
      color: #C57A67;
    `}
  }
`;

const AddLevelInline = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
  align-items: center;
`;

const AddLevelBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f8f4f2 0%, #f0ebe8 100%);
  border: 1.5px solid #8d8d8d;
  border-radius: 12px;
  width: 44px;
  height: 44px;
  color: #C57A67;
  cursor: pointer;
  transition: all 0.25s;

  &:hover {
    background: #C57A67;
    color: #fff;
    border-color: #C57A67;
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(197, 122, 103, 0.25);
  }
`;

const SaveLevelBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  background: linear-gradient(135deg, #1F2B45 0%, #2a3d5f 100%);
  border: none;
  border-radius: 10px;
  padding: 0 1rem;
  height: 44px;
  color: #fff;
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: 600;
  font-family: inherit;
  transition: all 0.2s;
  box-shadow: 0 2px 8px rgba(31, 43, 69, 0.2);

  &:hover {
    background: linear-gradient(135deg, #2a3d5f 0%, #3a4f72 100%);
  }
`;

const CancelLevelBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  border-radius: 10px;
  width: 44px;
  height: 44px;
  color: #64748b;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #f1f5f9;
    color: #1e293b;
  }
`;

/* ====== FORMATTERS ====== */

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

const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

const isValidCPF = (value: string) => {
  const digits = value.replace(/\D/g, "");
  if (digits.length !== 11 || /^(\d)\1{10}$/.test(digits)) return false;
  const calc = (len: number) => {
    let sum = 0;
    for (let i = 0; i < len; i++) sum += Number(digits[i]) * (len + 1 - i);
    const rest = (sum * 10) % 11;
    return rest === 10 ? 0 : rest;
  };
  return calc(9) === Number(digits[9]) && calc(10) === Number(digits[10]);
};

const isValidPhone = (value: string) => {
  const digits = value.replace(/\D/g, "");
  return digits.length === 10 || digits.length === 11;
};

const isValidBirthdate = (value: string) => {
  if (!value) return false;
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (date > today) return false;
  const age = today.getFullYear() - date.getFullYear();
  return age >= 3 && age <= 100;
};

type FieldKey = "name" | "cpf_hash" | "email" | "phone" | "birthdate";

/* ====== COMPONENT ====== */

interface RegisterStudentProps {
  onBack: () => void;
  onSave: (student: RegisterStudentParams) => void;
}

const RegisterStudent: React.FC<RegisterStudentProps> = ({
  onBack,
  onSave,
}) => {
  const { addToast } = useToast();
  const [step] = useState(1);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [gender, setGender] = useState<string>("");
  const [address, setAddress] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const [levels, setLevels] = useState<{id: number, name: string}[]>([
    { id: 1, name: "A1" },
    { id: 2, name: "A2" },
    { id: 3, name: "B1" },
  ]);
  const [isAddingLevel, setIsAddingLevel] = useState(false);
  const [newLevelName, setNewLevelName] = useState("");
  const [errors, setErrors] = useState<Partial<Record<FieldKey, string>>>({});

  const clearError = (key: FieldKey) => {
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const validateForm = () => {
    const next: Partial<Record<FieldKey, string>> = {};

    if (!form.name.trim()) next.name = "Informe o nome completo.";
    else if (form.name.trim().length < 3) next.name = "O nome deve ter pelo menos 3 caracteres.";

    if (!form.cpf_hash.trim()) next.cpf_hash = "Informe o CPF.";
    else if (!isValidCPF(form.cpf_hash)) next.cpf_hash = "CPF inválido.";

    if (!form.email.trim()) next.email = "Informe o e-mail.";
    else if (!isValidEmail(form.email)) next.email = "E-mail inválido.";

    if (!form.phone.trim()) next.phone = "Informe o telefone.";
    else if (!isValidPhone(form.phone)) next.phone = "Telefone inválido.";

    if (!form.birthdate) next.birthdate = "Informe a data de nascimento.";
    else if (!isValidBirthdate(form.birthdate)) next.birthdate = "Data de nascimento inválida.";

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        addToast("A imagem deve ter no máximo 5MB.", "warning");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    setPhotoUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleAddLevel = () => {
    if (!newLevelName.trim()) return;
    const newLevel = { id: Date.now(), name: newLevelName.trim() };
    setLevels([...levels, newLevel]);
    setForm(f => ({ ...f, level_id: newLevel.id }));
    setNewLevelName("");
    setIsAddingLevel(false);
    addToast("Nível adicionado com sucesso!", "success");
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      addToast("Por favor, preencha os campos obrigatórios corretamente.", "warning");
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
          {/* Photo Upload */}
          <ProfilePhotoArea>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              style={{ display: "none" }}
            />
            <PhotoCircle
              $hasImage={!!photoUrl}
              onClick={() => fileInputRef.current?.click()}
            >
              {photoUrl ? (
                <img src={photoUrl} alt="Foto do aluno" />
              ) : (
                <Camera size={22} />
              )}
              <PhotoOverlay className="overlay">
                <Camera size={24} />
              </PhotoOverlay>
            </PhotoCircle>
            <PhotoTextBlock>
              <h4>
                <Camera size={16} style={{ color: '#C57A67' }} />
                Foto do Aluno
              </h4>
              <p>
                Adicione uma foto para personalizar o perfil do aluno.
              </p>
              <ButtonRow>
                <UploadBtn
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload size={14} />
                  {photoUrl ? "Trocar foto" : "Selecionar foto"}
                </UploadBtn>
                {photoUrl && (
                  <RemovePhotoBtn type="button" onClick={handleRemovePhoto}>
                    <X size={14} />
                    Remover
                  </RemovePhotoBtn>
                )}
              </ButtonRow>
            </PhotoTextBlock>
          </ProfilePhotoArea>

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
                <InputIcon>
                  <User size={16} />
                  <RegisterInput
                    type="text"
                    placeholder="Ex: Maria da Silva"
                    value={form.name}
                    $error={!!errors.name}
                    onChange={(e) => {
                      clearError("name");
                      setForm((f) => ({ ...f, name: e.target.value }));
                    }}
                  />
                </InputIcon>
                {errors.name && <FieldError>{errors.name}</FieldError>}
              </RegisterField>
              <RegisterField>
                <RegisterLabel>
                  CPF <span>*</span>
                </RegisterLabel>
                <InputIcon>
                  <FileText size={16} />
                  <RegisterInput
                    type="text"
                    placeholder="000.000.000-00"
                    value={form.cpf_hash}
                    $error={!!errors.cpf_hash}
                    onChange={(e) => {
                      clearError("cpf_hash");
                      setForm((f) => ({
                        ...f,
                        cpf_hash: formatCPF(e.target.value),
                      }));
                    }}
                  />
                </InputIcon>
                {errors.cpf_hash && <FieldError>{errors.cpf_hash}</FieldError>}
              </RegisterField>
              <RegisterField>
                <RegisterLabel>
                  E-mail <span>*</span>
                </RegisterLabel>
                <InputIcon>
                  <Mail size={16} />
                  <RegisterInput
                    type="email"
                    placeholder="aluno@email.com"
                    value={form.email}
                    $error={!!errors.email}
                    onChange={(e) => {
                      clearError("email");
                      setForm((f) => ({ ...f, email: e.target.value }));
                    }}
                  />
                </InputIcon>
                {errors.email && <FieldError>{errors.email}</FieldError>}
              </RegisterField>
              <RegisterField>
                <RegisterLabel>
                  Telefone / WhatsApp <span>*</span>
                </RegisterLabel>
                <InputIcon>
                  <Phone size={16} />
                  <RegisterInput
                    type="text"
                    placeholder="(00) 00000-0000"
                    value={form.phone}
                    $error={!!errors.phone}
                    onChange={(e) => {
                      clearError("phone");
                      setForm((f) => ({
                        ...f,
                        phone: formatPhone(e.target.value),
                      }));
                    }}
                  />
                </InputIcon>
                {errors.phone && <FieldError>{errors.phone}</FieldError>}
              </RegisterField>
              <RegisterField>
                <RegisterLabel>
                  Data de Nascimento <span>*</span>
                </RegisterLabel>
                <InputIcon>
                  <Calendar size={16} />
                  <RegisterInput
                    type="date"
                    value={form.birthdate}
                    $error={!!errors.birthdate}
                    onChange={(e) => {
                      clearError("birthdate");
                      setForm((f) => ({ ...f, birthdate: e.target.value }));
                    }}
                  />
                </InputIcon>
                {errors.birthdate && <FieldError>{errors.birthdate}</FieldError>}
              </RegisterField>
              <RegisterField>
                <RegisterLabel>Gênero</RegisterLabel>
                <GenderSelector>
                  <GenderOption
                    type="button"
                    $selected={gender === "masculino"}
                    onClick={() => setGender("masculino")}
                  >
                    Masculino
                  </GenderOption>
                  <GenderOption
                    type="button"
                    $selected={gender === "feminino"}
                    onClick={() => setGender("feminino")}
                  >
                    Feminino
                  </GenderOption>
                  <GenderOption
                    type="button"
                    $selected={gender === "outro"}
                    onClick={() => setGender("outro")}
                  >
                    Outro
                  </GenderOption>
                </GenderSelector>
              </RegisterField>
              <RegisterField className="full-width">
                <RegisterLabel>
                  Endereço
                </RegisterLabel>
                <InputIcon>
                  <MapPin size={16} />
                  <RegisterInput
                    type="text"
                    placeholder="Rua, número, bairro, cidade - UF"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </InputIcon>
              </RegisterField>
            </RegisterGrid>
          </RegisterSection>

          {/* Plano */}
          <RegisterSection>
            <RegisterSectionTitle>
              <BookOpen size={16} /> Plano e Turma
            </RegisterSectionTitle>
            <RegisterGrid>
              <RegisterField>
                <RegisterLabel style={{ marginBottom: "0.2rem" }}>
                  Tipo de Plano <span>*</span>
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
                    <p>Aulas em turma, material incluso.</p>
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
                    <p>Aulas particulares, horário flexível.</p>
                  </PlanCard>
                </PlanSelector>
              </RegisterField>
              <RegisterField>
                <RegisterLabel>
                  Nível <span>*</span>
                </RegisterLabel>
                <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                  <CustomDropdown
                    value={String(form.level_id)}
                    onChange={(val) => setForm((f) => ({ ...f, level_id: Number(val) }))}
                    options={levels.map(l => ({ value: String(l.id), label: l.name }))}
                    style={{ flex: 1 }}
                  />
                  {!isAddingLevel && (
                    <AddLevelBtn
                      type="button"
                      onClick={() => setIsAddingLevel(true)}
                      title="Adicionar Nível"
                    >
                      <Plus size={18} />
                    </AddLevelBtn>
                  )}
                </div>
                {isAddingLevel && (
                  <AddLevelInline>
                    <RegisterInput
                      type="text"
                      placeholder="Nome do novo nível..."
                      value={newLevelName}
                      onChange={e => setNewLevelName(e.target.value)}
                      style={{ flex: 1, height: "44px" }}
                      autoFocus
                    />
                    <SaveLevelBtn type="button" onClick={handleAddLevel}>
                      <Save size={14} /> Salvar
                    </SaveLevelBtn>
                    <CancelLevelBtn
                      type="button"
                      onClick={() => { setIsAddingLevel(false); setNewLevelName(""); }}
                    >
                      <X size={18} />
                    </CancelLevelBtn>
                  </AddLevelInline>
                )}
              </RegisterField>
            </RegisterGrid>
          </RegisterSection>

          {/* Observações */}
          <RegisterSection>
            <RegisterSectionTitle>
              <FileText size={16} /> Observações
            </RegisterSectionTitle>
            <RegisterTextarea
              placeholder="Informações adicionais sobre o aluno, objetivos, disponibilidade, preferências de horário..."
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
