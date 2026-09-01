import React, { useRef } from "react";
import {
  User,
  Camera,
  Upload,
  X,
  Phone,
  Mail,
  Calendar,
  FileText,
} from "lucide-react";
import {
  RegisterSection,
  RegisterSectionTitle,
  RegisterGrid,
  RegisterField,
  RegisterLabel,
  RegisterInput,
  FieldError,
} from "../style";
import {
  ProfilePhotoArea,
  PhotoCircle,
  PhotoOverlay,
  PhotoTextBlock,
  UploadBtn,
  RemovePhotoBtn,
  ButtonRow,
  InputIcon,
  GenderSelector,
  GenderOption,
} from "./style";
import { formatCPF } from "../helpers/validateCPF";
import { formatPhone } from "../helpers/validatePhone";
import type { StudentFormState, FieldErrors, PersonalFieldKey } from "./types";

interface StepPersonalInfoProps {
  form: StudentFormState;
  errors: FieldErrors;
  onChange: (patch: Partial<StudentFormState>) => void;
  onClearError: (key: PersonalFieldKey) => void;
  onPhotoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemovePhoto: () => void;
}

const GENDER_OPTIONS = [
  { value: "masculino", label: "Masculino" },
  { value: "feminino", label: "Feminino" },
  { value: "outro", label: "Outro" },
];

const StepPersonalInfo: React.FC<StepPersonalInfoProps> = ({
  form,
  errors,
  onChange,
  onClearError,
  onPhotoChange,
  onRemovePhoto,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleRemovePhoto = () => {
    onRemovePhoto();
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <>
      {/* Dados pessoais */}
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
                  onClearError("name");
                  onChange({ name: e.target.value });
                }}
              />
            </InputIcon>
            {errors.name && <FieldError>{errors.name}</FieldError>}
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
                  onClearError("email");
                  onChange({ email: e.target.value });
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
                  onClearError("phone");
                  onChange({ phone: formatPhone(e.target.value) });
                }}
              />
            </InputIcon>
            {errors.phone && <FieldError>{errors.phone}</FieldError>}
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
                  onClearError("cpf_hash");
                  onChange({ cpf_hash: formatCPF(e.target.value) });
                }}
              />
            </InputIcon>
            {errors.cpf_hash && <FieldError>{errors.cpf_hash}</FieldError>}
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
                  onClearError("birthdate");
                  onChange({ birthdate: e.target.value });
                }}
              />
            </InputIcon>
            {errors.birthdate && <FieldError>{errors.birthdate}</FieldError>}
          </RegisterField>

          <RegisterField>
            <RegisterLabel>Gênero</RegisterLabel>
            <GenderSelector>
              {GENDER_OPTIONS.map((option) => (
                <GenderOption
                  key={option.value}
                  type="button"
                  $selected={form.gender === option.value}
                  onClick={() => onChange({ gender: option.value })}
                >
                  {option.label}
                </GenderOption>
              ))}
            </GenderSelector>
          </RegisterField>
        </RegisterGrid>
      </RegisterSection>

      {/* Foto do aluno (por último) - banda compacta */}
      <ProfilePhotoArea>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={onPhotoChange}
          style={{ display: "none" }}
        />
        <PhotoCircle
          $hasImage={!!form.photoUrl}
          onClick={() => fileInputRef.current?.click()}
        >
          {form.photoUrl ? (
            <img src={form.photoUrl} alt="Foto do aluno" />
          ) : (
            <Camera size={22} />
          )}
          <PhotoOverlay className="overlay">
            <Camera size={24} />
          </PhotoOverlay>
        </PhotoCircle>
        <PhotoTextBlock>
          <h4>Adicione uma foto de perfil</h4>
          <p>Opcional. JPG ou PNG, até 5MB.</p>
        </PhotoTextBlock>
        <ButtonRow>
          <UploadBtn
            type="button"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload size={14} />
            {form.photoUrl ? "Trocar foto" : "Selecionar foto"}
          </UploadBtn>
          {form.photoUrl && (
            <RemovePhotoBtn type="button" onClick={handleRemovePhoto}>
              <X size={14} />
              Remover
            </RemovePhotoBtn>
          )}
        </ButtonRow>
      </ProfilePhotoArea>
    </>
  );
};

export default StepPersonalInfo;
