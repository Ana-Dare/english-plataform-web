import React, { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import DashboardSidebar from '../../components/DashboardSidebar';
import type { SidebarMenuItem } from '../../components/DashboardSidebar';
import DashboardHeader from '../../components/DashboardHeader';
import { motion, AnimatePresence } from 'framer-motion';

import {
  Home,
  Award,
  User,
  GraduationCap,
} from 'lucide-react';

import MyProfile from './MyProfile';
import Turma from './Turma';
import Certificados from './Certificados';
import PlaceholderTab from './PlaceholderTab';
import StudentHome from './StudentHome';
import { ProfileProvider } from '../../contexts/ProfileContext';

const referenceMenuItems: SidebarMenuItem[] = [
  { id: 'home', label: 'In\u00edcio', icon: <Home /> },
  { id: 'turma', label: 'Turma', icon: <GraduationCap /> },
  { id: 'certificados', label: 'Certificados', icon: <Award /> },
  { id: 'profile', label: 'Meu perfil', icon: <User /> },
];

const StudentDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <motion.div
            key="home"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            style={{ width: '100%', paddingBottom: '24px' }}
          >
            <StudentHome
              onOpenTurma={() => handleTabChange('turma')}
              onOpenProfile={() => handleTabChange('profile')}
            />
          </motion.div>
        );
      case 'turma':
        return <Turma key="turma" />;
      case 'certificados':
        return <Certificados key="certificados" />;
      case 'profile':
        return <MyProfile key="profile" />;
      default:
        return <PlaceholderTab key="default" title="Em Breve" />;
    }
  };

  return (
    <ProfileProvider>
      <DashboardLayout 
        isMobileMenuOpen={isMobileMenuOpen}
        onCloseMobileMenu={() => setIsMobileMenuOpen(false)}
        sidebar={<DashboardSidebar activeTab={activeTab} onTabChange={handleTabChange} menuItems={referenceMenuItems} />} 
        header={
          <DashboardHeader
            onOpenMenu={() => setIsMobileMenuOpen(true)}
            onNavigate={(tab) => handleTabChange(tab === 'perfil' ? 'profile' : tab)}
          />
        }
      >
        <AnimatePresence mode="wait">
          {renderContent()}
        </AnimatePresence>
      </DashboardLayout>
    </ProfileProvider>
  );
};

export default StudentDashboard;
