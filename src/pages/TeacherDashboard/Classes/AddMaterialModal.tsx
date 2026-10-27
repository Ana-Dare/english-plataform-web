/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  UploadCloud,
  FileText,
  Link as LinkIcon,
  Trash2,
  Check,
  Loader2,
  Plus,
  Video,
  Music,
  ExternalLink,
  Presentation,
  FileSpreadsheet,
  Image as ImageIcon,
} from "lucide-react";
import type { LessonMaterial, MaterialType } from "../services/material";
import {
  detectMaterialType,
  formatBytes,
  loadCustomCategories,
  saveCustomCategory,
} from "../services/material";
import CustomDropdown from "../../../components/CustomDropdown";

export interface LessonOption {
  id: string;
  label: string;
  selectLabel: string;
}

export interface MaterialSubmitItem {
  id: string;
  title: string;
  type: MaterialType;
  file?: File;
  externalLink?: string;
  sizeFormatted?: string;
  fileSize?: number;
}

export interface MaterialSubmitData {
  title: string;
  description: string;
  category: string;
  lessonId: number; // 0 para geral
  items: MaterialSubmitItem[];
  existingId?: number; // Para modo de edição
}

interface AddMaterialModalProps {
  isOpen: boolean;
  onClose: () => void;
  lessons: LessonOption[];
  uploading: boolean;
  onSaveMaterial: (data: MaterialSubmitData) => Promise<void> | void;
  editingMaterial?: LessonMaterial | null;
  defaultLessonId?: number;
}

const ACCEPTED_EXTENSIONS =
  ".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.png,.jpg,.jpeg,.webp,.svg,.mp3,.wav,.m4a,.ogg,.mp4,.mov,.avi,.webm,.txt";

const Overlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(5px);
  z-index: 1200;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`;

const ModalBox = styled(motion.div)`
  width: 100%;
  max-width: 660px;
  max-height: 92vh;
  background: #ffffff;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(15, 23, 42, 0.25);
  border: 1.5px solid #e2e8f0;
  display: flex;
  flex-direction: column;
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.15rem 1.6rem;
  background: #1f2b45;
  color: #ffffff;

  .header-titles {
    display: flex;
    flex-direction: column;
    gap: 0.15rem;

    h3 {
      margin: 0;
      font-size: 1.08rem;
      font-weight: 700;
      font-family: "Rubik", sans-serif;
    }

    p {
      margin: 0;
      font-size: 0.78rem;
      color: #94a3b8;
    }
  }
`;

const CloseBtn = styled.button`
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: #ffffff;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.18s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: rotate(90deg);
  }
`;

const ModalBody = styled.form`
  padding: 1.4rem 1.6rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1.15rem;
  flex: 1;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 4px;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.45rem;

  .label-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  label {
    font-size: 0.85rem;
    font-weight: 600;
    color: #1f2b45;
    font-family: "Rubik", sans-serif;

    .req {
      color: #ef4444;
      margin-left: 2px;
    }
  }

  input[type="text"],
  input[type="url"],
  select,
  textarea {
    width: 100%;
    padding: 0.65rem 0.95rem;
    border-radius: 12px;
    border: 1.5px solid #cbd5e1;
    font-size: 0.88rem;
    color: #1e293b;
    font-family: "Rubik", sans-serif;
    background: #ffffff;
    box-sizing: border-box;
    transition: all 0.2s ease;

    &:focus {
      outline: none;
      border-color: #1f2b45;
      box-shadow: 0 0 0 3px rgba(31, 43, 69, 0.1);
    }

    &::placeholder {
      color: #94a3b8;
    }
  }

  textarea {
    min-height: 75px;
    resize: vertical;
    line-height: 1.45;
  }
`;

const CreateCategoryBtn = styled.button`
  background: none;
  border: none;
  color: #c57a67;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.2rem 0.4rem;
  border-radius: 6px;
  transition: all 0.15s ease;

  &:hover {
    background: #fff1ed;
    color: #a85f4e;
  }
