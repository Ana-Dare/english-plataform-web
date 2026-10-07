import type { IResetPassword } from "../interfaces/auth";
import type { ILogin } from "../contexts/Auth/AuthContext";
import { api } from "./api";

// Define a interface para a resposta do login,
//  incluindo o token de acesso, token de atualização e dados do usuário.
interface IResponseLogin {
  accessToken: string;
  message: string;
  refreshToken: string;
  user: {
    id: number;
    name: string;
    email: string;
    role: "student" | "teacher" | "admin";
  };
}

// Função que realiza a requisição de login à API.
export const postLogin = async (params: ILogin): Promise<IResponseLogin> => {
  const res = await api.post("/login", params);
  const data = res.data as IResponseLogin;
  // Se a resposta contiver tokens, armazena-os no localStorage.
  if (data.accessToken && data.refreshToken) {
    localStorage.setItem("@App:accessToken", data.accessToken);
    localStorage.setItem("@App:refreshToken", data.refreshToken);
    localStorage.setItem("@App:user", JSON.stringify(data.user));
  }

  return res.data;
};

// Função que realiza a requisição de redefinição de senha à API.
export const postResetPassword = async (
  // Parâmetros esperados para a redefinição de senha.
  params: IResetPassword,
): Promise<string> => {
  const res = await api.post("/reset-password", params);

  return res.data;
};

// Função que realiza a requisição de recuperação de senha à API.
export const postForgotPassword = async (email: string): Promise<string> => {
  const res = await api.post("/forgot-password", { email });

  return res.data;
};

// Função que realiza a requisição de logout à API.
export interface UpdateUserParams {
  name?: string;
  email?: string;
  phone?: string;
  photo?: string;
}

// Função que realiza a requisição de atualização de dados do usuário à API.
export const updateUser = async (
  // Parâmetros esperados para a atualização de dados do usuário.
  userId: number,
  params: UpdateUserParams,
): Promise<{
  id: number;
  name: string;
  email: string;
  role: "student" | "teacher" | "admin";
}> => {
  const res = await api.patch(`/users/${userId}`, params);
  return res.data;
};
