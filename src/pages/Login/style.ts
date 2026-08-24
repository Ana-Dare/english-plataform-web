import styled from "styled-components";

export const LoginStyle = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100vh;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
    min-height: 100vh;
    gap: 0;
  }
`;
