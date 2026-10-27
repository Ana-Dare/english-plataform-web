import React, { useState } from "react";
import {
  BookOpen,
  Award,
  CheckCircle2,
  Users,
  FileText,
  Plus,
  X,
  Save,
} from "lucide-react";
import {
  DetailSection,
  DetailSectionTitle,
  DetailGrid,
  DetailField,
  DetailFieldLabel,
  RegisterInput,
} from "../style";
import {
  LevelRow,
  DropdownFit,
  AddLevelBtn,
  AddLevelInline,
  SaveLevelBtn,
  CancelLevelBtn,
  PlanToggleGroup,
  PlanOptionCard,
  StatusToggleGroup,
  StatusOptionBtn,
} from "./style";
import CustomDropdown from "../../../../components/CustomDropdown";
import type { StudentFormState, LevelOption } from "./types";

interface StepClassInfoProps {
  form: StudentFormState;
  levels: LevelOption[];
  turmas: { value: string; label: string }[];
  onChange: (patch: Partial<StudentFormState>) => void;
  onAddLevel: (name: string) => void;
  isAddingLevel?: boolean;
}

const StepClassInfo: React.FC<StepClassInfoProps> = ({
  form,
  levels,
  turmas,
  onChange,
  onAddLevel,
  isAddingLevel = false,
}) => {
  const [showAddLevelForm, setShowAddLevelForm] = useState(false);
  const [newLevelName, setNewLevelName] = useState("");

  const handleAddLevel = () => {
    if (!newLevelName.trim()) return;
    onAddLevel(newLevelName.trim());
    setNewLevelName("");
    setShowAddLevelForm(false);
  };

  return (
    <>
      {/* 1. Informações da Aula / Informações Acadêmicas no padrão do Perfil de Alunos */}
      <DetailSection>
        <DetailSectionTitle $bg="#FEF6F5" $color="#C57A67">
          <div className="icon-box">
            <BookOpen size={18} />
          </div>
          Informações da Aula
        </DetailSectionTitle>

        <DetailGrid>
          {/* Linha 1: Tipo de Plano */}
          <DetailField>
            <div className="field-icon">
              <Award size={20} />
            </div>
            <div className="field-content">
              <DetailFieldLabel>
                Tipo de Plano <span className="required">*</span>
              </DetailFieldLabel>
              <PlanToggleGroup>
                <PlanOptionCard
                  type="button"
                  $selected={form.vip === 0}
                  onClick={() => onChange({ vip: 0 })}
                >
                  <div className="plan-radio">
                    {form.vip === 0 && <CheckCircle2 size={12} strokeWidth={3} />}
                  </div>
                  <div className="plan-text">
                    <strong>Regular</strong>
                    <span>Aulas em turma</span>
                  </div>
                </PlanOptionCard>

                <PlanOptionCard
                  type="button"
                  $selected={form.vip === 1}
                  onClick={() => onChange({ vip: 1 })}
                >
                  <div className="plan-radio">
                    {form.vip === 1 && <CheckCircle2 size={12} strokeWidth={3} />}
                  </div>
                  <div className="plan-text">
                    <strong>VIP</strong>
                    <span>Aulas particulares</span>
                  </div>
                </PlanOptionCard>
              </PlanToggleGroup>
            </div>
          </DetailField>

          {/* Linha 1: Status da Matrícula */}
          <DetailField>
            <div className="field-icon">
              <CheckCircle2 size={20} />
            </div>
            <div className="field-content">
              <DetailFieldLabel>Status da Matrícula</DetailFieldLabel>
              <StatusToggleGroup>
                <StatusOptionBtn
                  type="button"
                  $active={form.active === 1}
                  $variant="active"
                  onClick={() => onChange({ active: 1 })}
                >
                  <span className="dot" />
                  Ativo
                </StatusOptionBtn>
                <StatusOptionBtn
                  type="button"
                  $active={form.active === 0}
                  $variant="inactive"
                  onClick={() => onChange({ active: 0 })}
                >
                  <span className="dot" />
                  Inativo
                </StatusOptionBtn>
              </StatusToggleGroup>
            </div>
          </DetailField>

          {/* Linha 2: Nível */}
          <DetailField>
            <div className="field-icon">
              <Award size={20} />
            </div>
            <div className="field-content">
              <DetailFieldLabel>
                Nível <span className="required">*</span>
              </DetailFieldLabel>
              <LevelRow>
                <DropdownFit>
                  <CustomDropdown
                    value={String(form.level_id)}
                    onChange={(val) => onChange({ level_id: Number(val) })}
                    fullWidth
                    options={levels.map((l) => ({
                      value: String(l.id),
                      label: l.name,
                    }))}
                  />
                </DropdownFit>
                {!showAddLevelForm && (
                  <AddLevelBtn
                    type="button"
                    onClick={() => setShowAddLevelForm(true)}
                    title="Adicionar Novo Nível"
                  >
                    <Plus size={18} />
                  </AddLevelBtn>
                )}
              </LevelRow>

              {showAddLevelForm && (
                <AddLevelInline>
                  <RegisterInput
                    type="text"
                    placeholder="Nome do novo nível..."
                    value={newLevelName}
                    onChange={(e) => setNewLevelName(e.target.value)}
                    autoFocus
                    disabled={isAddingLevel}
                  />
                  <SaveLevelBtn
                    type="button"
                    onClick={handleAddLevel}
                    disabled={isAddingLevel}
                    title={isAddingLevel ? "Criando..." : "Salvar nível"}
                  >
                    <Save size={14} /> {isAddingLevel ? "..." : "Salvar"}
                  </SaveLevelBtn>
                  <CancelLevelBtn
                    type="button"
                    onClick={() => {
                      setShowAddLevelForm(false);
                      setNewLevelName("");
                    }}
                    disabled={isAddingLevel}
                    title="Cancelar"
                  >
                    <X size={18} />
                  </CancelLevelBtn>
                </AddLevelInline>
              )}
            </div>
          </DetailField>

          {/* Linha 2: Turma */}
          <DetailField>
            <div className="field-icon">
              <Users size={20} />
            </div>
            <div className="field-content">
              <DetailFieldLabel>Turma</DetailFieldLabel>
              <DropdownFit>
                <CustomDropdown
                  value={form.turma}
                  onChange={(val) => onChange({ turma: val })}
                  fullWidth
                  options={turmas}
                  placeholder="Selecione a turma"
                />
              </DropdownFit>
            </div>
          </DetailField>
        </DetailGrid>
      </DetailSection>

      {/* 2. Observações e Objetivos */}
      <DetailSection>
        <DetailSectionTitle $bg="#F1F5F9" $color="#475569">
          <div className="icon-box">
            <FileText size={18} />
          </div>
          Observações e Objetivos
        </DetailSectionTitle>

        <div style={{ padding: "28px 24px" }}>
          <DetailField className="align-top">
            <div className="field-icon">
              <FileText size={20} />
            </div>
            <div className="field-content">
              <DetailFieldLabel>Notas sobre o Aluno</DetailFieldLabel>
              <textarea
                placeholder="Informações adicionais sobre o aluno, objetivos de aprendizado, disponibilidade de horário, observações pedagógicas..."
                value={form.notes}
                onChange={(e) => onChange({ notes: e.target.value })}
                style={{ minHeight: "110px" }}
              />
            </div>
          </DetailField>
        </div>
      </DetailSection>
    </>
  );
};

export default StepClassInfo;
