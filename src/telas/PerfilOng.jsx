import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../layout/Navbar";
import "./resources/perfil.css";

export default function PerfilOng() {
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [endereco, setEndereco] = useState("");
  const [contaBancaria, setContaBancaria] = useState("");
  const [chavePix, setChavePix] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id");

    if (!token || !id) {
      navigate("/loginOng");
      return;
    }

    // Buscar os dados da ONG
    axios
      .get(`https://plataformaong-production.up.railway.app/buscarONG/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const { nome, endereco, contaBancaria, chavePix } = response.data;
        setNome(nome);
        setEndereco(endereco);
        setContaBancaria(contaBancaria);
        setChavePix(chavePix);
      })
      .catch((error) => {
        console.error("Erro ao buscar dados da ONG:", error);
        navigate("/loginOng");
      });
  }, [navigate]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id");

    if (senha !== confirmarSenha) {
      toast.error("As senhas não coincidem.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
      });
      return;
    }

    try {
      const response = await axios.put(
        `https://plataformaong-production.up.railway.app/atualizarONG/${id}`,
        {
          nome,
          endereco,
          contaBancaria,
          chavePix,
          senha: senha || undefined, // Enviar a senha apenas se estiver preenchida
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.status === 200) {
        toast.success("Perfil da ONG atualizado com sucesso!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
        });
      }
    } catch (error) {
      console.error("Erro ao atualizar perfil da ONG:", error);
      toast.error("Falha ao atualizar perfil. Tente novamente.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
      });
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-4 perfil-container">
        <h2>Editar Perfil ONG</h2>
        <form onSubmit={handleUpdate}>
          <div className="form-group">
            <label htmlFor="nome">Nome</label>
            <input
              type="text"
              className="form-control"
              id="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="endereco">Endereço</label>
            <input
              type="text"
              className="form-control"
              id="endereco"
              value={endereco}
              onChange={(e) => setEndereco(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="contaBancaria">Conta Bancária</label>
            <input
              type="text"
              className="form-control"
              id="contaBancaria"
              value={contaBancaria}
              onChange={(e) => setContaBancaria(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="chavePix">Chave Pix</label>
            <input
              type="text"
              className="form-control"
              id="chavePix"
              value={chavePix}
              onChange={(e) => setChavePix(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="senha">Nova Senha</label>
            <input
              type="password"
              className="form-control"
              id="senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmarSenha">Confirmar Nova Senha</label>
            <input
              type="password"
              className="form-control"
              id="confirmarSenha"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary mt-3">
            Atualizar Perfil
          </button>
        </form>
      </div>
    </div>
  );
}
