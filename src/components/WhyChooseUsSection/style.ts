import styled from "styled-components";

export const SectionContainer = styled.section`
  width: 100%;
  padding: 5rem 10%;
  background-color: #f8f9fa;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Rubik", sans-serif;

  @media (max-width: 768px) {
    padding: 4rem 5%;
  }
`;

export const Header = styled.div`
  text-align: center;
  margin-bottom: 4rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Title = styled.h2`
  font-size: 2.5rem;
  color: #1A365D;
  font-weight: 800;
  text-transform: uppercase;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

export const Subtitle = styled.p`
  font-size: 1.1rem;
  color: #555;
  margin: 0;
  font-weight: 400;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

export const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  width: 100%;
  max-width: 1200px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export const Card = styled.div`
  background: linear-gradient(135deg, #1A365D 0%, #3465A4 100%);
  border-radius: 16px;
  padding: 2.5rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  color: #fff;
  box-shadow: 0 15px 30px rgba(26, 54, 93, 0.15);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;
  box-sizing: border-box;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(26, 54, 93, 0.25);
  }
`;

export const IconWrapper = styled.div`
  background-color: rgba(255, 255, 255, 0.15);
  width: 64px;
  height: 64px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  
  svg {
    color: #fff;
  }
`;

export const CardTitle = styled.h3`
  font-size: 1.4rem;
  font-weight: 700;
  margin: 0 0 1rem 0;
`;

export const CardText = styled.p`
  font-size: 0.95rem;
  line-height: 1.5;
  margin: 0;
  color: rgba(255, 255, 255, 0.9);
`;
