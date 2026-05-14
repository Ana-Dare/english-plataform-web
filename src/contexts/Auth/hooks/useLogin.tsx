import { useContext } from "react";
import { AuthContext } from "../AuthContext";

export default function useLogin() {
  const { login, typeOfForm, setTypeOfForm, forgotPassword } =
    useContext(AuthContext);

  return { login, typeOfForm, setTypeOfForm, forgotPassword };
}
