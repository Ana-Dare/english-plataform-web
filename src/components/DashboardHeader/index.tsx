import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  HeaderContainer,
  HeaderContent,
  Greeting,
  NotificationIcon,
  ProfileSection,
  Avatar,
  DropdownIcon,
  ProfileDropdown,
  ProfileHeader,
  DropdownMenuList,
  DropdownMenuItem,
  DropdownDivider,
  LogoutButton,
  NotificationDropdown,
  NotifHeader,
  ToggleSwitch,
  NotifList,
  NotifItem,
} from "./style";
import {
  Bell,
  ChevronDown,
  LogOut,
  Menu,
  UserCircle,
  Settings, Trash2, X,
} from "lucide-react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { useProfile } from "../../contexts/ProfileContext";
import { useAuth } from "../../contexts/Auth/AuthContext";
import { getInitials, getAvatarColorByName } from "../../utils/avatar";

const INITIAL_NOTIFS = [
  {
    id: 1,
    title: "Nova atividade",
    time: "17:32",
    deadline: "Prazo de envio: 9 de junho",
    desc: "Análise e produção textual. A atividade requer a leitura do capítulo 4 do livro base e elaboração de uma resenha crítica contendo introdução, desenvolvimento e conclusão.",
    unread: true,
  },
  {
    id: 2,
    title: "Nova atividade",
    time: "18:00",
    deadline: "Prazo de envio: 17 de junho",
    desc: "Análise e produção textual. Exercício de fixação sobre os verbos modais e estruturas de condicionais. Deve ser entregue via plataforma em formato PDF.",
    unread: false,
  },
  {
    id: 3,
    title: "Nova prova 24 de junho",
    time: "02/06",
    deadline: "Data de aplicação:",
    desc: "Análise e produção textual. A prova cobrirá todo o conteúdo visto no primeiro bimestre. O teste terá duração de 2 horas e será realizado no laboratório de informática.",
    unread: false,
  },
  {
    id: 4,
    title: "Feedback recebido",
    time: "30/05",
    deadline: "Desempenho no primeiro bimestre",
    desc: "Notas, Atividades e Participação. Seu desempenho foi excelente! A professora destacou sua ótima participação nas aulas de speaking.",
    unread: false,
  },
];

