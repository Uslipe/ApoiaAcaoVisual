import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Perfil from "../Perfil";
import axios from "axios";
import { toast } from "react-toastify";

// Mock axios and toast
jest.mock("axios");
jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe("Componente do Perfil", () => {
  const mockNavigate = jest.fn();
  const mockGetItem = jest.spyOn(Storage.prototype, "getItem");
  const mockRemoveItem = jest.spyOn(Storage.prototype, "removeItem");

  beforeEach(() => {
    mockNavigate.mockClear();
    mockGetItem.mockClear();
    mockRemoveItem.mockClear();
    axios.get.mockClear();
    axios.put.mockClear();
    axios.delete.mockClear();
  });

  it("Deve exibir os dados do usuario logado", () => {
    mockGetItem.mockReturnValueOnce("mockToken").mockReturnValueOnce("mockId");
    axios.get.mockResolvedValueOnce({
      data: { nome: "João Silva", email: "joaosilva@exemplo.com" },
    });

    render(
      <BrowserRouter>
        <Perfil />
      </BrowserRouter>,
    );

    expect(screen.getByText("Editar Perfil")).toBeInTheDocument();
    expect(screen.getByLabelText("Nome")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
  });

  it("Deve atualizar o perfil do usuario corretamente", async () => {
    mockGetItem.mockReturnValueOnce("mockToken").mockReturnValueOnce("mockId");
    axios.get.mockResolvedValueOnce({
      data: { nome: "João Silva", email: "joaosilva@exemplo.com" },
    });
    axios.put.mockResolvedValueOnce({ status: 200 });

    render(
      <BrowserRouter>
        <Perfil />
      </BrowserRouter>,
    );

    fireEvent.change(screen.getByLabelText("Nome"), {
      target: { value: "João Da Silva" },
    });
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "joaodasilva@exemplo.com" },
    });
    fireEvent.click(screen.getByText("Atualizar Perfil"));

    expect(axios.put).toHaveBeenCalledWith(
      "http://localhost:8080/editarPerfil/mockId",
      {
        nome: "João da Silva",
        email: "joaodasilva@exemplo.com",
        senha: undefined,
      },
      { headers: { Authorization: "Bearer mockToken" } },
    );
    expect(toast.success).toHaveBeenCalledWith(
      "Perfil atualizado com sucesso!",
      expect.any(Object),
    );
  });

  it("Deve exibir mensagem de erro, se as senhas não coincidem", () => {
    mockGetItem.mockReturnValueOnce("mockToken").mockReturnValueOnce("mockId");
    axios.get.mockResolvedValueOnce({
      data: { nome: "João Silva", email: "joaosilva@exemplo.com" },
    });

    render(
      <BrowserRouter>
        <Perfil />
      </BrowserRouter>,
    );

    fireEvent.change(screen.getByLabelText("Nova Senha"), {
      target: { value: "senha123" },
    });
    fireEvent.change(screen.getByLabelText("Confirmar Nova Senha"), {
      target: { value: "senha456" },
    });
    fireEvent.click(screen.getByText("Atualizar Perfil"));

    expect(toast.error).toHaveBeenCalledWith(
      "As senhas não coincidem!",
      expect.any(Object),
    );
  });

  it("Deve excluir a conta do usuario corretamente", async () => {
    mockGetItem.mockReturnValueOnce("mockToken").mockReturnValueOnce("mockId");
    axios.get.mockResolvedValueOnce({
      data: { nome: "João Silva", email: "joaosilva@exemplo.com" },
    });
    axios.delete.mockResolvedValueOnce({ status: 200 });

    render(
      <BrowserRouter>
        <Perfil />
      </BrowserRouter>,
    );

    fireEvent.change(
      screen.getByPlaceholderText("Digite sua senha para confirmar"),
      {
        target: { value: "senha123" },
      },
    );
    fireEvent.click(screen.getByText("Excluir Conta"));

    await waitFor(() => {
      expect(axios.delete).toHaveBeenCalledWith(
        "http://localhost:8080/deletarUsuario/mockId",
        { headers: { Authorization: "Bearer mockToken" } },
      );
    });

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith(
        "Conta excluída.",
        expect.any(Object),
      );
    });

    await waitFor(() => {
      expect(mockRemoveItem).toHaveBeenCalledWith("mockToken");
    });

    await waitFor(() => {
      expect(mockRemoveItem).toHaveBeenCalledWith("mockId");
    });

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/");
    });
  });
});
