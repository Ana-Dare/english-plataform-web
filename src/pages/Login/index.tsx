import { LoginStyle } from "./style";
import Sidebar from "./Sidebar";
import FormForgotPassword from "./Form/forgotPassword";
import useLogin from "../../contexts/Auth/hooks/useLogin";
import FormLogin from "./Form/login";
import { ChevronLeft } from "lucide-react";

const Login = () => {
  const { typeOfForm, setTypeOfForm } = useLogin();
  return (
    <LoginStyle>
      <Sidebar />
      {typeOfForm === "forgot-password" && (
        <ChevronLeft
          size={30}
          style={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            cursor: "pointer",
          }}
          onClick={() => setTypeOfForm("login")}
        />
      )}

      {typeOfForm === "login" ? <FormLogin /> : <FormForgotPassword />}
    </LoginStyle>
  );
};

export default Login;
