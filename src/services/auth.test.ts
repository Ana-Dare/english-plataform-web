import { beforeEach, describe, expect, it, vi } from "vitest";
import type { ILogin } from "../contexts/Auth/AuthContext";
import type { IResetPassword } from "../interfaces/auth";
import { api } from "./api";
import {
  postForgotPassword,
  postLogin,
  postResetPassword,
  updateUser,
  type UpdateUserParams,
} from "./auth";

// Substitui o cliente HTTP real por funções simuladas: nenhum teste acessa a API.
vi.mock("./api", () => ({
  api: {
    post: vi.fn(),
    patch: vi.fn(),
  },
}));

describe("serviços de autenticação", () => {
  beforeEach(() => {
    // Isola cada cenário removendo dados persistidos e chamadas simuladas anteriores.
    localStorage.clear();
    vi.clearAllMocks();
  });

  it("envia os dados de login e salva os dados da sessão", async () => {
    // Prepara as credenciais de entrada e a resposta de sucesso esperada do servidor.
    const credentials: ILogin = {
      email: "ana@example.com",
      password: "senha-segura",
    };
    const response = {
      accessToken: "access-token",
      refreshToken: "refresh-token",
      message: "Login realizado",
      user: {
        id: 1,
        name: "Ana",
        email: "ana@example.com",
        role: "student" as const,
      },
    };

    // Faz o cliente HTTP simulado responder como se o servidor tivesse aceitado o login.
    vi.mocked(api.post).mockResolvedValue({
      data: response,
    } as Awaited<ReturnType<typeof api.post>>);

    // Executa o serviço e verifica se a chamada foi feita para a rota correta.
    await expect(postLogin(credentials)).resolves.toEqual(response);
    expect(api.post).toHaveBeenCalledWith("/login", credentials);

    // O serviço deve persistir os tokens e o usuário retornados pelo servidor.
    expect(localStorage.getItem("@App:accessToken")).toBe("access-token");
    expect(localStorage.getItem("@App:refreshToken")).toBe("refresh-token");
    expect(localStorage.getItem("@App:user")).toBe(
      JSON.stringify(response.user),
    );
  });

  it("não salva a sessão se a resposta não contiver os dois tokens", async () => {
    // Simula uma resposta incompleta: falta o refresh token necessário para persistir a sessão.
    const response = {
      accessToken: "access-token",
      refreshToken: "",
      message: "Resposta sem refresh token",
      user: {
        id: 1,
        name: "Ana",
        email: "ana@example.com",
        role: "student" as const,
      },
    };
    vi.mocked(api.post).mockResolvedValue({
      data: response,
    } as Awaited<ReturnType<typeof api.post>>);

    // Mesmo recebendo um access token, a condição do serviço exige ambos para salvar.
    await postLogin({ email: "ana@example.com", password: "senha-segura" });

    expect(localStorage.getItem("@App:accessToken")).toBeNull();
    expect(localStorage.getItem("@App:refreshToken")).toBeNull();
    expect(localStorage.getItem("@App:user")).toBeNull();
  });

  it("envia token e nova senha para a rota de redefinição", async () => {
    // Prepara os campos exigidos pela operação de redefinição.
    const params: IResetPassword = {
      token: "reset-token",
      newPassword: "nova-senha",
    };
    vi.mocked(api.post).mockResolvedValue({
      data: "Senha redefinida",
    } as Awaited<ReturnType<typeof api.post>>);

    // Confirma o endereço, o corpo da requisição e o retorno repassado pelo serviço.
    await expect(postResetPassword(params)).resolves.toBe("Senha redefinida");
    expect(api.post).toHaveBeenCalledWith("/reset-password", params);
  });

  it("envia o email para a rota de recuperação de senha", async () => {
    // Configura a resposta que o endpoint de recuperação devolveria.
    vi.mocked(api.post).mockResolvedValue({
      data: "Email enviado",
    } as Awaited<ReturnType<typeof api.post>>);

    // O serviço transforma o email simples em um objeto no corpo da requisição.
    await expect(postForgotPassword("ana@example.com")).resolves.toBe(
      "Email enviado",
    );
    expect(api.post).toHaveBeenCalledWith("/forgot-password", {
      email: "ana@example.com",
    });
  });

  it("atualiza os dados do usuário na rota correspondente", async () => {
    // Define somente os campos que serão alterados e a resposta esperada da API.
    const params: UpdateUserParams = {
      name: "Ana Silva",
      email: "ana.silva@example.com",
    };
    const response = {
      id: 1,
      name: "Ana Silva",
      email: "ana.silva@example.com",
      role: "student" as const,
    };
    vi.mocked(api.patch).mockResolvedValue({
      data: response,
    } as Awaited<ReturnType<typeof api.patch>>);

    // Verifica que o identificador entra na URL e os campos alterados vão no corpo.
    await expect(updateUser(1, params)).resolves.toEqual(response);
    expect(api.patch).toHaveBeenCalledWith("/users/1", params);
  });
});
