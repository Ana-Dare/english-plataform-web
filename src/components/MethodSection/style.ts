import styled from "styled-components";

export const MethodContainer = styled.section`
  width: 100vw;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 6rem 10%;
  box-sizing: border-box;

  @media (max-width: 968px) {
    padding: 4rem 5%;
  }
`;

export const Header = styled.div`
  text-align: center;
  max-width: 800px;
  margin-bottom: 4rem;

  @media (max-width: 768px) {
    text-align: left;
    margin-bottom: 2.5rem;
  }
`;

export const Title = styled.h2`
  font-size: 2.8rem;
  font-weight: 700;
  color: #0e2a52;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const Subtitle = styled.p`
  font-size: 1.1rem;
  color: #555;
  line-height: 1.6;

  strong {
    color: #1A365D;
    font-weight: 600;
  }

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

export const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  width: 100%;
  max-width: 1200px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const Card = styled.div<{ gradient?: string }>`
  background: ${({ gradient }) => gradient || 'linear-gradient(135deg, #0e2a52 0%, #1a56a8 50%, #0e2a52 100%)'};
  background-size: 200% 200%;
  border: none;
  border-radius: 20px;
  padding: 2.5rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  box-shadow: 0 10px 30px rgba(14, 42, 82, 0.15);
  position: relative;
  overflow: hidden;

  /* Shimmer glassmorphism overlay */
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle at 30% 20%, rgba(255,255,255,0.08) 0%, transparent 50%);
    pointer-events: none;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    right: 0;
    width: 120px;
    height: 120px;
    background: radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%);
    border-radius: 50%;
    pointer-events: none;
  }
`;

export const IconWrapper = styled.div`
  margin-bottom: 1.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 58px;
  height: 58px;
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 16px;
  color: #ffffff;
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);

  ${Card}:hover & {
    background: rgba(255, 255, 255, 0.95);
    color: #0e2a52;
    transform: scale(1.1) rotate(5deg);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  }
`;

export const CardTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 0.8rem;
  line-height: 1.3;
  transition: color 0.3s ease;
`;

export const CardText = styled.p`
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
`;
