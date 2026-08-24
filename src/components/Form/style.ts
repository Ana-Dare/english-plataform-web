import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  width: 55%;
  padding: 2rem;
  font-family: "Rubik", sans-serif;

  @media (max-width: 768px) {
    width: 100%;
    padding: 1.5rem;
    min-height: 100vh;
  }
`;

export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 3rem;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.colors.gold};
  box-shadow:
    0 30px 60px rgba(0, 0, 0, 0.2),
    0 15px 30px rgba(204, 171, 74, 0.35),
    inset 0 1px 1px rgba(255, 255, 255, 0.4);
  filter: drop-shadow(0 0 20px rgba(204, 171, 74, 0.15));
  background: linear-gradient(135deg, #ccab4a 0%, #b38d21 100%);
  border-radius: 150px 24px 24px 24px;
  width: 100%;
  max-width: 640px;
  height: fit-content;

  <<<<<<< HEAD ======= @media (max-width: 768px) {
    padding: 2rem 1.5rem;
    border-radius: 40px 24px 24px 24px;
  }

  >>>>>>>baf0919 (feat: criaçaõ dashboard professora) .link {
    color: ${({ theme }) => theme.colors.white};
    font-weight: 500;
    text-decoration: none;
    text-align: right;
    &:hover {
      color: ${({ theme }) => theme.colors.white};
      text-decoration: underline;
    }
  }
`;

export const FormHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
  justify-content: center;
  align-items: center;

  h2 {
    font-size: 1.5rem;
    color: ${({ theme }) => theme.colors.white};
    font-weight: 400;
    line-height: 1.6;
  }

  p {
    font-size: ${({ theme }) => theme.sizes.subtitle};
    color: ${({ theme }) => theme.colors.white};
    font-weight: 300;
    line-height: 1.6;
    text-align: center;
  }
`;

export const CheckPasswordStyele = styled.div`
  width: 100%;
  height: 3px;
  border-radius: 999;
`;
