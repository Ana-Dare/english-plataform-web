import React from 'react';
import { DashboardContainer, SidebarContainer, MainContent, HeaderContainer, ContentArea, MobileOverlay } from './style';

interface DashboardLayoutProps {
  sidebar: React.ReactNode;
  header: React.ReactNode;
  children: React.ReactNode;
  isMobileMenuOpen?: boolean;
  onCloseMobileMenu?: () => void;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ sidebar, header, children, isMobileMenuOpen, onCloseMobileMenu }) => {
  return (
    <DashboardContainer>
      <MobileOverlay $isOpen={!!isMobileMenuOpen} onClick={onCloseMobileMenu} />
      <SidebarContainer $isOpen={!!isMobileMenuOpen}>
        {sidebar}
      </SidebarContainer>
      <MainContent>
        <HeaderContainer>
          {header}
        </HeaderContainer>
        <ContentArea>
          {children}
        </ContentArea>
      </MainContent>
    </DashboardContainer>
  );
};

export default DashboardLayout;
