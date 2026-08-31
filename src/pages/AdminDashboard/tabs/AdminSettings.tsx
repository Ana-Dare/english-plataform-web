import React, { useState } from "react";
import { Settings, Check } from "lucide-react";
import { Card, CardHeader, CardTitle, CardBody, SaveBtn, Toggle, ToggleRow, FormGrid, FieldGroup, FieldLabel, TextInput, SelectInput, ContentHeader } from "../style";

const AdminSettings: React.FC = () => {
  const [cfg, setCfg] = useState({
    maintenance: false, allowRegistration: true, emailNotif: true,
    smsNotif: false, studentCanViewGrades: true, requireEmailVerification: true,
    maxStudents: "30", sessionTimeout: "60", defaultLevel: "Beginner",
    supportEmail: "suporte@plataforma.com", platform: "Aulas & Traduções",
  });
  const [savedId, setSavedId] = useState("");

  const toggle = (k: keyof typeof cfg) => setCfg(p => ({ ...p, [k]: !p[k] }));
  const set = (k: keyof typeof cfg, v: string) => setCfg(p => ({ ...p, [k]: v }));
  const save = (id: string) => { setSavedId(id); setTimeout(() => setSavedId(""), 2200); };

  const section = (title: string, children: React.ReactNode, saveKey: string) => (
    <Card>
      <CardHeader><CardTitle><Settings size={18} color="#1F2B45" /> {title}</CardTitle></CardHeader>
      <CardBody>
        {children}
        <SaveBtn $saved={savedId === saveKey} onClick={() => save(saveKey)}><Check size={15}/>{savedId === saveKey ? "Salvo com sucesso!" : "Salvar"}</SaveBtn>
      </CardBody>
    </Card>
  );

  const tr = (label: string, desc: string, key: keyof typeof cfg) => (
    <ToggleRow key={key}>
      <div className="info"><h4>{label}</h4><p>{desc}</p></div>
      <Toggle $on={!!cfg[key]} onClick={() => toggle(key)} />
    </ToggleRow>
  );

  return (
    <div>
      <ContentHeader initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1>Configurações do Sistema</h1>
        <p>Controles globais, parâmetros e preferências da plataforma.</p>
      </ContentHeader>

      {section("Sistema & Acesso", <>
        {tr("Modo Manutenção", "Bloqueia acesso de alunos e professores ao site.", "maintenance")}
        {tr("Permitir Novos Cadastros", "Habilita o botão \"Criar Conta\" na tela inicial.", "allowRegistration")}
        {tr("Verificação de E-mail", "Usuários precisam confirmar e-mail antes de acessar.", "requireEmailVerification")}
        {tr("Alunos Podem Ver Notas", "Alunos visualizam suas próprias notas no painel.", "studentCanViewGrades")}
      </>, "system")}

      {section("Notificações", <>
        {tr("Notificações por E-mail", "Envio automático de atualizações e lembretes.", "emailNotif")}
        {tr("Notificações por SMS", "Alertas via SMS (requer integração com provedor).", "smsNotif")}
      </>, "notif")}

      {section("Parâmetros Gerais", <>
        <FormGrid>
          <FieldGroup>
            <FieldLabel>Nome da Plataforma</FieldLabel>
            <TextInput value={cfg.platform} onChange={e => set("platform", e.target.value)} />
          </FieldGroup>
          <FieldGroup>
            <FieldLabel>E-mail de Suporte</FieldLabel>
            <TextInput type="email" value={cfg.supportEmail} onChange={e => set("supportEmail", e.target.value)} />
          </FieldGroup>
          <FieldGroup>
            <FieldLabel>Máx. Alunos por Turma</FieldLabel>
            <TextInput type="number" value={cfg.maxStudents} onChange={e => set("maxStudents", e.target.value)} />
          </FieldGroup>
          <FieldGroup>
            <FieldLabel>Timeout de Sessão (min)</FieldLabel>
            <TextInput type="number" value={cfg.sessionTimeout} onChange={e => set("sessionTimeout", e.target.value)} />
          </FieldGroup>
          <FieldGroup>
            <FieldLabel>Nível Padrão ao Cadastrar</FieldLabel>
            <SelectInput value={cfg.defaultLevel} onChange={e => set("defaultLevel", e.target.value)}>
              {["Beginner","Elementary","Intermediate","Upper-Intermediate","Advanced"].map(o => <option key={o}>{o}</option>)}
            </SelectInput>
          </FieldGroup>
        </FormGrid>
      </>, "general")}
    </div>
  );
};

export default AdminSettings;
