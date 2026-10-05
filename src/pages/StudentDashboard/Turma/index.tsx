import React, { useState, useRef } from 'react';
import {
  MessageSquare,
  FileText,
  Calendar,
  Users,
  FileCheck,
  Download,
  ExternalLink,
  CalendarDays,
  Clock,
  Check,
  X,
  UploadCloud,
  Trash2,
  AlertTriangle,
  Edit2,
  Plus
} from 'lucide-react';
import {
  TurmaContainer,
  Banner,
  BannerInfo,
  StudentsCount, BannerBadge, AvatarsGroup,
  TabsList,
  TabItem,
  ContentArea,
  SectionHeader,
  MessageCard,
  ClassItem,
  StudentRow,
  AtestadoCard,
  Button,
  FilterGroup,
  FilterButton,
  StatusTag,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  UploadBox,
  UploadedFileItem,
  ModalFooter,
  ToastContainer,
  ToastCard,
  ErrorMessage
} from './style';

const TABS = [
  { id: 'mural', label: 'Mural de Avisos', icon: <MessageSquare /> },
  { id: 'materiais', label: 'Materiais & atividades', icon: <FileText /> },
  { id: 'agenda', label: 'Agenda da Turma', icon: <Calendar /> },
  { id: 'alunos', label: 'Alunos da Turma', icon: <Users /> },
  { id: 'atestados', label: 'Atestados Médicos', icon: <FileCheck /> },
];

