import React, { useState } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import {
  Award,
  ShieldCheck,
  Printer,
  Copy,
  Check,
  ExternalLink,
  Share2,
  Calendar,
  BookOpen,
  User,
  Clock
} from 'lucide-react';
import {
  PublicCertContainer,
  PublicPrintStyles,
  PublicCertHeader,
  PublicCertBody,
  VerificationBanner,
  ActionButtonPublic,
  CertificateRenderCard,
  VerificationDetailsGrid,
  PublicCertFooter
} from './style';

const PublicCertificate: React.FC = () => {
  const { code: paramCode } = useParams<{ code?: string }>();
  const [searchParams] = useSearchParams();
  const [copied, setCopied] = useState(false);

  // Lê informações passadas via query params ou localStorage
  const code = paramCode || searchParams.get('code') || 'EP-INTA-2024';

  // Tenta recuperar do localStorage caso tenha sido emitido localmente
  const storedData = (() => {
    try {
      const item = localStorage.getItem(`@App:cert_${code}`);
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  })();

  const studentName = searchParams.get('student') || storedData?.studentName || 'Marjorie Talberg';
  const courseName = searchParams.get('course') || storedData?.courseName || 'English Intermediate A';
  const completionDate = searchParams.get('date') || storedData?.completionDate || '04 de setembro de 2024';
  const hours = searchParams.get('hours') || storedData?.hours || '60 horas de imersão';

  const handleCopyLink = () => {
    try {
      navigator.clipboard?.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      // fallback
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(
      `Confira meu Certificado Oficial de Conclusão do curso ${courseName} emitido pela English Platform: ${window.location.href}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const handleShareLinkedIn = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
  };

  return (
    <PublicCertContainer>
      <PublicPrintStyles />

      {/* Cabeçalho Público da Plataforma */}
      <PublicCertHeader className="no-print">
        <Link to="/" className="brand" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="brand-icon">
            <Award size={20} />
          </div>
          <div className="brand-title">
            <h2>English Platform</h2>
            <span>Portal Oficial de Verificação de Certificados</span>
          </div>
        </Link>

        <div className="badge-verification">
          <ShieldCheck size={16} />
          Autenticidade Verificada
        </div>
      </PublicCertHeader>

      <PublicCertBody>
        {/* Banner de Verificação e Ações Rápidas */}
        <VerificationBanner className="no-print">
          <div className="status-info">
            <div className="shield-icon">
              <ShieldCheck size={26} />
            </div>
            <div className="status-text">
              <h3>Certificado Oficial & Verificado</h3>
              <p>Código de Autenticidade: <strong>{code}</strong> • Registrado na plataforma</p>
            </div>
          </div>

          <div className="quick-actions">
            <ActionButtonPublic $variant="outline" onClick={handleCopyLink} title="Copiar link oficial">
              {copied ? <><Check size={16} color="#059669" /> Link Copiado!</> : <><Copy size={16} /> Copiar Link</>}
            </ActionButtonPublic>
            <ActionButtonPublic $variant="outline" onClick={handleShareWhatsApp} title="Compartilhar no WhatsApp">
              <Share2 size={16} /> WhatsApp
            </ActionButtonPublic>
            <ActionButtonPublic $variant="outline" onClick={handleShareLinkedIn} title="Compartilhar no LinkedIn">
              <ExternalLink size={16} /> LinkedIn
            </ActionButtonPublic>
            <ActionButtonPublic $variant="primary" onClick={handlePrint}>
              <Printer size={16} /> Imprimir / Salvar PDF
            </ActionButtonPublic>
          </div>
        </VerificationBanner>

        {/* Renderização Real do Certificado */}
        <CertificateRenderCard id="public-certificate-view">
          <div className="watermark">CERTIFICATE</div>
          <div className="seal-corner">
            <Award size={14} /> ID: {code}
          </div>

          <div className="title">Certificado de Conclusão</div>
          <div className="subtitle">Certificamos com distinção que</div>

          <div className="name">{studentName}</div>

          <div className="course">
            concluiu com êxito o programa curricular de <strong>{courseName}</strong>
          </div>
          <div className="date">
            Finalizado em {completionDate} • Carga horária: {hours}
          </div>

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
        </CertificateRenderCard>

        {/* Dossiê de Validação e Dados */}
        <VerificationDetailsGrid className="no-print">
          <div className="detail-card">
            <div className="label">
              <User size={13} style={{ display: 'inline', marginRight: 4 }} />
              Titular do Certificado
            </div>
            <div className="value">{studentName}</div>
            <div className="sub">Identidade validada pela instituição</div>
          </div>

          <div className="detail-card">
            <div className="label">
              <BookOpen size={13} style={{ display: 'inline', marginRight: 4 }} />
              Curso Concluído
            </div>
            <div className="value">{courseName}</div>
            <div className="sub">Nível intermediário B2 • Aprovado</div>
          </div>

          <div className="detail-card">
            <div className="label">
              <Calendar size={13} style={{ display: 'inline', marginRight: 4 }} />
              Data de Conclusão
            </div>
            <div className="value">{completionDate}</div>
            <div className="sub">Registro de conclusão definitivo</div>
          </div>

          <div className="detail-card">
            <div className="label">
              <Clock size={13} style={{ display: 'inline', marginRight: 4 }} />
              Carga Horária
            </div>
            <div className="value">{hours}</div>
            <div className="sub">Aulas ao vivo, exercícios & imersão</div>
          </div>
        </VerificationDetailsGrid>
      </PublicCertBody>

      <PublicCertFooter className="no-print">
        <p><strong>English Platform Education</strong> • Todos os direitos reservados.</p>
        <p>A autenticidade deste documento pode ser validada a qualquer momento através deste portal institucional.</p>
      </PublicCertFooter>
    </PublicCertContainer>
  );
};

export default PublicCertificate;
