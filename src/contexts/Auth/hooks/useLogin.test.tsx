import { renderHook } from "@testing-library/react";
import useLogin from "./useLogin";
import { beforeEach, describe, expect, it } from "vitest";
import AuthProvider from "../AuthProvider";

// useLogin lê o AuthContext; o wrapper fornece esse contexto ao hook durante o teste.
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <AuthProvider>{children}</AuthProvider>
);

// describe agrupa os testes que verificam o comportamento do hook useLogin.
describe("useLogin", () => {
  // beforeEach roda antes de cada teste para começar sem sessão salva no navegador.
  beforeEach(() => {
    localStorage.clear();
  });

  // Confirma que o hook disponibiliza as ações de login e recuperação de senha.
  it("deve retornar as funções de login e recuperação de senha", () => {
    // renderHook executa o hook com o wrapper; result.current contém o retorno dele.
    const { result } = renderHook(() => useLogin(), { wrapper });

    // expect verifica que as duas ações retornadas são funções.
    expect(result.current.login).toBeTypeOf("function");
    expect(result.current.forgotPassword).toBeTypeOf("function");
  });
});
