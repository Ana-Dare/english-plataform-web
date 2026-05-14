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
  password: string;
}

export interface IAuthContext {
  login: ({ email, password }: ILogin) => void;
  forgotPassword: ({ email }: IForgotPassword) => void;
  resetPassword: ({ token, password }: IResetPassword) => void;
  typeOfForm: "login" | "forgot-password";
  setTypeOfForm: React.Dispatch<
    React.SetStateAction<"login" | "forgot-password">
  >;
}
