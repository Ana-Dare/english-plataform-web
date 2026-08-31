import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Image, Upload, Trash2, Pencil, Check, X } from "lucide-react";
import { Card, CardHeader, CardTitle, CardBody, PrimaryBtn, DangerBtn, GhostBtn, SaveBtn, FieldGroup, FieldLabel, TextInput, FormGrid, UploadZone, ImageGrid, ImageCard, ImageFooter, ContentHeader } from "../style";

const INIT_IMAGES = [
  { id: 1, label: "Banner Principal", src: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&q=80" },
  { id: 2, label: "Slide 2",          src: "https://images.unsplash.com/photo-1555685812-4b943f1cb0eb?w=400&q=80" },
  { id: 3, label: "Slide 3",          src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&q=80" },
];

const AdminLoginConfig: React.FC = () => {
  const [images, setImages] = useState(INIT_IMAGES);
  const [editLabelId, setEditLabelId] = useState<number | null>(null);
  const [editLabel, setEditLabel] = useState("");
  const [logo, setLogo] = useState("Aulas & Traduções");
  const [tagline, setTagline] = useState("Aprenda inglês com fluência e confiança.");
  const [bgColor, setBgColor] = useState("#1F2B45");
  const [savedId, setSavedId] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const save = (id: string) => { setSavedId(id); setTimeout(() => setSavedId(""), 2200); };
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    Array.from(e.target.files || []).forEach(f => {
      const url = URL.createObjectURL(f);
      setImages(p => [...p, { id: Date.now() + Math.random(), label: f.name, src: url }]);
    });
  };
  const saveLabel = (id: number) => { setImages(p => p.map(img => img.id === id ? { ...img, label: editLabel } : img)); setEditLabelId(null); };

  return (
    <div>
      <ContentHeader initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1>Configuração de Login</h1>
        <p>Personalize a identidade visual da tela de acesso ao sistema.</p>
      </ContentHeader>

      {/* Identidade */}
      <Card>
        <CardHeader><CardTitle><Image size={18} color="#1F2B45" /> Identidade da Plataforma</CardTitle></CardHeader>
        <CardBody>
          <FormGrid>
            <FieldGroup>
              <FieldLabel>Nome / Logotipo (texto)</FieldLabel>
              <TextInput value={logo} onChange={e => setLogo(e.target.value)} />
            </FieldGroup>
            <FieldGroup>
              <FieldLabel>Slogan / Tagline</FieldLabel>
              <TextInput value={tagline} onChange={e => setTagline(e.target.value)} />
            </FieldGroup>
            <FieldGroup style={{ maxWidth: 120 }}>
              <FieldLabel>Cor de Fundo</FieldLabel>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <input type="color" value={bgColor} onChange={e => setBgColor(e.target.value)} style={{ width: 46, height: 42, border: "1.5px solid #e2e8f0", borderRadius: 10, cursor: "pointer", padding: "0.2rem" }} />
                <span style={{ fontFamily: "Rubik", fontSize: "0.82rem", color: "#64748b" }}>{bgColor}</span>
              </div>
            </FieldGroup>
          </FormGrid>

          {/* Preview */}
          <div style={{ padding: "1rem 1.5rem", borderRadius: 12, background: bgColor, display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.5rem" }}>
            <span style={{ color: "#fff", fontFamily: "Rubik", fontWeight: 800, fontSize: "1.1rem" }}>{logo}</span>
            <span style={{ color: "rgba(255,255,255,0.5)", fontFamily: "Rubik", fontSize: "0.88rem" }}>— {tagline}</span>
          </div>

          <SaveBtn $saved={savedId === "identity"} onClick={() => save("identity")}><Check size={15}/>{savedId === "identity" ? "Salvo!" : "Salvar Identidade"}</SaveBtn>
        </CardBody>
      </Card>


    </div>
  );
};

export default AdminLoginConfig;
