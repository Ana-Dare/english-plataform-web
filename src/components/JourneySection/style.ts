import styled from "styled-components";

export const JourneyWrapper = styled.section`
  width: 100vw;
  background-color: #f8f9fa; /* Fundo bem claro para dar contraste à caixa branca */
  padding: 6rem 10%;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
`;

export const JourneyContainer = styled.div`
  display: flex;
  gap: 4rem;
  max-width: 1200px;
  width: 100%;

  @media (max-width: 968px) {
    flex-direction: column;
  }
`;

export const JourneyTextPanel = styled.div`
  flex: 1;
  background-color: #fff;
  border-radius: 30px;
  padding: 3.5rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    padding: 2rem;
  }
`;

export const Subtitle = styled.span`
  color: #D4AF37;
  font-size: 1rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 1rem;
`;

export const Title = styled.h2`
  font-size: 3rem;
  font-weight: 800;
  margin: 0 0 1.5rem 0;
  line-height: 1.1;
  background: linear-gradient(90deg, #111 0%, #D4AF37 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

export const Description = styled.p`
  color: #666;
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 2.5rem;
`;

export const TabsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: auto;
`;

export const TabItem = styled.div<{ isActive: boolean }>`
  cursor: pointer;
  padding-left: 1.5rem;
  position: relative;
  transition: all 0.3s ease;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 4px;
    background-color: ${({ isActive }) => (isActive ? "#000" : "transparent")};
    border-radius: 4px;
    transition: background-color 0.3s ease;
  }

  h4 {
    margin: 0;
    font-size: 1.3rem;
    font-weight: 700;
    color: ${({ isActive }) => (isActive ? "#000" : "#a0a0a0")};
    transition: color 0.3s ease;
  }

  p {
    margin: 0.5rem 0 0 0;
    font-size: 1rem;
    color: #555;
    line-height: 1.5;
    display: ${({ isActive }) => (isActive ? "block" : "none")};
  }

  &:hover h4 {
    color: ${({ isActive }) => (isActive ? "#000" : "#666")};
  }
`;

export const JourneyImagePanel = styled.div`
  flex: 1;
  display: flex;
  gap: 1.5rem;
  align-items: stretch;

  @media (max-width: 768px) {
    height: 500px;
  }
`;

export const ImageCard = styled.div<{ bgImage: string }>`
  flex: 1;
  border-radius: 30px;
  background-image: url(${({ bgImage }) => bgImage});
  background-size: cover;
  background-position: center;
  position: relative;
  overflow: hidden;
  box-shadow: 0 15px 35px rgba(0,0,0,0.15);
  transition: transform 0.4s ease;

  &:hover {
    transform: translateY(-10px);
  }

  /* Overlay gradiente escuro na parte inferior para o texto aparecer bem */
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 50%;
    background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%);
    z-index: 1;
  }
`;

export const ImageCardContent = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 2rem;
  z-index: 2;
  color: #fff;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  h3 {
    margin: 0;
    font-size: 1.8rem;
    font-weight: 700;
    line-height: 1.1;
  }

  p {
    margin: 0;
    font-size: 1rem;
    font-weight: 300;
    color: #e0e0e0;
  }
`;
