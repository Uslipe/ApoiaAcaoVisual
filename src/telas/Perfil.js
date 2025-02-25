import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../layout/Navbar";
import "./resources/perfil.css"; 

export default function Perfil() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("idUsuario");
    navigate("/");
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-4 perfil-container">
        <h2>Gerenciamento de Perfil</h2>
        {/* Adicione aqui os campos e funcionalidades para gerenciar o perfil do usuário */}
        <button className="btn btn-danger mt-4" onClick={handleLogout}>
          Sair
        </button>
      </div>
    </div>
  );
}