/* eslint-disable react/no-unknown-property */
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./resources/navOngLog.css";

export default function NavbarLog() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate(); // Para redirecionamento
  return (
    <div className="navbar-wrapper-log">
      <button onClick={() => navigate(-1)} className="back-button">
        {" "}
        {"<"} Voltar
      </button>
      <nav className="containerNav-log navbarlog">
        <ul className="menu2">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/">Campanhas</Link>
          </li>
        </ul>
        <ul className="menu2 teste2">
          <li className="btlogin">
            <Link className="btlog" to="/loginong">
              <i class="fa-solid fa-user-lock"></i>
              <span className="btloginnew">Login</span>
            </Link>
          </li>

          <li className="icon-login-log">
            {token ? (
              <Link
                className="nav-link btn btn-light text-light px-3"
                to="/perfil"
              >
                Ver Perfil
              </Link>
            ) : (
              <Link
                className="cadastro av-link btn btn-light text-light px-3"
                to="/CadastroOng"
              >
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 640 512"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ transform: "scale(1.25)" }}
                >
                  <path d="M624 208h-64v-64c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v64h-64c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h64v64c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-64h64c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zm-400 48c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"></path>
                </svg>
                <strong>CADASTRE-SE</strong>
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
}
