import styled from 'styled-components';

export const DashboardContainer = styled.div`
  display: flex;
  min-height: 100vh;
  min-height: 100dvh;
  background-color: #f8f9fa;
`;

export const SidebarContainer = styled.div<{ $isOpen: boolean }>`
  width: 260px;
  background-color: #fff;
  border-right: 1px solid #eaeaea;
  display: flex;
  flex-direction: column;
  position: fixed;
  height: 100vh;
  height: 100dvh;
  z-index: 100;
  transition: transform 0.3s ease;

  @media (max-width: 1023px) {
    transform: ${({ $isOpen }) => ($isOpen ? 'translateX(0)' : 'translateX(-100%)')};
  }
`;

export const MainContent = styled.div`
  flex: 1;
  margin-left: 260px;
  display: flex;
  flex-direction: column;
  min-width: 0;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 1023px) {
    margin-left: 0;
    max-width: 100vw;
    overflow-x: hidden;
  }
`;

export const ContentArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
  max-width: 100%;
  min-width: 0;
  box-sizing: border-box;
`;

export const PageTitle = styled.h1`
  font-family: 'Rubik', sans-serif;
  font-size: clamp(1.5rem, 2vw + 1rem, 2.25rem);
  line-height: 1.25;
  color: #1F2B45;
  margin: 0 0 clamp(1rem, 2vw, 1.5rem) 0;
  font-weight: 700;
`;

export const TopStatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: clamp(0.75rem, 1.5vw, 1.25rem);
  width: 100%;

  @media (max-width: 1320px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media (max-width: 1023px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

export const ColumnsLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: clamp(1.5rem, 3vw, 2.5rem);
  margin-top: clamp(1.25rem, 2.5vw, 2rem);
  width: 100%;

  @media (max-width: 1023px) {
    grid-template-columns: 1fr;
    gap: 1.75rem;
  }
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: clamp(1.25rem, 2.5vw, 2rem);
  min-width: 0;
`;

export const SectionTitle = styled.h3`
  font-family: 'Rubik', sans-serif;
  font-size: clamp(1.125rem, 1vw + 0.875rem, 1.5rem);
  line-height: 1.3;
  color: #1F2B45;
  margin: 0.5rem 0 0.375rem 0;
  font-weight: 700;
`;

export const SectionSubtitle = styled.p`
  font-family: 'Rubik', sans-serif;
  font-size: clamp(0.875rem, 0.25vw + 0.825rem, 0.9375rem);
  line-height: 1.5;
  color: #4D4D4D;
  margin: 0 0 1.25rem 0;
`;