const Turma: React.FC = () => {
  const [activeTab, setActiveTab] = useState('mural');
  const [unreadOnly, setUnreadOnly] = useState(false);
  const [atestadoFilter, setAtestadoFilter] = useState('todos');
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'new' | 'edit'>('new');
  const [selectedClassId, setSelectedClassId] = useState<number | null>(null);
  const [fileUploaded, setFileUploaded] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileUploaded(e.target.files[0]);
      setFormError(null);
    }
  };
  
  // Validation state
  const [formError, setFormError] = useState<string | null>(null);
  const [dateError, setDateError] = useState<string | null>(null);

  // Agenda state
  const [confirmedClasses, setConfirmedClasses] = useState<number[]>([]);
  const [toasts, setToasts] = useState<{id: number, title: string, desc?: string}[]>([]);

  const addToast = (title: string, desc?: string) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, title, desc }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const toggleConfirmPresence = (index: number) => {
    if (confirmedClasses.includes(index)) {
      setConfirmedClasses(confirmedClasses.filter(c => c !== index));
    } else {
      setConfirmedClasses([...confirmedClasses, index]);
      addToast('Presença confirmada com sucesso!', 'Aguarde o início da aula para participar');
    }
  };

  const handleOpenModal = (type: 'new' | 'edit', classId?: number) => {
    setModalType(type);
    if (classId !== undefined) {
      setSelectedClassId(classId);
    }
    setFileUploaded(null);
    setFormError(null);
    setDateError(null);
    setIsModalOpen(true);
  };

  const handleSubmitModal = () => {
    if (!fileUploaded) {
      setFormError('Adicione o arquivo para prosseguir');
      return;
    }
    if (selectedClassId === 1) { // Just to simulate an error for a specific option like the image
       setDateError('Atestado enviado fora do prazo de justificativa');
       return;
    }
    
    setFormError(null);
    setDateError(null);
    setIsModalOpen(false);
    addToast(
      modalType === 'new' ? 'Atestado enviado com sucesso!' : 'Atestado atualizado com sucesso!',
      'Aguarde a revisão da professora'
    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'mural':
        return (
          <>
            <SectionHeader>
              <h3>Avisos para a turma</h3>
              <div className="right-action">
                <span>Apenas não lidas</span>
                <ToggleSwitch 
                  $active={unreadOnly} 
                  onClick={() => setUnreadOnly(!unreadOnly)} 
                />
              </div>
            </SectionHeader>

            <MessageCard>
              <div className="author-row">
                <div className="author-avatar" style={{ backgroundColor: "#D68C72", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "600", fontSize: "14px", borderRadius: "50%", backgroundImage: "none" }}>PC</div>
                <div className="author-info">
                  <h5>Prof.ª Lara Charantola</h5>
                  <span>Hoje, 10:52</span>
                </div>
              </div>
              <div className="message-content">
                Pessoal, nesta quinta vamos revisar os tempos verbais antes da atividade da aula passada.
              </div>
              <div className="unread-dot" />
            </MessageCard>

            <MessageCard>
              <div className="author-row">
                <div className="author-avatar" style={{ backgroundColor: "#D68C72", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "600", fontSize: "14px", borderRadius: "50%", backgroundImage: "none" }}>PC</div>
                <div className="author-info">
                  <h5>Prof.ª Lara Charantola</h5>
                  <span>2 set 2026, 18:15</span>
                </div>
              </div>
              <div className="message-content">
                O material complementar da última aula já está disponível. Recomendo a leitura antes da nossa próxima aula.
              </div>
              <div className="unread-dot" />
            </MessageCard>
          </>
        );

      case 'materiais':
        return (
          <>
            <SectionHeader>
              <h3>Materiais & atividades</h3>
            </SectionHeader>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ padding: '24px', border: '1px solid #E2E8F0', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '8px', backgroundColor: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748B' }}>
                    <FileText size={24} />
                  </div>
                  <div>
                    <h4 style={{ margin: '0 0 4px 0', color: '#1E293B' }}>Review - Modal Verbs.pdf</h4>
                    <span style={{ fontSize: '0.85rem', color: '#64748B' }}>PDF • 2.4 MB • Adicionado ontem</span>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <Button $variant="outline" onClick={() => addToast('Abrindo...', 'Iniciando visualização segura')}><ExternalLink size={16} /> Abrir</Button>
                  <Button onClick={() => addToast('Download iniciado', 'O arquivo está sendo baixado no seu dispositivo')}><Download size={16} /> Baixar</Button>
                </div>
              </div>
              
              <div style={{ padding: '24px', border: '1px solid #E2E8F0', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '8px', backgroundColor: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748B' }}>
                    <FileText size={24} />
                  </div>
                  <div>
                    <h4 style={{ margin: '0 0 4px 0', color: '#1E293B' }}>Vocabulary List - Unit 3.pdf</h4>
                    <span style={{ fontSize: '0.85rem', color: '#64748B' }}>PDF • 1.1 MB • Adicionado 25 ago 2026</span>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <Button $variant="outline" onClick={() => addToast('Abrindo...', 'Iniciando visualização segura')}><ExternalLink size={16} /> Abrir</Button>
                  <Button onClick={() => addToast('Download iniciado', 'O arquivo está sendo baixado no seu dispositivo')}><Download size={16} /> Baixar</Button>
                </div>
              </div>
            </div>
          </>
        );

      case 'agenda':
        return (
          <>
            <SectionHeader>
              <div style={{ display: "flex", flexDirection: "column", padding: "16px 24px", backgroundColor: "#F8FAFC", borderRadius: "12px", border: "1px solid #E2E8F0", width: "100%" }}>
                <span className="label" style={{ fontSize: "0.75rem", fontWeight: 800, color: "#64748B", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Horário da Turma</span>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", color: "#1E293B", flexWrap: "wrap" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <CalendarDays size={18} color="#4A72FF" />
                    <span style={{ fontWeight: 700, fontSize: "1.05rem" }}>Terça e Quinta</span>
                  </div>
                  <span style={{ color: "#CBD5E1", fontWeight: "bold" }}>•</span>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <Clock size={18} color="#4A72FF" />
                    <span style={{ fontWeight: 600, fontSize: "1.05rem" }}>18:30 - 19:30</span>
                  </div>
                </div>
              </div>
            </SectionHeader>
            
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1E293B', marginBottom: '16px' }}>Próximas Aulas</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[1, 2, 3, 4].map((item, index) => {
                  const isConfirmed = confirmedClasses.includes(index);
                  return (
                  <ClassItem key={item}>
                    <div className="left-part">
                      <div className="date-box">
                        <strong>0{item + 1}</strong>
                        <span>SET</span>
                      </div>
                      <div className="class-info">
                        <h5>{index % 2 === 0 ? 'Terça-feira' : 'Quinta-feira'}</h5>
                        <p>18:30 - 19:30</p>
                      </div>
                    </div>
                    <div className="actions">
                      <Button $variant="outline" onClick={() => handleOpenModal('new', index)}>
                        Enviar atestado
                      </Button>
                      <Button 
                        onClick={() => toggleConfirmPresence(index)}
                        style={isConfirmed ? { backgroundColor: '#10B981', borderColor: '#10B981', color: 'white' } : {}}
                      >
                        {isConfirmed ? <><Check size={16} /> Presença Confirmada</> : 'Confirmar presença'}
                      </Button>
                    </div>
                  </ClassItem>
                )})}
              </div>
            </div>
          </>
        );

      case 'alunos':
        return (
          <>
            <SectionHeader>
              <h3>Alunos da Turma</h3>
              <span style={{ color: '#64748B', fontWeight: 500 }}>2 alunos matriculados</span>
            </SectionHeader>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <StudentRow>
                <div className="student-avatar" style={{ backgroundColor: '#4F46E5', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.2rem' }}>AS</div>
                <div className="student-info" style={{ flex: 1 }}>
                  <span className="student-name">Ana Silva</span>
                  <span className="student-email">ana.silva@email.com</span>
                </div>
                <div className="student-status" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600, color: '#10B981' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10B981' }} /> Ativo
                </div>
              </StudentRow>
              <StudentRow>
                <div className="student-avatar" style={{ backgroundColor: '#D97757', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.2rem' }}>LP</div>
                <div className="student-info" style={{ flex: 1 }}>
                  <span className="student-name">Lucas Pereira</span>
                  <span className="student-email">lucas.pereira@email.com</span>
                </div>
                <div className="student-status" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600, color: '#10B981' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10B981' }} /> Ativo
                </div>
              </StudentRow>
            </div>
          </>
        );

      case 'atestados':
        return (
          <>
            <SectionHeader>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', flexWrap: 'wrap', gap: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                  <h3 style={{ margin: 0 }}>Atestados Médicos</h3>
                  <FilterGroup>
                    <FilterButton 
                      $active={atestadoFilter === 'todos'} 
                      onClick={() => setAtestadoFilter('todos')}
                    >
                      Todos
                    </FilterButton>
                    <FilterButton 
                      $active={atestadoFilter === 'pendente'} 
                      onClick={() => setAtestadoFilter('pendente')}
                    >
                      Pendente
                    </FilterButton>
                    <FilterButton 
                      $active={atestadoFilter === 'aprovado'} 
                      onClick={() => setAtestadoFilter('aprovado')}
                    >
                      Aprovado
                    </FilterButton>
                    <FilterButton 
                      $active={atestadoFilter === 'rejeitado'} 
                      onClick={() => setAtestadoFilter('rejeitado')}
                    >
                      Rejeitado
                    </FilterButton>
                  </FilterGroup>
                </div>
                <Button onClick={() => handleOpenModal('new')}>
                  <Plus size={18} /> Enviar Atestado
                </Button>
              </div>
            </SectionHeader>

            {(() => {
              const MOCK_ATESTADOS = [
                { id: 1, file: 'atestado_medico_02-09.pdf', date: '03 set 2026 - 14:20', justifiedDate: '02 set 2026', desc: 'Consulta médica de rotina agendada no horário da aula.', status: 'aprovado' },
                { id: 2, file: 'atestado_gripe.pdf', date: '06 set 2026 - 09:42', justifiedDate: '05 set 2026', desc: 'apresento quadro de virose e preciso me ausentar hoje', status: 'pendente' },
                { id: 3, file: 'declaracao_trabalho.jpg', date: '25 ago 2026 - 18:00', justifiedDate: '25 ago 2026', desc: 'Fiquei preso no trabalho para uma reunião emergencial. Documento anexado.', status: 'rejeitado' },
              ];

              const filteredAtestados = atestadoFilter === 'todos' 
                ? MOCK_ATESTADOS 
                : MOCK_ATESTADOS.filter(a => a.status === atestadoFilter);

              return (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {filteredAtestados.map(atestado => (
                  <AtestadoCard key={atestado.id} $status={atestado.status as 'aprovado' | 'pendente' | 'rejeitado'}>
                    <div className="header-row">
                      <div className="file-info">
                        <div className="icon-box">
                          <FileCheck />
                        </div>
                        <div>
                          <h5>{atestado.file}</h5>
                          <p>Enviado em {atestado.date}</p>
                        </div>
                      </div>
                      <StatusTag $status={atestado.status as 'aprovado' | 'pendente' | 'rejeitado'}>
                        {atestado.status === 'aprovado' && <><Check size={14} /> Aprovado</>}
                        {atestado.status === 'pendente' && 'Pendente'}
                        {atestado.status === 'rejeitado' && <><X size={14} /> Rejeitado</>}
                      </StatusTag>
                    </div>

                    <div className="justified-class">
                      <div>
                        <span>AULA JUSTIFICADA</span>
                        <strong>{atestado.justifiedDate}</strong>
                      </div>
                      <Button $variant="outline" style={{ backgroundColor: '#1F2B45', color: 'white' }} onClick={() => addToast('Abrindo...', 'Iniciando visualização do documento')}>
                        <ExternalLink size={16} /> Visualizar Atestado
                      </Button>
                    </div>

                    <div className="desc-row">
                    <div className="desc-content">
                      <span>Descrição</span>
                      <p>{atestado.desc}</p>
                      {atestado.status === 'pendente' && (
                        <div className="status-msg pendente">
                          <Clock size={16} /> Aguardando aprovação da professora
                        </div>
                      )}
                      {atestado.status === 'rejeitado' && (
                        <div className="status-msg rejeitado">
                          <AlertTriangle size={16} /> Atestado inválido ou enviado fora do prazo
                        </div>
                      )}
                      {atestado.status === 'aprovado' && (
                        <div className="status-msg aprovado">
                          <Check size={16} /> Justificativa aceita
                        </div>
                      )}
                    </div>
                    <Button $variant="outline" onClick={() => handleOpenModal('edit')}>
                      <Edit2 size={16} /> Editar
                    </Button>
                  </div>
                </AtestadoCard>
                  ))}
                </div>
              );
            })()}
          </>
        );

      default:
        return null;
    }
  };

  const ToggleSwitch = ({ $active, onClick }: { $active: boolean, onClick: () => void }) => (
    <button 
      onClick={onClick}
      style={{
        width: '40px', height: '22px', borderRadius: '11px',
        background: $active ? '#10B981' : '#E2E8F0',
        border: 'none', position: 'relative', cursor: 'pointer',
        transition: 'background 0.2s'
      }}
    >
      <div style={{
        width: '18px', height: '18px', borderRadius: '50%',
        background: 'white', position: 'absolute', top: '2px',
        left: $active ? '20px' : '2px', transition: 'left 0.2s'
      }} />
    </button>
  );

  return (
    <TurmaContainer>
      <Banner>
        <h2>Turma Intermediate A</h2>
        <BannerInfo>
          <BannerBadge>Intermediate</BannerBadge>
          <AvatarsGroup onClick={() => setActiveTab('alunos')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div className="avatar">AS</div>
              <div className="avatar orange">LP</div>
            </div>
            <StudentsCount>2 alunos</StudentsCount>
          </AvatarsGroup>
        </BannerInfo>
      </Banner>

      <TabsList>
        {TABS.map(tab => (
          <TabItem 
            key={tab.id} 
            $active={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.icon}
            {tab.label}
          </TabItem>
        ))}
      </TabsList>

      <ContentArea>
        {renderTabContent()}
      </ContentArea>

      <ToastContainer>
        {toasts.map(toast => (
          <ToastCard key={toast.id}>
            <div className="icon-circle">
              <Check size={20} />
            </div>
            <div className="toast-content">
              <h5>{toast.title}</h5>
              {toast.desc && <p>{toast.desc}</p>}
            </div>
            <button className="close-btn" onClick={() => removeToast(toast.id)}>
              <X size={16} />
            </button>
          </ToastCard>
        ))}
      </ToastContainer>

      {/* Modal Editar/Enviar Atestado */}
      {isModalOpen && (
        <ModalOverlay onClick={() => setIsModalOpen(false)}>
          <ModalContent onClick={e => e.stopPropagation()}>
            <ModalHeader>
              <h3>{modalType === 'new' ? 'Enviar Atestado Médico' : 'Editar Atestado Médico'}</h3>
              <button onClick={() => setIsModalOpen(false)}>
                <X size={20} />
              </button>
            </ModalHeader>
            <ModalBody>
              <div className="form-group">
                <label>Qual aula deseja justificar?</label>
                <select 
                  value={selectedClassId ?? 'terca'} 
                  onChange={(e) => {
                    setSelectedClassId(Number(e.target.value) || 0);
                    setDateError(null);
                  }}
                >
                  <option value={0}>Terça, 01/09 - 19:00 - Turma Intermediate A</option>
                  <option value={1}>Quinta, 03/09 - 19:00 - Turma Intermediate A</option>
                  <option value={2}>Terça, 08/09 - 19:00 - Turma Intermediate A</option>
                  <option value="terca">Terça, 02/09 - 19:00 - Turma Intermediate A</option>
                </select>
                {dateError && <ErrorMessage><AlertTriangle size={14} /> {dateError}</ErrorMessage>}
              </div>

              <div className="form-group">
                <label>Quando deseja realizar a reposição?</label>
                <select defaultValue="sexta">
                  <option value="sexta">Sexta, 11/09 - 19:00</option>
                  <option value="quarta">Quarta, 16/09 - 19:00</option>
                </select>
              </div>

              {!fileUploaded ? (
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <input type="file" ref={fileInputRef} onChange={handleFileSelect} style={{ display: "none" }} accept=".pdf,.jpg,.jpeg,.png" />
                  <UploadBox 
                    onClick={() => fileInputRef.current?.click()}
                    style={formError ? { borderColor: "#EF4444", backgroundColor: "#FEF2F2" } : {}}
                  >
                    <div className="upload-icon">
                      <UploadCloud size={24} />
                    </div>
                    <strong>Arraste o arquivo aqui ou clique para selecionar</strong>
                    <span>Formatos aceitos: PDF, JPG, PNG - Tamanho máximo: 5MB</span>
                  </UploadBox>
                  {formError && <ErrorMessage style={{ marginTop: '8px' }}><AlertTriangle size={14} /> {formError}</ErrorMessage>}
                </div>
              ) : (
                <UploadedFileItem>
                  <div className="file-details">
                    <div className="icon-circle">
                      <FileText size={16} />
                    </div>
                    <div>
                      <strong>{fileUploaded.name}</strong>
                      <span>{(fileUploaded.size / 1024 / 1024).toFixed(2)} MB - Arquivo pronto para envio</span>
                    </div>
                  </div>
                  <button title="Remover" onClick={(e) => { e.stopPropagation(); setFileUploaded(null); }}>
                    <Trash2 size={16} />
                  </button>
                </UploadedFileItem>
              )}

              <div className="form-group">
                <label>Observações (opcional)</label>
                <textarea placeholder={modalType === 'new' ? "Adicione o motivo da ausência ou informações adicionais..." : "Editar o motivo da ausência ou informações adicionais..."} />
              </div>
            </ModalBody>
            <ModalFooter>
              <p><Clock size={16} /> A professora será notificada e irá analisar o atestado enviado.</p>
              <div className="buttons">
                <Button onClick={handleSubmitModal}>
                  {modalType === 'new' ? <><FileCheck size={16} /> Enviar Atestado</> : <><Edit2 size={16} /> Salvar alterações</>}
                </Button>
              </div>
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      )}
    </TurmaContainer>
  );
};

export default Turma;













