import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Plus, Trash2, Pencil, Check, X } from "lucide-react";
import { Card, CardHeader, CardTitle, CardBody, Table, Th, Td, Avatar, RolePill, PrimaryBtn, DangerBtn, GhostBtn, Toggle, TextInput, SelectInput, FieldGroup, FieldLabel, ContentHeader } from "../style";

type User = { id: number; name: string; email: string; role: string; status: string; isAdmin: boolean; color: string };
const COLORS = ["#1F2B45","#C57A67","#7c3aed","#0891b2","#059669","#ea580c","#dc2626"];
const INIT: User[] = [
  { id: 1, name: "Ana Charantola", email: "ana@plataforma.com",   role: "teacher", status: "Ativo",  isAdmin: true,  color: "#1F2B45" },
  { id: 2, name: "Bruno Ferreira",  email: "bruno@plataforma.com", role: "student", status: "Ativo",  isAdmin: false, color: "#C57A67" },
  { id: 3, name: "Carla Souza",     email: "carla@plataforma.com", role: "student", status: "Inativo",isAdmin: false, color: "#7c3aed" },
  { id: 4, name: "Diego Lima",      email: "diego@plataforma.com", role: "student", status: "Ativo",  isAdmin: false, color: "#0891b2" },
  { id: 5, name: "Elena Martins",   email: "elena@plataforma.com", role: "teacher", status: "Ativo",  isAdmin: false, color: "#059669" },
];

const AdminUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>(INIT);
  const [editId, setEditId] = useState<number | null>(null);
  const [editData, setEditData] = useState<Partial<User>>({});
  const [showAdd, setShowAdd] = useState(false);
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "student" });

  const startEdit = (u: User) => { setEditId(u.id); setEditData({ ...u }); };
  const saveEdit = () => { setUsers(p => p.map(u => u.id === editId ? { ...u, ...editData } : u)); setEditId(null); };
  const remove = (id: number) => setUsers(p => p.filter(u => u.id !== id));
  const toggleAdmin = (id: number) => setUsers(p => p.map(u => u.id === id ? { ...u, isAdmin: !u.isAdmin } : u));
  const toggleStatus = (id: number) => setUsers(p => p.map(u => u.id === id ? { ...u, status: u.status === "Ativo" ? "Inativo" : "Ativo" } : u));
  const addUser = () => {
    if (!newUser.name.trim() || !newUser.email.trim()) return;
    setUsers(p => [...p, { id: Date.now(), ...newUser, status: "Ativo", isAdmin: false, color: COLORS[p.length % COLORS.length] }]);
    setNewUser({ name: "", email: "", role: "student" });
    setShowAdd(false);
  };

  return (
    <div>
      <ContentHeader initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1>Gestão de Usuários</h1>
        <p>Adicione, edite e gerencie permissões dos usuários da plataforma.</p>
      </ContentHeader>

      <Card>
        <CardHeader>
          <CardTitle><Users size={18} color="#1F2B45" /> Usuários ({users.length})</CardTitle>
          <PrimaryBtn onClick={() => setShowAdd(v => !v)}><Plus size={13}/> Novo Usuário</PrimaryBtn>
        </CardHeader>

        <AnimatePresence>
          {showAdd && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} style={{ overflow: "hidden", borderBottom: "1px solid #f1f5f9" }}>
              <div style={{ padding: "1.25rem 1.5rem", background: "#f8fafc", display: "grid", gridTemplateColumns: "1fr 1fr 160px auto", gap: "0.75rem", alignItems: "end" }}>
                <FieldGroup>
                  <FieldLabel>Nome *</FieldLabel>
                  <TextInput placeholder="Nome completo" value={newUser.name} onChange={e => setNewUser(p => ({ ...p, name: e.target.value }))} />
                </FieldGroup>
                <FieldGroup>
                  <FieldLabel>E-mail *</FieldLabel>
                  <TextInput type="email" placeholder="email@exemplo.com" value={newUser.email} onChange={e => setNewUser(p => ({ ...p, email: e.target.value }))} />
                </FieldGroup>
                <FieldGroup>
                  <FieldLabel>Papel</FieldLabel>
                  <SelectInput value={newUser.role} onChange={e => setNewUser(p => ({ ...p, role: e.target.value }))}>
                    <option value="student">Aluno</option>
                    <option value="teacher">Professor</option>
                  </SelectInput>
                </FieldGroup>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <PrimaryBtn onClick={addUser}><Check size={13}/></PrimaryBtn>
                  <GhostBtn onClick={() => setShowAdd(false)}><X size={13}/></GhostBtn>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div style={{ overflowX: "auto" }}>
          <Table>
            <thead><tr><Th>Usuário</Th><Th>E-mail</Th><Th>Papel</Th><Th>Status</Th><Th>Admin</Th><Th>Ações</Th></tr></thead>
            <tbody>
              <AnimatePresence>
                {users.map(u => (
                  <motion.tr key={u.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <Td>
                      {editId === u.id
                        ? <TextInput style={{ width: 160 }} value={editData.name || ""} onChange={e => setEditData(p => ({ ...p, name: e.target.value }))} />
                        : <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                            <Avatar $color={u.color}>{u.name[0]}</Avatar>
                            <div>
                              <div style={{ fontWeight: 600, color: "#0f172a", fontFamily: "Rubik" }}>{u.name}</div>
                              <div style={{ fontSize: "0.75rem", color: "#94a3b8" }}>{u.role === "teacher" ? "Professor" : "Aluno"}</div>
                            </div>
                          </div>}
                    </Td>
                    <Td style={{ color: "#64748b" }}>
                      {editId === u.id
                        ? <TextInput type="email" style={{ width: 180 }} value={editData.email || ""} onChange={e => setEditData(p => ({ ...p, email: e.target.value }))} />
                        : u.email}
                    </Td>
                    <Td>
                      {editId === u.id
                        ? <SelectInput style={{ width: 120 }} value={editData.role || "student"} onChange={e => setEditData(p => ({ ...p, role: e.target.value }))}>
                            <option value="student">Aluno</option>
                            <option value="teacher">Professor</option>
                          </SelectInput>
                        : <RolePill $admin={u.isAdmin} $teacher={u.role === "teacher"}>{u.isAdmin ? "⭐ Admin" : u.role === "teacher" ? "Professor" : "Aluno"}</RolePill>}
                    </Td>
                    <Td>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <Toggle $on={u.status === "Ativo"} onClick={() => toggleStatus(u.id)} />
                        <span style={{ fontSize: "0.82rem", color: u.status === "Ativo" ? "#16a34a" : "#94a3b8", fontFamily: "Rubik" }}>{u.status}</span>
                      </div>
                    </Td>
                    <Td>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <Toggle $on={u.isAdmin} onClick={() => toggleAdmin(u.id)} />
                        <span style={{ fontSize: "0.82rem", color: "#64748b", fontFamily: "Rubik" }}>{u.isAdmin ? "Sim" : "Não"}</span>
                      </div>
                    </Td>
                    <Td>
                      <div style={{ display: "flex", gap: "0.35rem" }}>
                        {editId === u.id
                          ? <><PrimaryBtn onClick={saveEdit}><Check size={12}/> Salvar</PrimaryBtn><GhostBtn onClick={() => setEditId(null)}><X size={12}/></GhostBtn></>
                          : <><GhostBtn onClick={() => startEdit(u)}><Pencil size={12}/></GhostBtn><DangerBtn onClick={() => remove(u.id)}><Trash2 size={12}/></DangerBtn></>}
                      </div>
                    </Td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </Table>
        </div>
      </Card>
    </div>
  );
};

export default AdminUsers;
