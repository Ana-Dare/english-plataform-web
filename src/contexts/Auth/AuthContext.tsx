import { createContext, useContext } from "react";
import type { IAuthContext } from "../../interfaces/auth";

export interface ILogin {
  email: string;
  password: string;
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export function useAuth() {
  return useContext(AuthContext);
}
