import React from "react";
import { ButtonStyles } from "./style";

// O componente Button é um botão estilizado que 
// pode ser personalizado com variantes, ícones e tamanhos.
//  Ele aceita todas as propriedades padrão de um botão HTML,
//  além de propriedades específicas para controle de estilo e comportamento.
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  $variant?: "primary" | "secondary" | "tertiary";
  disabled?: boolean;
  $loading?: boolean;
  $color?: string;
  $backgroundColor?: string;
  children: React.ReactNode;
  rightIcon?: React.ReactNode;
  leftIcon?: React.ReactNode;
  size?: "small" | "medium" | "large";
  wide?: boolean;
}

// O componente Button é um botão estilizado que 
// pode ser personalizado com variantes, ícones e tamanhos.
const Button = (props: ButtonProps) => {
  return (
    <ButtonStyles {...props}>
      {props.leftIcon}
      {props.children}
      {props.rightIcon}
    </ButtonStyles>
  );
};

export default Button;
