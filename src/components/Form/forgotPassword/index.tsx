import { useState } from "react";
import { Mail } from "lucide-react";
import useLogin from "../../../contexts/Auth/hooks/useLogin";
import { Container, FormHeader, FormWrapper } from "../style";
import Input from "../components/Input";
import Button from "../../Button";
import { useNavigate } from "react-router-dom";

const FormForgotPassword = () => {
  const [email, setEmail] = useState<string>("");
  const [feedbackStatus, setFeedbackStatus] = useState<"danger" | undefined>(
    undefined,
  );
  const { forgotPassword } = useLogin();
  const navigate = useNavigate();

  const handleSubmit = () => {
    setFeedbackStatus(undefined);
    try {
      if (email.trim() === "") {
        console.log("Preencha o email");
        setFeedbackStatus("danger");
        return;
      }
      forgotPassword({ email });
      navigate("/confirmation-email");
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
          onChange={(e) => {
            setEmail(e.currentTarget.value);
            if (feedbackStatus) setFeedbackStatus(undefined);
          }}
          placeholder="Digite seu e-mail"
          type="email"
          iconLeft={<Mail size={18} color="#fff" />}
          feedback={feedbackStatus}
          helpText="Preencha o campo com seu email"
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
