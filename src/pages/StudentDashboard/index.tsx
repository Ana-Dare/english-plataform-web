import React, { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import DashboardSidebar from '../../components/DashboardSidebar';
import type { SidebarMenuItem } from '../../components/DashboardSidebar';
import DashboardHeader from '../../components/DashboardHeader';
import { motion, AnimatePresence } from 'framer-motion';
import {
  DashboardContainer,
  HeaderSection,
  BadgesContainer,
  Badge,
  StatsRow,
  StatCard,
  IconBox,
  StatInfo,
  ProgressSection,
  ProgressHeader,
  Percentage,
  ProgressBar,
  ProgressFill,
  ProgressFooter,
  AgendaSection,
  AgendaGrid,
  ClassesList,
  EventsList,
  ColumnHeader,
  ClassCard,
  DateBox,
  ClassDetails,
  Dot,
  EventCard,
  EventTime
} from './style';

import {
  Home,
  Award,
  User,
  GraduationCap,
  Calendar,
  BarChart,
  Clock,
  Link as LinkIcon,
  VideoOff
} from 'lucide-react';

import MyProfile from './MyProfile';
import Turma from './Turma';
import Certificados from './Certificados';
import PlaceholderTab from './PlaceholderTab';
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
            style={{ height: '100%', overflowY: 'auto', paddingBottom: '32px' }}
          >
            <DashboardContainer>
              <HeaderSection>
                <div>
                  <h1>In{'\u00ed'}cio</h1>
                  <p>Acompanhe seu progresso e os pr{'\u00f3'}ximos passos da sua jornada.</p>
                </div>
                <BadgesContainer>
                  <Badge $variant="primary"><Dot $color="white" /> Intermediate 2</Badge>
                  <Badge $variant="secondary"><Dot $color="#1F2B45" /> VIP</Badge>
                </BadgesContainer>
              </HeaderSection>

              <StatsRow>
                <StatCard onClick={() => handleTabChange('profile')}>
                  <IconBox $bg="#E8F0FE" $color="#4A72FF">
                    <Calendar />
                  </IconBox>
                  <StatInfo>
                    <h4>48</h4>
                    <p>Aulas Conclu{'\u00ed'}das</p>
                  </StatInfo>
                </StatCard>
                <StatCard onClick={() => handleTabChange('profile')}>
                  <IconBox $bg="#E8F0FE" $color="#4A72FF">
                    <BarChart />
                  </IconBox>
                  <StatInfo>
                    <h4>68%</h4>
                    <p>Progresso do N{'\u00ed'}vel</p>
                  </StatInfo>
                </StatCard>
                <StatCard onClick={() => handleTabChange('profile')}>
                  <IconBox $bg="#E8F0FE" $color="#4A72FF">
                    <Clock />
                  </IconBox>
                  <StatInfo>
                    <h4>Hoje, 19:00</h4>
                    <p>Pr{'\u00f3'}xima Aula</p>
                  </StatInfo>
                </StatCard>
                <StatCard onClick={() => handleTabChange('profile')}>
                  <IconBox $bg="#E8F0FE" $color="#4A72FF">
                    <Award />
                  </IconBox>
                  <StatInfo>
                    <h4>3</h4>
                    <p>Certificados dispon{'\u00ed'}veis</p>
                  </StatInfo>
                </StatCard>
              </StatsRow>

              <ProgressSection onClick={() => handleTabChange('profile')}>
                <ProgressHeader>
                  <div>
                    <h4>Desempenho e Andamento</h4>
                    <p>Intermediate 2 - 34 de 50 aulas conclu{'\u00ed'}das</p>
                  </div>
                  <Percentage>68%</Percentage>
                </ProgressHeader>
                <ProgressBar>
                  <ProgressFill $width="68%" />
                </ProgressBar>
                <ProgressFooter>
                  <span>In{'\u00ed'}cio: 12 fev 2026</span>
                  <span>Dura{'\u00e7\u00e3'}o total do curso: 60 horas</span>
                </ProgressFooter>
              </ProgressSection>

              <AgendaSection>
                <h3>Minha Agenda</h3>
                <AgendaGrid>
                  <div>
                    <ColumnHeader>Pr{'\u00f3'}ximas aulas agendadas</ColumnHeader>
                    <ClassesList>
                      <ClassCard onClick={() => handleTabChange('turma')}>
                        <DateBox>
                          <strong>04</strong>
                          <span>SET</span>
                        </DateBox>
                        <ClassDetails>
                          <div className="title-row">
                            <Dot $color="#C57A67" />
                            <h5>Conversation Club B2</h5>
                            <Badge $variant="blue">Turma</Badge>
                            <LinkIcon size={16} />
                          </div>
                          <p>19:00 - 20:00</p>
                        </ClassDetails>
                      </ClassCard>

                      <ClassCard onClick={() => handleTabChange('turma')}>
                        <DateBox>
                          <strong>06</strong>
                          <span>SET</span>
                        </DateBox>
                        <ClassDetails>
                          <div className="title-row">
                            <Dot $color="#C57A67" />
                            <h5>Particular</h5>
                            <Badge $variant="red">Individual</Badge>
                            <VideoOff size={16} />
                          </div>
                          <p>10:30 - 11:30</p>
                        </ClassDetails>
                      </ClassCard>

                      <ClassCard onClick={() => handleTabChange('turma')}>
                        <DateBox>
                          <strong>10</strong>
                          <span>SET</span>
                        </DateBox>
                        <ClassDetails>
                          <div className="title-row">
                            <Dot $color="#C57A67" />
                            <h5>Conversation Club B2</h5>
                            <Badge $variant="blue">Turma</Badge>
                          </div>
                          <p>19:00 - 20:00</p>
                        </ClassDetails>
                      </ClassCard>
                    </ClassesList>
                  </div>

                  <div>
                    <ColumnHeader>Pr{'\u00f3'}ximos Eventos</ColumnHeader>
                    <EventsList>
                      <EventCard onClick={() => handleTabChange('turma')}>
                        <div>
                          <h5>Conversation Club B2</h5>
                          <p>19:00</p>
                        </div>
                        <EventTime $color="#C57A67">Hoje</EventTime>
                      </EventCard>

                      <EventCard onClick={() => handleTabChange('turma')}>
                        <div>
                          <h5>Aula particular</h5>
                          <p>10:30</p>
                        </div>
                        <EventTime $color="#C57A67">Amanh{'\u00e3'}</EventTime>
                      </EventCard>

                      <EventCard onClick={() => handleTabChange('turma')}>
                        <div>
                          <h5>Workshop - Pronunciation</h5>
                          <p>18:00</p>
                        </div>
                        <EventTime $color="#C57A67">Amanh{'\u00e3'}</EventTime>
                      </EventCard>
                    </EventsList>
                  </div>
                </AgendaGrid>
              </AgendaSection>

            </DashboardContainer>
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
        header={<DashboardHeader onOpenMenu={() => setIsMobileMenuOpen(true)} />}
      >
        <AnimatePresence mode="wait">
          {renderContent()}
        </AnimatePresence>
      </DashboardLayout>
    </ProfileProvider>
  );
};

export default StudentDashboard;
