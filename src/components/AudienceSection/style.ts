import styled from "styled-components";

export const AudienceContainer = styled.section`
  width: 100vw;
  background-color: #f5eedc; /* Fundo contrastante com o escuro, tom nude chique */
  display: flex;
  justify-content: center;
  padding: 6rem 5%;
  box-sizing: border-box;
`;

export const AudienceCard = styled.div`
  background-color: #0b0b1a; /* Escuro profundo luxuoso */
  border-radius: 30px;
  width: 100%;
  max-width: 1200px;
  padding: 5rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 30px 60px rgba(0,0,0,0.2);
  position: relative;
`;

export const TopLabel = styled.h4`
  color: #D4AF37;
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-bottom: 1rem;
`;

export const Title = styled.h2`
  color: #ffffff;
  font-size: 2.8rem;
  font-weight: 800;
  text-align: center;
  margin-bottom: 5rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 3rem;
  }
`;

export const TimelineWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 900px;
  position: relative;
  margin-bottom: 4rem;

  &::before {
    content: '';
    position: absolute;
    top: 40px; /* Alinhado com o centro dos ícones */
    left: 10%;
    right: 10%;
    height: 2px;
    background: linear-gradient(90deg, rgba(212, 175, 55, 0.2), #D4AF37, rgba(212, 175, 55, 0.2));
    z-index: 1;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 4rem;

    &::before {
      top: 10%;
      bottom: 10%;
      left: 50%;
      right: auto;
      width: 2px;
      height: 80%;
      transform: translateX(-50%);
    }
  }
`;

export const StepColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
  z-index: 2;
  padding: 0 1rem;
`;

export const IconCircle = styled.div`
  width: 80px;
  height: 80px;
  background-color: #1a1a2e;
  border: 2px solid #D4AF37;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  color: #D4AF37;
  box-shadow: 0 10px 20px rgba(0,0,0,0.5);
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
    background-color: #D4AF37;
    color: #0b0b1a;
  }
`;

export const StepTitle = styled.h3`
  color: #ffffff;
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

export const StepText = styled.p`
  color: rgba(255, 255, 255, 0.7);
  font-size: 1rem;
  line-height: 1.6;
  max-width: 250px;
`;

export const FooterLink = styled.a`
  color: rgba(255, 255, 255, 0.6);
  font-size: 1rem;
  text-decoration: underline;
  cursor: pointer;
  transition: color 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    color: #D4AF37;
  }
`;
