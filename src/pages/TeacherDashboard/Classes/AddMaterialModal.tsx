import React, { useState, useRef } from "react";
import { X, UploadCloud } from "lucide-react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FieldGroup,
  CloseBtn,
  PrimaryBtn,
  SecondaryBtn,
  DropzoneContainer,
  RichTextWrapper,
} from "./style";
import useToast from "../../../contexts/Toast/useToast";

export interface MaterialData {
  title: string;
  type: "pdf" | "video" | "link";
  url: string;
  description: string;
}

interface AddMaterialModalProps {
  onClose: () => void;
  onSave: (data: MaterialData) => void;
  initialData?: MaterialData;
}

const AddMaterialModal: React.FC<AddMaterialModalProps> = ({
  onClose,
  onSave,
  initialData,
}) => {
  const { addToast } = useToast();
  const [title, setTitle] = useState(initialData?.title || "");
  const [type, setType] = useState<"pdf" | "video" | "link">(
    initialData?.type || "pdf",
  );
  const [url, setUrl] = useState(initialData?.url || "");
  const [description, setDescription] = useState(
    initialData?.description || "",
  );

  const [fileName, setFileName] = useState("");
  const [isDragActive, setIsDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(true);
  };

  const handleDragLeave = () => {
    setIsDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      setFileName(file.name);
      setUrl(URL.createObjectURL(file));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFileName(file.name);
      setUrl(URL.createObjectURL(file));
    }
  };

  const handleSave = () => {
    if (!title.trim()) {
      addToast("Por favor, informe o título do material.", "warning");
      return;
    }
    onSave({ title, type, url, description });
  };

  return (
    <ModalOverlay>
      <ModalContent $expanded>
        <ModalHeader>
          <h3>{initialData ? "Editar Material" : "Adicionar Material"}</h3>
          <CloseBtn onClick={onClose}>
            <X size={20} />
          </CloseBtn>
        </ModalHeader>
        <ModalBody>
          <FieldGroup>
            <label>Título do Material</label>
            <input
              type="text"
              placeholder="Ex: Apostila Módulo 1"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </FieldGroup>
          <FieldGroup>
            <label>Tipo de Arquivo</label>
            <select
              value={type}
              onChange={(e) => {
                setType(e.target.value as "pdf" | "video" | "link");
                setUrl("");
                setFileName("");
              }}
            >
              <option value="pdf">Documento PDF</option>
              <option value="video">Vídeo (YouTube/Vimeo)</option>
              <option value="link">Link Externo</option>
            </select>
          </FieldGroup>

          {type === "pdf" ? (
            <FieldGroup>
              <label>Arquivo</label>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx"
              />
              <DropzoneContainer
                $isDragActive={isDragActive}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <UploadCloud />
                {fileName ? (
                  <p>
                    Arquivo selecionado: <strong>{fileName}</strong>
                  </p>
                ) : (
                  <>
                    <p>
                      Arraste seu arquivo para cá ou{" "}
                      <strong>clique para buscar</strong>
                    </p>
                    <span>Formatos suportados: PDF, DOC, DOCX</span>
                  </>
                )}
              </DropzoneContainer>
            </FieldGroup>
          ) : (
            <FieldGroup>
              <label>Link / URL</label>
              <input
                type="url"
                placeholder="https://..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </FieldGroup>
          )}

          <FieldGroup>
            <label>Descrição Avançada (Opcional)</label>
            <RichTextWrapper>
              <ReactQuill
                theme="snow"
                value={description}
                onChange={setDescription}
                placeholder="Escreva detalhes adicionais ou instruções..."
              />
            </RichTextWrapper>
          </FieldGroup>
        </ModalBody>
        <ModalFooter>
          <SecondaryBtn onClick={onClose}>Cancelar</SecondaryBtn>
          <PrimaryBtn onClick={handleSave}>
            {initialData ? "Salvar Alterações" : "Adicionar Material"}
          </PrimaryBtn>
        </ModalFooter>
      </ModalContent>
    </ModalOverlay>
  );
};

export default AddMaterialModal;
