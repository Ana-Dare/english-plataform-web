import React, { useState, useRef, useMemo, useEffect } from 'react';
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
  Plus,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  AlertCircle,
  FolderOpen,
  CalendarCheck,
  FileCheck2,
  BookOpen,
  Folder,
  Eye,
  Search,
  Tag,
  Presentation,
  FileSpreadsheet,
  Image as ImageIcon,
  Film,
  Music,
  Bookmark
} from 'lucide-react';
import CustomDropdown from '../../../components/CustomDropdown';
import MobileCarousel from '../../../components/MobileCarousel';
import DocumentViewerModal from '../../TeacherDashboard/Classes/DocumentViewerModal';
import type { LessonMaterial, Lesson } from '../../TeacherDashboard/services/material';
import {
  formatMaterialDateTime,
  listClassLessons,
  listLessonMaterials,
} from '../../TeacherDashboard/services/material';
import { listClasses } from '../../TeacherDashboard/services/class';
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
  NavyButton,
  OutlineNavyButton,
  EmptyAtestadosState,
  StudentMaterialsStatusStrip,
  StudentMaterialsControlsRow,
  StudentMaterialsSearchBarWrapper,
  StudentStatusCarouselWrapper,
  StudentMaterialSearchBox,
  StudentLessonBlock,
  StudentMaterialCard,
  StudentMaterialCardLeft,
  StudentMaterialCardGlyph,
  StudentMaterialCardContent,
  StudentMaterialSecondaryContent,
  StudentMaterialMobileSecondaryActions,
  StudentMaterialDesktopActions,
  StudentMaterialMobileFooter,
  MobileExpandBtn,
  StudentBookmarkBtn,
  StudentToggleReadBtn,
  StudentViewDocPill,
  StudentDownloadDocBtn,
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

