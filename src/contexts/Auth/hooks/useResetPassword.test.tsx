import useResetPassword from "./useResetPassword";
import  AuthProvider  from "../AuthProvider";
import { renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <AuthProvider>{children}</AuthProvider>
);

describe("useResetPassword", () => {
  // beforeEach limpa o localStorage antes de cada 
  // teste para garantir um estado limpo.
  beforeEach(() => {
    localStorage.clear();
  });

  it("deve retornar a função de redefinição de senha", () => {
    // renderHook executa o hook com o wrapper;
    //  result.current contém o retorno dele.
    const { result } = renderHook(() => useResetPassword(), { wrapper });

    // Verifica se a função retornada é de fato uma função.
    expect(result.current).toBeInstanceOf(Function);
  });
});