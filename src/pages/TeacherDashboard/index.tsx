import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
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
import { useStudents } from "../../contexts/Students/hooks/useStudents";
import { useClasses } from "../../contexts/Classes";
import { listLessons } from "./services/material";

const teacherMenuItems: SidebarMenuItem[] = [
  { id: "dashboard", label: "Dashboard", icon: <Home /> },
  { id: "agenda", label: "Agenda", icon: <Calendar /> },
  { id: "alunos", label: "Alunos", icon: <Users /> },
  { id: "turmas", label: "Turmas", icon: <BookOpen /> },
  { id: "certificados", label: "Certificados", icon: <Award /> },
];

const TeacherOverview: React.FC<{
  onOpenTab: (tab: string) => void;
}> = ({ onOpenTab }) => {
  const { students } = useStudents();
  const { classes } = useClasses();
  const today = format(new Date(), "yyyy-MM-dd");
  const { data: todayLessons = [] } = useQuery({
    queryKey: ["lessons", "today", today],
    queryFn: () => listLessons({ start_date: today, end_date: today }),
  });
  const activeStudents = students.filter((student) => student.isActive).length;
  const activeClasses = classes.filter((cls) => cls.status === "active").length;
  const scheduledToday = todayLessons.filter(
    (lesson) => lesson.status === "scheduled",
  ).length;

  return (
    <>
      <PageTitle>Visão geral de suas atividades de hoje</PageTitle>

      <TopStatsGrid>
        <OverviewCard
          title="Alunos ativos"
          value={String(activeStudents)}
          onClick={() => onOpenTab("alunos")}
        />
        <OverviewCard
          title="Turmas ativas"
          value={String(activeClasses)}
          onClick={() => onOpenTab("turmas")}
        />
        <OverviewCard
          title="Aulas hoje"
          value={String(scheduledToday)}
          onClick={() => onOpenTab("agenda")}
        />
      </TopStatsGrid>

      <ColumnsLayout>
        <Column>
          <div>
            <SectionTitle>Agenda do dia</SectionTitle>
            <SectionSubtitle>
              {format(new Date(), "EEEE, d 'de' MMMM", { locale: ptBR })}
            </SectionSubtitle>
            <DailyAgenda onSelect={() => onOpenTab("agenda")} />
          </div>
        </Column>
        <Column>
          <div>
            <SectionTitle>Ações rápidas</SectionTitle>
            <QuickActions onAction={(tab) => onOpenTab(tab)} />
          </div>
          <div style={{ marginTop: "2rem" }}>
            <SectionTitle>Pendências recentes</SectionTitle>
            <RecentPending onSelect={(tab) => onOpenTab(tab)} />
          </div>
        </Column>
      </ColumnsLayout>
    </>
  );
};

const TeacherDashboard: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [navStudentId, setNavStudentId] = useState<number | null>(null);
  const [navStudentData, setNavStudentData] = useState<any>(null);
  const [openRegisterStudent, setOpenRegisterStudent] = useState(false);
  const [navTurmaId, setNavTurmaId] = useState<number | string | null>(null);
  const [navTurmaName, setNavTurmaName] = useState<string | null>(null);

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
              <TeacherOverview onOpenTab={setActiveTab} />
            )}

            {activeTab === "alunos" && (
              <StudentsTab
                initialStudentId={navStudentId}
                initialStudentData={navStudentData}
                initialShowRegister={openRegisterStudent}
                initialTurmaId={navTurmaId}
                initialTurmaName={navTurmaName}
                onClearInitialState={() => {
                  setOpenRegisterStudent(false);
                  setNavStudentId(null);
                  setNavStudentData(null);
                  setNavTurmaId(null);
                  setNavTurmaName(null);
                }}
              />
            )}

            {activeTab === "agenda" && <AgendaTab />}

            {activeTab === "turmas" && (
              <ClassesTab
                onNavigateStudent={(studentId, studentData) => {
                  setNavStudentId(studentId);
                  setNavStudentData(studentData);
                  setOpenRegisterStudent(false);
                  setActiveTab("alunos");
                }}
                onNavigateRegisterStudent={(turmaId, turmaName) => {
                  setNavStudentId(null);
                  setNavStudentData(null);
                  setNavTurmaId(turmaId || null);
                  setNavTurmaName(turmaName || null);
                  setOpenRegisterStudent(true);
                  setActiveTab("alunos");
                }}
              />
            )}

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
