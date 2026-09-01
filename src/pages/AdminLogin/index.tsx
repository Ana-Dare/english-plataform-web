import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Lock,
  ShieldAlert,
  ArrowRight,
  Mail,
  Shield,
  Users,
  BarChart2,
  ArrowLeft,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Container,
  LeftPanel,
  BrandLogo,
  LeftContent,
  LeftTitle,
  LeftSubtitle,
  Badges,
  Badge,
  RightPanel,
  FormWrapper,
  FormHeader,
  FormTitle,
  FormSubtitle,
  FieldGroup,
  Label,
  InputWrapper,
  StyledInput,
  InputIcon,
  ErrorMsg,
  LoginBtn,
  BackLink,
} from "./style";
import useToast from "../../contexts/Toast/useToast";

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const { addToast } = useToast();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && password.trim()) {
      setError(false);
      addToast("Acesso administrativo liberado!", "success");
      setTimeout(() => navigate("/admin"), 400);
    } else {
      setError(true);
    }
  };

  return (
    <Container>
      {/* ─── Painel Esquerdo ─── */}
      <LeftPanel>
        <BrandLogo>
          <Shield size={28} color="#C57A67" />
          <span>
            Aulas &amp; <em>Admin</em>
          </span>
        </BrandLogo>

        <LeftContent
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <LeftTitle>
            Área de
            <br />
            <span>Administração</span>
          </LeftTitle>
          <LeftSubtitle>
            Acesso restrito à equipe autorizada. Gerencie usuários,
            configurações e dados da plataforma com segurança e controle total.
          </LeftSubtitle>

          <Badges>
            <Badge>
              <Users size={13} /> Gestão de Usuários
            </Badge>
            <Badge>
              <BarChart2 size={13} /> Relatórios
            </Badge>
            <Badge>
              <Shield size={13} /> Segurança LGPD
            </Badge>
          </Badges>
        </LeftContent>
      </LeftPanel>

      {/* ─── Painel Direito (Form) ─── */}
      <RightPanel>
        <FormWrapper
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <FormHeader>
            <FormTitle>Entrar no Painel</FormTitle>
            <FormSubtitle>Use suas credenciais de administrador.</FormSubtitle>
          </FormHeader>

          <form onSubmit={handleLogin}>
            {/* Email */}
            <FieldGroup>
              <Label htmlFor="admin-email">E-mail</Label>
              <InputWrapper>
                <StyledInput
                  id="admin-email"
                  type="email"
                  placeholder="admin@admin.com"
                  value={email}
                  autoFocus
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError(false);
                  }}
                />
                <InputIcon>
                  <Mail size={18} />
                </InputIcon>
              </InputWrapper>
            </FieldGroup>

            {/* Senha */}
            <FieldGroup>
              <Label htmlFor="admin-password">Senha</Label>
              <InputWrapper>
                <StyledInput
                  id="admin-password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError(false);
                  }}
                />
                <InputIcon>
                  <Lock size={18} />
                </InputIcon>
              </InputWrapper>
            </FieldGroup>

            {/* Erro */}
            <AnimatePresence>
              {error && (
                <ErrorMsg
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                >
                  <ShieldAlert size={16} />
                  E-mail ou senha incorretos.
                </ErrorMsg>
              )}
            </AnimatePresence>

            <LoginBtn
              as={motion.button}
              type="submit"
              disabled={!email || !password}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
            >
              Acessar Painel <ArrowRight size={18} />
            </LoginBtn>

            <BackLink
              type="button"
              onClick={() => navigate("/teacher-dashboard")}
            >
              <ArrowLeft
                size={14}
                style={{
                  display: "inline",
                  marginRight: "4px",
                  verticalAlign: "middle",
                }}
              />
              Voltar para o Painel do Professor
            </BackLink>
          </form>
        </FormWrapper>
      </RightPanel>
    </Container>
  );
};

export default AdminLogin;
