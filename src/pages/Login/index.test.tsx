import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Login from "./index";

// Substitui os componentes filhos para testar a composição da página sem
// depender da lógica interna do formulário, da navegação ou das animações.
vi.mock("../../components/Sidebar", () => ({
  default: ({
    title,
    message,
  }: {
    title: string;
    message: string;
  }) => (
    <aside>
      <h1>{title}</h1>
      <p>{message}</p>
    </aside>
  ),
}));

vi.mock("../../components/Form/login", () => ({
  default: () => <form aria-label="Formulário de login" />,
}));

describe("Página de login", () => {
  it("exibe a mensagem da lateral e o formulário de login", () => {
    // Renderiza a página; os componentes filhos são as versões simuladas acima.
    render(<Login />);

    // Confirma que a página enviou o título e a mensagem esperados para a lateral.
    expect(
      screen.getByRole("heading", {
        name: "Explore a plataforma de ensino feita para você",
      }),
    ).toBeDefined();

    // Confere também a mensagem descritiva passada para a lateral.
    expect(
      screen.getByText(
        "Acesse suas aulas personalizadas, acompanhe seu progresso, realize exercícios práticos e conquiste a fluência no idioma de forma moderna e organizada.",
      ),
    ).toBeDefined();

    // Confirma que o formulário também faz parte da composição da página.
    expect(
      screen.getByRole("form", { name: "Formulário de login" }),
    ).toBeDefined();
  });
});
