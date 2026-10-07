import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useNavigate } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import useLogin from "../../../contexts/Auth/hooks/useLogin";
import { mainTheme } from "../../../styles/theme";
import FormLogin from "./index";

// Substitui o hook de autenticação para o teste controlar o resultado do login.
vi.mock("../../../contexts/Auth/hooks/useLogin", () => ({
  default: vi.fn(),
}));

// Substitui a navegação real por uma função espiã, sem trocar de página no teste.
vi.mock("react-router-dom", async (importOriginal) => {
  const actual =
    await importOriginal<typeof import("react-router-dom")>();

  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

// Renderiza o formulário com o tema usado pela aplicação, necessário aos estilos.
function renderFormLogin() {
  return render(
    <ThemeProvider theme={mainTheme}>
      <FormLogin />
    </ThemeProvider>,
  );
}

describe("FormLogin", () => {
  const loginMock = vi.fn();
  const navigateMock = vi.fn();

  beforeEach(() => {
    // Cada cenário começa sem dados de sessão nem chamadas antigas nos mocks.
    localStorage.clear();
    vi.clearAllMocks();
    vi.mocked(useLogin).mockReturnValue({
      login: loginMock,
      forgotPassword: vi.fn(),
    });
    vi.mocked(useNavigate).mockReturnValue(navigateMock);
  });

  it("mostra erros quando email e senha estão vazios", () => {
    // Renderiza o formulário e tenta continuar sem preencher os campos.
    renderFormLogin();
    fireEvent.click(screen.getByRole("button", { name: "Confirmar" }));

    // A validação local deve informar os dois campos obrigatórios.
    expect(screen.getByText("Informe seu email")).toBeDefined();
    expect(screen.getByText("Informe sua senha")).toBeDefined();
    // Nenhuma tentativa de login deve ser feita com campos vazios.
    expect(loginMock).not.toHaveBeenCalled();
  });

  it("mostra erro quando o formato do email é inválido", () => {
    // Preenche email em formato incorreto e senha válida para isolar a validação do email.
    renderFormLogin();
    fireEvent.change(screen.getByPlaceholderText("Digite seu email"), {
      target: { value: "email-invalido" },
    });
    fireEvent.change(screen.getByPlaceholderText("Digite sua senha"), {
      target: { value: "senha-segura" },
    });

    // Um email malformado impede o envio das credenciais ao hook.
    fireEvent.click(screen.getByRole("button", { name: "Confirmar" }));

    // A mensagem deve aparecer e o login não pode ser chamado.
    expect(screen.getByText("Email inválido")).toBeDefined();
    expect(loginMock).not.toHaveBeenCalled();
  });

  it("envia as credenciais válidas e redireciona conforme o perfil", async () => {
    // Simula um login bem-sucedido como estudante; o formulário consulta o perfil salvo.
    localStorage.setItem("@App:userRole", "student");
    loginMock.mockResolvedValue(undefined);
    renderFormLogin();

    // Preenche ambos os campos com valores válidos e envia o formulário.
    fireEvent.change(screen.getByPlaceholderText("Digite seu email"), {
      target: { value: "ana@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Digite sua senha"), {
      target: { value: "senha-segura" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Confirmar" }));

    // Aguarda o login assíncrono terminar e verifica as credenciais e o destino.
    await waitFor(() => {
      expect(loginMock).toHaveBeenCalledOnce();
      expect(navigateMock).toHaveBeenCalledWith("/student-dashboard");
    });

    // Lê os argumentos da primeira chamada e confere cada credencial separadamente.
    const submittedCredentials = loginMock.mock.calls[0][0];
    expect(submittedCredentials.email).toBe("ana@example.com");
    expect(submittedCredentials.password).toBe("senha-segura");

    // Em caso de sucesso, os campos são limpos.
    expect(
      (screen.getByPlaceholderText("Digite seu email") as HTMLInputElement)
        .value,
    ).toBe("");
    expect(
      (screen.getByPlaceholderText("Digite sua senha") as HTMLInputElement)
        .value,
    ).toBe("");
  });

  it("leva à página de recuperação ao clicar no link", () => {
    // Renderiza o formulário antes de simular o clique no link.
    renderFormLogin();

    // O link usa a função de navegação para abrir a tela de recuperação.
    fireEvent.click(screen.getByText("Esqueceu sua senha?"));

    expect(navigateMock).toHaveBeenCalledWith("/forgot-password");
  });
});
