import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  Settings,
} from "lucide-react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { useProfile } from "../../contexts/ProfileContext";
import { useAuth } from "../../contexts/Auth/AuthContext";
import { getInitials, getAvatarColorByName } from "../../utils/avatar";

const notificationsData = [
  {
    id: 1,
    title: "Nova atividade",
    time: "17:32",
    deadline: "Prazo de envio: 9 de junho",
    desc: "Análise e produção textual",
    unread: true,
  },
  {
    id: 2,
    title: "Nova atividade",
    time: "18:00",
    deadline: "Prazo de envio: 17 de junho",
    desc: "Análise e produção textual",
    unread: false,
  },
  {
    id: 3,
    title: "Nova prova 24 de junho",
    time: "02/06",
    deadline: "Data de aplicação:",
    desc: "Análise e produção textual",
    unread: false,
  },
  {
    id: 4,
    title: "Feedback recebido",
    time: "30/05",
    deadline: "Desempenho no primeiro bimestre",
    desc: "Notas, Atividades e Participação",
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
  const { profile } = useProfile();
  const { user } = useAuth();
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [showOnlyUnread, setShowOnlyUnread] = useState(false);
  const [notifications, setNotifications] = useState(notificationsData);

  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Use auth user data first, then profile data, then fallback to props
  const displayName =
    user?.name ||
    (profile.firstName && profile.lastName
      ? `${profile.firstName} ${profile.lastName}`
      : userName);
  const displayEmail = user?.email || profile.email || userEmail;
  const avatarColor = user ? getAvatarColorByName(user.name) : "#1F2B45";
  const avatarInitials = user ? getInitials(user.name) : "US";

  // Close modals when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        notifRef.current &&
        !notifRef.current.contains(event.target as Node)
      ) {
        setIsNotifOpen(false);
      }
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
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
    ? notifications.filter((n) => n.unread)
    : notifications;

  const handleNotifClick = (notif: any) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notif.id ? { ...n, unread: false } : n)),
    );
    setIsNotifOpen(false);
    // Wait, onNavigate doesn't take an ID parameter currently. I'll need to update the prop definition if I want it.
    // For now, I can just use a generic 'notificacoes' tab and TeacherDashboard can manage it, or I can update the prop.
    onNavigate?.("notificacoes");

    // I will fire a custom event with the notification ID so the NotificationsTab can intercept it
    const event = new CustomEvent("openNotification", { detail: notif.id });
    window.dispatchEvent(event);
  };

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.2, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      y: -10,
      scale: 0.95,
      transition: { duration: 0.15, ease: "easeIn" },
    },
  } satisfies Variants;

  return (
    <HeaderContainer>
      <HeaderContent>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          {onOpenMenu && (
            <button
              onClick={onOpenMenu}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                alignItems: "center",
                color: "#ffffff",
              }}
              className="mobile-menu-btn"
            >
              <Menu size={24} />
            </button>
          )}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          <Greeting>Good evening, {displayName}</Greeting>
          {/* Notifications */}
          <div ref={notifRef}>
            <NotificationIcon
              onClick={() => {
                setIsNotifOpen(!isNotifOpen);
                setIsProfileOpen(false);
              }}
            >
              <Bell size={20} />
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
                        >
                          <div className="title-row">
                            <h4>{notif.title}</h4>
                            <span className="time">{notif.time}</span>
                          </div>
                          <p className="deadline">{notif.deadline}</p>
                          <p className="desc">{notif.desc}</p>
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
                    <DropdownMenuItem
                      onClick={() => navigate("/admin-dashboard")}
                    >
                      <Settings />
                      Administração
                    </DropdownMenuItem>
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
    </HeaderContainer>
  );
};

export default DashboardHeader;
