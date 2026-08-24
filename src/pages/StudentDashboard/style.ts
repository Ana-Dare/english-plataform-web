import styled from 'styled-components';

export const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 32px;
  height: 100%;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    height: auto;
  }
`;

export const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

export const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;
