/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Save } from "lucide-react";
import {
  Container,
  RegisterContainer,
  RegisterHeader,
  RegisterHeaderLeft,
  RegisterBody,
  RegisterFooter,
  DetailActionBtn,
} from "../style";
import { FooterNav, FooterActions } from "./style";
import Stepper, { type StepDefinition } from "./Stepper";
import StepPersonalInfo from "./StepPersonalInfo";
import StepClassInfo from "./StepClassInfo";
import type {
  StudentFormState,
  FieldErrors,
  PersonalFieldKey,
  LevelOption,
} from "./types";
import type { RegisterStudentParams } from "../../../../interfaces/students";
import { isValidCPF } from "../helpers/validateCPF";
import { isValidEmail } from "../helpers/validateEmail";
import { isValidPhone } from "../helpers/validatePhone";
import { isValidBirthdate } from "../helpers/validateBirthdate";
import useToast from "../../../../contexts/Toast/useToast";
import { useQuery, useMutation } from "@tanstack/react-query";
import { listLevels, createLevel } from "../../services/level";

interface RegisterStudentProps {
  onBack: () => void;
  onSave: (student: RegisterStudentParams, photoBlob?: Blob) => void;
  isSaving?: boolean;
}

const STEPS: StepDefinition[] = [
  { label: "Dados do Aluno", icon: "user" },
  { label: "Dados da Aula", icon: "book" },
];

const TURMAS = [
  { value: "", label: "Não atribuída" },
  { value: "turma-a", label: "Turma A" },
  { value: "turma-b", label: "Turma B" },
  { value: "turma-c", label: "Turma C" },
];

const INITIAL_FORM: StudentFormState = {
  name: "",
  cpf_hash: "",
  email: "",
  phone: "",
  birthdate: "",
  vip: 0,
  level_id: 1,
  notes: "",
  active: 1,
  gender: "",
  photoUrl: null,
  photoBlob: null,
  turma: "",
};

