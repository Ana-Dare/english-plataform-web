import styled from 'styled-components';

export const SectionContainer = styled.section`
  padding: 5rem 5%;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1400px;
  margin: 0 auto;
`;

export const Title = styled.h2`
  font-size: 2.2rem;
  color: #1A365D;
  text-transform: uppercase;
  font-weight: 800;
  text-align: center;
  margin-bottom: 4rem;
  letter-spacing: 1px;

  span {
    color: #C49A6C;
    font-style: italic;
  }

  @media (max-width: 768px) {
    font-size: 1.8rem;
    margin-bottom: 3rem;
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem 3rem;
  width: 100%;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

export const Card = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

export const IconContainer = styled.div`
  color: #C49A6C;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  background: rgba(196, 154, 108, 0.1);
  padding: 1rem;
  border-radius: 12px;
  transition: all 0.3s ease;
  
  svg {
    width: 40px;
    height: 40px;
    stroke-width: 1.8;
  }

  ${Card}:hover & {
    background: #C49A6C;
    color: #ffffff;
    transform: rotate(5deg) scale(1.05);
  }

  @media (max-width: 768px) {
    padding: 0.8rem;
    svg {
      width: 30px;
      height: 30px;
    }
  }
`;

export const TextContainer = styled.div`
  background: #0e2a52;
  color: #ffffff;
  padding: 1.2rem 1.5rem;
  border-radius: 12px;
  flex-grow: 1;
  min-height: 80px;
  display: flex;
  align-items: center;
  box-shadow: 0 4px 15px rgba(14, 42, 82, 0.1);
  border-left: 4px solid transparent;
  transition: all 0.3s ease;
  
  h4 {
    margin: 0;
    font-size: 0.95rem;
    font-weight: 700;
    line-height: 1.4;
    letter-spacing: 0.5px;
  }

  ${Card}:hover & {
    border-left-color: #C49A6C;
    box-shadow: 0 8px 25px rgba(14, 42, 82, 0.2);
  }

  @media (max-width: 768px) {
    min-height: auto;
    padding: 1rem 1.2rem;
    h4 {
      font-size: 0.85rem;
    }
  }
`;
