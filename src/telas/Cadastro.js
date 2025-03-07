import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './resources/signup.css';
import logo from './images/logo_doar.png';

export default function Cadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const handleCadastro = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/salvarUsuario", {
        nome,
        email,
        senha,
        tipoDeUsuario: { idTipoDeUsuario: 1 } // Definindo o tipo de usuário como DOADOR (1)
      });

      if (response.status === 201) {
        toast.success("Cadastro realizado com sucesso!", {
          position: "top-right",
          autoClose: 3000, // Fecha automaticamente em 3 segundos
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
        });

        setTimeout(() => {
          navigate("/login"); // Redireciona para a tela de login após exibir a notificação
        }, 1000);
      }
    } catch (error) {
      console.error("Erro ao fazer cadastro:", error);
      toast.error("Falha ao fazer cadastro. Verifique os dados e tente novamente.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        pauseOnHover: false,
      });
    }
  };

  return (
    <div className="login-page">
      <div className="main">
        <div className="signup">
          <img src={logo} alt="Logo" width="180" heigh="180" className="signup-logo" />
          <form onSubmit={handleCadastro}>
            <label htmlFor="chk" aria-hidden="true">Cadastre-se</label>
            <input
              type="text"
              name="txt"
              placeholder="Nome"
              required
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              name="pswd"
              placeholder="Senha"
              required
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
            <button type="submit">Cadastrar</button>
            <p className="toggle-text">
              Já tem uma conta? <Link to="/login">Faça login</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}