const formatCleanTitle = (title?: string) => {
  if (!title) return 'Material';
  return title.replace(/\.(pdf|pptx|ppt|xlsx|xls|docx|doc|zip|rar|mp4|mp3|png|jpg|jpeg)$/i, '').trim();
};

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
  const [expandedAtestadoIds, setExpandedAtestadoIds] = useState<number[]>([]);

  const toggleExpandAtestado = (id: number) => {
    setExpandedAtestadoIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Estados para Materiais & Atividades (igual à professora + visualizador)
  const [materialSearchQuery, setMaterialSearchQuery] = useState('');
  const [materialFilterLesson, setMaterialFilterLesson] = useState('all');
  const [materialFilterCategory, setMaterialFilterCategory] = useState('all');
  const [materialStatusFilter, setMaterialStatusFilter] = useState<'all' | 'pending' | 'viewed' | 'bookmarked'>('all');

  // Controle de Visualização e Marcadores do Aluno com Persistência
  const [viewedMaterialIds, setViewedMaterialIds] = useState<number[]>(() => {
    try {
      const stored = localStorage.getItem('@App:student_viewed_materials_1');
      if (stored) return JSON.parse(stored);
    } catch {}
    return [];
  });

  const [bookmarkedMaterialIds, setBookmarkedMaterialIds] = useState<number[]>(() => {
    try {
      const stored = localStorage.getItem('@App:student_bookmarked_materials_1');
      if (stored) return JSON.parse(stored);
    } catch {}
    return [];
  });

  // Controle de cards expandidos no celular (seguindo o mesmo padrão de Alunos)
  const [expandedMaterialIds, setExpandedMaterialIds] = useState<number[]>([]);

  const toggleMaterialExpand = (id: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setExpandedMaterialIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Estados para Visualizador de Documentos
  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewerMaterials, setViewerMaterials] = useState<LessonMaterial[]>([]);
  const [viewerInitialId, setViewerInitialId] = useState<number | undefined>(undefined);

  const [materials, setMaterials] = useState<LessonMaterial[]>([]);
  const [lessons, setLessons] = useState<Lesson[]>([]);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const { classes } = await listClasses();
        const classId = classes.find((c) => c.id > 0)?.id;
        if (!classId || !active) {
          if (active) {
            setLessons([]);
            setMaterials([]);
          }
          return;
        }
        const classLessons = await listClassLessons(classId);
        const perLesson = await Promise.all(
          classLessons.map((lesson) => listLessonMaterials(lesson.id)),
        );
        if (!active) return;
        setLessons(classLessons);
        setMaterials(perLesson.flat());
      } catch {
        if (active) {
          setLessons([]);
          setMaterials([]);
        }
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  const markAsViewed = (id: number) => {
    setViewedMaterialIds(prev => {
      if (prev.includes(id)) return prev;
      const updated = [...prev, id];
      try {
        localStorage.setItem('@App:student_viewed_materials_1', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const handleToggleBookmark = (id: number, title?: string) => {
    setBookmarkedMaterialIds(prev => {
      const isBookmarked = prev.includes(id);
      const updated = isBookmarked ? prev.filter(item => item !== id) : [...prev, id];
      try {
        localStorage.setItem('@App:student_bookmarked_materials_1', JSON.stringify(updated));
      } catch {}
      const cleanName = formatCleanTitle(title);
      addToast(
        isBookmarked ? 'Lembrete removido' : 'Salvo para rever!',
        isBookmarked
          ? `"${cleanName}" foi removido dos seus lembretes.`
          : `"${cleanName}" foi salvo na sua lista de revisão.`
      );
      return updated;
    });
  };

  const handleToggleViewed = (id: number, title?: string) => {
    setViewedMaterialIds(prev => {
      const isViewed = prev.includes(id);
      const updated = isViewed ? prev.filter(item => item !== id) : [...prev, id];
      try {
        localStorage.setItem('@App:student_viewed_materials_1', JSON.stringify(updated));
      } catch {}
      const cleanName = formatCleanTitle(title);
      addToast(
        isViewed ? 'Marcado como pendente' : 'Marcado como visualizado!',
        isViewed
          ? `O material "${cleanName}" foi marcado como pendente.`
          : `O material "${cleanName}" foi marcado como visualizado.`
      );
      return updated;
    });
  };

  const handleMarkAllAsViewed = () => {
    const allIds = materials.map(m => m.id);
    setViewedMaterialIds(allIds);
    try {
      localStorage.setItem('@App:student_viewed_materials_1', JSON.stringify(allIds));
    } catch {}
    addToast('Todos visualizados!', 'Todos os materiais da turma foram marcados como visualizados.');
  };

  const handleOpenViewer = (items: LessonMaterial[], initialId?: number) => {
    const targetId = initialId ?? items[0]?.id;
    if (targetId) {
      markAsViewed(targetId);
    }
    setViewerMaterials(items);
    setViewerInitialId(targetId);
    setViewerOpen(true);
  };

  const handleDownloadMaterial = (mat: LessonMaterial) => {
    const cleanName = formatCleanTitle(mat.title || mat.file);
    addToast(
      'Download iniciado',
      `O arquivo "${cleanName}" está sendo baixado no seu dispositivo.`
    );
    if (mat.link && mat.link !== '#') {
      const link = document.createElement('a');
      link.href = mat.link;
      link.download = mat.file || 'material';
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const totalMaterialsCount = materials.length;
  const viewedCount = useMemo(() => {
    return materials.filter(m => viewedMaterialIds.includes(m.id)).length;
  }, [materials, viewedMaterialIds]);
  const pendingCount = totalMaterialsCount - viewedCount;
  const bookmarkedCount = useMemo(() => {
    return materials.filter(m => bookmarkedMaterialIds.includes(m.id)).length;
  }, [materials, bookmarkedMaterialIds]);
  const progressPercent = totalMaterialsCount > 0 ? Math.round((viewedCount / totalMaterialsCount) * 100) : 0;

  const filteredMaterials = useMemo(() => {
    return materials.filter(m => {
      // Filtro por Status (Não visualizado / Visualizado / Marcado)
      if (materialStatusFilter === 'pending' && viewedMaterialIds.includes(m.id)) {
        return false;
      }
      if (materialStatusFilter === 'viewed' && !viewedMaterialIds.includes(m.id)) {
        return false;
      }
      if (materialStatusFilter === 'bookmarked' && !bookmarkedMaterialIds.includes(m.id)) {
        return false;
      }

      if (materialFilterLesson === 'general' && m.lessonId !== 0) return false;
      if (
        materialFilterLesson !== 'all' &&
        materialFilterLesson !== 'general' &&
        String(m.lessonId) !== materialFilterLesson
      ) {
        return false;
      }
      if (
        materialFilterCategory !== 'all' &&
        m.category !== materialFilterCategory
      ) {
        return false;
      }
      if (materialSearchQuery.trim()) {
        const q = materialSearchQuery.toLowerCase().trim();
        const matchTitle = (m.title || '').toLowerCase().includes(q);
        const matchFile = (m.file || '').toLowerCase().includes(q);
        const matchDesc = (m.description || '').toLowerCase().includes(q);
        const matchCat = (m.category || '').toLowerCase().includes(q);
        if (!matchTitle && !matchFile && !matchDesc && !matchCat) return false;
      }
      return true;
    });
  }, [
    materials,
    materialStatusFilter,
    viewedMaterialIds,
    bookmarkedMaterialIds,
    materialFilterLesson,
    materialFilterCategory,
    materialSearchQuery
  ]);

  const generalMaterials = useMemo(() => {
    return filteredMaterials.filter(m => !m.lessonId || m.lessonId === 0);
  }, [filteredMaterials]);

  const lessonsWithMaterials = useMemo(() => {
    return lessons.map(lesson => ({
      lesson,
      items: filteredMaterials.filter(m => m.lessonId === lesson.id),
    }));
  }, [lessons, filteredMaterials]);

  const renderMaterialGlyph = (type: string) => {
    switch (type) {
      case 'pdf':
        return (
          <StudentMaterialCardGlyph $type="pdf" title="Documento PDF">
            <FileText size={20} />
          </StudentMaterialCardGlyph>
        );
      case 'presentation':
        return (
          <StudentMaterialCardGlyph $type="presentation" title="Apresentação PPT / Slides">
            <Presentation size={20} />
          </StudentMaterialCardGlyph>
        );
      case 'spreadsheet':
        return (
          <StudentMaterialCardGlyph $type="spreadsheet" title="Planilha Excel">
            <FileSpreadsheet size={20} />
          </StudentMaterialCardGlyph>
        );
      case 'image':
        return (
          <StudentMaterialCardGlyph $type="image" title="Imagem">
            <ImageIcon size={20} />
          </StudentMaterialCardGlyph>
        );
      case 'video':
        return (
          <StudentMaterialCardGlyph $type="video" title="Vídeo">
            <Film size={20} />
          </StudentMaterialCardGlyph>
        );
      case 'audio':
        return (
          <StudentMaterialCardGlyph $type="audio" title="Áudio">
            <Music size={20} />
          </StudentMaterialCardGlyph>
        );
      case 'link':
        return (
          <StudentMaterialCardGlyph $type="link" title="Link externo">
            <ExternalLink size={20} />
          </StudentMaterialCardGlyph>
        );
      default:
        return (
          <StudentMaterialCardGlyph $type="document" title="Documento">
            <FileText size={20} />
          </StudentMaterialCardGlyph>
        );
    }
  };

  const renderMaterialItem = (mat: LessonMaterial, batchList: LessonMaterial[]) => {
    const isViewed = viewedMaterialIds.includes(mat.id);
    const isBookmarked = bookmarkedMaterialIds.includes(mat.id);
    const isExpanded = expandedMaterialIds.includes(mat.id);

    return (
      <StudentMaterialCard
        key={mat.id}
        $isViewed={isViewed}
        $isExpanded={isExpanded}
        onClick={() => {
          if (typeof window !== 'undefined' && window.innerWidth <= 768) {
            toggleMaterialExpand(mat.id);
          } else {
            handleOpenViewer(batchList, mat.id);
          }
        }}
        title="Clique para visualizar o material"
      >
        <StudentMaterialCardLeft>
          {renderMaterialGlyph(mat.type)}
          <StudentMaterialCardContent>
            <div className="card-primary-row">
              <h4 title={mat.title || mat.file}>{formatCleanTitle(mat.title || mat.file)}</h4>
              <div className="status-badge-inline">
                {isViewed ? (
                  <span className="badge-item status-viewed" title="Você já visualizou este material">
                    <Check size={11} /> Visualizado
                  </span>
                ) : (
                  <span className="badge-item status-unviewed" title="Material pendente de visualização">
                    Não visualizado
                  </span>
                )}
              </div>
            </div>

            {/* Conteúdo Secundário (Oculto no celular inicialmente; exibido no desktop ou ao expandir) */}
            <StudentMaterialSecondaryContent $isExpanded={isExpanded}>
              {mat.description && <p className="desc">{mat.description}</p>}

              <div className="badges-line">
                {isBookmarked && (
                  <span className="badge-item status-bookmarked" title="Marcado nos seus lembretes de estudo">
                    <Bookmark size={11} /> Marcado
                  </span>
                )}
                <span className="badge-item category">
                  <Tag size={11} /> {mat.category || 'Geral'}
                </span>
                <span className="badge-item format">{mat.type.toUpperCase()}</span>
                {mat.sizeFormatted && (
                  <span className="badge-item size">{mat.sizeFormatted}</span>
                )}
                {mat.createdAt && (
                  <span className="badge-item date">
                    • {formatMaterialDateTime(mat.createdAt)}
                  </span>
                )}
                {mat.isExternalLink && (
                  <span className="badge-item external">
                    <ExternalLink size={11} /> Link externo
                  </span>
                )}
              </div>

              {/* Ações secundárias expandidas no celular */}
              <StudentMaterialMobileSecondaryActions onClick={(e) => e.stopPropagation()}>
                <button
                  type="button"
                  className={`secondary-action-pill ${isBookmarked ? 'active' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleToggleBookmark(mat.id, mat.title || mat.file);
                  }}
                  title={isBookmarked ? "Remover dos lembretes" : "Marcar para rever"}
                >
                  <Bookmark size={13} fill={isBookmarked ? "currentColor" : "none"} />
                  <span>{isBookmarked ? 'Marcado para rever' : 'Marcar para rever'}</span>
                </button>

                <button
                  type="button"
                  className={`secondary-action-pill ${isViewed ? 'viewed' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleToggleViewed(mat.id, mat.title || mat.file);
                  }}
                  title={isViewed ? "Marcar como pendente" : "Marcar como visualizado"}
                >
                  {isViewed ? <CheckCircle2 size={13} /> : <Check size={13} />}
                  <span>{isViewed ? 'Visualizado' : 'Marcar como lido'}</span>
                </button>

                <button
                  type="button"
                  className="secondary-action-pill"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDownloadMaterial(mat);
                  }}
                  title="Baixar material"
                >
                  <Download size={13} />
                  <span>Baixar arquivo</span>
                </button>
              </StudentMaterialMobileSecondaryActions>
            </StudentMaterialSecondaryContent>
          </StudentMaterialCardContent>
        </StudentMaterialCardLeft>

        {/* Ações no Desktop */}
        <StudentMaterialDesktopActions onClick={(e) => e.stopPropagation()}>
          <StudentBookmarkBtn
            type="button"
            $active={isBookmarked}
            title={isBookmarked ? "Remover dos lembretes" : "Salvar nos lembretes"}
            onClick={(e) => {
              e.stopPropagation();
              handleToggleBookmark(mat.id, mat.title || mat.file);
            }}
          >
            <Bookmark size={16} fill={isBookmarked ? "currentColor" : "none"} />
          </StudentBookmarkBtn>

          <StudentToggleReadBtn
            type="button"
            $isViewed={isViewed}
            title={isViewed ? "Marcar como pendente" : "Marcar como visualizado"}
            onClick={(e) => {
              e.stopPropagation();
              handleToggleViewed(mat.id, mat.title || mat.file);
            }}
          >
            {isViewed ? <CheckCircle2 size={16} /> : <Check size={16} />}
          </StudentToggleReadBtn>

          <StudentViewDocPill
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleOpenViewer(batchList, mat.id);
            }}
          >
            <Eye size={14} /> Abrir
          </StudentViewDocPill>

          <StudentDownloadDocBtn
            type="button"
            title="Baixar material"
            onClick={(e) => {
              e.stopPropagation();
              handleDownloadMaterial(mat);
            }}
          >
            <Download size={16} />
          </StudentDownloadDocBtn>
        </StudentMaterialDesktopActions>

        {/* Rodapé Mobile com Botão de Expansão (padrão da página de Alunos) + Botão Abrir */}
        <StudentMaterialMobileFooter onClick={(e) => e.stopPropagation()}>
          <MobileExpandBtn
            type="button"
            onClick={(e) => toggleMaterialExpand(mat.id, e)}
            aria-label={isExpanded ? "Ocultar detalhes" : "Ver mais detalhes"}
          >
            {isExpanded ? (
              <>
                <span>Menos detalhes</span>
                <ChevronUp size={14} />
              </>
            ) : (
              <>
                <span>Ver detalhes</span>
                <ChevronDown size={14} />
              </>
            )}
          </MobileExpandBtn>

          <StudentViewDocPill
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleOpenViewer(batchList, mat.id);
            }}
          >
            <Eye size={14} /> Abrir
          </StudentViewDocPill>
        </StudentMaterialMobileFooter>
      </StudentMaterialCard>
    );
  };
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'new' | 'edit'>('new');
  const [selectedClassId, setSelectedClassId] = useState<number | null>(null);
  const [makeupDay, setMakeupDay] = useState('sexta');
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

      case 'materiais': {
        const isFiltering =
          materialStatusFilter !== 'all' ||
          materialFilterLesson !== 'all' ||
          materialFilterCategory !== 'all' ||
          materialSearchQuery.trim() !== '';

        const handleClearFilters = () => {
          setMaterialStatusFilter('all');
          setMaterialFilterLesson('all');
          setMaterialFilterCategory('all');
          setMaterialSearchQuery('');
        };

        return (
          <>
            {/* Linha de Controles: Barra de Busca primeiro e Filtros de Status depois */}
            <StudentMaterialsControlsRow>
              <StudentMaterialsSearchBarWrapper>
                <StudentMaterialSearchBox>
                  <Search size={16} />
                  <input
                    type="text"
                    placeholder="Pesquisar material, apostila, exercício..."
                    value={materialSearchQuery}
                    onChange={(e) => setMaterialSearchQuery(e.target.value)}
                  />
                  {materialSearchQuery && (
                    <button
                      type="button"
                      onClick={() => setMaterialSearchQuery('')}
                      title="Limpar busca"
                    >
                      <X size={14} />
                    </button>
                  )}
                </StudentMaterialSearchBox>
              </StudentMaterialsSearchBarWrapper>

              <StudentStatusCarouselWrapper>
                <div className="carousel-scroll">
                  <button
                    type="button"
                    className={`seg-btn ${materialStatusFilter === 'all' ? 'active' : ''}`}
                    onClick={() => setMaterialStatusFilter('all')}
                  >
                    Todos <span className="count-chip">{totalMaterialsCount}</span>
                  </button>

                  <button
                    type="button"
                    className={`seg-btn ${materialStatusFilter === 'viewed' ? 'active' : ''}`}
                    onClick={() => setMaterialStatusFilter('viewed')}
                  >
                    <Check size={13} /> Visualizados
                    <span className="count-chip">{viewedCount}</span>
                  </button>

                  <button
                    type="button"
                    className={`seg-btn pending-btn ${materialStatusFilter === 'pending' ? 'active' : ''}`}
                    onClick={() => setMaterialStatusFilter('pending')}
                  >
                    Não visualizados
                    <span className="count-chip pending-chip">{pendingCount}</span>
                  </button>

                  <button
                    type="button"
                    className={`seg-btn bookmark-btn ${materialStatusFilter === 'bookmarked' ? 'active' : ''}`}
                    onClick={() => setMaterialStatusFilter('bookmarked')}
                  >
                    <Bookmark size={13} fill={materialStatusFilter === 'bookmarked' ? 'currentColor' : 'none'} />
                    <span>Marcados</span>
                    <span className="count-chip">{bookmarkedCount}</span>
                  </button>
                </div>
              </StudentStatusCarouselWrapper>
            </StudentMaterialsControlsRow>

            {/* 3. Faixa de Progresso e Estatísticas de Estudo (Desktop) */}
            <StudentMaterialsStatusStrip>
              <div className="status-left">
                <div className="icon-box">
                  <BookOpen size={18} />
                </div>
                <div className="info-col">
                  <h4>Materiais da Turma</h4>
                  <span className="progress-text">
                    {viewedCount} de {totalMaterialsCount} visualizados ({progressPercent}%)
                  </span>
                  {pendingCount > 0 ? (
                    <span className="pending-pill">
                      {pendingCount} {pendingCount === 1 ? 'pendente' : 'pendentes'}
                    </span>
                  ) : (
                    <span className="all-done-pill">
                      <Check size={11} /> Todos visualizados!
                    </span>
                  )}
                  {bookmarkedCount > 0 && (
                    <span className="bookmarked-pill">
                      <Bookmark size={11} />
                      {bookmarkedCount} {bookmarkedCount === 1 ? 'marcado' : 'marcados'}
                    </span>
                  )}
                </div>
              </div>

              <div className="status-actions">
                {pendingCount > 0 && (
                  <button
                    type="button"
                    className="quick-action-btn"
                    onClick={handleMarkAllAsViewed}
                    title="Marcar todos os materiais da turma como visualizados"
                  >
                    <Check size={14} /> Marcar todos como visualizados
                  </button>
                )}
              </div>
            </StudentMaterialsStatusStrip>

            {/* Listagem de Materiais */}
            {filteredMaterials.length === 0 ? (
              <EmptyAtestadosState>
                <div className="empty-icon">
                  <Search size={24} />
                </div>
                <h4>Nenhum material encontrado</h4>
                <p>Nenhum conteúdo corresponde aos critérios ou termos de busca selecionados.</p>
                {isFiltering && (
                  <OutlineNavyButton onClick={handleClearFilters} style={{ marginTop: '8px' }}>
                    <X size={14} /> Limpar filtros de busca
                  </OutlineNavyButton>
                )}
              </EmptyAtestadosState>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {/* 1. Materiais Gerais da Turma */}
                {(materialFilterLesson === 'all' || materialFilterLesson === 'general') &&
                  generalMaterials.length > 0 && (
                    <StudentLessonBlock>
                      <div className="block-header">
                        <h3>
                          <Folder size={18} color="#0F172A" />
                          Materiais Gerais da Turma
                          <span className="badge-doc-count">
                            ({generalMaterials.length} {generalMaterials.length === 1 ? 'documento' : 'documentos'})
                          </span>
                        </h3>
                      </div>

                      {generalMaterials.map((mat) => renderMaterialItem(mat, generalMaterials))}
                    </StudentLessonBlock>
                  )}

                {/* 2. Blocos por Aula */}
                {lessonsWithMaterials
                  .filter(({ lesson, items }) => {
                    if (materialFilterLesson === 'general') return false;
                    if (
                      materialFilterLesson !== 'all' &&
                      String(lesson.id) !== materialFilterLesson
                    ) {
                      return false;
                    }
                    return items.length > 0 || materialFilterLesson === String(lesson.id);
                  })
                  .map(({ lesson, items }) => (
                    <StudentLessonBlock key={lesson.id}>
                      <div className="block-header">
                        <h3>
                          <BookOpen size={18} color="#0F172A" />
                          {lesson.title}
                          <span className="badge-doc-count">
                            ({items.length} {items.length === 1 ? 'material' : 'materiais'})
                          </span>
                        </h3>
                      </div>

                      {items.map((mat) => renderMaterialItem(mat, items))}
                    </StudentLessonBlock>
                  ))}
              </div>
            )}
          </>
        );
      }

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

      case 'atestados': {
        const MOCK_ATESTADOS = [
          {
            id: 1,
            file: 'atestado_medico_02-09.pdf',
            format: 'PDF',
            size: '1.8 MB',
            date: '03 set 2026 - 14:20',
            justifiedDate: '02 set 2026',
            justifiedFull: '02 set 2026 (Terça-feira • 18:30)',
            desc: 'Consulta médica de rotina agendada no horário da aula com especialista ortopedista.',
            status: 'aprovado' as const,
            teacherFeedback: 'Justificativa aceita pela professora Lara Charantola. Falta abonada e reposição agendada.',
            repositionInfo: 'Sexta, 11/09 às 19:00'
          },
          {
            id: 2,
            file: 'atestado_gripe.pdf',
            format: 'PDF',
            size: '840 KB',
            date: '06 set 2026 - 09:42',
            justifiedDate: '05 set 2026',
            justifiedFull: '05 set 2026 (Quinta-feira • 18:30)',
            desc: 'Apresento quadro de virose e indisposição física com orientação médica de repouso.',
            status: 'pendente' as const,
            teacherFeedback: 'Documento recebido e em análise pela professora Lara Charantola.',
            repositionInfo: 'Quarta, 16/09 às 19:00'
          },
          {
            id: 3,
            file: 'declaracao_trabalho.jpg',
            format: 'JPG',
            size: '2.1 MB',
            date: '25 ago 2026 - 18:00',
            justifiedDate: '25 ago 2026',
            justifiedFull: '25 ago 2026 (Terça-feira • 18:30)',
            desc: 'Fiquei preso no trabalho para atendimento presencial emergencial de clientes.',
            status: 'rejeitado' as const,
            teacherFeedback: 'Atestado enviado fora do prazo limite regulamentar de 48h para abono de falta.',
            repositionInfo: 'Não aplicável'
          },
        ];

        const countTodos = MOCK_ATESTADOS.length;
        const countPendente = MOCK_ATESTADOS.filter(a => a.status === 'pendente').length;
        const countAprovado = MOCK_ATESTADOS.filter(a => a.status === 'aprovado').length;
        const countRejeitado = MOCK_ATESTADOS.filter(a => a.status === 'rejeitado').length;

        const filteredAtestados = atestadoFilter === 'todos' 
          ? MOCK_ATESTADOS 
          : MOCK_ATESTADOS.filter(a => a.status === atestadoFilter);

        return (
          <>
            <SectionHeader>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', flexWrap: 'wrap', gap: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <h3 style={{ margin: 0, color: '#0F172A', fontWeight: 800 }}>Atestados Médicos</h3>
                    <span style={{ 
                      background: '#0F172A', 
                      color: '#FFFFFF', 
                      fontSize: '0.75rem', 
                      fontWeight: 700, 
                      padding: '2px 8px', 
                      borderRadius: '9999px' 
                    }}>
                      {countTodos}
                    </span>
                  </div>

                  <FilterGroup>
                    <FilterButton 
                      $active={atestadoFilter === 'todos'} 
                      onClick={() => setAtestadoFilter('todos')}
                    >
                      Todos <span className="count-pill">{countTodos}</span>
                    </FilterButton>
                    <FilterButton 
                      $active={atestadoFilter === 'pendente'} 
                      onClick={() => setAtestadoFilter('pendente')}
                    >
                      Pendente <span className="count-pill">{countPendente}</span>
                    </FilterButton>
                    <FilterButton 
                      $active={atestadoFilter === 'aprovado'} 
                      onClick={() => setAtestadoFilter('aprovado')}
                    >
                      Aprovado <span className="count-pill">{countAprovado}</span>
                    </FilterButton>
                    <FilterButton 
                      $active={atestadoFilter === 'rejeitado'} 
                      onClick={() => setAtestadoFilter('rejeitado')}
                    >
                      Rejeitado <span className="count-pill">{countRejeitado}</span>
                    </FilterButton>
                  </FilterGroup>
                </div>

                <NavyButton onClick={() => handleOpenModal('new')}>
                  <Plus size={16} /> Enviar Atestado
                </NavyButton>
              </div>
            </SectionHeader>

            {filteredAtestados.length === 0 ? (
              <EmptyAtestadosState>
                <div className="empty-icon">
                  <FolderOpen size={24} />
                </div>
                <h4>Nenhum atestado encontrado</h4>
                <p>Não encontramos nenhum atestado com o status "{atestadoFilter}" nesta turma.</p>
              </EmptyAtestadosState>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {filteredAtestados.map(atestado => {
                  const isExpanded = expandedAtestadoIds.includes(atestado.id);

                  return (
                    <AtestadoCard 
                      key={atestado.id} 
                      $status={atestado.status}
                      $isExpanded={isExpanded}
                    >
                      {/* Linha Resumida (Sempre Visível) */}
                      <div 
                        className="card-summary"
                        onClick={() => toggleExpandAtestado(atestado.id)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            toggleExpandAtestado(atestado.id);
                          }
                        }}
                      >
                        <div className="left-section">
                          <div className="icon-box">
                            <FileCheck size={22} />
                          </div>
                          <div className="text-info">
                            <div className="file-title-row">
                              <h4>{atestado.file}</h4>
                              <span className="format-pill">{atestado.format}</span>
                            </div>
                            <div className="meta-chips">
                              <span className="chip">
                                <Calendar size={13} color="#0F172A" />
                                Aula: <strong>{atestado.justifiedDate}</strong>
                              </span>
                              <span className="chip-divider">•</span>
                              <span className="chip">
                                <Clock size={13} color="#64748B" />
                                Enviado em {atestado.date}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="right-section">
                          <StatusTag $status={atestado.status}>
                            {atestado.status === 'aprovado' && <><CheckCircle2 size={13} /> Aprovado</>}
                            {atestado.status === 'pendente' && <><Clock size={13} /> Pendente</>}
                            {atestado.status === 'rejeitado' && <><AlertCircle size={13} /> Rejeitado</>}
                          </StatusTag>

                          <button 
                            type="button" 
                            className="toggle-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleExpandAtestado(atestado.id);
                            }}
                            title={isExpanded ? "Ocultar detalhes" : "Ver todos os detalhes"}
                          >
                            {isExpanded ? 'Ocultar' : 'Ver detalhes'}
                            <ChevronDown size={15} style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }} />
                          </button>
                        </div>
                      </div>

                      {/* Informações Completas (Exibidas somente ao clicar) */}
                      {isExpanded && (
                        <div className="card-expanded-content">
                          <div className="info-metrics-grid">
                            <div className="metric-box">
                              <div className="icon-circle">
                                <CalendarDays size={16} />
                              </div>
                              <div className="metric-texts">
                                <span className="label">Aula Justificada</span>
                                <span className="value">{atestado.justifiedFull}</span>
                                <span className="subtext">Turma Intermediate A</span>
                              </div>
                            </div>

                            <div className="metric-box">
                              <div className="icon-circle">
                                <CalendarCheck size={16} />
                              </div>
                              <div className="metric-texts">
                                <span className="label">Reposição Sugerida</span>
                                <span className="value">{atestado.repositionInfo}</span>
                                <span className="subtext">Agendamento de reposição</span>
                              </div>
                            </div>

                            <div className="metric-box">
                              <div className="icon-circle">
                                <FileCheck2 size={16} />
                              </div>
                              <div className="metric-texts">
                                <span className="label">Documento Enviado</span>
                                <span className="value">{atestado.size} • {atestado.format}</span>
                                <span className="subtext">Anexo verificado</span>
                              </div>
                            </div>
                          </div>

                          <div className="desc-section">
                            <div className="desc-title">
                              <MessageSquare size={13} />
                              Motivo / Justificativa informada
                            </div>
                            <p>{atestado.desc}</p>
                          </div>

                          <div className={`status-feedback-box ${atestado.status}`}>
                            <div className="feedback-icon">
                              {atestado.status === 'aprovado' && <CheckCircle2 size={18} />}
                              {atestado.status === 'pendente' && <Clock size={18} />}
                              {atestado.status === 'rejeitado' && <AlertCircle size={18} />}
                            </div>
                            <div className="feedback-text">
                              <strong>
                                {atestado.status === 'aprovado' && 'Justificativa Aceita'}
                                {atestado.status === 'pendente' && 'Aguardando Avaliação'}
                                {atestado.status === 'rejeitado' && 'Justificativa Não Aceita'}
                              </strong>
                              <span>{atestado.teacherFeedback}</span>
                            </div>
                          </div>

                          <div className="card-actions-bar">
                            <OutlineNavyButton onClick={(e) => {
                              e.stopPropagation();
                              handleOpenModal('edit');
                            }}>
                              <Edit2 size={15} /> Editar Justificativa
                            </OutlineNavyButton>

                            <NavyButton onClick={(e) => {
                              e.stopPropagation();
                              addToast('Abrindo...', 'Iniciando visualização do documento em nova aba segura');
                            }}>
                              <ExternalLink size={15} /> Visualizar Documento
                            </NavyButton>
                          </div>
                        </div>
                      )}
                    </AtestadoCard>
                  );
                })}
              </div>
            )}
          </>
        );
      }

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
        <MobileCarousel gap="32px" mobileGap="18px">
          {TABS.map(tab => {
            const hasPending = tab.id === 'materiais' && pendingCount > 0;
            return (
              <TabItem 
                key={tab.id} 
                $active={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.icon}
                {tab.label}
                {hasPending && (
                  <span className="tab-badge" title={`${pendingCount} materiais não visualizados`}>
                    {pendingCount}
                  </span>
                )}
              </TabItem>
            );
          })}
        </MobileCarousel>
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
                <CustomDropdown
                  value={String(selectedClassId ?? 0)}
                  onChange={(val) => {
                    setSelectedClassId(Number(val) || 0);
                    setDateError(null);
                  }}
                  fullWidth
                  options={[
                    { value: "0", label: "Terça, 01/09 - 19:00 - Turma Intermediate A" },
                    { value: "1", label: "Quinta, 03/09 - 19:00 - Turma Intermediate A" },
                    { value: "2", label: "Terça, 08/09 - 19:00 - Turma Intermediate A" },
                    { value: "3", label: "Terça, 02/09 - 19:00 - Turma Intermediate A" },
                  ]}
                />
                {dateError && <ErrorMessage><AlertTriangle size={14} /> {dateError}</ErrorMessage>}
              </div>

              <div className="form-group">
                <label>Quando deseja realizar a reposição?</label>
                <CustomDropdown
                  value={makeupDay}
                  onChange={(val) => setMakeupDay(val)}
                  fullWidth
                  options={[
                    { value: "sexta", label: "Sexta, 11/09 - 19:00" },
                    { value: "quarta", label: "Quarta, 16/09 - 19:00" },
                  ]}
                />
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
                <NavyButton onClick={handleSubmitModal}>
                  {modalType === 'new' ? <><FileCheck size={16} /> Enviar Atestado</> : <><Edit2 size={16} /> Salvar alterações</>}
                </NavyButton>
              </div>
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      )}

      {/* Modal de Visualização de Documentos (igual ao da professora) */}
      <DocumentViewerModal
        isOpen={viewerOpen}
        onClose={() => setViewerOpen(false)}
        materials={viewerMaterials}
        initialMaterialId={viewerInitialId}
        onDownload={handleDownloadMaterial}
      />
    </TurmaContainer>
  );
};

export default Turma;













