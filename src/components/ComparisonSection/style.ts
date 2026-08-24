import styled from "styled-components";

export const ComparisonContainer = styled.section`
  width: 100vw;
  background-color: #C4A24D; /* Dourado/mostarda */
  display: flex;
  justify-content: center;
  padding: 8rem 5%;
  box-sizing: border-box;
`;

export const ComparisonCard = styled.div`
  width: 100%;
  max-width: 1000px;
  display: flex;
  flex-direction: column;
  align-items: center;
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
  color: #1a1a2e; /* Escuro para contraste com fundo nude */
  font-size: 2.5rem;
  font-weight: 800;
  text-align: center;
  margin-bottom: 4rem;

  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 3rem;
  }
`;

export const TableGrid = styled.div`
  display: grid;
  grid-template-columns: 150px 1fr 1fr;
  width: 100%;
  background: #ffffff;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 50px rgba(0,0,0,0.12);

  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
    /* Hide the labels column on mobile and just show the comparison */
  }
`;

/* The header of the table */
export const TableHeaderLabel = styled.div`
  padding: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  color: #888888;
  font-size: 0.9rem;
  text-transform: uppercase;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const TableHeaderBad = styled.div`
  padding: 2rem;
  background-color: #f7f4f0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  color: #333;
  font-size: 1.2rem;
  text-align: center;

  @media (max-width: 768px) {
    padding: 1rem;
    font-size: 1rem;
  }
`;

export const TableHeaderGood = styled.div`
  padding: 2rem;
  background: linear-gradient(135deg, #D4AF37 0%, #b58d55 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  color: #000;
  font-size: 1.3rem;
  text-align: center;

  @media (max-width: 768px) {
    padding: 1rem;
    font-size: 1.1rem;
  }
`;

/* The rows */
export const RowLabel = styled.div`
  padding: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-weight: 600;
  color: #888888;
  font-size: 0.85rem;
  text-transform: uppercase;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);

  @media (max-width: 768px) {
    display: none;
  }
`;

export const CellBad = styled.div`
  padding: 1.5rem 2rem;
  background-color: #f7f4f0;
  display: flex;
  align-items: center;
  gap: 1rem;
  color: #555555;
  font-size: 0.95rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);

  svg {
    color: #ff4d4f;
    min-width: 20px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    padding: 1.5rem 1rem;
    font-size: 0.85rem;
  }
`;

export const CellGood = styled.div`
  padding: 1.5rem 2rem;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  gap: 1rem;
  color: #222222;
  font-size: 1rem;
  font-weight: 500;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);

  svg {
    color: #D4AF37;
    min-width: 20px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    padding: 1.5rem 1rem;
    font-size: 0.9rem;
  }
`;

export const CTAButton = styled.button`
  background-color: #D4AF37;
  color: #0b0b1a;
  border: none;
  padding: 1.2rem 3rem;
  font-size: 1.2rem;
  font-weight: 800;
  border-radius: 50px;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  font-family: "Rubik", sans-serif;
  margin-top: 4rem;
  box-shadow: 0 10px 20px rgba(212, 175, 55, 0.3);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 30px rgba(212, 175, 55, 0.5);
  }
`;
