import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./resources/signupOng.css";
import NavbarOng from "../layout/NavbarOng";
import logo from "./images/logo_doar.png";

export default function Cadastro() {
  const [nome, setNome] = useState("");
  const [endereco, setEndereco] = useState("");
  const [contaBancaria, setcontaBancaria] = useState("");
  const [chavePix, setchavePix] = useState("");
  const [cnpj, setcnpj] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const handleCadastro = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/salvarONG", {
        nome,
        endereco,
        contaBancaria,
        chavePix,
        cnpj,
        senha,
        tipoDeUsuario: { idTipoDeUsuario: 3 }, // O tipo de usuário 3 é o tipo de usuário ONG
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
          navigate("/loginong"); // Redireciona para a tela de login após exibir a notificação
        }, 1000);
      }
    } catch (error) {
      console.error("Erro ao fazer cadastro:", error);
      toast.error(
        "Falha ao fazer cadastro. Verifique os dados e tente novamente.",
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
    <div className="signup-page">
      <NavbarOng />
      <p className="trilha">Home {">"} Cadastro Ongs </p>
      <div className="container">
        <div className="content">
          <div className="infoCadastro">
            <h1>
              Cadastre-se na
              <br />
              <strong>ApoiaAção</strong>
            </h1>
            <h2>
              <span>
                ... junte-se a mais de 10 mil
                <br />
                usuários registrados!
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 640 512"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M96 224c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm448 0c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm32 32h-64c-17.6 0-33.5 7.1-45.1 18.6 40.3 22.1 68.9 62 75.1 109.4h66c17.7 0 32-14.3 32-32v-32c0-35.3-28.7-64-64-64zm-256 0c61.9 0 112-50.1 112-112S381.9 32 320 32 208 82.1 208 144s50.1 112 112 112zm76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3C179.6 288 128 339.6 128 403.2V432c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-28.8c0-63.6-51.6-115.2-115.2-115.2zm-223.7-13.4C161.5 263.1 145.6 256 128 256H64c-35.3 0-64 28.7-64 64v32c0 17.7 14.3 32 32 32h65.9c6.3-47.4 34.9-87.3 75.2-109.4z"></path>
                </svg>
              </span>
            </h2>
            <h3>
              Mantenha suas causas e projetos
              <br />
              favoritos bem perto de você!
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
            </h3>
            <h4>
              <a href="/loginong">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 512 512"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M256 504C119 504 8 393 8 256S119 8 256 8s248 111 248 248-111 248-248 248zm28.9-143.6L209.4 288H392c13.3 0 24-10.7 24-24v-16c0-13.3-10.7-24-24-24H209.4l75.5-72.4c9.7-9.3 9.9-24.8.4-34.3l-11-10.9c-9.4-9.4-24.6-9.4-33.9 0L107.7 239c-9.4 9.4-9.4 24.6 0 33.9l132.7 132.7c9.4 9.4 24.6 9.4 33.9 0l11-10.9c9.5-9.5 9.3-25-.4-34.3z"></path>
                </svg>
                <span>Voltar para Login</span>
              </a>
            </h4>
          </div>
          <div className="main">
            <div className="signup">
              <img
                src={logo}
                alt="Logo"
                width="180"
                height="180"
                className="signup-logo"
              />
              <form onSubmit={handleCadastro}>
                <label htmlFor="chk" aria-hidden="true">
                  Cadastre-se
                </label>
                <input
                  type="text"
                  name="txt"
                  placeholder="Nome"
                  required
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />
                <input
                  type="text"
                  name="txt"
                  placeholder="endereço"
                  required
                  value={endereco}
                  onChange={(e) => setEndereco(e.target.value)}
                />
                <input
                  type="text"
                  name="txt"
                  placeholder="conta bancaria"
                  required
                  value={contaBancaria}
                  onChange={(e) => setcontaBancaria(e.target.value)}
                />
                <input
                  type="text"
                  name="txt"
                  placeholder="Pix"
                  required
                  value={chavePix}
                  onChange={(e) => setchavePix(e.target.value)}
                />
                <input
                  type="text"
                  name="txt"
                  placeholder="cnpj"
                  required
                  value={cnpj}
                  onChange={(e) => setcnpj(e.target.value)}
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
                  Já tem uma conta? <Link to="/loginong">Faça login</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
