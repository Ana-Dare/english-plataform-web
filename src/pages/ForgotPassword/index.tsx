import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ForgotPasswordStyle } from "./style";
import FormForgotPassword from "../../components/Form/forgotPassword";
import Sidebar from "../../components/Sidebar";

const ForgotPassword = () => {
  const navigate = useNavigate();

  return (
    <ForgotPasswordStyle>
      <Sidebar />
      <ChevronLeft
        size={30}
        style={{
          position: "absolute",
          top: "1rem",
          right: "1rem",
          cursor: "pointer",
        }}
        onClick={() => navigate("/")}
      />
      <FormForgotPassword />
    </ForgotPasswordStyle>
  );
};

export default ForgotPassword;
