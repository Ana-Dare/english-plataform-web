import { LoginStyle } from "./style";
import Sidebar from "../../components/Sidebar";
import FormLogin from "../../components/Form/login";

const Login = () => {
  return (
    <LoginStyle>
      <Sidebar />
      <FormLogin />
    </LoginStyle>
  );
};

export default Login;