`;

const NewCategoryInline = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
  background: #fff8f6;
  border: 1.5px solid #fecaca;
  border-radius: 12px;
  margin-top: 0.2rem;

  input {
    flex: 1;
    height: 38px;
    padding: 0 0.8rem !important;
    border: 1.5px solid #c57a67 !important;
    border-radius: 8px !important;
    font-size: 0.85rem !important;
  }

  button.save {
    background: #c57a67;
    color: #fff;
    border: none;
    border-radius: 8px;
    height: 38px;
    padding: 0 1rem;
    font-size: 0.82rem;
    font-weight: 600;
    cursor: pointer;
    white-space: nowrap;

    &:hover {
      background: #a85f4e;
    }
  }

  button.cancel {
    background: transparent;
    color: #64748b;
    border: none;
    border-radius: 8px;
    height: 38px;
    padding: 0 0.6rem;
    font-size: 0.82rem;
    cursor: pointer;

    &:hover {
      background: #f1f5f9;
      color: #1e293b;
    }
  }
`;

const AttachmentsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  background: #f8fafc;
  border: 1.5px solid #e2e8f0;
  border-radius: 16px;
  padding: 1.1rem 1.25rem;
`;

const AttachmentsHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.5rem;

  .title-group {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    strong {
      font-size: 0.92rem;
      color: #1f2b45;
      font-family: "Rubik", sans-serif;
    }

    span.badge {
      background: #1f2b45;
      color: #fff;
      font-size: 0.7rem;
      font-weight: 700;
      padding: 0.15rem 0.55rem;
      border-radius: 999px;
    }
  }

  p.hint {
    margin: 0;
    font-size: 0.76rem;
    color: #64748b;
  }
`;

const ToolbarRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const ToolBtn = styled.button<{ $variant?: "navy" | "coral" | "blue" }>`
  height: 36px;
  padding: 0 0.95rem;
  border-radius: 999px;
  font-size: 0.82rem;
  font-weight: 600;
  font-family: "Rubik", sans-serif;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  transition: all 0.18s ease;

  ${({ $variant }) =>
    $variant === "navy"
      ? `
    background: #1f2b45;
    color: #ffffff;
    border: none;
    &:hover {
      background: #162033;
      transform: translateY(-1px);
    }
  `
      : $variant === "coral"
      ? `
    background: #fff1ed;
    color: #c57a67;
    border: 1.5px solid #fed7aa;
    &:hover {
      background: #ffedd5;
      color: #9a3412;
      transform: translateY(-1px);
    }
  `
      : `
    background: #eff6ff;
    color: #2563eb;
    border: 1.5px solid #bfdbfe;
    &:hover {
      background: #dbeafe;
      color: #1d4ed8;
      transform: translateY(-1px);
    }
  `}
`;

const DropArea = styled.div<{ $isDrag: boolean }>`
  border: 2px dashed ${({ $isDrag }) => ($isDrag ? "#1f2b45" : "#cbd5e1")};
  background: ${({ $isDrag }) => ($isDrag ? "#eef2f9" : "#ffffff")};
  border-radius: 14px;
  padding: 1.25rem 1rem;
  text-align: center;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
  transition: all 0.2s ease;

  &:hover {
    border-color: #1f2b45;
    background: #f8fafc;
  }

  .icon-wrapper {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #f1f5f9;
    color: #1f2b45;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  p.main {
    margin: 0;
    font-size: 0.84rem;
    font-weight: 600;
    color: #1f2b45;
  }

  p.sub {
    margin: 0;
    font-size: 0.72rem;
    color: #64748b;
  }
`;

