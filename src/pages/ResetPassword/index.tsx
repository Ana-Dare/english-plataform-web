import FormResetPassword from "../../components/Form/resetPassword";
import Sidebar from "../../components/Sidebar";
import { ResetPasswordStyle } from "./style";

const ResetPassword = () => {
  return (
    <ResetPasswordStyle>
      <Sidebar />
      <FormResetPassword />
    </ResetPasswordStyle>
  );
};

export default ResetPassword;
