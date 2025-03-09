                                        import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../layout/Navbar";
import "./resources/listarOngsADM.css";

export default function ListarOngsADM() {
  const [ongs, setOngs] = useState([]);

  useEffect(() => {
    const buscarOngs = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token não encontrado");
        return;
      }

      try {
        const response = await axios.get("https://plataformaong-production.up.railway.app/listarONG", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Resposta da API:", response.data);

        // Ordenar as ONGs por ID (do menor para o maior)
        const ongsOrdenadas = response.data.sort((a, b) => a.id - b.id);

        setOngs(ongsOrdenadas);
      } catch (error) {
        console.error("Erro ao buscar ONGs:", error);
      }
    };

    buscarOngs();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container mt-4 ongs-container">
        <h1>Lista de ONGs</h1>
        <div className="ongs-lista">
          <div className="ong-item header">
            <span>ID</span>
            <span>Nome</span>
            <span>CNPJ</span>
            <span>Endereço</span>
            <span>Validada</span>
          </div>
          {ongs.length > 0 ? (
            ongs.map((ong) => {
              const { id, nome, cnpj, endereco, validada } = ong;
              return (
                <div key={id} className="ong-item">
                  <span>{id}</span>
                  <span>{nome}</span>
                  <span>{cnpj}</span>
                  <span>{endereco}</span>
                  <span>{validada ? "Sim" : "Não"}</span>
                </div>
              );
            })
          ) : (
            <p>Nenhuma ONG encontrada.</p>
          )}
        </div>
      </div>
    </div>
  );
}
