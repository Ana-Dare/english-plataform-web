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
} from "../style";
import {
  RegisterFooter,
  FooterNav,
  FooterActions,
  PrimaryBtn,
  SecondaryBtn,
} from "./style";
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
import { listClasses } from "../../services/class";

interface RegisterStudentProps {
  onBack: () => void;
  onSave: (student: RegisterStudentParams, photoBlob?: Blob) => void;
  isSaving?: boolean;
  initialTurmaId?: number | string | null;
  initialTurmaName?: string | null;
}

const STEPS: StepDefinition[] = [
  { label: "Dados do Aluno", icon: "user" },
  { label: "Dados da Aula", icon: "book" },
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

const RegisterStudent: React.FC<RegisterStudentProps> = ({
  onBack,
  onSave,
  isSaving = false,
  initialTurmaId,
  initialTurmaName,
}) => {
  const { addToast } = useToast();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<StudentFormState>(() => ({
    ...INITIAL_FORM,
    turma: initialTurmaId ? String(initialTurmaId) : "",
  }));
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

  // Carregar Níveis
  const { data: dataLevels } = useQuery({
    queryKey: ["levels"],
    queryFn: () => listLevels(),
  });

  // Carregar Turmas
  const { data: dataClasses } = useQuery({
    queryKey: ["classesList"],
    queryFn: () => listClasses(),
  });

  // Atualizar Níveis quando a requisição retornar
  useEffect(() => {
    if (dataLevels?.levels) {
      const mappedLevels: LevelOption[] = dataLevels.levels.map((lvl) => ({
        id: lvl.id,
        name: lvl.name,
      }));
      setLevels(mappedLevels);

      // Define o primeiro nível como padrão se form.level_id ainda não for válido
      if (
        mappedLevels.length > 0 &&
        !mappedLevels.some((l) => l.id === form.level_id)
      ) {
        handleChange({ level_id: mappedLevels[0].id });
      }
    }
  }, [dataLevels]);

  // Mutation para cadastrar novo nível inline
  const createLevelMutation = useMutation({
    mutationFn: (name: string) => createLevel(name, `Nível ${name}`),
    onSuccess: (res) => {
      const createdLevel: LevelOption = {
        id: res.id,
        name: res.name,
      };
      setLevels((prev) => [...prev, createdLevel]);
      handleChange({ level_id: createdLevel.id });
      addToast("Nível criado com sucesso!", "success");
    },
    onError: (err: any) => {
      const errorMsg =
        err?.response?.data?.error ||
        err?.response?.data?.message ||
        "Não foi possível criar o nível.";
      addToast(errorMsg, "error");
    },
  });

  const turmaOptions = [
    { value: "", label: "Não atribuída" },
    ...(dataClasses?.classes?.map((c) => ({
      value: String(c.id),
      label: c.name,
    })) || []),
  ];

  if (
    initialTurmaId &&
    initialTurmaName &&
    !turmaOptions.some((t) => t.value === String(initialTurmaId))
  ) {
    turmaOptions.push({
      value: String(initialTurmaId),
      label: initialTurmaName,
    });
  }

  useEffect(() => {
    if (initialTurmaId) {
      handleChange({ turma: String(initialTurmaId) });
    }
  }, [initialTurmaId]);

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
        photoUrl: reader.result as string,
        photoBlob: file,
      });
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = () => {
    handleChange({ photoUrl: null, photoBlob: null });
  };

  const handleAddLevel = (name: string) => {
    createLevelMutation.mutate(name);
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

    const classId = form.turma ? Number(form.turma) : null;

    const payload: RegisterStudentParams = {
      name: form.name.trim(),
      cpf_hash: form.cpf_hash,
      email: form.email.trim(),
      phone: form.phone,
      birthdate: form.birthdate,
      vip: form.vip,
      level_id: form.level_id,
      notes: form.notes?.trim() || "",
      active: form.active,
      class_id: classId,
    };

    onSave(payload, form.photoBlob || undefined);
  };

  return (
    <Container>
      <RegisterContainer>
        {/* Cabeçalho do formulário com Título e Stepper alinhados */}
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

        {/* Corpo do formulário */}
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
              turmas={turmaOptions}
              onChange={handleChange}
              onAddLevel={handleAddLevel}
              isAddingLevel={createLevelMutation.isPending}
            />
          )}
        </RegisterBody>

        {/* Rodapé com ações */}
        <RegisterFooter>
          <FooterNav>
            {step === 1 ? (
              <SecondaryBtn type="button" onClick={onBack}>
                <ArrowLeft size={16} /> Cancelar
              </SecondaryBtn>
            ) : (
              <SecondaryBtn type="button" onClick={handlePrev}>
                <ArrowLeft size={16} /> Voltar
              </SecondaryBtn>
            )}

            <FooterActions>
              {step === 1 ? (
                <PrimaryBtn type="button" onClick={handleNext}>
                  Avançar <ArrowRight size={16} />
                </PrimaryBtn>
              ) : (
                <PrimaryBtn
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSaving}
                >
                  <Save size={16} />{" "}
                  {isSaving ? "Salvando..." : "Salvar Cadastro"}
                </PrimaryBtn>
              )}
            </FooterActions>
          </FooterNav>
        </RegisterFooter>
      </RegisterContainer>
    </Container>
  );
};

export default RegisterStudent;
