import { useContext } from "react";
import { AuthContext } from "../AuthContext";

export default function useLogin() {
  const { login, forgotPassword } = useContext(AuthContext);

  return { login, forgotPassword };
}
