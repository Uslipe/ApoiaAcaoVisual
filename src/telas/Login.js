import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./resources/login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate(); // Para redirecionamento

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/login", {
        email,
        senha,
      });

      if (response.status === 200) {
        const token = response.data; // O token vem na resposta
        localStorage.setItem("token", token); // Armazena no localStorage

        // Exibe uma notificação de sucesso
        toast.success("Login realizado com sucesso!", {
          position: "top-right",
          autoClose: 3000, // Fecha automaticamente em 3 segundos
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        setTimeout(() => {
          navigate("/"); // Redireciona após exibir a notificação
        }, 1000);
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      toast.error("Falha ao fazer login. Verifique os dados e tente novamente.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="login-page">
      <div className="main">
        <div className="login">
          <form onSubmit={handleLogin}>
            <label htmlFor="chk" aria-hidden="true">Login</label>
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
            <button type="submit">Entrar</button>
            <p className="toggle-text">
              Não tem uma conta? <Link to="/cadastro">Cadastre-se</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}