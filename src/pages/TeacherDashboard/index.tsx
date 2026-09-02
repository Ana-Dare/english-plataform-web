import React, { useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import DashboardSidebar, {
  type SidebarMenuItem,
} from "../../components/DashboardSidebar";
import DashboardHeader from "../../components/DashboardHeader";
import { Home, Calendar, Users, BookOpen, Award } from "lucide-react";
import {
  PageTitle,
  TopStatsGrid,
  ColumnsLayout,
  Column,
  SectionTitle,
  SectionSubtitle,
} from "./style";
import OverviewCard from "./components/OverviewCard";
import DailyAgenda from "./components/DailyAgenda";
import QuickActions from "./components/QuickActions";
import RecentPending from "./components/RecentPending";
import StudentsTab from "./Students";
import AgendaTab from "./Agenda";
import ClassesTab from "./Classes";
import ProfileTab from "./Profile";
import CertificatesTab from "./Certificates";
import NotificationsTab from "./Notifications";
import { ProfileProvider } from "../../contexts/ProfileContext";
import StudentsProvider from "../../contexts/Students/StudentsProvider";
import ClassesProvider from "../../contexts/Classes/ClassesProvider";

const teacherMenuItems: SidebarMenuItem[] = [
  { id: "dashboard", label: "Dashboard", icon: <Home /> },
  { id: "agenda", label: "Agenda", icon: <Calendar /> },
  { id: "alunos", label: "Alunos", icon: <Users /> },
  { id: "turmas", label: "Turmas", icon: <BookOpen /> },
  { id: "certificados", label: "Certificados", icon: <Award /> },
];

const TeacherDashboard: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [navStudentId] = useState<number | null>(null);

  return (
    <ProfileProvider>
      <StudentsProvider>
        <ClassesProvider>
          <DashboardLayout
            isMobileMenuOpen={isSidebarOpen}
            onCloseMobileMenu={() => setIsSidebarOpen(false)}
            sidebar={
              <DashboardSidebar
                activeTab={activeTab}
                onTabChange={(tab) => {
                  setActiveTab(tab);
                  setIsSidebarOpen(false);
                }}
                menuItems={teacherMenuItems}
              />
            }
            header={
              <DashboardHeader
                onOpenMenu={() => setIsSidebarOpen(true)}
                onNavigate={(tab) => setActiveTab(tab)}
              />
            }
          >
            {activeTab === "dashboard" && (
              <>
                <PageTitle>Visão geral de suas atividades de hoje</PageTitle>

                <TopStatsGrid>
                  <OverviewCard title="Alunos ativos" value="87" />
                  <OverviewCard title="Turmas ativas" value="12" />
                  <OverviewCard title="Aulas hoje" value="6" />
                  <OverviewCard
                    title="Pendências"
                    value="14"
                    subtitle="atividades para corrigir"
                  />
                  <OverviewCard title="Mensalidades pendentes" value="5" />
                </TopStatsGrid>

                <ColumnsLayout>
                  <Column>
                    <div>
                      <SectionTitle>Agenda do dia</SectionTitle>
                      <SectionSubtitle>Hoje, 3 de junho</SectionSubtitle>
                      <DailyAgenda />
                    </div>
                  </Column>
                  <Column>
                    <div>
                      <SectionTitle>Ações rápidas</SectionTitle>
                      <QuickActions onAction={(tab) => setActiveTab(tab)} />
                    </div>
                    <div style={{ marginTop: "2rem" }}>
                      <SectionTitle>Pendências recentes</SectionTitle>
                      <RecentPending />
                    </div>
                  </Column>
                </ColumnsLayout>
              </>
            )}

            {activeTab === "alunos" && (
              <StudentsTab initialStudentId={navStudentId} />
            )}

            {activeTab === "agenda" && <AgendaTab />}

            {activeTab === "turmas" && <ClassesTab />}

            {activeTab === "perfil" && <ProfileTab />}

            {activeTab === "certificados" && <CertificatesTab />}

            {activeTab === "notificacoes" && <NotificationsTab />}

            {activeTab !== "dashboard" &&
              activeTab !== "alunos" &&
              activeTab !== "agenda" &&
              activeTab !== "turmas" &&
              activeTab !== "certificados" &&
              activeTab !== "notificacoes" &&
              activeTab !== "perfil" && (
                <div
                  style={{
                    padding: "3rem",
                    textAlign: "center",
                    color: "#888",
                  }}
                >
                  <h2>Em desenvolvimento</h2>
                  <p>
                    A aba "
                    {teacherMenuItems.find((m) => m.id === activeTab)?.label}"
                    estará disponível em breve.
                  </p>
                </div>
              )}
          </DashboardLayout>
        </ClassesProvider>
      </StudentsProvider>
    </ProfileProvider>
  );
};

export default TeacherDashboard;
