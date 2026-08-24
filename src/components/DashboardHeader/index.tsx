import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  HeaderContainer, HeaderContent, Greeting, NotificationIcon, ProfileSection, Avatar, DropdownIcon,
  ProfileDropdown, ProfileHeader, LogoutButton,
  NotificationDropdown, NotifHeader, ToggleSwitch, NotifList, NotifItem
} from './style';
import { Bell, ChevronDown, User, LogOut, Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const notificationsData = [
  { id: 1, title: 'Nova atividade', time: '17:32', deadline: 'Prazo de envio: 9 de junho', desc: 'Análise e produção textual', unread: true },
  { id: 2, title: 'Nova atividade', time: '18:00', deadline: 'Prazo de envio: 17 de junho', desc: 'Análise e produção textual', unread: false },
  { id: 3, title: 'Nova prova 24 de junho', time: '02/06', deadline: 'Data de aplicação:', desc: 'Análise e produção textual', unread: false },
  { id: 4, title: 'Feedback recebido', time: '30/05', deadline: 'Desempenho no primeiro bimestre', desc: 'Notas, Atividades e Participação', unread: false },
];

interface DashboardHeaderProps {
  onOpenMenu?: () => void;
  userName?: string;
  userEmail?: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ onOpenMenu, userName = 'Aluno', userEmail = 'fulano.siciliano.silva@gmail.com' }) => {
  const navigate = useNavigate();
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [showOnlyUnread, setShowOnlyUnread] = useState(false);

  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Close modals when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setIsNotifOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    navigate('/login');
  };

  const filteredNotifs = showOnlyUnread 
    ? notificationsData.filter(n => n.unread)
    : notificationsData;

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.2, ease: "easeOut" } },
    exit: { opacity: 0, y: -10, scale: 0.95, transition: { duration: 0.15, ease: "easeIn" } }
  };

  return (
    <HeaderContainer>
      <HeaderContent>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {onOpenMenu && (
            <button 
              onClick={onOpenMenu}
              style={{ background: 'none', border: 'none', cursor: 'pointer', alignItems: 'center', color: '#333' }}
              className="mobile-menu-btn"
            >
              <Menu size={24} />
            </button>
          )}
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <Greeting>Good evening, {userName}</Greeting>
          {/* Notifications */}
        <div ref={notifRef}>
          <NotificationIcon onClick={() => { setIsNotifOpen(!isNotifOpen); setIsProfileOpen(false); }}>
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
                  <ToggleSwitch $active={showOnlyUnread} onClick={() => setShowOnlyUnread(!showOnlyUnread)}>
                    Apenas não lidas
                    <div className="switch" />
                  </ToggleSwitch>
                </NotifHeader>
                <NotifList>
                  {filteredNotifs.length > 0 ? (
                    filteredNotifs.map(notif => (
                      <NotifItem key={notif.id} $unread={notif.unread}>
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
                    <div style={{ padding: '20px', textAlign: 'center', color: '#888' }}>
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
          <ProfileSection onClick={() => { setIsProfileOpen(!isProfileOpen); setIsNotifOpen(false); }}>
            <Avatar>
              <User size={20} />
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
                  <Avatar style={{ width: '48px', height: '48px' }}>
                    <User size={24} />
                  </Avatar>
                  <div className="info">
                    <strong>{userName}</strong>
                    <span>{userEmail}</span>
                  </div>
                </ProfileHeader>
                <LogoutButton onClick={handleLogout}>
                  <LogOut size={18} />
                  Sair de sua conta
                </LogoutButton>
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
