import React, { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import DashboardSidebar from '../../components/DashboardSidebar';
import DashboardHeader from '../../components/DashboardHeader';
import { DashboardGrid, LeftColumn, RightColumn } from './style';
import { motion, AnimatePresence } from 'framer-motion';

import NextClassCard from './NextClassCard';
import CourseProgressCard from './CourseProgressCard';
import CalendarCard from './CalendarCard';
import PendingActivitiesCard from './PendingActivitiesCard';
import PlaceholderTab from './PlaceholderTab';
import MyClasses from './MyClasses';
import MyProfile from './MyProfile';
import Materials from './Materials';
import Activities from './Activities';

import Certificates from './Certificates';

const StudentDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false); // Close menu on mobile after navigation
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
            style={{ height: '100%' }}
          >
            <DashboardGrid>
              <LeftColumn>
                <NextClassCard />
                <CourseProgressCard />
              </LeftColumn>
              <RightColumn>
                <div>
                  <CalendarCard />
                  <PendingActivitiesCard />
                </div>
              </RightColumn>
            </DashboardGrid>
          </motion.div>
        );
      case 'classes':
        return <MyClasses key="classes" />;
      case 'materials':
        return <Materials key="materials" />;
      case 'activities':
        return <Activities key="activities" />;
      case 'certificates':
        return <Certificates key="certificates" />;

      case 'profile':
        return <MyProfile key="profile" />;
      default:
        return <PlaceholderTab key="default" title="Em Breve" />;
    }
  };

  return (
    <DashboardLayout 
      isMobileMenuOpen={isMobileMenuOpen}
      onCloseMobileMenu={() => setIsMobileMenuOpen(false)}
      sidebar={<DashboardSidebar activeTab={activeTab} onTabChange={handleTabChange} />} 
      header={<DashboardHeader onOpenMenu={() => setIsMobileMenuOpen(true)} />}
    >
      <AnimatePresence mode="wait">
        {renderContent()}
      </AnimatePresence>
    </DashboardLayout>
  );
};

export default StudentDashboard;
