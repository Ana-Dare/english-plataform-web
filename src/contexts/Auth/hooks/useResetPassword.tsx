import { useContext } from "react";
import { AuthContext } from "../AuthContext";

export default function useResetPassword() {
  const { resetPassword } = useContext(AuthContext);

  return resetPassword;
}
