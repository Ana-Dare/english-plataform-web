import React, { useRef } from "react";
import {
  User,
  Camera,
  Upload,
  X,
  Phone,
  Mail,
  FileText,
  Calendar,
  Users,
} from "lucide-react";
import {
  DetailSection,
  DetailSectionTitle,
  DetailGrid,
  DetailField,
  DetailFieldLabel,
  FieldError,
} from "../style";
import {
  ProfilePhotoCard,
  AvatarContainer,
  AvatarCircle,
  CameraButton,
  PhotoCardInfo,
  PhotoCardTitle,
  PhotoActionsGroup,
  SelectPhotoBtn,
  RemovePhotoBtn,
  GenderSelector,
  GenderOption,
} from "./style";
import ModernDatePicker from "../../../../components/ModernDatePicker";
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
      {/* 1. Foto de perfil sempre no topo */}
      <ProfilePhotoCard>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={onPhotoChange}
          style={{ display: "none" }}
        />

        <AvatarContainer>
          <AvatarCircle
            $hasImage={!!form.photoUrl}
            onClick={() => fileInputRef.current?.click()}
            title="Selecionar foto de perfil"
          >
            {form.photoUrl ? (
              <img src={form.photoUrl} alt="Foto do aluno" />
            ) : (
              <User size={36} strokeWidth={1.8} />
            )}
          </AvatarCircle>
          <CameraButton
            type="button"
            onClick={() => fileInputRef.current?.click()}
            aria-label="Selecionar foto"
            title="Selecionar foto"
          >
            <Camera size={15} />
          </CameraButton>
        </AvatarContainer>

        <PhotoCardInfo>
          <PhotoCardTitle>Foto de perfil</PhotoCardTitle>
          <PhotoActionsGroup>
            <SelectPhotoBtn
              type="button"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload size={15} />
              {form.photoUrl ? "Trocar foto" : "Selecionar foto"}
            </SelectPhotoBtn>
            {form.photoUrl && (
              <RemovePhotoBtn type="button" onClick={handleRemovePhoto}>
                <X size={15} />
                Remover
              </RemovePhotoBtn>
            )}
          </PhotoActionsGroup>
        </PhotoCardInfo>
      </ProfilePhotoCard>

      {/* 2. Informações Pessoais - padrão idêntico ao perfil do aluno, campos organizados de dois em dois */}
      <DetailSection>
        <DetailSectionTitle $bg="#EEF2FF" $color="#4F46E5">
          <div className="icon-box">
            <User size={18} />
          </div>
          Informações Pessoais
        </DetailSectionTitle>

        <DetailGrid>
          {/* Linha 1: Nome Completo */}
          <DetailField>
            <div className="field-icon">
              <User size={20} />
            </div>
            <div className="field-content">
              <DetailFieldLabel>
                Nome Completo <span className="required">*</span>
              </DetailFieldLabel>
              <input
                type="text"
                placeholder="Ex: Maria da Silva"
                value={form.name}
                aria-invalid={!!errors.name}
                className={errors.name ? "error" : ""}
                onChange={(e) => {
                  onClearError("name");
                  onChange({ name: e.target.value });
                }}
              />
              {errors.name && <FieldError>{errors.name}</FieldError>}
            </div>
          </DetailField>

          {/* Linha 1: E-mail */}
          <DetailField>
            <div className="field-icon">
              <Mail size={20} />
            </div>
            <div className="field-content">
              <DetailFieldLabel>
                E-mail <span className="required">*</span>
              </DetailFieldLabel>
              <input
                type="email"
                placeholder="aluno@email.com"
                value={form.email}
                aria-invalid={!!errors.email}
                className={errors.email ? "error" : ""}
                onChange={(e) => {
                  onClearError("email");
                  onChange({ email: e.target.value });
                }}
              />
              {errors.email && <FieldError>{errors.email}</FieldError>}
            </div>
          </DetailField>

          {/* Linha 2: Telefone / WhatsApp */}
          <DetailField>
            <div className="field-icon">
              <Phone size={20} />
            </div>
            <div className="field-content">
              <DetailFieldLabel>
                Telefone / WhatsApp <span className="required">*</span>
              </DetailFieldLabel>
              <input
                type="text"
                placeholder="(00) 00000-0000"
                value={form.phone}
                aria-invalid={!!errors.phone}
                className={errors.phone ? "error" : ""}
                onChange={(e) => {
                  onClearError("phone");
                  onChange({ phone: formatPhone(e.target.value) });
                }}
              />
              {errors.phone && <FieldError>{errors.phone}</FieldError>}
            </div>
          </DetailField>

          {/* Linha 2: CPF */}
          <DetailField>
            <div className="field-icon">
              <FileText size={20} />
            </div>
            <div className="field-content">
              <DetailFieldLabel>
                CPF <span className="required">*</span>
              </DetailFieldLabel>
              <input
                type="text"
                placeholder="000.000.000-00"
                value={form.cpf_hash}
                aria-invalid={!!errors.cpf_hash}
                className={errors.cpf_hash ? "error" : ""}
                onChange={(e) => {
                  onClearError("cpf_hash");
                  onChange({ cpf_hash: formatCPF(e.target.value) });
                }}
              />
              {errors.cpf_hash && <FieldError>{errors.cpf_hash}</FieldError>}
            </div>
          </DetailField>

          {/* Linha 3: Data de Nascimento */}
          <DetailField>
            <div className="field-icon">
              <Calendar size={20} />
            </div>
            <div className="field-content">
              <DetailFieldLabel>
                Data de Nascimento <span className="required">*</span>
              </DetailFieldLabel>
              <ModernDatePicker
                value={form.birthdate}
                placeholder="DD/MM/AAAA"
                error={!!errors.birthdate}
                maxDate={new Date()}
                showYearSelector={true}
                placement="bottom"
                allowClear={true}
                onChange={(dateStr) => {
                  onClearError("birthdate");
                  onChange({ birthdate: dateStr });
                }}
              />
              {errors.birthdate && <FieldError>{errors.birthdate}</FieldError>}
            </div>
          </DetailField>

          {/* Linha 3: Gênero */}
          <DetailField>
            <div className="field-icon">
              <Users size={20} />
            </div>
            <div className="field-content">
              <DetailFieldLabel>Gênero</DetailFieldLabel>
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
            </div>
          </DetailField>
        </DetailGrid>
      </DetailSection>
    </>
  );
};

export default StepPersonalInfo;
