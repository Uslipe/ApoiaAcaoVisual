import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import Navbar from "../layout/Navbar";
import "./resources/perfil.css";

export default function Perfil() {
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarNovaSenha, setConfirmarNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("idUsuario");

    if (!token || !id) {
      navigate("/login");
      return;
    }

    // Buscar os dados do usuário
    axios
      .get(`http://localhost:8080/buscarUsuario/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const { nome, email } = response.data;
        setNome(nome);
        setEmail(email);
      })
      .catch((error) => {
        console.error("Erro ao buscar dados do usuário:", error);
        navigate("/login");
      });
  }, [navigate]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("idUsuario");

    // Verifica se as senhas coincidem
    if (senha && senha !== confirmarNovaSenha) {
      toast.error("As senhas não coincidem!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
      });
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:8080/editarPerfil/${id}`,
        {
          nome,
          email,
          senha: senha || undefined,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.status === 200) {
        toast.success("Perfil atualizado com sucesso!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
        });
        setSenha("");
        setConfirmarNovaSenha("");
      }
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
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

  const handleDeleteAccount = async () => {
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("idUsuario");

    if (!confirmarSenha) {
      toast.error("Digite sua senha para confirmar a exclusão.", {
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
      await axios.delete(`http://localhost:8080/deletarUsuario/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Conta excluída.", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
      });

      localStorage.removeItem("token");
      localStorage.removeItem("idUsuario");
      navigate("/");
    } catch (error) {
      console.error("Erro ao excluir perfil:", error);
      toast.error("Falha ao excluir conta. Verifique sua senha.", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
      });
    }
  };

  const confirmDeleteAccount = () => {
    confirmAlert({
      title: "Confirmação de Exclusão",
      message:
        "Você tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.",
      buttons: [
        {
          label: "Sim",
          onClick: handleDeleteAccount,
        },
        {
          label: "Não",
          onClick: () => {},
        },
      ],
    });
  };

  const handleHistoricoDoacoesDoador = () => {
    navigate("/historicoDoacoesDoador");
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-4 perfil-container">
        <h2>Editar Perfil</h2>
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
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            <label htmlFor="confirmarNovaSenha">Confirmar Nova Senha</label>
            <input
              type="password"
              className="form-control"
              id="confirmarNovaSenha"
              value={confirmarNovaSenha}
              onChange={(e) => setConfirmarNovaSenha(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary mt-3">
            Atualizar Perfil
          </button>
        </form>

        <div className="separador mt-4 mb-4 d-flex align-items-center">
          <div className="flex-grow-1 border-bottom"></div>
          <span className="mx-3 text">
            <strong>OU</strong>
          </span>
          <div className="flex-grow-1 border-bottom"></div>
        </div>

        <div className="zona-de-perigo mt-1">
          <h4 className="text-danger">Zona de perigo!</h4>
          <p className="text-muted">A ação abaixo não pode ser desfeita.</p>
          <input
            type="password"
            className="form-control mt-2"
            placeholder="Digite sua senha para confirmar"
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
          />
          <button
            className="btn btn-danger mt-3"
            onClick={confirmDeleteAccount}
          >
            Excluir Conta
          </button>
        </div>
        <h2>Gerenciamento de Perfil</h2>
        {/* Adicione aqui os campos e funcionalidades para gerenciar o perfil do usuário */}
        <button className="btn btn-primary mt-4" onClick={handleHistoricoDoacoesDoador}>
          Ver Histórico de Doações
        </button>
        <button className="btn btn-danger mt-4" onClick={handleLogout}>
          Sair
        </button>
      </div>
    </div>
  );
}
