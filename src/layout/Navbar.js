import React from "react";
import { Link, useNavigate,useLocation } from 'react-router-dom';
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

  return (
    <nav>
      <ul className="menu">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/">Campanhas</Link></li>
        <li><Link to="/contato">Contato</Link></li>
        <li><Link to="/sobre">Sobre</Link></li>
        <li className="icon-login">
        {token ? (
            location.pathname === "/perfil" ? (
              <button className="nav-link btn-sair-da-conta" onClick={handleLogout}>
                Sair da Conta
              </button>
            ) : (
              <Link className="nav-link btn btn-light text-light px-3" to="/perfil">
                Ver Perfil
              </Link>
            )
          ) : (
            <Link className="nav-link btn btn-light text-light px-3" to="/login">
              Login
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}