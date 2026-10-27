import styled from "styled-components";
import type { ButtonProps } from ".";

export const ButtonStyles = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== "wide" && prop !== "size",
})<ButtonProps>`
  background-color: ${(props) =>
    props.$backgroundColor
      ? props.$backgroundColor
      : props.$variant === "primary"
        ? props.theme.colors.blue
        : props.$variant === "secondary"
          ? props.theme.colors.white
          : props.$variant === "tertiary"
            ? "#5f2e2e"
            : props.theme.colors.blue};
  color: ${(props) =>
    props.$color
      ? props.$color
      : props.$variant === "primary"
        ? props.theme.colors.white
        : props.$variant === "secondary"
          ? props.theme.colors.text
          : props.$variant === "tertiary"
            ? props.theme.colors.white
            : props.theme.colors.white};
  padding: ${(props) =>
    props.size === "small"
      ? "0.375rem 0.75rem"
      : props.size === "medium"
        ? "0.625rem 1.25rem"
        : props.size === "large"
          ? "0.75rem 1.5rem"
          : "0.625rem 1.25rem"};
  border: none;
  border-radius: 8px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  opacity: ${(props) => (props.disabled ? 0.6 : 1)};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: ${(props) => (props.wide ? "100%" : "auto")};
  min-height: 2.8rem;
  font-family: "Rubik", sans-serif;
  font-weight: 700;
  font-size: ${(props) => props.theme.sizes.subtitle};
  line-height: 1.25;
  white-space: nowrap;
`;
