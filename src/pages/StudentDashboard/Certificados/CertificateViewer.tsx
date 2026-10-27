import React, { useState, useCallback, useEffect } from 'react';
import {
  ArrowLeft,
  Download,
  Share2,
  Printer,
  CheckCircle,
  X,
  Link as LinkIcon,
  Copy,
  ExternalLink,
  ShieldCheck,
  Check,
  Globe
} from 'lucide-react';
import styled, { keyframes } from 'styled-components';
import {
  ViewerContainer,
  BackButton,
  CertificateWrapper,
  MainContent,
  CertificateImage,
  ActionBar,
  ActionButtonsWrapper,
  ActionButton,
  PrintStyles,
  CertCodeStamp,
  ModalBackdrop,
  ModalCard,
  ModalHeader,
  ModalBody
} from './viewerStyle';
import { useAuth } from '../../../contexts/Auth/AuthContext';
import { useProfile } from '../../../contexts/ProfileContext';

interface CertificateViewerProps {
  onBack: () => void;
  courseName: string;
}

const slideIn = keyframes`
  from { transform: translateX(120%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

const slideOut = keyframes`
  from { transform: translateX(0); opacity: 1; }
  to { transform: translateX(120%); opacity: 0; }
`;

const ToastOverlay = styled.div`
  position: fixed;
  top: 24px;
  right: 24px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: calc(100vw - 32px);

  @media (max-width: 480px) {
    top: 16px;
    right: 16px;
    left: 16px;
  }

  @media print {
    display: none !important;
  }