const RegisterStudent = ({
  onBack,
  onSave,
  isSaving = false,
}: RegisterStudentProps) => {
  const { addToast } = useToast();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<StudentFormState>(INITIAL_FORM);
  const [levels, setLevels] = useState<LevelOption[]>([]);
  const [errors, setErrors] = useState<FieldErrors>({});

  const handleChange = (patch: Partial<StudentFormState>) => {
    setForm((prev: any) => ({ ...prev, ...patch }));
  };

  const clearError = (key: PersonalFieldKey) => {
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  //useQuery de níveis

  const { data: dataLevels } = useQuery({
    queryKey: ["levels"],
    queryFn: () => listLevels(),
  });

  // Mutation para criar novo nível
  const createLevelMutation = useMutation({
    mutationFn: (name: string) => createLevel(name, ""),
    onSuccess: (newLevel) => {
      const levelOption: LevelOption = {
        id: newLevel.id,
        name: newLevel.name,
      };
      setLevels((prev) => [...prev, levelOption]);
      handleChange({ level_id: newLevel.id });
      addToast(`Nível "${newLevel.name}" criado com sucesso!`, "success");
    },
    onError: () => {
      addToast("Erro ao criar nível. Tente novamente.", "error");
    },
  });

  // Atualiza níveis quando dados da API chegam
  useEffect(() => {
    if (dataLevels?.levels && dataLevels.levels.length > 0) {
      const mappedLevels: LevelOption[] = dataLevels.levels.map((level) => ({
        id: level.id,
        name: level.name,
      }));
      setLevels(mappedLevels);
    }
  }, [dataLevels]);

  // Manipular foto de perfil

  // Trocar prévia

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      addToast("A imagem deve ter no máximo 5MB.", "warning");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      handleChange({
        photoUrl: reader.result as string, // para preview
        photoBlob: file, // para envio
      });
    };
    reader.readAsDataURL(file);
  };

  // Remover prévia
  const handleRemovePhoto = () => {
    handleChange({ photoUrl: null, photoBlob: null });
  };

  const handleAddLevel = (name: string) => {
    if (!name.trim()) {
      addToast("O nome do nível é obrigatório.", "warning");
      return;
    }
    createLevelMutation.mutate(name.trim());
  };

  /** Valida a etapa 1 (dados pessoais). Retorna true se válida. */
  const validatePersonalInfo = () => {
    const next: FieldErrors = {};

    if (!form.name.trim()) next.name = "Informe o nome completo.";
    else if (form.name.trim().length < 3)
      next.name = "O nome deve ter pelo menos 3 caracteres.";

    if (!form.email.trim()) next.email = "Informe o e-mail.";
    else if (!isValidEmail(form.email)) next.email = "E-mail inválido.";

    if (!form.phone.trim()) next.phone = "Informe o telefone.";
    else if (!isValidPhone(form.phone)) next.phone = "Telefone inválido.";

    if (!form.cpf_hash.trim()) next.cpf_hash = "Informe o CPF.";
    else if (!isValidCPF(form.cpf_hash)) next.cpf_hash = "CPF inválido.";

    if (!form.birthdate) next.birthdate = "Informe a data de nascimento.";
    else if (!isValidBirthdate(form.birthdate))
      next.birthdate = "Data de nascimento inválida.";

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleNext = () => {
    if (!validatePersonalInfo()) {
      addToast(
        "Por favor, preencha os campos obrigatórios corretamente.",
        "warning",
      );
      return;
    }
    setStep(2);
  };

  const handlePrev = () => {
    setStep(1);
  };

  const handleSubmit = () => {
    // Revalida a etapa 1 por segurança antes de salvar
    if (!validatePersonalInfo()) {
      setStep(1);
      addToast(
        "Revise os dados do aluno antes de finalizar o cadastro.",
        "warning",
      );
      return;
    }

    const payload: RegisterStudentParams = {
      name: form.name,
      cpf_hash: form.cpf_hash,
      email: form.email,
      phone: form.phone,
      birthdate: form.birthdate,
      vip: form.vip,
      level_id: form.level_id,
      notes: form.notes,
      active: form.active,
    };

    onSave(payload, form.photoBlob || undefined);
  };

  return (
    <Container>
      <RegisterContainer>
        <RegisterHeader>
          <RegisterHeaderLeft>
            <h2>Cadastrar Novo Aluno</h2>
            <p>
              {step === 1
                ? "Etapa 1 de 2 — Informações do aluno"
                : "Etapa 2 de 2 — Informações sobre a aula"}
            </p>
          </RegisterHeaderLeft>
          <Stepper steps={STEPS} current={step} />
        </RegisterHeader>

        <RegisterBody>
          {step === 1 ? (
            <StepPersonalInfo
              form={form}
              errors={errors}
              onChange={handleChange}
              onClearError={clearError}
              onPhotoChange={handlePhotoChange}
              onRemovePhoto={handleRemovePhoto}
            />
          ) : (
            <StepClassInfo
              form={form}
              levels={levels}
              turmas={TURMAS}
              onChange={handleChange}
              onAddLevel={handleAddLevel}
              isAddingLevel={createLevelMutation.isPending}
            />
          )}
        </RegisterBody>

        <RegisterFooter>
          <FooterNav>
            {step === 1 ? (
              <DetailActionBtn $variant="secondary" onClick={onBack}>
                <ArrowLeft size={16} /> Cancelar
              </DetailActionBtn>
            ) : (
              <DetailActionBtn $variant="secondary" onClick={handlePrev}>
                <ArrowLeft size={16} /> Voltar
              </DetailActionBtn>
            )}

            <FooterActions>
              {step === 1 ? (
                <DetailActionBtn $variant="primary" onClick={handleNext}>
                  Avançar <ArrowRight size={16} />
                </DetailActionBtn>
              ) : (
                <DetailActionBtn
                  $variant="primary"
                  onClick={handleSubmit}
                  disabled={isSaving}
                >
                  <Save size={16} />{" "}
                  {isSaving ? "Salvando..." : "Salvar Cadastro"}
                </DetailActionBtn>
              )}
            </FooterActions>
          </FooterNav>
        </RegisterFooter>
      </RegisterContainer>
    </Container>
  );
};

export default RegisterStudent;
