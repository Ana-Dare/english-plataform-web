import React from "react";
import { Check, User, BookOpen } from "lucide-react";
import {
  StepperWrapper,
  StepItem,
  StepCircle,
  StepLabel,
  StepConnector,
} from "./style";

export interface StepDefinition {
  label: string;
  icon: "user" | "book";
}

interface StepperProps {
  steps: StepDefinition[];
  /** Etapa atual (1-based) */
  current: number;
}

const iconMap = {
  user: User,
  book: BookOpen,
};

const Stepper: React.FC<StepperProps> = ({ steps, current }) => {
  return (
    <StepperWrapper>
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber === current;
        const isDone = stepNumber < current;
        const Icon = iconMap[step.icon];

        return (
          <React.Fragment key={step.label}>
            <StepItem>
              <StepCircle $active={isActive} $done={isDone}>
                {isDone ? <Check size={16} /> : <Icon size={16} />}
              </StepCircle>
              <StepLabel $active={isActive} $done={isDone}>
                {step.label}
              </StepLabel>
            </StepItem>
            {stepNumber < steps.length && (
              <StepConnector $done={isDone} />
            )}
          </React.Fragment>
        );
      })}
    </StepperWrapper>
  );
};

export default Stepper;
