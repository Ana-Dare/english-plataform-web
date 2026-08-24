import styled from "styled-components";

export const CareerContainer = styled.section`
  width: 100vw;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8rem 10%;
  box-sizing: border-box;

  @media (max-width: 968px) {
    padding: 5rem 5%;
  }
`;

export const ContentWrapper = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: center;
  max-width: 1200px;
  width: 100%;
  gap: 0;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 25px 50px rgba(0,0,0,0.2);
  border: 1px solid rgba(212, 175, 55, 0.2);

  @media (max-width: 968px) {
    flex-direction: column;
    border-radius: 16px;
  }
`;

export const TextCard = styled.div`
  flex: 1;
  background: linear-gradient(135deg, #0b0b1a 0%, #1a1a2e 100%);
  padding: 4rem 3.5rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  position: relative;

  /* Detalhe luminoso no fundo */
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -50%;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle, rgba(212, 175, 55, 0.1) 0%, transparent 70%);
    pointer-events: none;
  }

  @media (max-width: 768px) {
    padding: 3rem 2rem;
  }
`;

export const Badge = styled.div`
  background-color: #D4AF37; /* Dourado da marca */
  color: #0b0b1a; /* Texto escuro */
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  padding: 0.5rem 1.2rem;
  border-radius: 50px;
  margin-bottom: 2rem;
`;

export const Title = styled.h2`
  font-size: 2.8rem;
  font-weight: 800;
  color: #fff;
  line-height: 1.1;
  margin-bottom: 1.5rem;
  position: relative;
  z-index: 1;

  span {
    color: #D4AF37;
  }

  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

export const Description = styled.p`
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.6;
  margin-bottom: 2.5rem;
  position: relative;
  z-index: 1;

  strong {
    color: #D4AF37;
    font-weight: 700;
  }
`;

export const CTAButton = styled.button`
  background-color: #D4AF37;
  color: #0b0b1a;
  border: none;
  padding: 1.2rem 2.5rem;
  font-size: 1.1rem;
  font-weight: 700;
  border-radius: 50px;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease;
  font-family: "Rubik", sans-serif;
  box-shadow: 0 10px 20px rgba(212, 175, 55, 0.2);

  &:hover {
    background-color: #e5c158;
    transform: translateY(-3px);
    box-shadow: 0 15px 25px rgba(212, 175, 55, 0.4);
  }
`;

export const Disclaimer = styled.span`
  margin-top: auto;
  padding-top: 3rem;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.4);
`;

export const ImageWrapper = styled.div`
  flex: 1.2;
  display: flex;
  align-items: stretch;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  @media (max-width: 968px) {
    flex: none;
    height: 400px;
  }
`;
