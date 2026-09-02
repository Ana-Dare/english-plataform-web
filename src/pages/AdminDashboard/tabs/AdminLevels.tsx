import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, Plus, Trash2, Pencil, Check, X } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  PrimaryBtn,
  DangerBtn,
  GhostBtn,
  LevelRow,
  LevelBubble,
  FormGrid,
  FieldGroup,
  FieldLabel,
  TextInput,
  ContentHeader,
} from "../style";

type Level = {
  id: number;
  name: string;
  description: string;
  color: string;
  order: number;
};
const INIT: Level[] = [
  {
    id: 1,
    name: "Beginner",
    description: "Para iniciantes sem conhecimento prévio.",
    color: "#22c55e",
    order: 1,
  },
  {
    id: 2,
    name: "Elementary",
    description: "Conhecimento básico de vocabulário e gramática.",
    color: "#3b82f6",
    order: 2,
  },
  {
    id: 3,
    name: "Intermediate",
    description: "Conversa fluente em situações cotidianas.",
    color: "#f59e0b",
    order: 3,
  },
  {
    id: 4,
    name: "Upper-Intermediate",
    description: "Leitura e escrita com maior complexidade.",
    color: "#8b5cf6",
    order: 4,
  },
  {
    id: 5,
    name: "Advanced",
    description: "Domínio quase nativo da língua inglesa.",
    color: "#ef4444",
    order: 5,
  },
];

