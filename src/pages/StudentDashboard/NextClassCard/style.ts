import styled from 'styled-components';

export const CardContainer = styled.div`
  background-color: #fcedb3;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
`;

export const TopSection = styled.div`
  padding: 24px;
`;

export const Title = styled.h3`
  color: #d4af37;
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0;

  span {
    color: #b8860b;
  }
`;

export const BottomSection = styled.div`
  background-color: #fff;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const InfoText = styled.p`
  margin: 0;
  color: #666;
  font-size: 0.95rem;

  strong {
    color: #333;
    font-weight: 500;
  }
`;
