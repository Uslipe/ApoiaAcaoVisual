import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./resources/login.css";
import logo from "./images/logo_doar.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate(); // Para redirecionamento
  const location = useLocation();

  useEffect(() => {
    // eslint-disable-next-line no-unused-vars
    const handlePopState = (event) => {
      if (location.pathname === "/login") {
        navigate("/");
      }
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [location, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://plataformaong-production.up.railway.app/login", {
        email,
        senha,
      });

      if (response.status === 200) {
        const { token, id } = response.data; // O token e o id do usuário vem na resposta
        localStorage.setItem("token", token); // Armazena no localStorage
        localStorage.setItem("idUsuario", id); // Armazena o ID do usuário

        // Chamar o endpoint de roles
        const rolesResponse = await axios.get("https://plataformaong-production.up.railway.app/roles", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const roles = rolesResponse.data;
        localStorage.setItem("roles", JSON.stringify(roles));

        // Exibe uma notificação de sucesso
        toast.success("Login realizado com sucesso!", {
          position: "top-right",
          autoClose: 3000, // Fecha automaticamente em 3 segundos
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
        });

        setTimeout(() => {
          const roles = JSON.parse(localStorage.getItem("roles"));
          if (roles.includes("ROLE_ADMIN")) {
            navigate("/homeADM"); // Redireciona para a HomeADM
          } else if (roles.includes("ROLE_DOADOR")) {
            navigate("/"); // Redireciona para a Home
          }
        }, 1000);
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      toast.error(
        "Falha ao fazer login. Verifique os dados e tente novamente.",
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          pauseOnHover: false,
        },
      );
    }
  };

  return (
    <div className="login-page">
      <div className="main">
        <div className="login">
          {/* <img src={logo} alt="Logo" width="180" heigh="180" className="login-logo" /> */}
          <img
            src={logo}
            alt="Logo"
            width="180"
            height="180"
            className="login-logo"
          />
          <form onSubmit={handleLogin}>
            <label htmlFor="chk" aria-hidden="true">
              Login
            </label>
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
