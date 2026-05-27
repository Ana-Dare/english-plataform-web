import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useLogin from "../../../contexts/Auth/hooks/useLogin";
import { Container, FormHeader, FormWrapper } from "../style";
import Input from "../components/Input";
import Button from "../../Button";

const FormLogin = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isVisiblePassword, setIsVisiblePassword] = useState<boolean>(false);
  const { login } = useLogin();
  const navigate = useNavigate();

  const clearForm = () => {
    setPassword("");
    setEmail("");
  };

  const handleSubmit = (): void => {
    if (!email || !password) {
      console.log("Preencha todos os campos");
    }
    try {
      login({ email, password });
      clearForm();
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
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
          onChange={(e) => setEmail(e.currentTarget.value)}
          iconLeft={<Mail size={18} color="#fff" />}
        />
        <Input
          label="Senha"
          type={isVisiblePassword ? "text" : "password"}
          placeholder="Digite sua senha"
          onChange={(e) => setPassword(e.currentTarget.value)}
          iconLeft={<Lock size={18} color="#fff" />}
          iconRight={
            isVisiblePassword ? (
              <Eye
                size={18}
                color="#fff"
                onClick={() => setIsVisiblePassword((prev) => !prev)}
              />
            ) : (
              <EyeOff
                size={18}
                color="#fff"
                onClick={() => setIsVisiblePassword((prev) => !prev)}
              />
            )
          }
        />
        <p className="link" onClick={() => navigate("/forgot-password")}>
          Esqueceu sua senha?
        </p>
        <Button
          children="Confirmar"
          wide
          $variant="secondary"
          onClick={handleSubmit}
        />
      </FormWrapper>
    </Container>
  );
};

export default FormLogin;
