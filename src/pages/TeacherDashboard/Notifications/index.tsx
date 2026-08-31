import React, { useState, useEffect } from "react";
import {
  Container,
  Sidebar,
  SidebarHeader,
  Toolbar,
  ToolButton,
  FilterTabs,
  FilterTab,
  NotificationList,
  NotificationItem,
  CustomCheckbox,
  ContentArea,
  EmptyState,
  DetailView,
  MobileBackButton,
  DetailHeader,
  DetailBody,
  ActionButton
} from "./style";
import { 
  BellOff, 
  Trash2, 
  ArrowRight, 
  Star, 
  Archive,
  ArchiveRestore, 
  CheckSquare, 
  CheckCheck,
  CheckCircle2,
  ChevronLeft 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const initialNotifications = [
  {
    id: 1,
    title: "Revisão de Atividades Pendentes",
    date: "Hoje",
    time: "14:30",
    category: "Ação Necessária",
    desc: "Existem 15 novas entregas aguardando correção. O prazo final aproxima-se.",
    fullText: "O sistema registrou 15 novas submissões de atividades dissertativas. O prazo para correção e lançamento de notas encerra-se em 48 horas. Recomendamos a revisão dos documentos enviados para manter o acompanhamento pedagógico em dia.",
    unread: true,
    isArchived: false,
    isFavorite: false,
  },
  {
    id: 2,
    title: "Atualização no Cronograma do Semestre",
    date: "Ontem",
    time: "09:15",
    category: "Aviso Geral",
    desc: "O calendário letivo foi atualizado pela coordenação. Confira as novas datas de avaliações.",
    fullText: "A coordenação pedagógica publicou uma atualização no calendário do segundo semestre. Foram ajustadas as datas das avaliações bimestrais e incluídos novos recessos. Por favor, ajuste o seu plano de aulas adequadamente.",
    unread: false,
    isArchived: false,
    isFavorite: true,
  },
  {
    id: 3,
    title: "Relatório de Engajamento Disponível",
    date: "12 de Junho",
    time: "16:45",
    category: "Relatórios",
    desc: "O relatório analítico de presença e participação dos alunos foi gerado com sucesso.",
    fullText: "O relatório mensal de engajamento das suas turmas está pronto para visualização. Foram identificados 3 alunos com baixa frequência que requerem atenção especial. Acesse o módulo de relatórios para baixar o PDF completo.",
    unread: false,
    isArchived: false,
    isFavorite: false,
  },
  {
    id: 4,
    title: "Manutenção Programada do Sistema",
    date: "10 de Junho",
    time: "10:00",
    category: "Sistema",
    desc: "A plataforma passará por atualizações de infraestrutura neste fim de semana.",
    fullText: "Informamos que a plataforma ficará indisponível neste sábado, das 23:00 às 04:00 (domingo), para uma atualização crítica de segurança e otimização dos servidores. Recomendamos que faça o download de materiais necessários previamente.",
    unread: false,
    isArchived: false,
    isFavorite: false,
  },
];

const NotificationsTab: React.FC = () => {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState<"todos" | "favoritos" | "arquivados">("todos");
  
  // Bulk Selection State
  const [selectedItemIds, setSelectedItemIds] = useState<number[]>([]);

  useEffect(() => {
    const handleOpenNotif = (e: any) => {
      if (e.detail) {
        setSelectedId(e.detail);
        setNotifications(prev => prev.map(n => n.id === e.detail ? { ...n, unread: false } : n));
      }
    };
    
    window.addEventListener("openNotification", handleOpenNotif);
    return () => window.removeEventListener("openNotification", handleOpenNotif);
  }, []);

  const displayedNotifs = notifications.filter(n => {
    if (activeFilter === "arquivados") return n.isArchived;
    if (activeFilter === "favoritos") return n.isFavorite && !n.isArchived;
    return !n.isArchived;
  });

  const handleSelectNotif = (id: number) => {
    setSelectedId(id);
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, unread: false } : n));
  };

  const toggleArchive = (id: number) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isArchived: !n.isArchived } : n));
    setSelectedId(null);
  };

  const toggleFavorite = (id: number) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isFavorite: !n.isFavorite } : n));
  };

  // Bulk actions
  const handleCheckboxChange = (id: number) => {
    setSelectedItemIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedItemIds.length === displayedNotifs.length) {
      setSelectedItemIds([]);
    } else {
      setSelectedItemIds(displayedNotifs.map(n => n.id));
    }
  };

  const markSelectedAsRead = () => {
    setNotifications(prev => prev.map(n => 
      selectedItemIds.includes(n.id) ? { ...n, unread: false } : n
    ));
    setSelectedItemIds([]);
  };

  const favoriteSelected = () => {
    setNotifications(prev => prev.map(n => 
      selectedItemIds.includes(n.id) ? { ...n, isFavorite: true } : n
    ));
    setSelectedItemIds([]);
  };

  const archiveSelected = () => {
    setNotifications(prev => prev.map(n => 
      selectedItemIds.includes(n.id) ? { ...n, isArchived: true } : n
    ));
    setSelectedItemIds([]);
    setSelectedId(null);
  };

  const deleteSelected = () => {
    setNotifications(prev => prev.filter(n => !selectedItemIds.includes(n.id)));
    setSelectedItemIds([]);
    setSelectedId(null);
  };

  const deleteSingle = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
    setSelectedId(null);
  };

  const selectedNotif = notifications.find(n => n.id === selectedId);
  const isAllSelected = displayedNotifs.length > 0 && selectedItemIds.length === displayedNotifs.length;
  const hasSelection = selectedItemIds.length > 0;

  return (
    <Container>
      <Sidebar $showInMobile={selectedId === null}>
        <SidebarHeader>
          <div className="title-row">
            <h2>Central de Avisos</h2>
          </div>
          
          <Toolbar>
            <CustomCheckbox 
              checked={isAllSelected}
              onChange={toggleSelectAll}
              title="Selecionar todas"
            />
            {hasSelection && (
              <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600, marginLeft: '8px', flex: 1 }}>
                {selectedItemIds.length} selecionadas
              </span>
            )}
            <div style={{ flex: hasSelection ? 0 : 1 }} />
            <ToolButton 
              title="Excluir permanentemente" 
              disabled={!hasSelection}
              onClick={deleteSelected}
            >
              <Trash2 size={18} />
            </ToolButton>
          </Toolbar>
        </SidebarHeader>

        <NotificationList>
          {displayedNotifs.length > 0 ? displayedNotifs.map((notif) => (
            <NotificationItem 
              key={notif.id}
              $active={selectedId === notif.id}
              $unread={notif.unread}
              onClick={() => handleSelectNotif(notif.id)}
            >
              <div onClick={(e) => e.stopPropagation()}>
                <CustomCheckbox 
                  checked={selectedItemIds.includes(notif.id)}
                  onChange={() => handleCheckboxChange(notif.id)}
                />
              </div>
              <div className="content-wrapper">
                <div className="header">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflow: 'hidden' }}>
                    {notif.isFavorite && <Star size={14} fill="#3b82f6" color="#3b82f6" style={{ flexShrink: 0 }} />}
                    <h4>{notif.title}</h4>
                  </div>
                  <span className="time">{notif.date} • {notif.time}</span>
                </div>
                <p className="desc">{notif.desc}</p>
              </div>
              {notif.unread ? (
                <div className="indicator" />
              ) : (
                <CheckCheck size={16} color="#3b82f6" style={{ marginTop: '4px', flexShrink: 0 }} />
              )}
            </NotificationItem>
          )) : (
            <div style={{ padding: '40px 24px', textAlign: 'center', color: '#94a3b8', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
              <CheckSquare size={32} opacity={0.5} />
              <span>Nenhum aviso nesta categoria.</span>
            </div>
          )}
        </NotificationList>
      </Sidebar>

      <ContentArea $showInMobile={selectedId !== null}>
        <AnimatePresence mode="wait">
          {selectedNotif ? (
            <DetailView
              key={selectedNotif.id}
              as={motion.div}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <MobileBackButton onClick={() => setSelectedId(null)}>
                <ChevronLeft size={20} /> Voltar para lista
              </MobileBackButton>

              <DetailHeader>
                <h1>{selectedNotif.title}</h1>
                <div className="meta">
                  <span className="tag">{selectedNotif.category}</span>
                  <span className="timestamp">Recebido em {selectedNotif.date} às {selectedNotif.time}</span>
                </div>
              </DetailHeader>
              <DetailBody>
                <p>{selectedNotif.fullText}</p>
                
                <div className="actions">
                  <ActionButton $variant="primary">
                    <ArrowRight size={18} /> Acessar conteúdo
                  </ActionButton>
                  <ActionButton $variant="danger" onClick={() => deleteSingle(selectedNotif.id)}>
                    <Trash2 size={18} /> Excluir aviso
                  </ActionButton>
                </div>
              </DetailBody>
            </DetailView>
          ) : (
            <EmptyState
              as={motion.div}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <BellOff size={64} strokeWidth={1} />
              <h3>Nenhuma leitura ativa</h3>
              <p>Selecione um aviso na lista ao lado para expandir.</p>
            </EmptyState>
          )}
        </AnimatePresence>
      </ContentArea>
    </Container>
  );
};

export default NotificationsTab;
