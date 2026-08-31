import styled from "styled-components";

export const DashboardContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  background-color: #f7f7f8;
  overflow: hidden;
`;

export const SidebarContainer = styled.aside<{ $isOpen?: boolean }>`
  background: #1F2B45;
  border-right: 1px solid rgba(255, 255, 255, 0.06);
  display: flex;
  flex-direction: column;
  z-index: 50;
  transition: transform 0.3s ease-in-out;
  overflow: visible;
  flex-shrink: 0;

  @media (max-width: 1024px) {
    position: fixed;
    height: 100vh;
    transform: translateX(${({ $isOpen }) => ($isOpen ? "0" : "-100%")});
  }
`;

export const MainContent = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  min-width: 0;
`;

export const HeaderContainer = styled.header`
  height: 70px;
  background-color: #1F2B45;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ContentArea = styled.div`
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
  background-color: #f7f7f8;

  @media (max-width: 768px) {
    padding: 1.5rem 1rem;
  }
`;

export const MobileOverlay = styled.div<{ $isOpen: boolean }>`
  display: none;

  @media (max-width: 1024px) {
    display: ${({ $isOpen }) => ($isOpen ? "block" : "none")};
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(31, 43, 69, 0.5);
    z-index: 40;
    backdrop-filter: blur(2px);
  }
`;
