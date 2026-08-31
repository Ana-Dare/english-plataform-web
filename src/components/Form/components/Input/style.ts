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
    color: #334155;
  }

  p,
  > span {
    font-size: 0.875rem;
    font-weight: 700;
    color: ${(props) =>
      props.$feedback === "danger"
        ? "#dc2626"
        : props.$feedback === "success"
          ? "#16a34a"
          : props.$feedback === "warning"
            ? "#ca8a04"
            : "#64748b"};
  }
`;

export const FeedbackMessage = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  line-height: 1.2;

  svg {
    flex-shrink: 0;
  }
`;

export const InputField = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom: solid 1.5px #e2e8f0;
  border-top: none;
  border-left: none;
  border-right: none;
  gap: 1rem;
  width: 100%;
  box-sizing: border-box;
  padding: 0 0.5rem 0.5rem 0.5rem;
  transition: border-color 0.2s ease;

  &:focus-within {
    border-color: #3b82f6;
  }

  input {
    border: none;
    padding: 0.5rem;
    width: 100%;
    background: transparent;
    color: #1e293b;
    box-sizing: border-box;
    font-size: ${(props) => props.theme.sizes.subtitle};
    flex: 1;
    &:focus {
      outline: none;
    }
    &::placeholder {
      color: #94a3b8;
    }

    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus,
    &:-webkit-autofill:active {
      -webkit-text-fill-color: #1e293b !important;
      transition: background-color 5000s ease-in-out 0s;
      box-shadow: 0 0 0px 1000px #fff inset !important;
      font-size: 1 !important;
    }
    &:-webkit-autofill::placeholder {
      color: #94a3b8;
    }
  }
`;
