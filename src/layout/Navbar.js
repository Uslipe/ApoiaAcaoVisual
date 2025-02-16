import React from "react";
import { Link } from 'react-router-dom';
import './resources/style.css';

export default function Navbar() {
  return (
    <nav>
      <ul className="menu">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/">Campanhas</Link></li>
        <li className="has-submenu">
          <Link to="#">Serviços ▼</Link>
          <ul className="submenu">
            <li><Link to="/consultoria">Consultoria</Link></li>
            <li><Link to="/treinamento">Treinamento</Link></li>
            <li className="has-submenu">
              <Link to="#">Desenvolvimento ➤</Link>
              <ul className="submenu">
                <li><Link to="/web">Web</Link></li>
                <li><Link to="/mobile">Mobile</Link></li>
                <li><Link to="/desktop">Desktop</Link></li>
              </ul>
            </li>
          </ul>
        </li>
        <li><Link to="/contato">Contato</Link></li>
        <li><Link to="/sobre">Sobre</Link></li>
        <li className="icon-login">
        <Link className="nav-link btn btn-light text-light px-3" to="/login">
          Login
        </Link>
        </li>
      </ul>
    </nav>
  );
}