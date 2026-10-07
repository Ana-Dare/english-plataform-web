import React, { useMemo, useRef, useState } from "react";
import {
  X,
  UploadCloud,
  Plus,
  Download,
  Trash2,
  FileText,
  Loader2,
} from "lucide-react";
import {
  CompactOverlay,
  CompactModal,
  CompactHeader,
  CompactBody,
  CompactLabel,
  CompactSelect,
  MaterialRow,
  FileGlyph,
  FileMeta,
  RowActions,
  RowIconBtn,
  DropzoneMini,
  AddMaterialPill,
} from "./classDetail.styles";
import type { LessonMaterial } from "../services/material";

interface LessonOption {
  id: string;
  label: string;
  selectLabel: string;
}

interface AddMaterialModalProps {
  onClose: () => void;
  lessons: LessonOption[];
  materials: LessonMaterial[];
  uploading: boolean;
  deletingId: number | null;
  onAddFiles: (lessonId: number, files: File[]) => void;
  onDelete: (material: LessonMaterial) => void;
}

const ACCEPTED = ".pdf,.jpg,.jpeg,.png,.webp,.doc,.docx";

const AddMaterialModal: React.FC<AddMaterialModalProps> = ({
  onClose,
  lessons,
  materials,
  uploading,
  deletingId,
  onAddFiles,
  onDelete,
}) => {
  const [lessonId, setLessonId] = useState(lessons[0]?.id || "");
  const [isDragActive, setIsDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const numericLessonId = Number(lessonId);

  const lessonMaterials = useMemo(
    () => materials.filter((m) => m.lessonId === numericLessonId),
    [materials, numericLessonId],
  );

  const takeFiles = (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;
    if (!numericLessonId) return;
    onAddFiles(numericLessonId, Array.from(fileList));
  };

  const hasLessons = lessons.length > 0;

  return (
    <CompactOverlay onClick={onClose}>
      <CompactModal onClick={(e) => e.stopPropagation()}>
        <CompactHeader>
          <h3>Adicionar material</h3>
          <button type="button" onClick={onClose} aria-label="Fechar">
            <X size={18} />
          </button>
        </CompactHeader>
        <CompactBody>
          <div>
            <CompactLabel>
              Para qual aula deseja adicionar este material?
            </CompactLabel>
            <CompactSelect
              value={lessonId}
              disabled={!hasLessons}
              onChange={(e) => setLessonId(e.target.value)}
            >
              {hasLessons ? (
                lessons.map((lesson) => (
                  <option key={lesson.id} value={lesson.id}>
                    {lesson.selectLabel}
                  </option>
                ))
              ) : (
                <option value="">Nenhuma aula cadastrada</option>
              )}
            </CompactSelect>
          </div>

          {lessonMaterials.map((mat) => (
            <MaterialRow key={mat.id}>
              <FileGlyph>
                <FileText size={16} />
              </FileGlyph>
              <FileMeta>
                <strong>{mat.file}</strong>
                <span>{mat.type.toUpperCase()}</span>
              </FileMeta>
              <RowActions>
                <RowIconBtn
                  as="a"
                  href={mat.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Baixar"
                >
                  <Download size={16} />
                </RowIconBtn>
                <RowIconBtn
                  $danger
                  type="button"
                  title="Excluir"
                  disabled={deletingId === mat.id}
                  onClick={() => onDelete(mat)}
                >
                  {deletingId === mat.id ? (
                    <Loader2 size={16} className="spin" />
                  ) : (
                    <Trash2 size={16} />
                  )}
                </RowIconBtn>
              </RowActions>
            </MaterialRow>
          ))}

          <input
            ref={fileInputRef}
            type="file"
            multiple
            hidden
            accept={ACCEPTED}
            disabled={!hasLessons || uploading}
            onChange={(e) => {
              takeFiles(e.target.files);
              e.target.value = "";
            }}
          />
          <DropzoneMini
            $active={isDragActive}
            onDragOver={(e) => {
              if (!hasLessons || uploading) return;
              e.preventDefault();
              setIsDragActive(true);
            }}
            onDragLeave={() => setIsDragActive(false)}
            onDrop={(e) => {
              e.preventDefault();
              setIsDragActive(false);
              if (!hasLessons || uploading) return;
              takeFiles(e.dataTransfer.files);
            }}
            onClick={() => {
              if (!hasLessons || uploading) return;
              fileInputRef.current?.click();
            }}
          >
            {uploading ? (
              <Loader2 size={28} className="spin" />
            ) : (
              <UploadCloud size={28} />
            )}
            <p>
              {uploading
                ? "Enviando material..."
                : hasLessons
                  ? "Arraste novos materiais ou selecione do computador (PDF, imagem ou DOC/DOCX, até 10 MB)"
                  : "Cadastre uma aula na agenda para enviar materiais"}
            </p>
            <AddMaterialPill
              type="button"
              disabled={!hasLessons || uploading}
              onClick={(e) => {
                e.stopPropagation();
                if (!hasLessons || uploading) return;
                fileInputRef.current?.click();
              }}
            >
              <Plus size={14} /> Adicionar Material
            </AddMaterialPill>
          </DropzoneMini>
        </CompactBody>
      </CompactModal>
    </CompactOverlay>
  );
};

export default AddMaterialModal;
