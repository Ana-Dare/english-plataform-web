import FormResetPassword from "../../components/Form/resetPassword";
import Sidebar from "../../components/Sidebar";
import { FormWrapper, ResetPasswordStyle } from "./style";

const ResetPassword = () => {
  return (
    <ResetPasswordStyle>
      <Sidebar
        title="Continue aprimorando seu inglês"
        message="Cria uma nova senha, e tenha acesso a todos os recursos da plataforma"
      />
      <FormWrapper>
        <FormResetPassword title="Redefina sua senha" />
      </FormWrapper>
    </ResetPasswordStyle>
  );
};

export default ResetPassword;
