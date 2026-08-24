import styled from 'styled-components';

export const CardContainer = styled.div`
  background-color: #fff;
  border-radius: 12px;
  border: 1px solid #e0e0e0;
  padding: 24px;
`;

export const Title = styled.h3`
  margin: 0 0 24px 0;
  font-size: 1.2rem;
  color: #333;
`;

export const ChartsContainer = styled.div`
  display: flex;
  gap: 24px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const ChartWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ChartTitle = styled.h4`
  font-size: 0.9rem;
  color: #333;
  margin: 0 0 16px 0;
  font-weight: 500;
  align-self: flex-start;
`;

export const LegendContainer = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 16px;
  font-size: 0.85rem;
  color: #000;
  font-weight: bold;
`;

export const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;

  span {
    font-weight: 500;
  }
  
  .color-box {
    width: 10px;
    height: 10px;
  }
`;