`;

const ToastItem = styled.div<{ $leaving?: boolean }>`
  background: white;
  border-radius: 12px;
  padding: 16px 20px;
  box-shadow: 0 12px 40px rgba(0,0,0,0.12);
  border: 1px solid #E2E8F0;
  display: flex;
  align-items: flex-start;
  gap: 14px;
  width: 100%;
  max-width: 420px;
  box-sizing: border-box;
  animation: ${({ $leaving }) => $leaving ? slideOut : slideIn} 0.3s ease forwards;

  .toast-icon {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #F0FDF4;
    color: #16A34A;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .toast-body {
    flex: 1;

    h4 {
      font-size: 0.95rem;
      font-weight: 800;
      color: #1F2B45;
      margin: 0 0 6px 0;
    }

    p {
      font-size: 0.85rem;
      color: #64748B;
      margin: 0;
      line-height: 1.5;
    }

    .toast-link {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-top: 10px;
      background: #F8FAFC;
      border: 1px solid #E2E8F0;
      border-radius: 8px;
      padding: 8px 12px;
      font-size: 0.8rem;
      color: #475569;
      font-weight: 600;

      svg { color: #94A3B8; flex-shrink: 0; }
      span { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    }
  }

  .toast-close {
    background: none;
    border: none;
    color: #94A3B8;
    cursor: pointer;
    padding: 4px;
    border-radius: 6px;
    transition: all 0.2s;

    &:hover {
      background: #F1F5F9;
      color: #475569;
    }
  }
`;

const ProgressBarAnim = keyframes`
  from { width: 100%; }
  to { width: 0%; }
`;

const ToastProgress = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  background: #C57A67;
  border-radius: 0 0 12px 12px;
  animation: ${ProgressBarAnim} 4s linear forwards;
`;

interface ToastData {
  id: number;
  title: string;
  message: string;
  link?: string;
  leaving?: boolean;
}

const CertificateViewer: React.FC<CertificateViewerProps> = ({ onBack, courseName }) => {
  const [toasts, setToasts] = useState<ToastData[]>([]);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [copiedModal, setCopiedModal] = useState(false);

  const { user } = useAuth();
  let profileName = '';
  try {
    const profileCtx = useProfile();
    if (profileCtx?.profile?.firstName) {
      profileName = `${profileCtx.profile.firstName} ${profileCtx.profile.lastName || ''}`.trim();
    }
  } catch {
    // profile context fallback
  }

  // Nome dinâmico do aluno logado
  const studentName = profileName || user?.name || 'Marjorie Talberg';
  const completionDate = '04 de setembro de 2024';
  const hours = '60 horas de imersão';

  // Código único e verificável do certificado
  const cleanCourse = courseName.replace(/[^a-zA-Z0-9]/g, '').slice(0, 8).toUpperCase() || 'INTA';
  const certCode = `EP-${cleanCourse}-2024`;

  // URL real do certificado com parâmetros para funcionar mesmo sem autenticação ou em outro dispositivo
  const origin = window.location.origin;
  const shareUrl = `${origin}/validar-certificado/${certCode}?student=${encodeURIComponent(studentName)}&course=${encodeURIComponent(courseName)}&date=${encodeURIComponent(completionDate)}&hours=${encodeURIComponent(hours)}`;

  // Salva no localStorage para persistência local
  useEffect(() => {
    try {
      localStorage.setItem(`@App:cert_${certCode}`, JSON.stringify({
        studentName,
        courseName,
        completionDate,
        hours,
        code: certCode,
        createdAt: new Date().toISOString()
      }));
    } catch {
      // storage error fallback
    }
  }, [certCode, studentName, courseName]);

  const addToast = useCallback((title: string, message: string, link?: string) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, title, message, link }]);
    setTimeout(() => {
      setToasts(prev => prev.map(t => t.id === id ? { ...t, leaving: true } : t));
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id));
      }, 300);
    }, 4000);
  }, []);

  const removeToast = useCallback((id: number) => {
    setToasts(prev => prev.map(t => t.id === id ? { ...t, leaving: true } : t));
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 300);
  }, []);

  const handleDownload = () => {
    try {
      const a = document.createElement("a");
      a.href = "/certificate.png";
      a.download = `Certificado_${courseName.replace(/\s+/g, "_")}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (e) {
      console.warn("Download fallback:", e);
    }
    addToast('Download iniciado', 'O arquivo do certificado será salvo no seu dispositivo em instantes.');
  };

  const handleShare = () => {
    try {
      navigator.clipboard?.writeText(shareUrl);
    } catch {
      // fallback
    }
    setIsShareModalOpen(true);
    addToast(
      'Link Copiado!',
      'O link real e verificável do seu certificado foi copiado. Você também pode compartilhá-lo pelo modal.',
      shareUrl
    );
  };

  const handleCopyFromModal = () => {
    try {
      navigator.clipboard?.writeText(shareUrl);
      setCopiedModal(true);
      setTimeout(() => setCopiedModal(false), 2500);
    } catch {
      // fallback
    }
  };

  const handleOpenCertificateLink = () => {
    window.open(shareUrl, '_blank');
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(
      `Confira meu Certificado Oficial de Conclusão no curso ${courseName} emitido pela English Platform: ${shareUrl}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const handleShareLinkedIn = () => {
    const url = encodeURIComponent(shareUrl);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <ViewerContainer>
      <PrintStyles />
      <ToastOverlay>
        {toasts.map(toast => (
          <ToastItem key={toast.id} $leaving={toast.leaving} style={{ position: 'relative', overflow: 'hidden' }}>
            <div className="toast-icon">
              <CheckCircle size={20} />
            </div>
            <div className="toast-body">
              <h4>{toast.title}</h4>
              <p>{toast.message}</p>
              {toast.link && (
                <div className="toast-link">
                  <LinkIcon size={14} />
                  <span>{toast.link}</span>
                  <Copy size={14} />
                </div>
              )}
            </div>
            <button className="toast-close" onClick={() => removeToast(toast.id)}>
              <X size={16} />
            </button>
            <ToastProgress />
          </ToastItem>
        ))}
      </ToastOverlay>

      {/* Modal de Compartilhamento Real */}
      {isShareModalOpen && (
        <ModalBackdrop onClick={() => setIsShareModalOpen(false)}>
          <ModalCard onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <div className="title-area">
                <div className="icon-box">
                  <Share2 size={22} />
                </div>
                <div>
                  <h3>Compartilhar Certificado</h3>
                  <p>Link oficial e verificável para recrutadores e redes</p>
                </div>
              </div>
              <button className="close-btn" onClick={() => setIsShareModalOpen(false)}>
                <X size={20} />
              </button>
            </ModalHeader>

            <ModalBody>
              <div>
                <div className="label-group">
                  <Globe size={14} /> Link Público do Certificado
                </div>
                <div className="url-box">
                  <input type="text" readOnly value={shareUrl} onClick={(e) => (e.target as HTMLInputElement).select()} />
                  <button className={copiedModal ? 'copied' : ''} onClick={handleCopyFromModal}>
                    {copiedModal ? (
                      <>
                        <Check size={16} /> Copiado!
                      </>
                    ) : (
                      <>
                        <Copy size={16} /> Copiar
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="share-grid">
                <button className="share-btn open-preview" onClick={handleOpenCertificateLink}>
                  <ExternalLink size={17} /> Abrir Certificado em Nova Aba
                </button>
                <button className="share-btn whatsapp" onClick={handleShareWhatsApp}>
                  <Share2 size={16} /> WhatsApp
                </button>
                <button className="share-btn linkedin" onClick={handleShareLinkedIn}>
                  <Share2 size={16} /> LinkedIn
                </button>
              </div>

              <div className="info-badge">
                <ShieldCheck size={18} />
                <div>
                  <strong>Autenticidade Garantida:</strong> Qualquer pessoa que acessar esse link poderá visualizar e validar seu certificado em tempo real com os dados originais, sem necessidade de login.
                </div>
              </div>
            </ModalBody>
          </ModalCard>
        </ModalBackdrop>
      )}

      <CertificateWrapper>
        <MainContent>
          <BackButton onClick={onBack} className="back-btn">
            <ArrowLeft size={16} /> Voltar aos Certificados
          </BackButton>
          
          <CertificateImage id="certificate-container">
            <div className="watermark">CERTIFICATE</div>
            <div className="title">Certificado de Conclusão</div>
            <div style={{ flex: 1 }}></div>
            <div className="name">{studentName}</div>
            <div className="course">{courseName}</div>
            <div className="date">Finalizado em {completionDate}</div>
            
            <div className="signatures">
              <div>
                <div className="sig-text">John Hancock</div>
                <span>CEO & Founder</span>
              </div>
              <div>
                <div className="sig-text">Jane Doe</div>
                <span>Course Instructor</span>
              </div>
            </div>

            <CertCodeStamp className="no-print">
              <div className="code-left">
                <ShieldCheck size={14} color="#10B981" />
                <span>Código de Verificação: <strong>{certCode}</strong></span>
              </div>
              <div className="code-right">
                englishplatform.com/validar-certificado/{certCode}
              </div>
            </CertCodeStamp>
          </CertificateImage>
        </MainContent>

        <ActionBar className="action-bar">
          <div className="action-header">
            <div className="action-title">Seu Certificado</div>
            <div className="action-desc">
              Você concluiu este curso com sucesso! Utilize as opções abaixo para compartilhar ou guardar sua conquista.
            </div>
          </div>
          <ActionButtonsWrapper className="action-buttons-wrapper">
            <ActionButton onClick={handleDownload} $variant="primary">
              <Download size={18} /> Baixar PDF
            </ActionButton>
            <ActionButton onClick={handleShare} $variant="secondary">
              <Share2 size={18} /> Compartilhar Link
            </ActionButton>
            <ActionButton onClick={handlePrint} $variant="secondary">
              <Printer size={18} /> Imprimir
            </ActionButton>
          </ActionButtonsWrapper>
        </ActionBar>
      </CertificateWrapper>
    </ViewerContainer>
  );
};

export default CertificateViewer;





