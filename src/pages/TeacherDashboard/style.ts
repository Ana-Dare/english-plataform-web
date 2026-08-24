import styled from 'styled-components';

export const DashboardContainer = styled.div`
  display: flex;
  min-height: 100vh;
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
  z-index: 100;
  transition: transform 0.3s ease;

  @media (max-width: 768px) {
    transform: ${({ $isOpen }) => ($isOpen ? 'translateX(0)' : 'translateX(-100%)')};
  }
`;

export const MainContent = styled.div`
  flex: 1;
  margin-left: 260px;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

export const ContentArea = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 1.5rem 1rem;
    gap: 1.5rem;
  }
`;

export const PageTitle = styled.h2`
  font-size: 1.15rem;
  color: #555;
  margin: 0 0 1rem 0;
  font-weight: 500;
`;

export const TopStatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

export const ColumnsLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  margin-top: 1rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const SectionTitle = styled.h3`
  font-size: 1.1rem;
  color: #1a1a1a;
  margin: 0 0 0.3rem 0;
  font-weight: 700;
`;

export const SectionSubtitle = styled.p`
  font-size: 0.85rem;
  color: #666;
  margin: 0 0 1.5rem 0;
`;
