import React, { useState, useCallback } from 'react';
import { ArrowLeft, Download, Share2, Printer, CheckCircle, X, Link as LinkIcon, Copy } from 'lucide-react';
import styled, { keyframes } from 'styled-components';
import {
  ViewerContainer,
  BackButton,
  CertificateWrapper,
  MainContent,
  CertificateImage,
  ActionBar,
  ActionButton,
  PrintStyles
} from './viewerStyle';

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

  @media print {
    display: none !important;
  }
`;

const ToastItem = styled.div<{ $leaving?: boolean }>`
  background: white;
  border-radius: 12px;
  padding: 20px 24px;
  box-shadow: 0 12px 40px rgba(0,0,0,0.12);
  border: 1px solid #E2E8F0;
  display: flex;
  align-items: flex-start;
  gap: 16px;
  min-width: 380px;
  max-width: 440px;
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
    addToast('Download iniciado', 'O arquivo do certificado será salvo no seu dispositivo em instantes.');
  };

  const handleShare = () => {
    addToast('Link Copiado!', 'O link de acesso ao seu certificado foi copiado para a área de transferência.', 'https://cert.englishplatform.com/v/mt2024');
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

      <CertificateWrapper>
        <MainContent>
          <BackButton onClick={onBack} className="back-btn">
            <ArrowLeft size={16} /> Voltar aos Certificados
          </BackButton>
          
          <CertificateImage id="certificate-container">
            <div className="watermark">CERTIFICATE</div>
            <div className="title">Certificado de Conclusão</div>
            <div style={{ flex: 1 }}></div>
            <div className="name">Marjorie Talberg</div>
            <div className="course">{courseName}</div>
            <div className="date">Finalizado em 04 de setembro de 2024</div>
            
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
          </CertificateImage>
        </MainContent>

        <ActionBar className="action-bar">
          <div className="action-header">
            <div className="action-title">Seu Certificado</div>
            <div className="action-desc">
              Você concluiu este curso com sucesso! Utilize as opções abaixo para compartilhar ou guardar sua conquista.
            </div>
          </div>
          <div className="action-buttons-wrapper" style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <ActionButton onClick={handleDownload} $variant="primary">
              <Download size={20} /> Baixar PDF
            </ActionButton>
            <ActionButton onClick={handleShare} $variant="secondary">
              <Share2 size={20} /> Compartilhar Link
            </ActionButton>
            <ActionButton onClick={handlePrint} $variant="secondary">
              <Printer size={20} /> Imprimir
            </ActionButton>
          </div>
        </ActionBar>
      </CertificateWrapper>
    </ViewerContainer>
  );
};

export default CertificateViewer;




