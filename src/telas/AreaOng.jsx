import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./resources/areaOng.css";
import logo from "./images/logo_doar.png";


export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate(); // Para redirecionamento
  const location = useLocation();

  useEffect(() => {
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
      const response = await axios.post("http://localhost:8080/loginong", {
        email,
        senha,
      });

      if (response.status === 200) {
        const { token, idUsuario } = response.data; // O token e o id do usuário vem na resposta
        localStorage.setItem("token", token); // Armazena no localStorage
        localStorage.setItem("idUsuario", idUsuario); // Armazena o ID do usuário

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
      const tes = document.getElementById("chk").checked = false;

      console.error("Erro ao fazer login:", error);
      toast.error("Falha ao fazer login. Verifique os dados e tente novamente.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        pauseOnHover: false,
      });
    }
  };

  return (

    <div className="AreaOng">
      <div className="mainOng">
        <button onClick={() => navigate(-1)} className="back-button"> {"<"} Voltar</button>
      </div>
      <div className="navNew">
        <img src={logo} alt="Logo" width="90" height="90" className="login-logo" />

      </div>
      <div className="container">

        <p className="trilha">Home {">"} Área de Ongs </p>
        <div className="info">
          <div className="txt">
            <h2>CANAL DE CADASTRO PARA ONGs
              <br />
              <strong>ApoiaAção</strong>
            </h2>
            <h3>
              <span>Exclusivamente para o atendimento de ONGs, disponibilizamos nosso catálogo para exposição, com visual diferenciado e alcance incrível!
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" style={{ fill: '#d86c6c' }} height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"></path></svg>
              </span>
            </h3>
          </div>
        </div>

        <div className="login-cadastro">
          <div className="inTxt">
            <p><strong>FAÇA LOGIN OU CADASTRE-SE PARA OBTER ACESSO</strong></p>
          </div>
        </div>

        <div className="btn-botoes">
          <div className="container-bl">
            <div className="btn-login">
              <p className="paragraph-login">
                <span>ENTRE COM SEU LOGIN E SENHA</span>
                <a class="paragraph-button-login" href="/loginOng"><strong>ENTRAR</strong></a>
              </p>
            </div>
          </div>
          <div className="container-cd">
            <div className="btn-cadastro">
              <div className="btn-login">
                <p className="paragraph-login">
                <span> AINDA NÃO TEM CONTA? CRIE AGORA MESMO!</span>
                  <a class="paragraph-button-login" href="/CadastroOng"><strong>CADASTRE-SE</strong></a>
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
      
    </div>

  );
}

