/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Download,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  FileText,
  Image as ImageIcon,
  Film,
  Music,
  FileSpreadsheet,
  Presentation,
  Calendar,
  Clock,
  HardDrive,
} from "lucide-react";
import type { LessonMaterial } from "../services/material";
import {
  getYouTubeOrVimeoEmbed,
  parseMaterialDateTime,
} from "../services/material";

export interface DocumentViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  materials: LessonMaterial[];
  initialMaterialId?: number;
  onDownload: (material: LessonMaterial) => void;
}

const Overlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.75);
  backdrop-filter: blur(6px);
  z-index: 1200;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.25rem;

  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`;

const ModalWindow = styled(motion.div)`
  width: 100%;
  max-width: 1040px;
  height: 90vh;
  max-height: 840px;
  background: #ffffff;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 25px 60px -15px rgba(15, 23, 42, 0.35);
  border: 1.5px solid #e2e8f0;

  @media (max-width: 768px) {
    height: 95vh;
    border-radius: 16px;
  }
`;

const ViewerHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.9rem 1.4rem;
  background: #1f2b45;
  color: #ffffff;
  gap: 1rem;
  flex-shrink: 0;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 0.85rem;
  min-width: 0;

  .icon-box {
    width: 38px;
    height: 38px;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.12);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    flex-shrink: 0;
  }
`;

const HeaderInfo = styled.div`
  min-width: 0;

  h3 {
    margin: 0;
    font-size: 0.98rem;
    font-weight: 700;
    color: #ffffff;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-family: "Rubik", sans-serif;
  }

  p {
    margin: 0;
    font-size: 0.76rem;
    color: rgba(255, 255, 255, 0.7);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0;
`;

const ActionBtn = styled.button<{ $variant?: "primary" | "ghost" }>`
  height: 36px;
  border-radius: 999px;
  padding: 0 0.9rem;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.82rem;
  font-weight: 600;
  font-family: "Rubik", sans-serif;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;

  ${({ $variant }) =>
    $variant === "primary"
      ? `
    background: #C57A67;
    color: #ffffff;
    border: none;
    box-shadow: 0 2px 6px rgba(197, 122, 103, 0.3);

    &:hover {
      background: #b56c5a;
      transform: translateY(-1px);
    }
  `
      : `
    background: rgba(255, 255, 255, 0.1);
    color: #ffffff;
    border: 1px solid rgba(255, 255, 255, 0.18);

    &:hover {
      background: rgba(255, 255, 255, 0.2);
    }
  `}

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 600px) {
    span {
      display: none;
    }
    padding: 0 0.65rem;
  }
`;

const CloseButton = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.08);
  border: none;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.18s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: rotate(90deg);
  }
`;

const MetaBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.6rem 1.4rem;
  background: #f8fafc;
  border-bottom: 1.5px solid #eef2f6;
  gap: 1rem;
  flex-wrap: wrap;
  flex-shrink: 0;
`;

const BadgesRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  flex-wrap: wrap;
`;

const MetaBadge = styled.span<{ $color?: string }>`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.25rem 0.65rem;
  border-radius: 999px;
  font-size: 0.74rem;
  font-weight: 600;
  background: ${({ $color }) => ($color ? `${$color}15` : "#e2e8f0")};
  color: ${({ $color }) => $color || "#475569"};
  border: 1px solid ${({ $color }) => ($color ? `${$color}35` : "#cbd5e1")};
  font-family: "Rubik", sans-serif;
`;

const NavControls = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-left: auto;

  span.count {
    font-size: 0.8rem;
    font-weight: 600;
    color: #64748b;
    margin: 0 0.3rem;
  }
`;

const NavCircleBtn = styled.button`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 1.5px solid #cbd5e1;
  background: #ffffff;
  color: #1f2b45;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.18s ease;

  &:hover:not(:disabled) {
    background: #1f2b45;
    color: #ffffff;
    border-color: #1f2b45;
  }

  &:disabled {
    opacity: 0.35;
    cursor: not-allowed;
  }
`;

