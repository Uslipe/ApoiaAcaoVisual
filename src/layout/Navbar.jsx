import React from "react";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './resources/style.css';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("idUsuario");
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
          <li><Link to="/"><i className="fa-solid fa-house"></i> Home</Link></li>
          <li><Link to="/"><i className="fa-solid fa-bell"></i> Campanhas</Link></li>
          <li><a className="about" onClick={scrollToFooter}><i className="fa-solid fa-phone"></i> Contato</a></li>
          <li><a className="about" onClick={scrollToFooter}><i className="fa-solid fa-circle-info"></i> Sobre</a></li>
          <li className="areaOng"><Link to="/AreaOng"><i className="fa-solid fa-hand-holding-heart"></i> Área de ONGs</Link></li>
        </ul>
        <ul className="Loginbtn">
          <li className="icon-login">
            {token ? (
              location.pathname === "/perfil" ? (
                <div className="dropdown">
                  <div className="btPerfil">
                    <span className="">
                      <i className="fa-solid fa-user fa-2x"></i>
                      {/* Perfil */}
                    </span>
                  </div>
                  <div className="dropdown-content">
                    <ul className="locations">
                      <li><Link to="/perfil"> Gerenciar Perfil </Link></li>
                      <li><Link to="/HistoricoDoacoesDoador"> Ver históricos de doações </Link></li>
                      <li className="logoutbt"><button onClick={handleLogout} className="dropdown-logout"> Sair da Conta </button></li>
                    </ul>
                  </div>
                </div>
              ) : (
                // DROPBAR
                <div className="dropdown">
                  <div className="btPerfil">
                    <span className="">
                      <i className="fa-solid fa-user fa-2x"></i>
                      {/* Perfil */}
                    </span>
                  </div>
                  <div className="dropdown-content">
                    <ul className="locations">
                      <li><Link to="/perfil"> Gerenciar Perfil </Link></li>
                      <li><Link to="/HistoricoDoacoesDoador"> Ver históricos de doações </Link></li>
                      <li className="logoutbt"><button onClick={handleLogout} className="dropdown-logout"> Sair da Conta </button></li>
                    </ul>
                  </div>
                </div>
                // FIM DROPBAR
              )
            ) : (
              <Link className="nav-link btn btn-light text-light px-3" to="/login">
                <i className="fa-solid fa-circle-user"></i> Login
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
}