import styled from "styled-components";

export type StatusPassword = "veryWeak" | "weak" | "strong" | "veryStrong";

const colorByStatus = (status: StatusPassword | null) => {
  switch (status) {
    case "veryWeak":
      return "#641512";
    case "weak":
      return "#c0681f";
    case "strong":
      return "#dfcd2b";
    case "veryStrong":
      return "#03723a";
    default:
      return "rgba(255, 255, 255, 0.35)";
  }
};

export const CheckPasswordContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
  width: 100%;
  margin-top: -0.25rem;
  font-family: inherit;
`;

export const CheckPasswordWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 0.375rem;
  gap: 0.25rem;
`;

export const CheckPasswordItem = styled.div<{ color: StatusPassword | null }>`
  flex: 1;
  height: 100%;
  border-radius: 999px;
  background-color: ${(props) => colorByStatus(props.color)};
  transition: background-color 0.2s ease-in-out;
`;

export const CheckPasswordLabel = styled.span<{ color: StatusPassword | null }>`
  font-family: inherit;
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: 0.01em;
  color: ${(props) =>
    props.color ? colorByStatus(props.color) : "rgba(255, 255, 255, 0.85)"};
`;

export const FormError = styled.p`
  font-family: inherit;
  font-size: 0.8125rem;
  font-weight: 500;
  color: #641512;
  margin: 0;
`;
