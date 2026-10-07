import { useContext } from "react";
import { AuthContext } from "../AuthContext";

// Hook personalizado que fornece a função de redefinição de senha do contexto de autenticação.
export default function useResetPassword() {
  const { resetPassword } = useContext(AuthContext);

  return resetPassword;
}
