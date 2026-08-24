import styled from 'styled-components';

export const SectionContainer = styled.section`
  width: 100vw;
  background-color: #1a56a8; /* Um azul mais claro/vibrante, não tão escuro */
  color: #ffffff;
  padding: 8rem 10%;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;

  /* Subtle background glow */
  &::before {
    content: '';
    position: absolute;
    top: -20%;
    right: -10%;
    width: 50vw;
    height: 50vw;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
    border-radius: 50%;
    pointer-events: none;
  }
`;

export const ContentWrapper = styled.div`
  max-width: 1300px;
  width: 100%;
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 5rem;
  align-items: center;
  position: relative;
  z-index: 1;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
  }

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

export const TextColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h2`
  font-size: 2.8rem;
  font-weight: 800;
  text-transform: uppercase;
  margin-bottom: 1.5rem;
  color: #ffffff;
  line-height: 1.1;
  font-family: 'Poppins', sans-serif;

  span {
    color: #D4AF37; /* Removeu o gradiente azul, voltou pro destaque dourado */
  }

  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

export const Subtitle = styled.p`
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 3.5rem;
  line-height: 1.7;
  font-family: "Rubik", sans-serif;
`;

export const BenefitsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

export const BenefitItem = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: flex-start;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateX(10px);
  }
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.2);
  color: #ffffff;
  flex-shrink: 0;
  transition: all 0.3s ease;

  ${BenefitItem}:hover & {
    background: #ffffff;
    color: #1a56a8;
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.4);
    transform: scale(1.1);
  }

  svg {
    width: 24px;
    height: 24px;
    stroke-width: 2;
  }
`;

export const BenefitContent = styled.div`
  h4 {
    font-size: 1.1rem;
    font-weight: 700;
    text-transform: uppercase;
    margin-bottom: 0.6rem;
    color: #ffffff;
    font-family: 'Poppins', sans-serif;
    letter-spacing: 0.5px;
  }

  p {
    font-size: 0.95rem;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.85);
    font-family: "Rubik", sans-serif;
  }
`;

export const ImageColumn = styled.div`
  width: 100%;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: -15px;
    right: -15px;
    width: 100%;
    height: 100%;
    border: 3px solid #D4AF37;
    border-radius: 40px 120px 40px 120px;
    z-index: 0;
    transition: all 0.5s ease;
  }

  &:hover::after {
    transform: translate(15px, 15px);
    border-color: #ffffff;
  }

  .image-wrapper {
    position: relative;
    z-index: 1;
    border-radius: 40px 120px 40px 120px;
    overflow: hidden;
    box-shadow: 0 30px 60px rgba(0, 0, 0, 0.4);
    aspect-ratio: 1 / 1;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      transition: transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
    }

    &:hover img {
      transform: scale(1.08);
    }
  }

  @media (max-width: 968px) {
    max-width: 600px;
    margin: 3rem auto 0;

    &::after {
      border-radius: 30px 80px 30px 80px;
    }
    .image-wrapper {
      border-radius: 30px 80px 30px 80px;
    }
  }
`;
