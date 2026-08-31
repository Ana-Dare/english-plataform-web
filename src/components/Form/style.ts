import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  width: 55%;
  padding: 2rem;
  background-color: #ffffff;
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
  gap: 1.5rem;
  padding: 3rem;
  box-sizing: border-box;
  background-color: transparent;
  width: 100%;
  max-width: 440px;
  height: fit-content;

  @media (max-width: 768px) {
    padding: 2rem 1.5rem;
    border-radius: 24px;
  }

  .link {
    color: #08142c;
    font-weight: 500;
    text-decoration: none;
    text-align: right;
    cursor: pointer;
    font-size: 0.9rem;
    &:hover {
      color: #3b82f6;
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
    font-size: 1.8rem;
    color: #08142c;
    font-weight: 700;
    line-height: 1.2;
    margin: 0;
  }

  p {
    font-size: 0.95rem;
    color: #64748b;
    font-weight: 400;
    line-height: 1.4;
    text-align: center;
    margin: 0 0 1rem 0;
  }
`;

export const CheckPasswordStyele = styled.div`
  width: 100%;
  height: 3px;
  border-radius: 999;
`;
