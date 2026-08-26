import React, { type InputHTMLAttributes } from "react";
import { X } from "lucide-react";
import { Field, FeedbackMessage, InputField } from "./style";

//onChange função para guardar o valor digitado no useState
//label é o texto que vai aparecer acima do input
//type é o tipo do input, como "text", "email", "password", etc.
//placeholder é o texto que aparece dentro do input quando ele está vazio
//icon é um elemento React opcional que pode ser usado para mostrar um ícone dentro do input
//value é o valor atual do input, que deve ser controlado pelo componente pai
//feedback é um objeto opcional que recebe uma função para passar o se deu erro, sucesso ou aviso
//disabled é uma propriedade opcional que, se verdadeira, desabilita o input

export type feedbackTypes = {
  type: "danger" | "success" | "warning";
};

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  type: string;
  placeholder: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  feedback?: "danger" | "success" | "warning";
  helpText?: string;
  disabled?: boolean;
  required?: boolean;
  ref?: React.RefObject<HTMLInputElement | null>;
}

const Input = ({
  label,
  type,
  placeholder,
  iconLeft,
  value,
  onChange: onchange,
  feedback,
  helpText,
  disabled,
  required,
  iconRight,
  ref,
  ...rest
}: InputProps) => {
  return (
    <Field $feedback={feedback} {...rest}>
      <label>{label}</label>
      <InputField>
        {iconLeft}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onchange}
          disabled={disabled}
          required={required}
          ref={ref}
        />
        {iconRight}
      </InputField>

      {feedback && helpText && (
        <FeedbackMessage>
          {feedback === "danger" && <X size={14} strokeWidth={2.5} />}
          <span>{helpText}</span>
        </FeedbackMessage>
      )}
    </Field>
  );
};

export default Input;