const ViewerBody = styled.div`
  flex: 1;
  background: #f1f5f9;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FrameWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  iframe,
  object {
    width: 100%;
    height: 100%;
    border: none;
    background: #ffffff;
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  overflow: auto;

  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    border-radius: 10px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  }
`;

const MediaFallbackCard = styled.div`
  max-width: 520px;
  background: #ffffff;
  border-radius: 18px;
  padding: 2.2rem 2rem;
  box-shadow: 0 12px 36px rgba(15, 23, 42, 0.08);
  border: 1.5px solid #e2e8f0;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  .big-icon {
    width: 72px;
    height: 72px;
    border-radius: 20px;
    background: #eef2f9;
    color: #1f2b45;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  h4 {
    margin: 0;
    font-size: 1.15rem;
    font-weight: 700;
    color: #1f2b45;
    font-family: "Rubik", sans-serif;
  }

  p {
    margin: 0;
    font-size: 0.88rem;
    color: #64748b;
    line-height: 1.5;
  }
`;

const FormatPill = styled.span`
  background: #1f2b45;
  color: #ffffff;
  font-size: 0.72rem;
  font-weight: 700;
  padding: 0.2rem 0.6rem;
  border-radius: 6px;
  letter-spacing: 0.06em;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-top: 0.5rem;
  flex-wrap: wrap;
  justify-content: center;
`;

const DescriptionFooter = styled.div`
  padding: 0.75rem 1.4rem;
  background: #ffffff;
  border-top: 1.5px solid #eef2f6;
  font-size: 0.86rem;
  color: #334155;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-shrink: 0;

  span.label {
    font-weight: 700;
    color: #1f2b45;
    font-size: 0.78rem;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }
`;

const getIconForType = (type: string) => {
  switch (type) {
    case "pdf":
      return <FileText size={20} />;
    case "image":
      return <ImageIcon size={20} />;
    case "video":
      return <Film size={20} />;
    case "audio":
      return <Music size={20} />;
    case "presentation":
      return <Presentation size={20} />;
    case "spreadsheet":
      return <FileSpreadsheet size={20} />;
    default:
      return <FileText size={20} />;
  }
};

const getColorForType = (type: string) => {
  switch (type) {
    case "pdf":
      return "#ef4444";
    case "image":
      return "#10b981";
    case "video":
      return "#8b5cf6";
    case "audio":
      return "#ec4899";
    case "presentation":
      return "#f59e0b";
    case "spreadsheet":
      return "#059669";
    case "link":
      return "#3b82f6";
    default:
      return "#1f2b45";
  }
};

