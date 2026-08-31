import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, GraduationCap, Shield, BookOpen, TrendingUp, Activity } from "lucide-react";
import { Card, CardHeader, CardTitle, CardBody, Table, Th, Td, Avatar, RolePill, ContentHeader } from "../style";

const MOCK_USERS = [
  { id: 1, name: "Ana Charantola", email: "ana@plataforma.com",   role: "teacher", status: "Ativo",  isAdmin: true,  color: "#1F2B45" },
  { id: 2, name: "Bruno Ferreira",  email: "bruno@plataforma.com", role: "student", status: "Ativo",  isAdmin: false, color: "#C57A67" },
  { id: 3, name: "Carla Souza",     email: "carla@plataforma.com", role: "student", status: "Inativo",isAdmin: false, color: "#7c3aed" },
  { id: 4, name: "Diego Lima",      email: "diego@plataforma.com", role: "student", status: "Ativo",  isAdmin: false, color: "#0891b2" },
  { id: 5, name: "Elena Martins",   email: "elena@plataforma.com", role: "teacher", status: "Ativo",  isAdmin: false, color: "#059669" },
];

const stats = [
  { label: "Total de Usuários",  value: 5,  icon: <Users size={22}/>,        bg: "#e0e7ff", color: "#4f46e5", accent: "#4f46e5" },
  { label: "Professores",        value: 2,  icon: <GraduationCap size={22}/>, bg: "#fef3c7", color: "#d97706", accent: "#f59e0b" },
  { label: "Alunos",             value: 3,  icon: <BookOpen size={22}/>,      bg: "#dcfce7", color: "#16a34a", accent: "#22c55e" },
  { label: "Administradores",    value: 1,  icon: <Shield size={22}/>,        bg: "#fce7f3", color: "#db2777", accent: "#C57A67" },
  { label: "Turmas Ativas",      value: 12, icon: <Activity size={22}/>,      bg: "#f0fdf4", color: "#059669", accent: "#059669" },
  { label: "Aulas este mês",     value: 48, icon: <TrendingUp size={22}/>,    bg: "#fff7ed", color: "#ea580c", accent: "#ea580c" },
];

const AdminOverview: React.FC = () => (
  <div>
    <ContentHeader initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
      <h1>Painel Administrativo</h1>
      <p>Métricas gerais e resumo da plataforma em tempo real.</p>
    </ContentHeader>

    {/* Stats */}
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1.25rem", marginBottom: "2rem" }}>
      {stats.map((s, i) => (
        <motion.div key={i}
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
          style={{ background: "#fff", borderRadius: 16, padding: "1.5rem", border: "1px solid #e2e8f0", boxShadow: "0 1px 4px rgba(0,0,0,0.04)", position: "relative", overflow: "hidden" }}
        >
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: s.accent }} />
          <div style={{ width: 44, height: 44, borderRadius: 12, background: s.bg, color: s.color, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>{s.icon}</div>
          <div style={{ fontSize: "2rem", fontWeight: 800, color: "#0f172a", lineHeight: 1 }}>{s.value}</div>
          <div style={{ fontSize: "0.85rem", color: "#64748b", marginTop: "0.25rem", fontFamily: "Rubik" }}>{s.label}</div>
        </motion.div>
      ))}
    </div>

    <Card>
      <CardHeader>
        <CardTitle><Users size={18} color="#1F2B45" /> Usuários Recentes</CardTitle>
      </CardHeader>
      <div style={{ overflowX: "auto" }}>
        <Table>
          <thead style={{ background: "#f8fafc" }}>
            <tr><Th>Usuário</Th><Th>E-mail</Th><Th>Papel</Th><Th>Status</Th></tr>
          </thead>
          <tbody>
            {MOCK_USERS.map(u => (
              <tr key={u.id}>
                <Td>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <Avatar $color={u.color}>{u.name[0]}</Avatar>
                    <span style={{ fontWeight: 600, color: "#0f172a" }}>{u.name}</span>
                  </div>
                </Td>
                <Td style={{ color: "#64748b" }}>{u.email}</Td>
                <Td><RolePill $admin={u.isAdmin} $teacher={u.role === "teacher"}>{u.isAdmin ? "⭐ Admin" : u.role === "teacher" ? "Professor" : "Aluno"}</RolePill></Td>
                <Td><span style={{ color: u.status === "Ativo" ? "#16a34a" : "#94a3b8", fontWeight: 600 }}>● {u.status}</span></Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Card>
  </div>
);

export default AdminOverview;
