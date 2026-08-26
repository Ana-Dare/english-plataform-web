import { createContext, useContext, type Dispatch } from "react";
import type { IForgotPassword, IResetPassword } from "../../interfaces/auth";

export interface IAuthContext {
  login: ({ email, password }: ILogin) => void;
  forgotPassword: ({ email }: IForgotPassword) => void;
  resetPassword: ({ token, password }: IResetPassword) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: Dispatch<boolean>;
}

export interface ILogin {
  email: string;
  password: string;
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export function useAuth() {
  return useContext(AuthContext);
}
