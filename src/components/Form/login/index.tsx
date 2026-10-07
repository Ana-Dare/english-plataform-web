import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useLogin from "../../../contexts/Auth/hooks/useLogin";
import { Container, FormHeader, FormWrapper } from "../style";
import Input from "../components/Input";
import Button from "../../Button";

// Tipagem para os erros de validação do formulário, 
// permitindo que cada campo tenha uma mensagem opcional.
type FieldErrors = {
  email?: string;
  password?: string;
};

// Expressão regular para validar o formato do email.
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Componente principal do formulário de login,
// gerenciando estado, validação e envio.
const FormLogin = () => {
  // Estados para armazenar email, senha,
  // visibilidade da senha, erros e status de envio.
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isVisiblePassword, setIsVisiblePassword] = useState<boolean>(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState<boolean>(false);

  // Hooks para login e navegação, permitindo autenticação e redirecionamento.
  const { login } = useLogin();
  const navigate = useNavigate();

  // Limpa os campos do formulário, útil após um login bem-sucedido.
  const clearForm = () => {
    setPassword("");
    setEmail("");
  };

  // Valida os campos do formulário, 
  // retornando erros específicos para cada campo.
  const validate = (): FieldErrors => {
    const next: FieldErrors = {};
    if (!email) {
      next.email = "Informe seu email";
    } else if (!EMAIL_REGEX.test(email)) {
      next.email = "Email inválido";
    }
    if (!password) {
      next.password = "Informe sua senha";
    }
    return next;
  };

  // Mapeia erros da API para mensagens de erro específicas do formulário,
  // permitindo feedback claro ao usuário.
  const mapApiError = (error: unknown): FieldErrors => {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      const data = error.response?.data as
        | { field?: "email" | "password"; message?: string }
        | undefined;
      const message = data?.message?.toLowerCase() ?? "";

      if (data?.field === "email") {
        return { email: data.message };
      }
      if (data?.field === "password") {
        return { password: data.message };
      }
      if (
        status === 404 ||
        message.includes("email") ||
        message.includes("user")
      ) {
        return { email: data?.message ?? "Email não encontrado" };
      }
      if (
        status === 401 ||
        message.includes("password") ||
        message.includes("senha")
      ) {
        return { password: data?.message ?? "Senha incorreta" };
      }
      return {
        password: data?.message ?? "Não foi possível entrar. Tente novamente.",
      };
    }
    return { password: "Não foi possível entrar. Tente novamente." };
  };

  // Função assíncrona para lidar com o envio do formulário,
  // incluindo validação, login e redirecionamento baseado no perfil do usuário.
  const handleSubmit = async (): Promise<void> => {
    const validationErrors = validate();
    // Se houver erros de validação, atualiza o estado de erros e interrompe o envio.
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Limpa erros anteriores e inicia o estado de envio.
    setErrors({});
    setSubmitting(true);
    try {
      await login({ email, password });
      clearForm();

      // Redirecionar baseado no role do usuário
      const userRole = localStorage.getItem("@App:userRole");
      if (userRole === "student") {
        navigate("/student-dashboard");
      } else if (userRole === "teacher") {
        navigate("/teacher-dashboard");
      } else if (userRole === "admin") {
        navigate("/admin-dashboard");
      } else {
        // Fallback caso role não seja reconhecido
        navigate("/teacher-dashboard");
      }
    } catch (error) {
      setErrors(mapApiError(error));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container>
      <FormWrapper>
        <FormHeader>
          <h2>Bem-vindo(a)</h2>
          <p>Acesse sua conta para continuar</p>
        </FormHeader>
        <Input
          label="Email"
          type="email"
          placeholder="Digite seu email"
          value={email}
          onChange={(e) => {
            setEmail(e.currentTarget.value);
            if (errors.email)
              setErrors((prev) => ({ ...prev, email: undefined }));
          }}
          iconLeft={<Mail size={18} color="#94a3b8" />}
          feedback={errors.email ? "danger" : undefined}
          helpText={errors.email}
        />
        <Input
          label="Senha"
          type={isVisiblePassword ? "text" : "password"}
          placeholder="Digite sua senha"
          value={password}
          onChange={(e) => {
            setPassword(e.currentTarget.value);
            if (errors.password)
              setErrors((prev) => ({ ...prev, password: undefined }));
          }}
          iconLeft={<Lock size={18} color="#94a3b8" />}
          iconRight={
            isVisiblePassword ? (
              <EyeOff
                size={18}
                color="#94a3b8"
                style={{ cursor: "pointer" }}
                onClick={() => setIsVisiblePassword((prev) => !prev)}
              />
            ) : (
              <Eye
                size={18}
                color="#94a3b8"
                style={{ cursor: "pointer" }}
                onClick={() => setIsVisiblePassword((prev) => !prev)}
              />
            )
          }
          feedback={errors.password ? "danger" : undefined}
          helpText={errors.password}
        />
        <p className="link" onClick={() => navigate("/forgot-password")}>
          Esqueceu sua senha?
        </p>
        <Button
          children={submitting ? "Entrando..." : "Confirmar"}
          wide
          onClick={handleSubmit}
          disabled={submitting}
          style={{
            background: "#111f37",
            borderColor: "#111f37",
            color: "#fff",
          }}
        />
      </FormWrapper>
    </Container>
  );
};

export default FormLogin;
