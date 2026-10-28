import {
  AuthContext,
  type ILogin,
  type UserRole,
  type IUserData,
} from "./AuthContext";
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

  const [role, setRole] = useState<UserRole | null>(() => {
    const storedRole = localStorage.getItem("@App:userRole");
    return storedRole as UserRole | null;
  });

  const [user, setUser] = useState<IUserData | null>(() => {
    const storedUser = localStorage.getItem("@App:user");
    if (!storedUser) return null;
    const parsed = JSON.parse(storedUser);
    return {
      ...parsed,
      avatarUrl: parsed.avatarUrl ?? parsed.avatar_url ?? null,
    };
  });

  const login = async ({ email: user, password }: ILogin) => {
    const data = await postLogin({ email: user, password });

    if (data.accessToken) {
      setIsAuthenticated(true);

      // Persistir role e dados do usuário no localStorage (vem de data.user)
      if (data.user && data.user.role) {
        setRole(data.user.role);
        localStorage.setItem("@App:userRole", data.user.role);

        const userData: IUserData = {
          id: data.user.id,
          name: data.user.name,
          email: data.user.email,
          role: data.user.role,
          avatarUrl: data.user.avatar_url ?? null,
        };

        setUser(userData);
        localStorage.setItem("@App:user", JSON.stringify(userData));
      }
    }
  };

  const forgotPassword = ({ email }: IForgotPassword) => {
    console.log(email);
    postForgotPassword(email);
  };

  const resetPassword = async ({
    newPassword: password,
    token,
  }: IResetPassword): Promise<void> => {
    await postResetPassword({ token, newPassword: password });
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        forgotPassword,
        resetPassword,

        isAuthenticated,
        setIsAuthenticated,
        role,
        setRole,
        user,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