const AdminLevels: React.FC = () => {
  const [levels, setLevels] = useState<Level[]>(INIT);
  const [editId, setEditId] = useState<number | null>(null);
  const [editData, setEditData] = useState<Partial<Level>>({});
  const [showAdd, setShowAdd] = useState(false);
  const [newLevel, setNewLevel] = useState({
    name: "",
    description: "",
    color: "#3b82f6",
    order: 6,
  });

  const startEdit = (l: Level) => {
    setEditId(l.id);
    setEditData({ ...l });
  };
  const saveEdit = () => {
    setLevels((p) =>
      p.map((l) => (l.id === editId ? { ...l, ...editData } : l)),
    );
    setEditId(null);
  };
  const remove = (id: number) => setLevels((p) => p.filter((l) => l.id !== id));
  const addLevel = () => {
    if (!newLevel.name.trim()) return;
    setLevels((p) => [...p, { id: Date.now(), ...newLevel }]);
    setNewLevel({
      name: "",
      description: "",
      color: "#3b82f6",
      order: levels.length + 2,
    });
    setShowAdd(false);
  };

  return (
    <div>
      <ContentHeader
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1>Níveis de Inglês</h1>
        <p>Cadastre e configure os níveis disponíveis na plataforma.</p>
      </ContentHeader>

      <Card>
        <CardHeader>
          <CardTitle>
            <GraduationCap size={18} color="#1F2B45" /> Níveis ({levels.length})
          </CardTitle>
          <PrimaryBtn onClick={() => setShowAdd((v) => !v)}>
            <Plus size={13} /> Novo Nível
          </PrimaryBtn>
        </CardHeader>

        <AnimatePresence>
          {showAdd && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              style={{ overflow: "hidden", borderBottom: "1px solid #f1f5f9" }}
            >
              <div style={{ padding: "1.25rem 1.5rem", background: "#f8fafc" }}>
                <FormGrid>
                  <FieldGroup>
                    <FieldLabel>Nome *</FieldLabel>
                    <TextInput
                      placeholder="Ex: Beginner"
                      value={newLevel.name}
                      onChange={(e) =>
                        setNewLevel((p) => ({ ...p, name: e.target.value }))
                      }
                    />
                  </FieldGroup>
                  <FieldGroup style={{ flex: 2 }}>
                    <FieldLabel>Descrição</FieldLabel>
                    <TextInput
                      placeholder="Descreva o perfil deste nível..."
                      value={newLevel.description}
                      onChange={(e) =>
                        setNewLevel((p) => ({
                          ...p,
                          description: e.target.value,
                        }))
                      }
                    />
                  </FieldGroup>
                  <FieldGroup style={{ maxWidth: 90 }}>
                    <FieldLabel>Ordem</FieldLabel>
                    <TextInput
                      type="number"
                      value={String(newLevel.order)}
                      onChange={(e) =>
                        setNewLevel((p) => ({ ...p, order: +e.target.value }))
                      }
                    />
                  </FieldGroup>
                  <FieldGroup style={{ maxWidth: 70 }}>
                    <FieldLabel>Cor</FieldLabel>
                    <input
                      type="color"
                      value={newLevel.color}
                      onChange={(e) =>
                        setNewLevel((p) => ({ ...p, color: e.target.value }))
                      }
                      style={{
                        width: "100%",
                        height: 42,
                        padding: "0.2rem",
                        border: "1.5px solid #e2e8f0",
                        borderRadius: 10,
                        cursor: "pointer",
                      }}
                    />
                  </FieldGroup>
                </FormGrid>
                <div
                  style={{
                    display: "flex",
                    gap: "0.5rem",
                    marginTop: "0.5rem",
                  }}
                >
                  <PrimaryBtn onClick={addLevel}>
                    <Plus size={14} /> Adicionar Nível
                  </PrimaryBtn>
                  <GhostBtn onClick={() => setShowAdd(false)}>
                    Cancelar
                  </GhostBtn>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <CardBody>
          <AnimatePresence>
            {[...levels]
              .sort((a, b) => a.order - b.order)
              .map((l, i) => (
                <LevelRow
                  key={l.id}
                  $color={l.color}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <LevelBubble $color={l.color}>{l.order}</LevelBubble>

                  {editId === l.id ? (
                    <div
                      style={{
                        flex: 1,
                        display: "grid",
                        gridTemplateColumns: "1fr 2fr 80px 60px",
                        gap: "0.5rem",
                        alignItems: "center",
                      }}
                    >
                      <TextInput
                        value={editData.name || ""}
                        onChange={(e) =>
                          setEditData((p) => ({ ...p, name: e.target.value }))
                        }
                      />
                      <TextInput
                        value={editData.description || ""}
                        onChange={(e) =>
                          setEditData((p) => ({
                            ...p,
                            description: e.target.value,
                          }))
                        }
                      />
                      <TextInput
                        type="number"
                        value={String(editData.order || 0)}
                        onChange={(e) =>
                          setEditData((p) => ({ ...p, order: +e.target.value }))
                        }
                      />
                      <input
                        type="color"
                        value={editData.color || l.color}
                        onChange={(e) =>
                          setEditData((p) => ({ ...p, color: e.target.value }))
                        }
                        style={{
                          height: 40,
                          width: "100%",
                          borderRadius: 8,
                          border: "1.5px solid #e2e8f0",
                          padding: "0.2rem",
                          cursor: "pointer",
                        }}
                      />
                    </div>
                  ) : (
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          fontWeight: 700,
                          color: "#0f172a",
                          fontFamily: "Rubik",
                        }}
                      >
                        {l.name}
                      </div>
                      <div
                        style={{
                          fontSize: "0.82rem",
                          color: "#64748b",
                          marginTop: "0.15rem",
                        }}
                      >
                        {l.description}
                      </div>
                    </div>
                  )}

                  <div
                    style={{ display: "flex", gap: "0.35rem", flexShrink: 0 }}
                  >
                    {editId === l.id ? (
                      <>
                        <PrimaryBtn onClick={saveEdit}>
                          <Check size={12} /> Salvar
                        </PrimaryBtn>
                        <GhostBtn onClick={() => setEditId(null)}>
                          <X size={12} />
                        </GhostBtn>
                      </>
                    ) : (
                      <>
                        <GhostBtn onClick={() => startEdit(l)}>
                          <Pencil size={12} />
                        </GhostBtn>
                        <DangerBtn onClick={() => remove(l.id)}>
                          <Trash2 size={12} />
                        </DangerBtn>
                      </>
                    )}
                  </div>
                </LevelRow>
              ))}
          </AnimatePresence>
        </CardBody>
      </Card>
    </div>
  );
};

export default AdminLevels;
