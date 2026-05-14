import { AuthContext, type ILogin } from "./AuthContext";
import type { IForgotPassword, IResetPassword } from "../../interfaces/auth";
import { useState } from "react";
import {
  postForgotPassword,
  postLogin,
  postResetPassword,
} from "./services/auth";

export interface AuthProviderProps {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const [typeOfForm, setTypeOfForm] = useState<"login" | "forgot-password">(
    "login",
  );

  const login = ({ email: user, password }: ILogin) => {
    postLogin({ email: user, password });
  };

  const forgotPassword = ({ email }: IForgotPassword) => {
    console.log(email);
    postForgotPassword(email);
  };

  const resetPassword = ({ password }: IResetPassword) => {
    postResetPassword({ password });
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        forgotPassword,
        resetPassword,
        typeOfForm,
        setTypeOfForm,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
