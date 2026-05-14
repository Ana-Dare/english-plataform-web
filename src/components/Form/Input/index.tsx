import React from "react";
import { Field, InputField } from "./style";

//onChange função para guardar o valor digitado no useState
//label é o texto que vai aparecer acima do input
//type é o tipo do input, como "text", "email", "password", etc.
//placeholder é o texto que aparece dentro do input quando ele está vazio
//icon é um elemento React opcional que pode ser usado para mostrar um ícone dentro do input
//value é o valor atual do input, que deve ser controlado pelo componente pai
//feedback é um objeto opcional que recebe uma função para passar o se deu erro, sucesso ou aviso
//disabled é uma propriedade opcional que, se verdadeira, desabilita o input

export interface feedbackTypes {
  type: "danger" | "success" | "warning";
}

interface InputProps {
  label: string;
  type: string;
  placeholder: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  feedback?: feedbackTypes;
  helpText?: string;
  disabled?: boolean;
  required?: boolean;
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
}: InputProps) => {
  return (
    <Field $feedback={feedback?.type}>
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
        />
        {iconRight}
      </InputField>

      {feedback && <p>{helpText}</p>}
    </Field>
  );
};

export default Input;
