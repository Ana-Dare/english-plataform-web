import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutDashboard, Users, GraduationCap, Image, Settings, LogOut, Shield, ChevronRight, Menu, X } from "lucide-react";
import {
  AdminWrap, Sidebar, SidebarTop, Brand, BrandBadge,
  SidebarNav, NavGroup, NavGroupLabel, NavItem, NavLabel,
  SidebarBottom, LogoutNavItem,
  Main, Topbar, TopbarLeft, TopbarRight, PageCrumb,
  AdminPill, TopbarBtn, Content, ContentHeader,
  MobileOverlay, HamburgerBtn
} from "./style";
import AdminOverview from "./tabs/AdminOverview";
import AdminUsers from "./tabs/AdminUsers";
import AdminLevels from "./tabs/AdminLevels";
import AdminLoginConfig from "./tabs/AdminLoginConfig";
import AdminSettings from "./tabs/AdminSettings";

type Tab = "overview" | "users" | "levels" | "login-config" | "settings";

const NAV: { id: Tab; label: string; icon: React.ReactNode; badge?: number; group: string }[] = [
  { id: "overview",     label: "Visão Geral",       icon: <LayoutDashboard size={18}/>, group: "Principal" },
  { id: "users",        label: "Usuários",           icon: <Users size={18}/>,           group: "Principal" },
  { id: "levels",       label: "Níveis de Inglês",   icon: <GraduationCap size={18}/>,   group: "Conteúdo" },
  { id: "login-config", label: "Config. de Login",   icon: <Image size={18}/>,            group: "Conteúdo" },
  { id: "settings",     label: "Configurações",      icon: <Settings size={18}/>,         group: "Sistema" },
];

const TITLES: Record<Tab, { title: string; sub: string }> = {
  "overview":     { title: "Visão Geral", sub: "Resumo e métricas da plataforma" },
  "users":        { title: "Gestão de Usuários", sub: "Gerencie alunos, professores e admins" },
  "levels":       { title: "Níveis de Inglês", sub: "Cadastre e edite os níveis disponíveis" },
  "login-config": { title: "Configuração de Login", sub: "Personalize a tela de acesso ao sistema" },
  "settings":     { title: "Configurações do Sistema", sub: "Parâmetros gerais e controles globais" },
};

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const groups = [...new Set(NAV.map(n => n.group))];

  const handleNavClick = (id: Tab) => {
    setTab(id);
    setSidebarOpen(false);
  };

  const renderTab = () => {
    switch (tab) {
      case "overview":     return <AdminOverview />;
      case "users":        return <AdminUsers />;
      case "levels":       return <AdminLevels />;
      case "login-config": return <AdminLoginConfig />;
      case "settings":     return <AdminSettings />;
    }
  };

  return (
    <AdminWrap>
      {/* Mobile overlay */}
      <MobileOverlay $open={sidebarOpen} onClick={() => setSidebarOpen(false)} />

      {/* SIDEBAR */}
      <Sidebar $open={sidebarOpen}>
        <SidebarTop>
          <Brand>
            <Shield size={22} color="#C57A67" />
            <span>Admin<em>Panel</em></span>
          </Brand>
          <BrandBadge>Área Restrita</BrandBadge>
        </SidebarTop>

        <SidebarNav>
          {groups.map(group => (
            <div key={group}>
              <NavGroup><NavGroupLabel>{group}</NavGroupLabel></NavGroup>
              {NAV.filter(n => n.group === group).map(item => (
                <NavItem
                  key={item.id}
                  $active={tab === item.id}
                  onClick={() => handleNavClick(item.id)}
                >
                  {item.icon}
                  <NavLabel>{item.label}</NavLabel>
                  {tab === item.id && <ChevronRight size={14} style={{ opacity: 0.5 }} />}
                </NavItem>
              ))}
            </div>
          ))}
        </SidebarNav>

        <SidebarBottom>
          <LogoutNavItem onClick={() => navigate("/teacher-dashboard")}>
            <LogOut size={18} />
            <NavLabel>Sair do Admin</NavLabel>
          </LogoutNavItem>
        </SidebarBottom>
      </Sidebar>

      {/* MAIN */}
      <Main>
        <Topbar>
          <TopbarLeft>
            <HamburgerBtn onClick={() => setSidebarOpen(v => !v)}>
              {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
            </HamburgerBtn>
            <PageCrumb>
              <h2>{TITLES[tab].title}</h2>
              <p>{TITLES[tab].sub}</p>
            </PageCrumb>
          </TopbarLeft>
          <TopbarRight>
            <AdminPill><Shield size={12} /> Administrador</AdminPill>
            <TopbarBtn onClick={() => navigate("/teacher-dashboard")}>
              <LogOut size={14} /> Sair
            </TopbarBtn>
          </TopbarRight>
        </Topbar>

        <Content>
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {renderTab()}
            </motion.div>
          </AnimatePresence>
        </Content>
      </Main>
    </AdminWrap>
  );
};

export default AdminDashboard;
