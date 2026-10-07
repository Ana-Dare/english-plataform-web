import { fireEvent, render, screen } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import { describe, expect, it, vi } from "vitest";
import { mainTheme } from "../../styles/theme";
import Button from "./index";

// Fornece ao botão o tema esperado pelo styled-components durante a renderização.
function renderButton(button: React.ReactNode) {
  return render(<ThemeProvider theme={mainTheme}>{button}</ThemeProvider>);
}

describe("Button", () => {
  it("renderiza o texto recebido como conteúdo", () => {
    // Monta o botão com o texto que o usuário deve ver.
    renderButton(<Button>Salvar</Button>);

    // Consulta o elemento pelo papel acessível e confirma que seu texto virou o nome.
    expect(screen.getByRole("button", { name: "Salvar" })).toBeDefined();
  });

  it("renderiza os ícones antes e depois do conteúdo", () => {
    // Usa rótulos acessíveis nos ícones para encontrá-los sem depender de como são desenhados.
    renderButton(
      <Button
        leftIcon={<span aria-label="ícone esquerdo">←</span>}
        rightIcon={<span aria-label="ícone direito">→</span>}
      >
        Continuar
      </Button>,
    );

    // Verifica os dois ícones e o conteúdo entre eles.
    expect(screen.getByLabelText("ícone esquerdo")).toBeDefined();
    expect(screen.getByRole("button", { name: /Continuar/ })).toBeDefined();
    expect(screen.getByLabelText("ícone direito")).toBeDefined();
  });

  it("executa onClick quando o botão é clicado", () => {
    // vi.fn cria um callback espião que registra se foi chamado.
    const onClick = vi.fn();
    renderButton(<Button onClick={onClick}>Confirmar</Button>);

    // fireEvent simula a interação do usuário no botão renderizado.
    fireEvent.click(screen.getByRole("button", { name: "Confirmar" }));

    // Verifica que o componente encaminhou o clique ao callback recebido.
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("não executa onClick quando o botão está desabilitado", () => {
    // Prepara o botão desativado e um callback para detectar um clique indevido.
    const onClick = vi.fn();
    renderButton(
      <Button disabled onClick={onClick}>
        Indisponível
      </Button>,
    );

    // O botão nativo deve refletir o estado disabled e ignorar o clique.
    const button = screen.getByRole("button", { name: "Indisponível" });
    expect((button as HTMLButtonElement).disabled).toBe(true);
    fireEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });
});
