import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import AuthProvider from "./AuthProvider";

import { useAuth } from "./AuthContext";
import {
  postForgotPassword,
  postLogin,
  postResetPassword,
} from "../../services/auth";

vi.mock("../../services/auth", () => ({
  // Substitui as chamadas reais à API por funções falsas controladas pelo teste.
  postForgotPassword: vi.fn(),
  postLogin: vi.fn(),
  postResetPassword: vi.fn(),
}));

// Componente auxiliar que lê o contexto e oferece botões para exercitar suas ações.
function AuthConsumer() {
  const {
    forgotPassword,
    isAuthenticated,
    login,
    resetPassword,
    role,
    user,
  } = useAuth();

  return (
    <div>
      <p>Autenticado: {String(isAuthenticated)}</p>
      <p>Perfil: {role ?? "nenhum"}</p>
      <p>Usuário: {user?.email ?? "nenhum"}</p>
      <button
        onClick={() => void login({ email: "ana@example.com", password: "senha" })}
      >
        Entrar
      </button>
      <button onClick={() => forgotPassword({ email: "ana@example.com" })}>
        Esqueci a senha
      </button>
      <button
        onClick={() =>
          void resetPassword({ token: "token-reset", newPassword: "nova-senha" })
        }
      >
        Redefinir senha
      </button>
    </div>
  );
}

// Renderiza o provider junto com o consumidor, para testar o contexto pela interface.
function renderAuthProvider() {
  return render(
    <AuthProvider>
      <AuthConsumer />
    </AuthProvider>,
  );
}

describe("AuthProvider", () => {
  beforeEach(() => {
    // Garante que cada teste comece sem dados persistidos nem chamadas anteriores.
    localStorage.clear();
    vi.clearAllMocks();
  });

  it("começa desautenticado quando não há sessão salva", () => {
    // Sem token, perfil ou usuário no localStorage, o estado inicial deve estar vazio.
    renderAuthProvider();

    // getByText falha se o texto não existir; toBeDefined confirma que foi encontrado.
    expect(screen.getByText("Autenticado: false")).toBeDefined();
    expect(screen.getByText("Perfil: nenhum")).toBeDefined();
    expect(screen.getByText("Usuário: nenhum")).toBeDefined();
  });

  it("restaura a sessão do localStorage", () => {
    // Simula os dados que uma sessão anterior deixou salvos no navegador.
    const user = {
      id: 1,
      name: "Ana",
      email: "ana@example.com",
      role: "student",
    };
    localStorage.setItem("@App:accessToken", "token-salvo");
    localStorage.setItem("@App:userRole", user.role);
    localStorage.setItem("@App:user", JSON.stringify(user));

    renderAuthProvider();

    // O provider deve inicializar seu estado a partir desses dados persistidos.
    expect(screen.getByText("Autenticado: true")).toBeDefined();
    expect(screen.getByText("Perfil: student")).toBeDefined();
    expect(screen.getByText("Usuário: ana@example.com")).toBeDefined();
  });

  it("autentica e salva o usuário após um login bem-sucedido", async () => {
    // Configura a resposta fictícia da API para representar um login bem-sucedido.
    vi.mocked(postLogin).mockResolvedValue({
      accessToken: "token-novo",
      refreshToken: "refresh-token",
      message: "Login realizado",
      user: {
        id: 1,
        name: "Ana",
        email: "ana@example.com",
        role: "student",
      },
    });
    renderAuthProvider();

    // Simula a ação do usuário; o handler chama login no contexto.
    fireEvent.click(screen.getByRole("button", { name: "Entrar" }));

    // findByText espera a atualização assíncrona do estado após a resposta do login.
    expect(await screen.findByText("Autenticado: true")).toBeDefined();
    expect(screen.getByText("Perfil: student")).toBeDefined();
    expect(screen.getByText("Usuário: ana@example.com")).toBeDefined();
    expect(postLogin).toHaveBeenCalledWith({
      email: "ana@example.com",
      password: "senha",
    });
    expect(localStorage.getItem("@App:userRole")).toBe("student");
    expect(localStorage.getItem("@App:user")).toBe(
      JSON.stringify({
        id: 1,
        name: "Ana",
        email: "ana@example.com",
        role: "student",
      }),
    );
  });

  it("chama o serviço de recuperação de senha com o email", () => {
    // Verifica que a ação de recuperação encaminha o email informado ao serviço.
    renderAuthProvider();

    // Aciona a ação de recuperação exposta pelo contexto.
    fireEvent.click(screen.getByRole("button", { name: "Esqueci a senha" }));

    // Confirma que o email chegou ao serviço de recuperação.
    expect(postForgotPassword).toHaveBeenCalledWith("ana@example.com");
  });

  it("chama o serviço de redefinição de senha com o token e a nova senha", async () => {
    // Define uma resposta simulada; a função do provider aguarda esse serviço.
    vi.mocked(postResetPassword).mockResolvedValue("Senha redefinida");
    renderAuthProvider();

    // Clica no botão para executar resetPassword com os dados exibidos no consumidor.
    fireEvent.click(screen.getByRole("button", { name: "Redefinir senha" }));

    // waitFor repete a verificação até o serviço ser chamado ou o tempo limite expirar.
    await waitFor(() => {
      // Compara os dados encaminhados com o token e a nova senha simulados no consumidor.
      expect(postResetPassword).toHaveBeenCalledWith({
        token: "token-reset",
        newPassword: "nova-senha",
      });
    });
  });
});
