import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Navbar from "../layout/Navbar";
import "./resources/validarOngADM.css";
import "react-toastify/dist/ReactToastify.css";

export default function ValidarOngADM() {
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

        // Verificar se o atributo 'validada' está presente
        response.data.forEach(ong => {
          if (ong.validada === undefined) {
            console.warn(`Atributo 'validada' não encontrado para a ONG com ID: ${ong.id}`);
          }
        });

        // Filtrar as ONGs que não estão validadas
        const ongsNaoValidadas = response.data.filter(ong => !ong.validada);

        // Ordenar as ONGs por ID (do menor para o maior)
        const ongsOrdenadas = ongsNaoValidadas.sort((a, b) => a.id - b.id);

        setOngs(ongsOrdenadas);
      } catch (error) {
        console.error("Erro ao buscar ONGs:", error);
      }
    };

    buscarOngs();
  }, []);

  const validarOng = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token não encontrado");
      return;
    }

    console.log("ID usado para validar:", id);

    try {
      const response = await axios.put(`https://plataformaong-production.up.railway.app/validarONG/${id}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        // Atualizar a lista de ONGs após a validação
        setOngs(ongs.filter(o => o.id !== id));
        
        // Exibir alerta de sucesso
        toast.success("ONG validada com sucesso!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
        });
      } else {
        console.error("Erro ao validar ONG:", response.status);
      }
    } catch (error) {
      console.error("Erro ao validar ONG:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-4 ongs-container">
        <h1>Lista de ONGs Não Validadas</h1>
        <div className="ongs-lista">
          <div className="ong-item header">
            <span>ID</span>
            <span>Nome</span>
            <span>CNPJ</span>
            <span>Endereço</span>
            <span>Realizar validação</span>
          </div>
          {ongs.length > 0 ? (
            ongs.map((ong) => {
              const { id, nome, cnpj, endereco } = ong;
              return (
                <div key={id} className="ong-item">
                  <span>{id}</span>
                  <span>{nome}</span>
                  <span>{cnpj}</span>
                  <span>{endereco}</span>
                  <span>
                    <button onClick={() => validarOng(id)}>Validar</button>
                  </span> 
                </div>
              );
            })
          ) : (
            <p>Nenhuma ONG não validada encontrada.</p>
          )}
        </div>
      </div>
    </div>
  );
}