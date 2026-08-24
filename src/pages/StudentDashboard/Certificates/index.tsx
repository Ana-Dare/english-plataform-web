import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Calendar, Download, Link as LinkIcon, X, CheckCircle, FileText, Image as ImageIcon } from 'lucide-react';
import {
  Container, Header, Grid, CertificateCard, Thumbnail, CardInfo,
  ModalOverlay, ModalContent, CloseButton, CertificateImageFull, ActionButtonsBar, ActionButton
} from './style';

const mockCertificates = [
  { id: 1, title: 'Advanced English B2', date: '20 de Julho de 2026' },
];

const Certificates: React.FC = () => {
  const [selectedCert, setSelectedCert] = useState<number | null>(null);
  
  // States para simular ações
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);
  const [pdfDownloaded, setPdfDownloaded] = useState(false);
  
  const [isDownloadingPng, setIsDownloadingPng] = useState(false);
  const [pngDownloaded, setPngDownloaded] = useState(false);
  
  const [linkCopied, setLinkCopied] = useState(false);

  const handleDownloadPdf = () => {
    setIsDownloadingPdf(true);
    setTimeout(() => {
      setIsDownloadingPdf(false);
      setPdfDownloaded(true);
      setTimeout(() => setPdfDownloaded(false), 3000);
    }, 2000);
  };

  const handleDownloadPng = () => {
    setIsDownloadingPng(true);
    setTimeout(() => {
      setIsDownloadingPng(false);
      setPngDownloaded(true);
      setTimeout(() => setPngDownloaded(false), 3000);
    }, 2000);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText('https://english-platform.com/verify/cert-b2-12345');
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 3000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
  };

  return (
    <Container>
      <Header as={motion.div} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
        <h2>Meus Certificados</h2>
        <p>Acesse, baixe e compartilhe suas conquistas acadêmicas com o mundo.</p>
      </Header>

      <Grid as={motion.div} variants={containerVariants} initial="hidden" animate="show">
        {mockCertificates.map(cert => (
          <CertificateCard 
            key={cert.id} 
            as={motion.div} 
            variants={itemVariants}
            onClick={() => setSelectedCert(cert.id)}
          >
            <Thumbnail />
            <CardInfo>
              <h4>{cert.title}</h4>
              <span><Calendar size={14} /> Concluído em {cert.date}</span>
            </CardInfo>
          </CertificateCard>
        ))}
      </Grid>

      <AnimatePresence>
        {selectedCert !== null && (
          <ModalOverlay
            as={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCert(null)}
          >
            <ModalContent
              as={motion.div}
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
            >
              <CloseButton onClick={() => setSelectedCert(null)}>
                <X size={20} />
              </CloseButton>

              <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '8px', color: '#d4af37' }}>
                <Award size={24} /> Advanced English B2
              </h3>

              <CertificateImageFull src="/certificate.png" alt="Certificado de Conclusão" />

              <ActionButtonsBar>
                <ActionButton 
                  $variant={pdfDownloaded ? 'success' : 'primary'} 
                  onClick={handleDownloadPdf}
                  disabled={isDownloadingPdf || pdfDownloaded}
                >
                  {isDownloadingPdf ? (
                    'Processando...'
                  ) : pdfDownloaded ? (
                    <><CheckCircle size={18} /> Baixado</>
                  ) : (
                    <><FileText size={18} /> Baixar PDF</>
                  )}
                </ActionButton>

                <ActionButton 
                  $variant={pngDownloaded ? 'success' : 'outline'} 
                  onClick={handleDownloadPng}
                  disabled={isDownloadingPng || pngDownloaded}
                >
                  {isDownloadingPng ? (
                    'Processando...'
                  ) : pngDownloaded ? (
                    <><CheckCircle size={18} /> Baixado</>
                  ) : (
                    <><ImageIcon size={18} /> Baixar PNG</>
                  )}
                </ActionButton>

                <ActionButton 
                  $variant="outline"
                  onClick={handleCopyLink}
                  style={{ borderColor: linkCopied ? '#10b981' : '#e0e0e0', color: linkCopied ? '#10b981' : '#333' }}
                >
                  {linkCopied ? (
                    <><CheckCircle size={18} /> Link Copiado!</>
                  ) : (
                    <><LinkIcon size={18} /> Copiar Link</>
                  )}
                </ActionButton>
              </ActionButtonsBar>

            </ModalContent>
          </ModalOverlay>
        )}
      </AnimatePresence>
    </Container>
  );
};

export default Certificates;
