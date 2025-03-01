import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import './resources/style.css';

export default function Navbar() {
  const token = localStorage.getItem("token");
  return (
    <nav>
      <ul className="menu">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/">Campanhas</Link></li>
        <li><Link to="/CadastroOng">Contato</Link></li>
        <li><Link to="/loginong">Sobre</Link></li>
        <li><Link to="/loginong">Área de ONGs</Link></li>
        <li className="icon-login">
          {token ? (
            <Link className="nav-link btn btn-light text-light px-3" to="/perfil">
              Ver Perfil
            </Link>
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