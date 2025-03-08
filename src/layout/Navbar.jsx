import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./resources/style.css";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");
  const roles = JSON.parse(localStorage.getItem("roles")) || [];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("idUsuario");
    localStorage.removeItem("id");
    localStorage.removeItem("roles");
    navigate("/");
  };

  const scrollToFooter = () => {
    const footer = document.getElementById("footer");
    if (footer) {
      footer.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="navbar-wrapper">
      <nav className="containerNav navbar">
        <ul className="menu">
          <li>
            <Link to="/">
              <i className="fa-solid fa-house"></i> Home
            </Link>
          </li>
          <li>
            <Link to="/">
              <i className="fa-solid fa-bell"></i> Campanhas
            </Link>
          </li>
          <li>
            <Link to="/CadastroOng">
              <i className="fa-solid fa-phone"></i> Contato
            </Link>
          </li>
          <li>
            <a className="about" onClick={scrollToFooter}>
              <i className="fa-solid fa-circle-info"></i> Sobre
            </a>
          </li>
          <li className="areaOng">
            <Link to="/AreaOng">
              <i className="fa-solid fa-hand-holding-heart"></i> Área de ONGs
            </Link>
          </li>
        </ul>
        <ul className="Loginbtn">
          <li className="icon-login">
            {token ? (
              location.pathname === "/perfil" ||
              location.pathname === "/perfilOng" ? (
                <button
                  className="nav-link btn-sair-da-conta"
                  onClick={handleLogout}
                >
                  <i className="fa-solid fa-circle-xmark"></i> Sair da Conta
                </button>
              ) : (
                <div className="dropdown">
                  <div className="btPerfil">
                    <span className="">
                      <i className="fa-solid fa-user fa-2x"></i>
                      {/* Perfil */}
                    </span>
                  </div>
                  <div className="dropdown-content">
                    <ul className="locations">
                      {roles.includes("ROLE_ADMIN") ? (
                        <>
                          <li>
                            <a href="/perfil"> Gerenciar Perfil </a>
                          </li>
                        </>
                      ) : roles.includes("ROLE_ONG") ? (
                        <>
                          <li>
                            <a href="/perfilOng"> Gerenciar Perfil </a>
                          </li>
                          <li>
                            <a href="/AreaOng"> Área da ONG </a>
                          </li>
                        </>
                      ) : (
                        <>
                          <li>
                            <a href="/perfil"> Gerenciar Perfil </a>
                          </li>
                          <li>
                            <a href="/HistoricoDoacoesDoador">
                              Ver históricos de doações
                            </a>
                          </li>
                        </>
                      )}
                      <li>
                        <button
                          onClick={handleLogout}
                          className="dropdown-logout"
                        >
                          Sair da Conta
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              )
            ) : (
              <Link
                className="nav-link btn btn-light text-light px-3"
                to="/login"
              >
                <i className="fa-solid fa-circle-user"></i> Login
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
}