const InlineFormCard = styled(motion.div)`
  background: #ffffff;
  border: 1.5px solid #bfdbfe;
  border-radius: 12px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;

  h5 {
    margin: 0;
    font-size: 0.86rem;
    font-weight: 700;
    color: #1e3a8a;
    display: flex;
    align-items: center;
    gap: 0.4rem;
  }

  .form-row {
    display: flex;
    gap: 0.6rem;
    flex-wrap: wrap;

    input {
      flex: 1;
      min-width: 180px;
      height: 38px;
      padding: 0 0.8rem;
      border: 1.5px solid #cbd5e1;
      border-radius: 8px;
      font-size: 0.84rem;

      &:focus {
        border-color: #2563eb;
        outline: none;
      }
    }
  }

  .btn-row {
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;

    button.add {
      background: #2563eb;
      color: #fff;
      border: none;
      border-radius: 999px;
      height: 34px;
      padding: 0 1rem;
      font-size: 0.8rem;
      font-weight: 600;
      cursor: pointer;

      &:hover {
        background: #1d4ed8;
      }
    }

    button.cancel {
      background: transparent;
      color: #64748b;
      border: none;
      height: 34px;
      padding: 0 0.75rem;
      font-size: 0.8rem;
      cursor: pointer;

      &:hover {
        color: #1e293b;
      }
    }
  }
`;

const ItemsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
  max-height: 220px;
  overflow-y: auto;
  padding-right: 4px;

  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 4px;
  }
`;

const ItemCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.65rem 0.85rem;
  background: #ffffff;
  border: 1.5px solid #e2e8f0;
  border-radius: 10px;
  gap: 0.75rem;
  transition: all 0.15s ease;

  &:hover {
    border-color: #cbd5e1;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
  }

  .left {
    display: flex;
    align-items: center;
    gap: 0.65rem;
    min-width: 0;
    flex: 1;

    .icon-box {
      width: 34px;
      height: 34px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .info {
      min-width: 0;
      flex: 1;

      strong {
        display: block;
        font-size: 0.84rem;
        color: #0f172a;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .meta {
        display: flex;
        align-items: center;
        gap: 0.4rem;
        font-size: 0.72rem;
        color: #64748b;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;

        span.type-tag {
          font-weight: 700;
          text-transform: uppercase;
        }
      }
    }
  }

  button.remove {
    background: none;
    border: none;
    color: #94a3b8;
    cursor: pointer;
    padding: 0.35rem;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.15s ease;

    &:hover {
      background: #fee2e2;
      color: #ef4444;
    }
  }
`;

const ModalFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.75rem;
  padding: 1.1rem 1.6rem;
  background: #f8fafc;
  border-top: 1.5px solid #eef2f6;
  flex-shrink: 0;
