import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../layout/Navbar";
import "./resources/listarUsuariosADM.css";

export default function ListarUsuariosADM() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const buscarUsuarios = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token não encontrado");
        return;
      }

      try {
        const response = await axios.get("http://localhost:8080/usuarios", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Resposta da API:", response.data);

        // Ordenar os usuários por nome (alfabeticamente)
        const usuariosOrdenados = response.data.sort((a, b) =>
          a.nome.localeCompare(b.nome),
        );

        setUsuarios(usuariosOrdenados);
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
      }
    };

    buscarUsuarios();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container mt-4 usuarios-container">
        <h1>Lista de Usuários</h1>
        <div className="usuarios-lista">
          <div className="usuario-item header">
            <span>ID</span>
            <span>Nome</span>
            <span>Email</span>
          </div>
          {usuarios.length > 0 ? (
            usuarios.map((usuario) => {
              const { id, nome, email } = usuario;
              return (
                <div key={id} className="usuario-item">
                  <span>{id}</span>
                  <span>{nome}</span>
                  <span>{email}</span>
                </div>
              );
            })
          ) : (
            <p>Nenhum usuário encontrado.</p>
          )}
        </div>
      </div>
    </div>
  );
}
