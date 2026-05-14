import { FormHeader, FormWrapper } from "../../Login/Form/style";
import Input from "../../../components/Form/Input";
import Button from "../../../components/Button";
import { useState } from "react";
import { Lock } from "lucide-react";
import useResetPassword from "../../../contexts/Auth/hooks/useResetPassword";
import { useNavigate, useSearchParams } from "react-router-dom";

const FormResetPassword = () => {
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const resetPassword = useResetPassword();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const token = searchParams.get("token");

  const clearForm = () => {
    setPassword("");
    setConfirmPassword("");
  };

  const handleSubmit = () => {
    if (!password || !confirmPassword) {
      console.log("Preencha todos os campos");
    }
    if (password !== confirmPassword) {
      console.log("Senhas não coincidem");
    }
    try {
      resetPassword({ token, password });
      clearForm();
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <FormWrapper>
      <FormHeader>
        <h2>Redinir senha</h2>
      </FormHeader>
      <Input
        label="Nova senha"
        onChange={(e) => setPassword(e.currentTarget.value)}
        placeholder="Digite sua nova senha"
        type="password"
        iconLeft={<Lock size={18} color="#fff" />}
      />
      <Input
        label="Confirmar nova senha"
        onChange={(e) => setConfirmPassword(e.currentTarget.value)}
        placeholder="Confirme sua nova senha"
        type="password"
        iconLeft={<Lock size={18} color="#fff" />}
      />
      <Button
        children="Redefinir"
        $variant="secondary"
        wide
        onClick={handleSubmit}
      />
    </FormWrapper>
  );
};

export default FormResetPassword;
