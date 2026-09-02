import React, { useState } from "react";
import { Image, Check } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  SaveBtn,
  FieldGroup,
  FieldLabel,
  TextInput,
  FormGrid,
  ContentHeader,
} from "../style";

const AdminLoginConfig: React.FC = () => {
  const [logo, setLogo] = useState("Aulas & Traduções");
  const [tagline, setTagline] = useState(
    "Aprenda inglês com fluência e confiança.",
  );
  const [bgColor, setBgColor] = useState("#1F2B45");
  const [savedId, setSavedId] = useState("");

  const save = (id: string) => {
    setSavedId(id);
    setTimeout(() => setSavedId(""), 2200);
  };

  return (
    <div>
      <ContentHeader
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1>Configuração de Login</h1>
        <p>Personalize a identidade visual da tela de acesso ao sistema.</p>
      </ContentHeader>

      <Card>
        <CardHeader>
          <CardTitle>
            <Image size={18} color="#1F2B45" /> Identidade da Plataforma
          </CardTitle>
        </CardHeader>
        <CardBody>
          <FormGrid>
            <FieldGroup>
              <FieldLabel>Nome / Logotipo (texto)</FieldLabel>
              <TextInput
                value={logo}
                onChange={(e) => setLogo(e.target.value)}
              />
            </FieldGroup>
            <FieldGroup>
              <FieldLabel>Slogan / Tagline</FieldLabel>
              <TextInput
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
              />
            </FieldGroup>
            <FieldGroup style={{ maxWidth: 120 }}>
              <FieldLabel>Cor de Fundo</FieldLabel>
              <div
                style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
              >
                <input
                  type="color"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  style={{
                    width: 46,
                    height: 42,
                    border: "1.5px solid #e2e8f0",
                    borderRadius: 10,
                    cursor: "pointer",
                    padding: "0.2rem",
                  }}
                />
                <span
                  style={{
                    fontFamily: "Rubik",
                    fontSize: "0.82rem",
                    color: "#64748b",
                  }}
                >
                  {bgColor}
                </span>
              </div>
            </FieldGroup>
          </FormGrid>

          <div
            style={{
              padding: "1rem 1.5rem",
              borderRadius: 12,
              background: bgColor,
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              marginBottom: "0.5rem",
            }}
          >
            <span
              style={{
                color: "#fff",
                fontFamily: "Rubik",
                fontWeight: 800,
                fontSize: "1.1rem",
              }}
            >
              {logo}
            </span>
            <span
              style={{
                color: "rgba(255,255,255,0.5)",
                fontFamily: "Rubik",
                fontSize: "0.88rem",
              }}
            >
              — {tagline}
            </span>
          </div>

          <SaveBtn
            $saved={savedId === "identity"}
            onClick={() => save("identity")}
          >
            <Check size={15} />
            {savedId === "identity" ? "Salvo!" : "Salvar Identidade"}
          </SaveBtn>
        </CardBody>
      </Card>
    </div>
  );
};

export default AdminLoginConfig;
