import React, { useState } from "react";
import { BookOpen, Check, Plus, X, Save, Users, FileText } from "lucide-react";
import {
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
} from "../style";
import {
  LevelRow,
  DropdownFit,
  AddLevelInline,
  AddLevelBtn,
  SaveLevelBtn,
  CancelLevelBtn,
} from "./style";
import CustomDropdown from "../../../../components/CustomDropdown";
import type { StudentFormState, LevelOption } from "./types";

interface StepClassInfoProps {
  form: StudentFormState;
  levels: LevelOption[];
  turmas: { value: string; label: string }[];
  onChange: (patch: Partial<StudentFormState>) => void;
  onAddLevel: (name: string) => void;
}

const StepClassInfo: React.FC<StepClassInfoProps> = ({
  form,
  levels,
  turmas,
  onChange,
  onAddLevel,
}) => {
  const [isAddingLevel, setIsAddingLevel] = useState(false);
  const [newLevelName, setNewLevelName] = useState("");

  const handleAddLevel = () => {
    if (!newLevelName.trim()) return;
    onAddLevel(newLevelName.trim());
    setNewLevelName("");
    setIsAddingLevel(false);
  };

  return (
    <>
      {/* Plano e Turma */}
      <RegisterSection>
        <RegisterSectionTitle>
          <BookOpen size={16} /> Plano e Turma
        </RegisterSectionTitle>
        <RegisterGrid>
          <RegisterField className="full-width">
            <RegisterLabel style={{ marginBottom: "0.5rem" }}>
              Tipo de Plano <span>*</span>
            </RegisterLabel>
            <PlanSelector>
              <PlanCard
                $selected={form.vip === 0}
                $type="Regular"
                onClick={() => onChange({ vip: 0 })}
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
                onClick={() => onChange({ vip: 1 })}
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
            <LevelRow>
              <DropdownFit>
                <CustomDropdown
                  value={String(form.level_id)}
                  onChange={(val) => onChange({ level_id: Number(val) })}
                  options={levels.map((l) => ({
                    value: String(l.id),
                    label: l.name,
                  }))}
                />
              </DropdownFit>
              {!isAddingLevel && (
                <AddLevelBtn
                  type="button"
                  onClick={() => setIsAddingLevel(true)}
                  title="Adicionar Nível"
                >
                  <Plus size={18} />
                </AddLevelBtn>
              )}
            </LevelRow>
            {isAddingLevel && (
              <AddLevelInline>
                <RegisterInput
                  type="text"
                  placeholder="Nome do novo nível..."
                  value={newLevelName}
                  onChange={(e) => setNewLevelName(e.target.value)}
                  style={{ flex: 1, height: "44px" }}
                  autoFocus
                />
                <SaveLevelBtn type="button" onClick={handleAddLevel}>
                  <Save size={14} /> Salvar
                </SaveLevelBtn>
                <CancelLevelBtn
                  type="button"
                  onClick={() => {
                    setIsAddingLevel(false);
                    setNewLevelName("");
                  }}
                >
                  <X size={18} />
                </CancelLevelBtn>
              </AddLevelInline>
            )}
          </RegisterField>

          <RegisterField>
            <RegisterLabel>
              <Users size={14} /> Turma
            </RegisterLabel>
            <DropdownFit>
              <CustomDropdown
                value={form.turma}
                onChange={(val) => onChange({ turma: val })}
                options={turmas}
              />
            </DropdownFit>
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
          onChange={(e) => onChange({ notes: e.target.value })}
        />
      </RegisterSection>
    </>
  );
};

export default StepClassInfo;
