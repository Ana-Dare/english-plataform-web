import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ForgotPasswordStyle } from "./style";
import FormForgotPassword from "../../components/Form/forgotPassword";
import Sidebar from "../../components/Sidebar";

const ForgotPassword = () => {
  const navigate = useNavigate();

  return (
    <ForgotPasswordStyle>
      <Sidebar
        title="Bem-vindo de volta"
        message="Redefina sua senha para continuar acessando a plataforma."
      />
      <ChevronLeft
        size={30}
        style={{
          position: "absolute",
          top: "1rem",
          right: "1rem",
          cursor: "pointer",
        }}
        onClick={() => navigate("/login")}
      />
      <FormForgotPassword />
    </ForgotPasswordStyle>
  );
};

export default ForgotPassword;
