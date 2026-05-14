import { useState } from "react";
import { Container, FormHeader, FormWrapper } from "../style";
import Input from "../../../../components/Form/Input";
import Button from "../../../../components/Button";
import { Mail } from "lucide-react";
import useLogin from "../../../../contexts/Auth/hooks/useLogin";

const FormForgotPassword = () => {
  const [email, setEmail] = useState<string>("");
  const { forgotPassword } = useLogin();

  const handleSubmit = () => {
    if (!email) console.log("Preencha o email");
    try {
      forgotPassword({ email });
      alert("Código enviado com sucesso!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <FormWrapper>
        <FormHeader>
          <h2>Receber código para redefinir senha</h2>
          <p>
            Digite o seu e-mail no campo abaixo e enviaremos um link para você
            redefinir sua senha.
          </p>
        </FormHeader>
        <Input
          label="E-mail"
          onChange={(e) => setEmail(e.currentTarget.value)}
          placeholder="Digite seu e-mail"
          type="email"
          iconLeft={<Mail size={18} color="#fff" />}
        />
        <Button
          children="Enviar código"
          $variant="secondary"
          wide
          onClick={handleSubmit}
          type="button"
        />
      </FormWrapper>
    </Container>
  );
};

export default FormForgotPassword;
