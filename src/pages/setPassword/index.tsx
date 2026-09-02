import FormResetPassword from "../../components/Form/resetPassword";
import Sidebar from "../../components/Sidebar";
import { SetPasswordStyle, FormWrapper } from "./style";

const Setpassword = () => {
  return (
    <SetPasswordStyle>
      <Sidebar
        title="Dê o próximo passo rumo à fluência "
        message="Cria sua senha, e tenha acesso a todos os recursos da plataforma"
      />
      <FormWrapper>
        <FormResetPassword title="Defina sua senha" />
      </FormWrapper>
    </SetPasswordStyle>
  );
};

export default Setpassword;
