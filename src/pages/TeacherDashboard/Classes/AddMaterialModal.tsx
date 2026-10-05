import React, { useMemo, useRef, useState } from "react";
import { X, UploadCloud, Plus, Download, Pencil, Trash2, FileText } from "lucide-react";
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
  RenameBox,
  SaveMini,
  DropzoneMini,
  AddMaterialPill,
} from "./classDetail.styles";

export interface MaterialData {
  id: string;
  title: string;
  type: "pdf" | "docx" | "video" | "link";
  url: string;
  lessonId: string;
  addedAt: string;
}

interface LessonOption {
  id: string;
  label: string;
  selectLabel: string;
}

interface AddMaterialModalProps {
  onClose: () => void;
  lessons: LessonOption[];
  materials: MaterialData[];
  onAddFiles: (lessonId: string, files: File[]) => void;
  onRename: (id: string, title: string) => void;
  onDelete: (id: string) => void;
}

const AddMaterialModal: React.FC<AddMaterialModalProps> = ({
  onClose,
  lessons,
  materials,
  onAddFiles,
  onRename,
  onDelete,
}) => {
  const [lessonId, setLessonId] = useState(lessons[0]?.id || "");
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState("");
  const [isDragActive, setIsDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const lessonMaterials = useMemo(
    () => materials.filter((m) => m.lessonId === lessonId),
    [materials, lessonId],
  );

  const takeFiles = (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;
    onAddFiles(lessonId, Array.from(fileList));
  };

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
            <CompactLabel>Para qual aula deseja adicionar este material?</CompactLabel>
            <CompactSelect
              value={lessonId}
              onChange={(e) => {
                setLessonId(e.target.value);
                setRenamingId(null);
              }}
            >
              {lessons.map((lesson) => (
                <option key={lesson.id} value={lesson.id}>
                  {lesson.selectLabel}
                </option>
              ))}
            </CompactSelect>
          </div>

          {lessonMaterials.map((mat) => (
            <div key={mat.id}>
              <MaterialRow>
                <FileGlyph>
                  <FileText size={16} />
                </FileGlyph>
                <FileMeta>
                  <strong>{mat.title}</strong>
                  <span>Adicionado em {mat.addedAt}</span>
                </FileMeta>
                <RowActions>
                  <RowIconBtn type="button" title="Baixar">
                    <Download size={16} />
                  </RowIconBtn>
                  <RowIconBtn
                    type="button"
                    title="Renomear"
                    onClick={() => {
                      setRenamingId(mat.id);
                      setRenameValue(mat.title);
                    }}
                  >
                    <Pencil size={16} />
                  </RowIconBtn>
                  <RowIconBtn
                    $danger
                    type="button"
                    title="Excluir"
                    onClick={() => onDelete(mat.id)}
                  >
                    <Trash2 size={16} />
                  </RowIconBtn>
                </RowActions>
              </MaterialRow>
              {renamingId === mat.id && (
                <RenameBox>
                  <span>Renomear Material</span>
                  <input
                    value={renameValue}
                    onChange={(e) => setRenameValue(e.target.value)}
                  />
                  <SaveMini
                    type="button"
                    onClick={() => {
                      if (renameValue.trim()) {
                        onRename(mat.id, renameValue.trim());
                      }
                      setRenamingId(null);
                    }}
                  >
                    Salvar
                  </SaveMini>
                </RenameBox>
              )}
            </div>
          ))}

          <input
            ref={fileInputRef}
            type="file"
            multiple
            hidden
            accept=".pdf,.doc,.docx"
            onChange={(e) => {
              takeFiles(e.target.files);
              e.target.value = "";
            }}
          />
          <DropzoneMini
            $active={isDragActive}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragActive(true);
            }}
            onDragLeave={() => setIsDragActive(false)}
            onDrop={(e) => {
              e.preventDefault();
              setIsDragActive(false);
              takeFiles(e.dataTransfer.files);
            }}
            onClick={() => fileInputRef.current?.click()}
          >
            <UploadCloud size={28} />
            <p>Arraste novos materiais ou selecione do computador</p>
            <AddMaterialPill
              type="button"
              onClick={(e) => {
                e.stopPropagation();
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
