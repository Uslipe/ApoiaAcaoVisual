import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Perfil from "../Perfil";
import axios from "axios";
import { toast } from "react-toastify";
import { describe, it, expect, beforeEach, vi } from "vitest";

// Mock axios and toast
vi.mock("axios");
vi.mock("react-toastify", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe("Componente do Perfil", () => {
  const mockNavigate = vi.fn();
  const mockGetItem = vi.spyOn(Storage.prototype, "getItem");
  const mockRemoveItem = vi.spyOn(Storage.prototype, "removeItem");

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
      <MemoryRouter>
        <Perfil />
      </MemoryRouter>,
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
      <MemoryRouter>
        <Perfil />
      </MemoryRouter>,
    );

    fireEvent.change(screen.getByLabelText("Nome"), {
      target: { value: "João Da Silva" },
    });
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "joaodasilva@exemplo.com" },
    });
    fireEvent.click(screen.getByText("Atualizar Perfil"));

    expect(axios.put).toHaveBeenCalledWith(
      "https://plataformaong-production.up.railway.app/editarPerfil/mockId",
      {
        nome: "João Da Silva",
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
      <MemoryRouter>
        <Perfil />
      </MemoryRouter>,
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
      <MemoryRouter>
        <Perfil />
      </MemoryRouter>,
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
        "https://plataformaong-production.up.railway.app/deletarUsuario/mockId",
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