export const DocumentViewerModal: React.FC<DocumentViewerModalProps> = ({
  isOpen,
  onClose,
  materials,
  initialMaterialId,
  onDownload,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Sincroniza índice com o material selecionado
  useEffect(() => {
    if (initialMaterialId && materials.length > 0) {
      const idx = materials.findIndex((m) => m.id === initialMaterialId);
      if (idx !== -1) {
        setCurrentIndex(idx);
        return;
      }
    }
    setCurrentIndex(0);
  }, [initialMaterialId, materials]);

  const currentMaterial: LessonMaterial | undefined = materials[currentIndex];

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) =>
      prev < materials.length - 1 ? prev + 1 : prev,
    );
  }, [materials.length]);

  // Teclado: Escape fecha, setas navegam
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, handlePrev, handleNext]);

  if (!isOpen || !currentMaterial) return null;

  const type = currentMaterial.type || "document";
  const typeColor = getColorForType(type);
  const ext =
    currentMaterial.file?.split(".").pop()?.toUpperCase() ||
    type.toUpperCase();

  const isPDF =
    type === "pdf" ||
    currentMaterial.file?.toLowerCase().endsWith(".pdf") ||
    currentMaterial.link?.toLowerCase().includes(".pdf");

  const isImage =
    type === "image" ||
    /\.(png|jpe?g|webp|svg|gif)$/i.test(currentMaterial.file || "") ||
    /\.(png|jpe?g|webp|svg|gif)$/i.test(currentMaterial.link || "");

  const isVideo =
    type === "video" ||
    /\.(mp4|webm|mov)$/i.test(currentMaterial.file || "");

  const isAudio =
    type === "audio" ||
    /\.(mp3|wav|ogg|m4a)$/i.test(currentMaterial.file || "");

  const isLink = currentMaterial.isExternalLink || type === "link";

  return (
    <AnimatePresence>
      <Overlay
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <ModalWindow
          initial={{ scale: 0.94, opacity: 0, y: 14 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.94, opacity: 0, y: 14 }}
          transition={{ type: "spring", damping: 25, stiffness: 320 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* 1. Header do Visualizador */}
          <ViewerHeader>
            <HeaderLeft>
              <div className="icon-box">{getIconForType(type)}</div>
              <HeaderInfo>
                <h3>{currentMaterial.title || currentMaterial.file}</h3>
                <p>{currentMaterial.file}</p>
              </HeaderInfo>
            </HeaderLeft>

            <HeaderActions>
              <ActionBtn
                $variant="primary"
                type="button"
                onClick={() => onDownload(currentMaterial)}
                title="Baixar este material"
              >
                <Download size={15} />
                <span>Baixar</span>
              </ActionBtn>

              {currentMaterial.link && (
                <ActionBtn
                  $variant="ghost"
                  as="a"
                  href={currentMaterial.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Abrir em nova aba"
                >
                  <ExternalLink size={15} />
                  <span>Nova aba</span>
                </ActionBtn>
              )}

              <CloseButton
                type="button"
                onClick={onClose}
                aria-label="Fechar visualizador"
              >
                <X size={18} />
              </CloseButton>
            </HeaderActions>
          </ViewerHeader>

          {/* 2. Barra de Metadados e Navegação entre Arquivos */}
          <MetaBar>
            <BadgesRow>
              <MetaBadge $color={typeColor}>
                <FormatPill>{ext}</FormatPill>
                <span>{currentMaterial.category || "Material"}</span>
              </MetaBadge>

              {currentMaterial.sizeFormatted && (
                <MetaBadge>
                  <HardDrive size={13} />
                  <span>{currentMaterial.sizeFormatted}</span>
                </MetaBadge>
              )}

              {(() => {
                const parsedDate = parseMaterialDateTime(
                  currentMaterial.createdAt,
                );
                if (!parsedDate) return null;
                return (
                  <>
                    <MetaBadge>
                      <Calendar size={13} />
                      <span>{parsedDate.date}</span>
                    </MetaBadge>
                    {parsedDate.time && (
                      <MetaBadge>
                        <Clock size={13} />
                        <span>{parsedDate.time}</span>
                      </MetaBadge>
                    )}
                  </>
                );
              })()}
            </BadgesRow>

            {materials.length > 1 && (
              <NavControls>
                <NavCircleBtn
                  type="button"
                  disabled={currentIndex === 0}
                  onClick={handlePrev}
                  title="Documento anterior (Seta esquerda)"
                >
                  <ChevronLeft size={16} />
                </NavCircleBtn>

                <span className="count">
                  {currentIndex + 1} de {materials.length}
                </span>

                <NavCircleBtn
                  type="button"
                  disabled={currentIndex === materials.length - 1}
                  onClick={handleNext}
                  title="Próximo documento (Seta direita)"
                >
                  <ChevronRight size={16} />
                </NavCircleBtn>
              </NavControls>
            )}
          </MetaBar>

          {/* 3. Área de Visualização do Documento */}
          <ViewerBody>
            {isPDF ? (
              <FrameWrapper>
                <iframe
                  src={`${currentMaterial.link}#toolbar=1&navpanes=0`}
                  title={currentMaterial.title}
                />
              </FrameWrapper>
            ) : isImage ? (
              <ImageWrapper>
                <img
                  src={currentMaterial.link}
                  alt={currentMaterial.title || currentMaterial.file}
                />
              </ImageWrapper>
            ) : isVideo || getYouTubeOrVimeoEmbed(currentMaterial.link) ? (
              getYouTubeOrVimeoEmbed(currentMaterial.link) ? (
                <FrameWrapper style={{ padding: "1.5rem" }}>
                  <iframe
                    src={getYouTubeOrVimeoEmbed(currentMaterial.link)!}
                    title={currentMaterial.title || "Vídeo"}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{
                      width: "100%",
                      height: "100%",
                      minHeight: "420px",
                      borderRadius: 14,
                      border: "none",
                      boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                    }}
                  />
                </FrameWrapper>
              ) : (
                <FrameWrapper style={{ padding: "2rem" }}>
                  <video
                    controls
                    src={currentMaterial.link}
                    style={{
                      maxWidth: "100%",
                      maxHeight: "100%",
                      borderRadius: 12,
                      boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                    }}
                  />
                </FrameWrapper>
              )
            ) : isAudio ? (
              <MediaFallbackCard>
                <div className="big-icon" style={{ color: "#ec4899" }}>
                  <Music size={36} />
                </div>
                <h4>{currentMaterial.title || currentMaterial.file}</h4>
                <p>Reproduza o áudio ou faça o download para seus estudos.</p>
                <audio
                  controls
                  src={currentMaterial.link}
                  style={{ width: "100%", marginTop: "1rem" }}
                />
                <ButtonGroup>
                  <ActionBtn
                    $variant="primary"
                    type="button"
                    onClick={() => onDownload(currentMaterial)}
                  >
                    <Download size={15} /> Baixar Áudio
                  </ActionBtn>
                </ButtonGroup>
              </MediaFallbackCard>
            ) : isLink ? (
              <MediaFallbackCard>
                <div className="big-icon" style={{ color: "#3b82f6" }}>
                  <ExternalLink size={36} />
                </div>
                <h4>{currentMaterial.title || "Conteúdo Externo"}</h4>
                <p>
                  {currentMaterial.description ||
                    "Este material é um link externo (vídeo, documento ou recurso online)."}
                </p>
                <ButtonGroup>
                  <ActionBtn
                    $variant="primary"
                    as="a"
                    href={currentMaterial.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink size={15} /> Acessar Link
                  </ActionBtn>
                </ButtonGroup>
              </MediaFallbackCard>
            ) : (
              /* Fallback para formatos como DOCX, PPTX, XLSX */
              <MediaFallbackCard>
                <div
                  className="big-icon"
                  style={{ color: typeColor, background: `${typeColor}15` }}
                >
                  {getIconForType(type)}
                </div>
                <h4>{currentMaterial.title || currentMaterial.file}</h4>
                <p>
                  Documentos no formato <strong>.{ext.toLowerCase()}</strong> não
                  possuem pré-visualização nativa no navegador. Faça o download
                  para abrir diretamente no seu computador ou dispositivo.
                </p>
                <ButtonGroup>
                  <ActionBtn
                    $variant="primary"
                    type="button"
                    onClick={() => onDownload(currentMaterial)}
                  >
                    <Download size={15} /> Baixar Arquivo ({ext})
                  </ActionBtn>
                  {currentMaterial.link && (
                    <ActionBtn
                      $variant="ghost"
                      style={{ color: "#1f2b45", borderColor: "#cbd5e1" }}
                      as="a"
                      href={currentMaterial.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink size={15} /> Abrir em nova aba
                    </ActionBtn>
                  )}
                </ButtonGroup>
              </MediaFallbackCard>
            )}
          </ViewerBody>

          {/* 4. Descrição do Professor no rodapé (se houver) */}
          {currentMaterial.description && (
            <DescriptionFooter>
              <span className="label">Orientações:</span>
              <span>{currentMaterial.description}</span>
            </DescriptionFooter>
          )}
        </ModalWindow>
      </Overlay>
    </AnimatePresence>
  );
};

export default DocumentViewerModal;
