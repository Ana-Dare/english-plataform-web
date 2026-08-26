import { AuthContext, type ILogin } from "./AuthContext";
import type { IForgotPassword, IResetPassword } from "../../interfaces/auth";
import { useState } from "react";
import {
  postForgotPassword,
  postLogin,
  postResetPassword,
} from "../../services/auth";

export interface AuthProviderProps {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() =>
    Boolean(localStorage.getItem("@App:accessToken")),
  );

  const login = async ({ email: user, password }: ILogin) => {
    const data = await postLogin({ email: user, password });

    if (data.accessToken) {
      setIsAuthenticated(true);
    }

    //verificar role
    //persistir isAuthenticated
  };

  const forgotPassword = ({ email }: IForgotPassword) => {
    console.log(email);
    postForgotPassword(email);
  };

  const resetPassword = ({ password, token }: IResetPassword) => {
    postResetPassword({ token, password });
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        forgotPassword,
        resetPassword,

        isAuthenticated,
        setIsAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
