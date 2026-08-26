import type { IResetPassword } from "../interfaces/auth";
import type { ILogin } from "../contexts/Auth/AuthContext";
import { api } from "./api";

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

export const postLogin = async (params: ILogin): Promise<IResponseLogin> => {
  const res = await api.post("/login", params);
  const data = res.data as IResponseLogin;

  if (data.accessToken && data.refreshToken) {
    localStorage.setItem("@App:accessToken", data.accessToken);
    localStorage.setItem("@App:refreshToken", data.refreshToken);
    localStorage.setItem("@App:user", JSON.stringify(data.user));
  }

  return res.data;
};

export const postResetPassword = async (
  params: IResetPassword,
): Promise<string> => {
  const res = await api.post("/reset-password", params);

  return res.data;
};

export const postForgotPassword = async (email: string): Promise<string> => {
  const res = await api.post("/forgot-password", { email });

  return res.data;
};
