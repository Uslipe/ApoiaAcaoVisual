import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../layout/Navbar";
import './resources/homeADM.css';

export default function HomeADM() {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-4 home-adm-container">
        <h2>Painel do Administrador</h2>
        <h3>Funcionalidades</h3>
        <div className="button-group">
          <button onClick={() => handleNavigation('/validar-ongs')} className="btn btn-primary">Validar ONGs</button>
          <button onClick={() => handleNavigation('/deletar-campanhas')} className="btn btn-primary">Deletar Campanhas</button>
          <button onClick={() => handleNavigation('/listar-usuarios')} className="btn btn-primary">Listar Usuários</button>
          <button onClick={() => handleNavigation('/listar-campanhas')} className="btn btn-primary">Listar Campanhas</button>
        </div>
        <button className="btn btn-danger mt-4 logout-button" onClick={() => handleNavigation('/logout')}>Sair da conta</button>
      </div>
    </div>
  );
}