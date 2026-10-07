import { createContext, useContext, type Dispatch } from "react";
import type { IForgotPassword, IResetPassword } from "../../interfaces/auth";

// Contexto de autenticação que fornece funções de login, 
// recuperação de senha e redefinição de senha, 
// além do estado de autenticação, perfil e dados do usuário.
export type UserRole = "student" | "teacher" | "admin";

export interface IUserData {
  id: number;
  name: string;
  email: string;
  role: UserRole;
}

export interface IAuthContext {
  login: ({ email, password }: ILogin) => void;
  forgotPassword: ({ email }: IForgotPassword) => void;
  resetPassword: ({ token, newPassword }: IResetPassword) => Promise<void>;
  isAuthenticated: boolean;
  setIsAuthenticated: Dispatch<boolean>;
  role: UserRole | null;
  setRole: Dispatch<UserRole | null>;
  user: IUserData | null;
  setUser: Dispatch<IUserData | null>;
}

export interface ILogin {
  email: string;
  password: string;
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export function useAuth() {
  return useContext(AuthContext);
}
