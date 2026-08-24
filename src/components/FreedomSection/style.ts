import styled from "styled-components";

export const FreedomContainer = styled.section`
  width: 100vw;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8rem 10%;
  box-sizing: border-box;
  gap: 4rem;

  @media (max-width: 968px) {
    flex-direction: column;
    padding: 5rem 5%;
    gap: 3rem;
  }
`;

export const TextContent = styled.div<{ isVisible?: boolean }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: 500px;

  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transform: ${({ isVisible }) => (isVisible ? 'translateX(0)' : 'translateX(-50px)')};
  transition: opacity 0.8s ease-out, transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
`;

export const Title = styled.h2`
  font-size: 3.5rem;
  font-weight: 800;
  color: #1a1a2e; /* Escuro profundo */
  line-height: 1.1;
  margin-bottom: 1.5rem;
  
  span {
    color: #1A365D;
    display: inline;
  }

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

export const Description = styled.p`
  font-size: 1.1rem;
  color: #555;
  line-height: 1.6;
  margin-bottom: 2.5rem;
`;

export const ActionButton = styled.button`
  background-color: #0b0b1a; /* Preto/Azul escuro como na ref */
  color: #fff;
  border: none;
  padding: 1.2rem 2.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 50px;
  cursor: pointer;
  transition: transform 0.3s ease, background-color 0.3s ease;
  font-family: "Rubik", sans-serif;

  &:hover {
    background-color: #1a1a2e;
    transform: translateY(-3px);
  }
`;

export const ImagesGrid = styled.div`
  flex: 1.2;
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  grid-template-rows: auto auto;
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
    width: 100%;
  }
`;

export const GridImage = styled.img<{ translateUp?: boolean; translateDown?: boolean; isVisible?: boolean; delay?: number }>`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 24px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  min-height: 200px;
  
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  filter: ${({ isVisible }) => (isVisible ? 'blur(0)' : 'blur(10px)')};
  transform: ${({ isVisible, translateUp, translateDown }) => {
    if (!isVisible) {
      return 'translateY(80px) scale(0.85) rotateX(15deg) rotateY(-10deg)';
    }
    if (translateUp) return 'translateY(-20px) scale(1) rotateX(0) rotateY(0)';
    if (translateDown) return 'translateY(20px) scale(1) rotateX(0) rotateY(0)';
    return 'translateY(0) scale(1) rotateX(0) rotateY(0)';
  }};
  
  transform-style: preserve-3d;
  transition: all 1.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  transition-delay: ${({ delay }) => delay || 0}s;
  
  &:hover {
    transform: ${({ translateUp, translateDown }) => {
      if (translateUp) return 'translateY(-30px) scale(1.05) rotateZ(1deg)';
      if (translateDown) return 'translateY(10px) scale(1.05) rotateZ(-1deg)';
      return 'translateY(-5px) scale(1.05) rotateZ(0.5deg)';
    }};
    box-shadow: 0 25px 40px rgba(26, 54, 93, 0.25);
    filter: brightness(1.05);
    z-index: 10;
    position: relative;
    transition-delay: 0s;
    transition-duration: 0.4s;
  }

  @media (max-width: 768px) {
    transform: ${({ isVisible }) => (isVisible ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.9) rotateX(5deg)')};
    min-height: 150px;
  }
`;
