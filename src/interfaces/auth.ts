export interface ILogin {
  email: string;
  password: string;
}

export interface ILoginResponse {
  id: string;
  nome: string;
  email: string;
  //token: string;
}

export interface IForgotPassword {
  email: string;
}

export interface IResetPassword {
  token: string | null;
  newPassword: string;
}
