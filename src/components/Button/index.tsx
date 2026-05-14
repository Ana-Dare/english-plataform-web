import React from "react";
import { ButtonStyles } from "./style";

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
