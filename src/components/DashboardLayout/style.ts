import styled from "styled-components";

export const DashboardContainer = styled.div`
  display: flex;
  height: 100vh;
  height: 100dvh;
  width: 100%;
  max-width: 100vw;
  background-color: #f7f7f8;
  overflow: hidden;
`;

export const SidebarContainer = styled.aside<{ $isOpen?: boolean }>`
  background: #1f2b45;
  border-right: 1px solid rgba(255, 255, 255, 0.06);
  display: flex;
  flex-direction: column;
  z-index: 50;
  transition: transform 0.3s ease-in-out;
  overflow: visible;
  flex-shrink: 0;

  @media (max-width: 1023px) {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    height: 100dvh;
    transform: translateX(${({ $isOpen }) => ($isOpen ? "0" : "-100%")});
  }
`;

export const MainContent = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  min-width: 0;
  width: 100%;
`;

export const HeaderContainer = styled.header`
  height: clamp(60px, 8vh, 70px);
  min-height: 60px;
  flex-shrink: 0;
  background-color: #1f2b45;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const ContentArea = styled.div`
  position: relative;
  flex: 1;
  min-width: 0;
  width: 100%;
  padding: clamp(1rem, 2vw, 1.25rem) clamp(1rem, 2.5vw, 1.5rem);
  overflow-y: auto;
  overflow-x: hidden;
  background-color: #f7f7f8;
  box-sizing: border-box;

  @media (max-width: 767px) {
    padding: 0.75rem 0.625rem;
  }

  @media (max-width: 479px) {
    padding: 0.625rem 0.5rem;
  }

  @media (max-width: 374px) {
    padding: 0.5rem 0.375rem;
  }
`;

export const MobileOverlay = styled.div<{ $isOpen: boolean }>`
  display: none;

  @media (max-width: 1023px) {
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
