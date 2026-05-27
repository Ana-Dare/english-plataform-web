import { ConfirmationContainer, EmailConfirmationStyle } from "./style";
import confirm from "../../assets/icons/confirm.svg";

const EmailConfirmation = () => {
  return (
    <EmailConfirmationStyle>
      <ConfirmationContainer>
        <img src={confirm} alt="" />
        <h3>
          Tudo certo! Você receberá um link para redefinir sua senha em
          instantes, se o e-mail informado estiver correto.
        </h3>
        <span>Verifique sua caixa de entrada e span</span>
      </ConfirmationContainer>
    </EmailConfirmationStyle>
  );
};

export default EmailConfirmation;
