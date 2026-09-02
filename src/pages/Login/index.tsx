import { LoginStyle } from "./style";
import Sidebar from "../../components/Sidebar";
import FormLogin from "../../components/Form/login";

const Login = () => {
  return (
    <LoginStyle>
      <Sidebar
        title="Explore a plataforma de ensino feita para você"
        message="Acesse suas aulas personalizadas, acompanhe seu progresso, realize exercícios práticos e conquiste a fluência no idioma de forma moderna e organizada."
      />
      <FormLogin />
    </LoginStyle>
  );
};

export default Login;
