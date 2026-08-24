import React, { useState } from 'react';
import {
  SidebarWrapper,
  ToggleButton,
  LogoContainer,
  LogoCircle,
  LogoText,
  Divider,
  MenuList,
  MenuItem,
  MenuLabel,
  MenuItemWrapper,
  Tooltip
} from './style';
import { Home, BookOpen, FileText, CheckSquare, Award, User, ChevronRight } from 'lucide-react';

export interface SidebarMenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  menuItems?: SidebarMenuItem[];
}

const defaultStudentMenuItems: SidebarMenuItem[] = [
  { id: 'home', label: 'Início', icon: <Home /> },
  { id: 'classes', label: 'Minhas aulas', icon: <BookOpen /> },
  { id: 'materials', label: 'Materiais', icon: <FileText /> },
  { id: 'activities', label: 'Atividades', icon: <CheckSquare /> },
  { id: 'certificates', label: 'Certificados', icon: <Award /> },
  { id: 'profile', label: 'Meu perfil', icon: <User /> },
];

const DashboardSidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange, menuItems = defaultStudentMenuItems }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <SidebarWrapper $collapsed={collapsed}>
      <ToggleButton $collapsed={collapsed} onClick={() => setCollapsed(!collapsed)} title={collapsed ? 'Expandir menu' : 'Recolher menu'}>
        <ChevronRight />
      </ToggleButton>

      <LogoContainer $collapsed={collapsed}>
        <LogoCircle>LC</LogoCircle>
        <LogoText $collapsed={collapsed}>Aulas e Traduções</LogoText>
      </LogoContainer>

      <Divider $collapsed={collapsed} />

      <MenuList>
        {menuItems.map((item) => (
          <MenuItemWrapper key={item.id} $collapsed={collapsed}>
            <MenuItem
              $active={activeTab === item.id}
              $collapsed={collapsed}
              onClick={() => onTabChange(item.id)}
            >
              {item.icon}
              <MenuLabel $collapsed={collapsed}>{item.label}</MenuLabel>
            </MenuItem>
            <Tooltip>{item.label}</Tooltip>
          </MenuItemWrapper>
        ))}
      </MenuList>
    </SidebarWrapper>
  );
};

export default DashboardSidebar;
