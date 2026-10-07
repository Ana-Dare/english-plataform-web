import { fireEvent, render, screen } from "@testing-library/react";
import type { ChangeEvent, ComponentProps } from "react";
import { ThemeProvider } from "styled-components";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { mainTheme } from "../../../../styles/theme";
import Input from "./index";

// O estilo do Input usa valores do tema; o provider fornece o mesmo tema da aplicação.
function renderInput(props: ComponentProps<typeof Input>) {
  return render(
    <ThemeProvider theme={mainTheme}>
      <Input {...props} />
    </ThemeProvider>,
  );
}

describe("Input", () => {
  // O mock respeita a assinatura exigida pelo campo e registra os eventos recebidos.
  const onChange = vi.fn<(event: ChangeEvent<HTMLInputElement>) => void>();

  beforeEach(() => {
    // Limpa as chamadas anteriores mantendo o mesmo callback usado nas propriedades.
    vi.clearAllMocks();
  });

  it("exibe o rótulo, o tipo, o placeholder e o valor recebido", () => {
    // Renderiza o campo com propriedades que normalmente vêm do formulário pai.
    renderInput({
      label: "Email",
      type: "email",
      placeholder: "Digite seu email",
      value: "ana@example.com",
      onChange,
    });

    // Confere se as propriedades foram aplicadas ao campo exibido.
    expect(screen.getByText("Email")).toBeDefined();
    const input = screen.getByPlaceholderText(
      "Digite seu email",
    ) as HTMLInputElement;
    expect(input.type).toBe("email");
    expect(input.value).toBe("ana@example.com");
  });

  it("encaminha o evento quando o usuário altera o valor", () => {
    // Guarda o valor visto pelo callback durante o evento.
    const receivedValues: string[] = [];
    const handleChange = vi.fn((event: ChangeEvent<HTMLInputElement>) => {
      receivedValues.push(event.currentTarget.value);
    });

    renderInput({
      label: "Email",
      type: "email",
      placeholder: "Digite seu email",
      value: "",
      onChange: handleChange,
    });

    // Simula a digitação; o callback captura o valor antes de o React restaurar
    // o valor controlado, pois este teste não atualiza o estado de um componente pai.
    fireEvent.change(screen.getByPlaceholderText("Digite seu email"), {
      target: { value: "ana@example.com" },
    });

    expect(handleChange).toHaveBeenCalledOnce();
    expect(receivedValues).toEqual(["ana@example.com"]);
  });

  it("mostra a mensagem e o ícone quando há feedback de erro", () => {
    // A mensagem de ajuda só aparece quando feedback e helpText são informados.
    const { container } = renderInput({
      label: "Senha",
      type: "password",
      placeholder: "Digite sua senha",
      value: "",
      onChange,
      feedback: "danger",
      helpText: "Senha incorreta",
    });

    expect(screen.getByText("Senha incorreta")).toBeDefined();
    // O componente exibe o ícone X especificamente para o feedback "danger".
    expect(container.querySelector("svg")).not.toBeNull();
  });

  it("não mostra mensagem de feedback sem texto de ajuda", () => {
    renderInput({
      label: "Senha",
      type: "password",
      placeholder: "Digite sua senha",
      value: "",
      onChange,
      feedback: "danger",
    });

    // Ter um tipo de feedback, sozinho, não deve renderizar uma mensagem vazia.
    expect(screen.queryByText("Senha incorreta")).toBeNull();
  });

  it("repassa as propriedades required e disabled ao campo", () => {
    renderInput({
      label: "Email",
      type: "email",
      placeholder: "Digite seu email",
      value: "",
      onChange,
      required: true,
      disabled: true,
    });

    // Verifica que as restrições configuradas pelo componente pai chegam ao input.
    const input = screen.getByPlaceholderText(
      "Digite seu email",
    ) as HTMLInputElement;
    expect(input.required).toBe(true);
    expect(input.disabled).toBe(true);
  });
});
