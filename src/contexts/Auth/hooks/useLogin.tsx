import { useContext } from "react";
import { AuthContext } from "../AuthContext";

// Hook personalizado que fornece as funções de login e recuperação de senha do contexto de autenticação.
export default function useLogin() {
  const { login, forgotPassword } = useContext(AuthContext);

  return { login, forgotPassword };
}
