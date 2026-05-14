import styled from "styled-components";

export interface FieldProps {
  $feedback?: "danger" | "success" | "warning";
}

export const Field = styled.div<FieldProps>`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 0.5rem;

  label {
    font-size: 1rem;
    font-weight: 500;
    color: ${(props) => props.theme.colors.white};
  }

  p {
    font-size: 0.875rem;
    color: ${(props) =>
      props.$feedback === "danger"
        ? props.theme.colors.danger
        : props.$feedback === "success"
          ? props.theme.colors.success
          : props.$feedback === "warning"
            ? props.theme.colors.gold
            : props.theme.colors.white};
  }
`;

export const InputField = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom: solid 1px ${(props) => props.theme.colors.bg};
  border-top: none;
  border-left: none;
  border-right: none;
  gap: 1rem;
  width: 100%;
  box-sizing: border-box;
  padding: 0 0.5rem;

  input {
    border: none;
    padding: 0.5rem;
    width: 100%;
    background: transparent;
    color: ${(props) => props.theme.colors.white};
    box-sizing: border-box;
    font-size: ${(props) => props.theme.sizes.subtitle};
    flex: 1;
    &:focus {
      outline: none;
    }
    &::placeholder {
      color: ${(props) => props.theme.colors.white};
    }
  }
`;
