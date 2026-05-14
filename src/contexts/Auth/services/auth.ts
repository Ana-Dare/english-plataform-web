import type { ILoginResponse, IResetPassword } from "../../../interfaces/auth";
import type { ILogin } from "../AuthContext";
import { api } from "./api";

export const postLogin = async (params: ILogin): Promise<ILoginResponse> => {
  const res = await api.post("/login", params);

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
