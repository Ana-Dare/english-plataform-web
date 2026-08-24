import styled from "styled-components";

export const FaqContainer = styled.section`
  width: 100vw;
  background-color: #f9f9f9; /* Fundo claro para contraste, ou pode ser escuro */
  display: flex;
  justify-content: center;
  padding: 8rem 10%;
  box-sizing: border-box;

  @media (max-width: 968px) {
    padding: 5rem 5%;
  }
`;

export const ContentWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  max-width: 1200px;
  width: 100%;
  gap: 5rem;

  @media (max-width: 968px) {
    flex-direction: column;
    gap: 3rem;
  }
`;

export const TextColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  position: sticky;
  top: 120px; /* Para acompanhar o scroll caso o faq seja longo */

  @media (max-width: 968px) {
    position: static;
  }
`;

export const Title = styled.h2`
  font-size: 3rem;
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 1.5rem;
  color: #0e2a52;

  span {
    color: #C49A6C;
  }

  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

export const Description = styled.p`
  font-size: 1.1rem;
  color: #555;
  line-height: 1.6;
  margin-bottom: 2rem;
`;

export const FaqColumn = styled.div`
  flex: 1.3;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
`;

export const AccordionItem = styled.div<{ isOpen: boolean }>`
  background: ${({ isOpen }) => 
    isOpen 
      ? '#C49A6C' 
      : '#0e2a52'
  };
  border-radius: 16px;
  border: none;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  
  ${({ isOpen }) => isOpen && `
    box-shadow: 0 12px 25px rgba(139, 0, 0, 0.3);
    transform: scale(1.02);
  `}

  &:hover {
    transform: ${({ isOpen }) => isOpen ? 'scale(1.02)' : 'translateY(-2px)'};
    box-shadow: 0 8px 20px rgba(14, 42, 82, 0.2);
  }
`;

export const AccordionHeader = styled.button<{ isOpen?: boolean }>`
  width: 100%;
  text-align: left;
  padding: 1.5rem 2rem;
  background: none;
  border: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  font-family: 'Poppins', sans-serif;
  font-size: 1.15rem;
  font-weight: 600;
  color: #ffffff;
  transition: color 0.3s ease;

  svg {
    color: #ffffff;
    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    background: rgba(255, 255, 255, 0.15);
    border-radius: 50%;
    padding: 4px;
    width: 32px;
    height: 32px;
  }

  @media (max-width: 768px) {
    padding: 1.2rem 1.5rem;
    font-size: 1.05rem;
  }
`;

export const AccordionContent = styled.div<{ isOpen: boolean }>`
  max-height: ${({ isOpen }) => (isOpen ? "300px" : "0")};
  opacity: ${({ isOpen }) => (isOpen ? "1" : "0")};
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  padding: ${({ isOpen }) => (isOpen ? "0 2rem 1.5rem 2rem" : "0 2rem")};
  
  p {
    margin: 0;
    color: rgba(255, 255, 255, 0.9);
    font-size: 1rem;
    line-height: 1.6;
    font-family: 'Poppins', sans-serif;
  }

  @media (max-width: 768px) {
    padding: ${({ isOpen }) => (isOpen ? "0 1.5rem 1.5rem 1.5rem" : "0 1.5rem")};
  }
`;

export const ContactButton = styled.button`
  background: #1e3a8a;
  color: #fff;
  border: none;
  padding: 1rem 2.2rem;
  font-size: 0.95rem;
  font-weight: 700;
  border-radius: 50px;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;
  font-family: "Rubik", sans-serif;
  width: fit-content;
  box-shadow: 0 8px 20px rgba(30, 58, 138, 0.4);

  &:hover {
    background: #172a6b;
    transform: translateY(-2px);
    box-shadow: 0 12px 25px rgba(30, 58, 138, 0.6);
  }
`;
