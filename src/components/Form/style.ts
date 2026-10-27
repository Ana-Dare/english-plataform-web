import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  width: 55%;
  min-width: 0;
  padding: clamp(1rem, 3vw, 2.5rem);
  background-color: #ffffff;
  font-family: "Rubik", sans-serif;

  @media (max-width: 1023px) {
    width: 60%;
  }

  @media (max-width: 767px) {
    width: 100%;
    padding: clamp(1rem, 4vw, 1.5rem);
    min-height: 100vh;
    min-height: 100dvh;
  }
`;

export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: clamp(1.25rem, 3vw, 2.5rem);
  box-sizing: border-box;
  background-color: transparent;
  width: 100%;
  max-width: 480px;
  min-width: 0;
  height: fit-content;
  justify-content: center;
  align-items: center;

  @media (max-width: 479px) {
    padding: 1rem 0.5rem;
  }

  .link {
    color: #08142c;
    font-weight: 500;
    text-decoration: none;
    text-align: right;
    cursor: pointer;
    font-size: 0.9375rem;
    line-height: 1.4;
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
    font-size: clamp(1.5rem, 2vw + 1rem, 2.25rem);
    color: #08142c;
    font-weight: 700;
    line-height: 1.25;
    margin: 0;
    text-align: center;
  }

  p {
    font-size: clamp(0.875rem, 0.25vw + 0.825rem, 0.9375rem);
    color: #64748b;
    font-weight: 400;
    line-height: 1.5;
    text-align: center;
    margin: 0 0 0.75rem 0;
  }
`;

export const CheckPasswordStyele = styled.div`
  width: 100%;
  height: 3px;
  border-radius: 999px;
`;