interface DashboardHeaderProps {
  onOpenMenu?: () => void;
  userName?: string;
  userEmail?: string;
  onNavigate?: (tab: string) => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  onOpenMenu,
  userName = "Aluno",
  userEmail = "fulano.siciliano.silva@gmail.com",
  onNavigate,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { profile } = useProfile();
  const { user, role } = useAuth();
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [showOnlyUnread, setShowOnlyUnread] = useState(false);
  const [notifs, setNotifs] = useState(INITIAL_NOTIFS);
  const [selectedNotif, setSelectedNotif] = useState<any>(null);

  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const displayName = user?.name || profile.name || userName;
  const displayEmail = user?.email || profile.email || userEmail;
  const avatarColor = user ? getAvatarColorByName(user.name) : "#1F2B45";
  const avatarInitials = user ? getInitials(user.name) : "US";

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setIsNotifOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("@App:accessToken");
    localStorage.removeItem("@App:refreshToken");
    localStorage.removeItem("@App:user");
    localStorage.removeItem("@App:userRole");
    navigate("/login");
  };

  const handleMenuClick = (tab: string) => {
    setIsProfileOpen(false);
    onNavigate?.(tab);
  };

  const filteredNotifs = showOnlyUnread
    ? notifs.filter((n) => n.unread)
    : notifs;

  const handleDeleteNotif = (id: number) => {
    setNotifs(notifs.filter(n => n.id !== id));
    setSelectedNotif(null);
  };

  const handleNotifClick = (notif: any) => {
    setSelectedNotif(notif);
    setIsNotifOpen(false);
    if (notif.unread) {
      setNotifs(notifs.map(n => n.id === notif.id ? { ...n, unread: false } : n));
    }
  };

  const dropdownVariants: Variants = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 300, damping: 24 } },
    exit: { opacity: 0, y: -10, scale: 0.95, transition: { duration: 0.2 } }
  };

  return (
    <HeaderContainer>
      <HeaderContent>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          {onOpenMenu && (
            <button className="mobile-menu-btn" style={{ background: "transparent", border: "none", color: "white", cursor: "pointer" }} onClick={onOpenMenu}>
              <Menu size={24} />
            </button>
          )}
          <Greeting>Good evening, {displayName}</Greeting>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          {/* Notifications */}
          <div ref={notifRef}>
            <NotificationIcon
              onClick={() => {
                setIsNotifOpen(!isNotifOpen);
                setIsProfileOpen(false);
              }}
            >
              <Bell size={20} />
              {notifs.some((n) => n.unread) && <div className="badge" />}
            </NotificationIcon>
            <AnimatePresence>
              {isNotifOpen && (
                <NotificationDropdown
                  as={motion.div}
                  variants={dropdownVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <NotifHeader>
                    <h3>Notificações</h3>
                    <ToggleSwitch
                      $active={showOnlyUnread}
                      onClick={() => setShowOnlyUnread(!showOnlyUnread)}
                    >
                      Apenas não lidas
                      <div className="switch" />
                    </ToggleSwitch>
                  </NotifHeader>
                  <NotifList>
                    {filteredNotifs.length > 0 ? (
                      filteredNotifs.map((notif) => (
                        <NotifItem
                          key={notif.id}
                          $unread={notif.unread}
                          onClick={() => handleNotifClick(notif)}
                          style={{ cursor: "pointer" }}
                        >
                          <div className="title-row">
                            <h4>{notif.title}</h4>
                            <span className="time">{notif.time}</span>
                          </div>
                          <p className="deadline">{notif.deadline}</p>
                          <p className="desc" style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{notif.desc}</p>
                          {notif.unread && <div className="indicator" />}
                        </NotifItem>
                      ))
                    ) : (
                      <div
                        style={{
                          padding: "20px",
                          textAlign: "center",
                          color: "#888",
                        }}
                      >
                        Nenhuma notificação encontrada.
                      </div>
                    )}
                  </NotifList>
                </NotificationDropdown>
              )}
            </AnimatePresence>
          </div>

          {/* Profile */}
          <div ref={profileRef}>
            <ProfileSection
              onClick={() => {
                setIsProfileOpen(!isProfileOpen);
                setIsNotifOpen(false);
              }}
            >
              <Avatar $color={avatarColor}>
                {profile.photoUrl ? (
                  <img
                    src={profile.photoUrl}
                    alt="Perfil"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "50%",
                    }}
                  />
                ) : (
                  avatarInitials
                )}
              </Avatar>
              <DropdownIcon>
                <ChevronDown size={16} />
              </DropdownIcon>
            </ProfileSection>
            <AnimatePresence>
              {isProfileOpen && (
                <ProfileDropdown
                  as={motion.div}
                  variants={dropdownVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <ProfileHeader>
                    <Avatar
                      $color={avatarColor}
                      style={{ width: "48px", height: "48px" }}
                    >
                      {profile.photoUrl ? (
                        <img
                          src={profile.photoUrl}
                          alt="Perfil"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            borderRadius: "50%",
                          }}
                        />
                      ) : (
                        avatarInitials
                      )}
                    </Avatar>
                    <div className="info">
                      <strong>{displayName}</strong>
                      <span>{displayEmail}</span>
                    </div>
                  </ProfileHeader>
                  <DropdownMenuList>
                    <DropdownMenuItem onClick={() => handleMenuClick("perfil")}>
                      <UserCircle />
                      Perfil
                    </DropdownMenuItem>
                    {!location.pathname.includes('/student-dashboard') && user?.role !== "student" && role !== "student" && (
                      <DropdownMenuItem onClick={() => navigate("/admin-dashboard")}>
                        <Settings />
                        Administração
                      </DropdownMenuItem>
                    )}
                    <DropdownDivider />
                    <LogoutButton onClick={handleLogout}>
                      <LogOut />
                      Sair de sua conta
                    </LogoutButton>
                  </DropdownMenuList>
                </ProfileDropdown>
              )}
            </AnimatePresence>
          </div>
        </div>
      </HeaderContent>

      <AnimatePresence>
        {selectedNotif && (
          <div style={{
            position: "fixed",
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: "rgba(31, 43, 69, 0.5)",
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999
          }} onClick={() => setSelectedNotif(null)}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                backgroundColor: "white",
                borderRadius: "16px",
                width: "90%",
                maxWidth: "500px",
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column"
              }}
            >
              <div style={{
                padding: "24px",
                borderBottom: "1px solid #F1F5F9",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start"
              }}>
                <div>
                  <h2 style={{ margin: "0 0 8px 0", fontSize: "1.25rem", color: "#1E293B", fontWeight: 700 }}>{selectedNotif.title}</h2>
                  <span style={{ fontSize: "0.85rem", color: "#64748B", display: "flex", alignItems: "center", gap: "6px" }}>
                    <Bell size={14} /> {selectedNotif.deadline}
                  </span>
                </div>
                <button 
                  onClick={() => setSelectedNotif(null)}
                  style={{ background: "transparent", border: "none", cursor: "pointer", color: "#94A3B8", padding: "4px" }}
                >
                  <X size={20} />
                </button>
              </div>
              
              <div style={{ padding: "24px", color: "#475569", fontSize: "0.95rem", lineHeight: "1.6" }}>
                <p style={{ margin: 0 }}>{selectedNotif.desc}</p>
              </div>
              
              <div style={{
                padding: "16px 24px",
                backgroundColor: "#F8FAFC",
                borderTop: "1px solid #F1F5F9",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}>
                <span style={{ fontSize: "0.8rem", color: "#94A3B8" }}>Recebido às {selectedNotif.time}</span>
                <button
                  onClick={() => handleDeleteNotif(selectedNotif.id)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    background: "#FEF2F2",
                    color: "#EF4444",
                    border: "none",
                    padding: "8px 16px",
                    borderRadius: "8px",
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "background-color 0.2s"
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#FEE2E2"}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#FEF2F2"}
                >
                  <Trash2 size={16} /> Excluir
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </HeaderContainer>
  );
};

export default DashboardHeader;
