import styled from "styled-components";

export const CookieWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #fff;
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.1);
  padding: 1.5rem 5%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 9999;
  font-family: "Rubik", sans-serif;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    gap: 1.5rem;
    padding: 1.5rem;
  }
`;

export const CookieTextContainer = styled.div`
  flex: 1;

  h4 {
    margin: 0 0 0.5rem 0;
    font-size: 1.2rem;
    color: #000;
    font-weight: 600;
  }

  p {
    margin: 0;
    font-size: 0.95rem;
    color: #555;
    line-height: 1.5;

    a {
      color: #D4AF37;
      text-decoration: none;
      font-weight: 500;
      
      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

export const CookieButtons = styled.div`
  display: flex;
  gap: 1rem;

  @media (max-width: 768px) {
    width: 100%;
    flex-direction: column;
  }
`;

export const Button = styled.button<{ primary?: boolean }>`
  background-color: ${({ primary }) => (primary ? "#D4AF37" : "transparent")};
  color: ${({ primary }) => (primary ? "#000" : "#555")};
  border: 1px solid ${({ primary }) => (primary ? "#D4AF37" : "#ccc")};
  padding: 0.8rem 1.5rem;
  font-size: 0.95rem;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  font-family: "Rubik", sans-serif;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${({ primary }) => (primary ? "#c09e32" : "#f5f5f5")};
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;