`;

const FooterBtn = styled.button<{ $primary?: boolean }>`
  height: 42px;
  padding: 0 1.4rem;
  border-radius: 999px;
  font-size: 0.88rem;
  font-weight: 600;
  font-family: "Rubik", sans-serif;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  transition: all 0.2s ease;

  ${({ $primary }) =>
    $primary
      ? `
    background: #1f2b45;
    color: #ffffff;
    border: none;
    box-shadow: 0 2px 6px rgba(31, 43, 69, 0.2);

    &:hover:not(:disabled) {
      background: #151d2f;
      transform: translateY(-1px);
    }
  `
      : `
    background: #ffffff;
    color: #475569;
    border: 1.5px solid #cbd5e1;

    &:hover:not(:disabled) {
      background: #f1f5f9;
      color: #1f2b45;
    }
  `}

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }
`;

export const AddMaterialModal: React.FC<AddMaterialModalProps> = ({
  isOpen,
  onClose,
  lessons,
  uploading,
  onSaveMaterial,
  editingMaterial,
  defaultLessonId,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [showNewCatInput, setShowNewCatInput] = useState(false);
  const [newCatName, setNewCatName] = useState("");

  const [targetLessonId, setTargetLessonId] = useState<number>(0);
  const [items, setItems] = useState<MaterialSubmitItem[]>([]);

  // Estados de inserção de link/vídeo
  const [showVideoForm, setShowVideoForm] = useState(false);
  const [videoTitle, setVideoTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");

  const [showLinkForm, setShowLinkForm] = useState(false);
  const [linkTitle, setLinkTitle] = useState("");
  const [linkUrl, setLinkUrl] = useState("");

  const [isDrag, setIsDrag] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Carrega categorias dinâmicas
  useEffect(() => {
    const loaded = loadCustomCategories();
    setCategories(loaded);
    if (!category && loaded.length > 0) {
      setCategory(loaded[0]);
    }
  }, [isOpen, category]);

  // Inicializa quando abre ou quando recebe material para edição
  useEffect(() => {
    if (editingMaterial) {
      setTitle(editingMaterial.title || editingMaterial.file || "");
      setDescription(editingMaterial.description || "");
      setCategory(editingMaterial.category || "Geral");
      setTargetLessonId(editingMaterial.lessonId || 0);

      // Preenche o item atual
      setItems([
        {
          id: String(editingMaterial.id),
          title: editingMaterial.title || editingMaterial.file,
          type: editingMaterial.type,
          externalLink:
            editingMaterial.isExternalLink || editingMaterial.type === "link"
              ? editingMaterial.link
              : undefined,
          sizeFormatted: editingMaterial.sizeFormatted,
        },
      ]);
    } else {
      setTitle("");
      setDescription("");
      const loaded = loadCustomCategories();
      setCategory(loaded[0] || "Exercício / Atividade");
      setTargetLessonId(defaultLessonId !== undefined ? defaultLessonId : 0);
      setItems([]);
      setShowVideoForm(false);
      setShowLinkForm(false);
      setShowNewCatInput(false);
    }
  }, [editingMaterial, defaultLessonId, isOpen]);

  if (!isOpen) return null;

  const handleCreateNewCategory = () => {
    if (!newCatName.trim()) return;
    const updated = saveCustomCategory(newCatName.trim());
    setCategories(updated);
    setCategory(newCatName.trim());
    setNewCatName("");
    setShowNewCatInput(false);
  };

  const handleFilesAdded = (fileList: FileList | File[]) => {
    const newItems: MaterialSubmitItem[] = [];
    Array.from(fileList).forEach((file) => {
      const type = detectMaterialType(file.name);
      newItems.push({
        id: `file-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        title: file.name.replace(/\.[^/.]+$/, ""),
        type,
        file,
        fileSize: file.size,
        sizeFormatted: formatBytes(file.size),
      });
    });

    setItems((prev) => [...prev, ...newItems]);

    // Se o título principal estiver vazio, sugere o nome do primeiro arquivo
    if (!title && newItems.length > 0) {
      setTitle(newItems[0].title);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFilesAdded(e.target.files);
    }
    // Reseta o input para permitir selecionar o mesmo arquivo novamente se desejar
    e.target.value = "";
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDrag(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFilesAdded(e.dataTransfer.files);
    }
  };

  const handleAddVideo = () => {
    if (!videoUrl.trim()) {
      alert("Por favor, digite o link do vídeo.");
      return;
    }
    const finalTitle = videoTitle.trim() || "Vídeo complementar";
    setItems((prev) => [
      ...prev,
      {
        id: `video-${Date.now()}`,
        title: finalTitle,
        type: "video",
        externalLink: videoUrl.trim(),
        sizeFormatted: "Vídeo online",
      },
    ]);
    if (!title) setTitle(finalTitle);
    setVideoTitle("");
    setVideoUrl("");
    setShowVideoForm(false);
  };

  const handleAddLink = () => {
    if (!linkUrl.trim()) {
      alert("Por favor, digite a URL do link.");
      return;
    }
    const finalTitle = linkTitle.trim() || "Link de estudo";
    setItems((prev) => [
      ...prev,
      {
        id: `link-${Date.now()}`,
        title: finalTitle,
        type: "link",
        externalLink: linkUrl.trim(),
        sizeFormatted: "Link externo",
      },
    ]);
    if (!title) setTitle(finalTitle);
    setLinkTitle("");
    setLinkUrl("");
    setShowLinkForm(false);
  };

  const handleRemoveItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Por favor, preencha o título do material.");
      return;
    }

    if (items.length === 0 && !editingMaterial) {
      alert(
        "Por favor, anexe pelo menos um arquivo, vídeo ou link para este material.",
      );
      return;
    }

    await onSaveMaterial({
      title: title.trim(),
      description: description.trim(),
      category: category || "Outros",
      lessonId: Number(targetLessonId),
      items: items,
      existingId: editingMaterial?.id,
    });

    onClose();
  };

  const getItemIcon = (type: MaterialType) => {
    switch (type) {
      case "pdf":
        return <FileText size={18} color="#ef4444" />;
      case "video":
        return <Video size={18} color="#8b5cf6" />;
      case "audio":
        return <Music size={18} color="#ec4899" />;
      case "presentation":
        return <Presentation size={18} color="#f97316" />;
      case "spreadsheet":
        return <FileSpreadsheet size={18} color="#10b981" />;
      case "image":
        return <ImageIcon size={18} color="#10b981" />;
      case "link":
        return <ExternalLink size={18} color="#2563eb" />;
      default:
        return <FileText size={18} color="#1f2b45" />;
    }
  };

  return (
    <AnimatePresence>
      <Overlay
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <ModalBox
          initial={{ scale: 0.95, opacity: 0, y: 12 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 12 }}
          onClick={(e) => e.stopPropagation()}
        >
          <ModalHeader>
            <div className="header-titles">
              <h3>
                {editingMaterial ? "Editar material" : "Publicar novo material"}
              </h3>
              <p>
                Cadastre categorias, orientações e adicione quantos arquivos,
                vídeos ou links desejar.
              </p>
            </div>
            <CloseBtn type="button" onClick={onClose} aria-label="Fechar">
              <X size={17} />
            </CloseBtn>
          </ModalHeader>

          <ModalBody onSubmit={handleSubmit}>
            {/* 1. Vínculo do Material (Aula específica ou Geral da turma) */}
            <FormGroup>
              <label>
                Vincular a qual conteúdo? <span className="req">*</span>
              </label>
              <CustomDropdown
                value={String(targetLessonId)}
                onChange={(val) => setTargetLessonId(Number(val))}
                options={[
                  {
                    value: "0",
                    label: "📚 Materiais Gerais da Turma (Sem aula)",
                  },
                  ...lessons.map((lesson) => ({
                    value: String(lesson.id),
                    label: `🗓️ ${lesson.selectLabel}`,
                  })),
                ]}
                fullWidth
              />
            </FormGroup>

            {/* 2. Título */}
            <FormGroup>
              <label>
                Título do material / publicação <span className="req">*</span>
              </label>
              <input
                type="text"
                placeholder="Ex: Unit 3 - Business Travel & Vocabulary"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </FormGroup>

            {/* 3. Categoria com Cadastro Dinâmico */}
            <FormGroup>
              <div className="label-row">
                <label>
                  Categoria <span className="req">*</span>
                </label>
                {!showNewCatInput && (
                  <CreateCategoryBtn
                    type="button"
                    onClick={() => setShowNewCatInput(true)}
                  >
                    <Plus size={13} /> Cadastrar nova categoria
                  </CreateCategoryBtn>
                )}
              </div>

              {showNewCatInput ? (
                <NewCategoryInline
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <input
                    type="text"
                    placeholder="Nome da nova categoria (ex: Speaking, Homework...)"
                    value={newCatName}
                    onChange={(e) => setNewCatName(e.target.value)}
                    autoFocus
                    onKeyDown={(e) =>
                      e.key === "Enter" &&
                      (e.preventDefault(), handleCreateNewCategory())
                    }
                  />
                  <button
                    type="button"
                    className="save"
                    onClick={handleCreateNewCategory}
                  >
                    Salvar categoria
                  </button>
                  <button
                    type="button"
                    className="cancel"
                    onClick={() => {
                      setShowNewCatInput(false);
                      setNewCatName("");
                    }}
                  >
                    Cancelar
                  </button>
                </NewCategoryInline>
              ) : (
                <CustomDropdown
                  value={category}
                  onChange={(val) => {
                    if (val === "__NEW__") {
                      setShowNewCatInput(true);
                    } else {
                      setCategory(val);
                    }
                  }}
                  options={[
                    ...categories.map((cat) => ({
                      value: cat,
                      label: cat,
                    })),
                    {
                      value: "__NEW__",
                      label: "✨ + Cadastrar nova categoria...",
                    },
                  ]}
                  fullWidth
                />
              )}
            </FormGroup>

            {/* 4. Orientações / Descrição */}
            <FormGroup>
              <label>Orientações / Instruções para os alunos</label>
              <textarea
                placeholder="Explique detalhadamente como os alunos devem utilizar estes conteúdos, tarefas a realizar, prazos ou dicas de estudo..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormGroup>

            {/* 5. Conteúdos e Anexos (Arquivos, Vídeos, Links - quantos quiser) */}
            <AttachmentsSection>
              <AttachmentsHeader>
                <div className="title-group">
                  <strong>Conteúdos & Anexos</strong>
                  {items.length > 0 && (
                    <span className="badge">
                      {items.length} {items.length === 1 ? "item" : "itens"}
                    </span>
                  )}
                </div>
                <p className="hint">
                  Adicione quantos arquivos, vídeos e links desejar.
                </p>
              </AttachmentsHeader>

              {/* Barra de Ações para Adicionar Qualquer Tipo */}
              <ToolbarRow>
                <ToolBtn
                  $variant="navy"
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  title="Anexar arquivos do computador (suporta seleção múltipla)"
                >
                  <UploadCloud size={15} /> + Anexar Arquivo(s)
                </ToolBtn>

                <ToolBtn
                  $variant="coral"
                  type="button"
                  onClick={() => {
                    setShowVideoForm(true);
                    setShowLinkForm(false);
                  }}
                  title="Adicionar vídeo do YouTube, Vimeo ou link"
                >
                  <Video size={15} /> + Adicionar Vídeo
                </ToolBtn>

                <ToolBtn
                  $variant="blue"
                  type="button"
                  onClick={() => {
                    setShowLinkForm(true);
                    setShowVideoForm(false);
                  }}
                  title="Adicionar link externo, artigo ou ferramenta"
                >
                  <LinkIcon size={15} /> + Adicionar Link
                </ToolBtn>

                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  hidden
                  accept={ACCEPTED_EXTENSIONS}
                  onChange={handleFileInputChange}
                />
              </ToolbarRow>

              {/* Formulário Inline de Vídeo */}
              <AnimatePresence>
                {showVideoForm && (
                  <InlineFormCard
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <h5>
                      <Video size={16} /> Adicionar Vídeo (YouTube, Vimeo ou URL)
                    </h5>
                    <div className="form-row">
                      <input
                        type="text"
                        placeholder="Título do vídeo (ex: Videoaula Phrasal Verbs)"
                        value={videoTitle}
                        onChange={(e) => setVideoTitle(e.target.value)}
                      />
                      <input
                        type="url"
                        placeholder="https://youtube.com/watch?v=... ou link"
                        value={videoUrl}
                        onChange={(e) => setVideoUrl(e.target.value)}
                        autoFocus
                      />
                    </div>
                    <div className="btn-row">
                      <button
                        type="button"
                        className="cancel"
                        onClick={() => {
                          setShowVideoForm(false);
                          setVideoTitle("");
                          setVideoUrl("");
                        }}
                      >
                        Cancelar
                      </button>
                      <button
                        type="button"
                        className="add"
                        onClick={handleAddVideo}
                      >
                        Inserir Vídeo
                      </button>
                    </div>
                  </InlineFormCard>
                )}
              </AnimatePresence>

              {/* Formulário Inline de Link */}
              <AnimatePresence>
                {showLinkForm && (
                  <InlineFormCard
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <h5>
                      <ExternalLink size={16} /> Adicionar Link Externo ou
                      Artigo
                    </h5>
                    <div className="form-row">
                      <input
                        type="text"
                        placeholder="Título do link (ex: Artigo BBC News)"
                        value={linkTitle}
                        onChange={(e) => setLinkTitle(e.target.value)}
                      />
                      <input
                        type="url"
                        placeholder="https://..."
                        value={linkUrl}
                        onChange={(e) => setLinkUrl(e.target.value)}
                        autoFocus
                      />
                    </div>
                    <div className="btn-row">
                      <button
                        type="button"
                        className="cancel"
                        onClick={() => {
                          setShowLinkForm(false);
                          setLinkTitle("");
                          setLinkUrl("");
                        }}
                      >
                        Cancelar
                      </button>
                      <button
                        type="button"
                        className="add"
                        onClick={handleAddLink}
                      >
                        Inserir Link
                      </button>
                    </div>
                  </InlineFormCard>
                )}
              </AnimatePresence>

              {/* Dropzone de Arquivos */}
              <DropArea
                $isDrag={isDrag}
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDrag(true);
                }}
                onDragLeave={() => setIsDrag(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="icon-wrapper">
                  <UploadCloud size={20} />
                </div>
                <p className="main">
                  Arraste arquivos ou clique para selecionar
                </p>
                <p className="sub">
                  PDF, Word, Slides, Excel, Imagens, Áudios, Vídeos (seleção
                  múltipla suportada)
                </p>
              </DropArea>

              {/* Lista dos Itens Adicionados */}
              {items.length > 0 && (
                <ItemsList>
                  {items.map((item) => (
                    <ItemCard key={item.id}>
                      <div className="left">
                        <div
                          className="icon-box"
                          style={{
                            background:
                              item.type === "pdf"
                                ? "#fee2e2"
                                : item.type === "video"
                                ? "#ede9fe"
                                : item.type === "link"
                                ? "#eff6ff"
                                : item.type === "audio"
                                ? "#fce7f3"
                                : "#f1f5f9",
                          }}
                        >
                          {getItemIcon(item.type)}
                        </div>
                        <div className="info">
                          <strong title={item.title}>{item.title}</strong>
                          <div className="meta">
                            <span
                              className="type-tag"
                              style={{
                                color:
                                  item.type === "pdf"
                                    ? "#ef4444"
                                    : item.type === "video"
                                    ? "#8b5cf6"
                                    : item.type === "link"
                                    ? "#2563eb"
                                    : item.type === "audio"
                                    ? "#ec4899"
                                    : "#475569",
                              }}
                            >
                              {item.type}
                            </span>
                            <span>•</span>
                            <span>
                              {item.file
                                ? item.file.name
                                : item.externalLink || item.sizeFormatted}
                            </span>
                            {item.sizeFormatted && item.file && (
                              <>
                                <span>•</span>
                                <span>{item.sizeFormatted}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        className="remove"
                        onClick={() => handleRemoveItem(item.id)}
                        title="Remover este item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </ItemCard>
                  ))}
                </ItemsList>
              )}
            </AttachmentsSection>
          </ModalBody>

          <ModalFooter>
            <FooterBtn type="button" onClick={onClose} disabled={uploading}>
              Cancelar
            </FooterBtn>
            <FooterBtn
              $primary
              type="submit"
              onClick={handleSubmit}
              disabled={uploading}
            >
              {uploading ? (
                <>
                  <Loader2 size={16} className="spin" /> Salvando...
                </>
              ) : (
                <>
                  <Check size={16} />
                  {editingMaterial ? "Salvar alterações" : "Publicar material"}
                </>
              )}
            </FooterBtn>
          </ModalFooter>
        </ModalBox>
      </Overlay>
    </AnimatePresence>
  );
};

export default AddMaterialModal;
