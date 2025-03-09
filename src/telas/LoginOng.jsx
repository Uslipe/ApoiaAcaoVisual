import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./resources/loginong.css";
import logo from "./images/logo_doar.png";
import NavbarLog from "../layout/NavbarLog";

export default function Login() {
  const [cnpj, setCnpj] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate(); // Para redirecionamento
  const location = useLocation();

  useEffect(() => {
    // eslint-disable-next-line no-unused-vars
    const handlePopState = (event) => {
      if (location.pathname === "/loginong") {
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
      const response = await axios.post("http://localhost:8080/loginOng", {
        cnpj,
        senha,
      });

      if (response.status === 200) {
        const { token, id } = response.data;
        localStorage.setItem("token", token); // Armazena o token no localStorage
        localStorage.setItem("id", id); // Armazena o ID da ONG no localStorage

        // Chamar o endpoint de roles
        const rolesResponse = await axios.get("http://localhost:8080/roles", {
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
          navigate("/"); // Redireciona após exibir a notificação
        }, 1000);
      }
    } catch (error) {
      // eslint-disable-next-line no-unused-vars
      const tes = (document.getElementById("chk").checked = false);

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
    <div className="consertar">
      <div className="login-page">
        <NavbarLog />
        <p className="trilha">Home {">"} Login Ong </p>
        <div className="container">
          <div className="content">
            <div className="infoLoginOng">
              <h1>
                Faça seu login na
                <br />
                <strong>ApoiaAção</strong>
              </h1>
              <h2>
                <span>
                  ... junte-se a suas
                  <br />
                  causas e projetos favoritos!
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 512 512"
                    style={{ fill: "#d86c6c" }}
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"></path>
                  </svg>
                </span>
              </h2>
            </div>
            <div className="main">
              <div className="login">
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
                    type="text"
                    name="cnpj"
                    placeholder="cnpj"
                    required
                    value={cnpj}
                    onChange={(e) => setCnpj(e.target.value)}
                  />
                  <p id="output"></p>
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
                    Não tem uma conta?{" "}
                    <Link to="/CadastroOng">Cadastre-se</Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
