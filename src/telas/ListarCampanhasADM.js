import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../layout/Navbar";
import './resources/listarCampanhasADM.css';

export default function ListarCampanhasADM() {
  const [campanhas, setCampanhas] = useState([]);

  useEffect(() => {
    const buscarCampanhas = async () => {
      const token = localStorage.getItem("token");
      try {
        const [responseFinanceiras, responseDeItens] = await Promise.all([
          axios.get("http://localhost:8080/listarCampanhasFinanceiras", {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }),
          axios.get("http://localhost:8080/listarCampanhasDeItens", {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
        ]);

        console.log("Resposta da API Financeiras:", responseFinanceiras.data);
        console.log("Resposta da API De Itens:", responseDeItens.data);

        // Combine as campanhas financeiras e de itens
        const todasCampanhas = [...responseFinanceiras.data, ...responseDeItens.data];

        // Ordenar as campanhas por data de início (mais recentes primeiro)
        const campanhasOrdenadas = todasCampanhas.sort((a, b) => new Date(b.dataInicio) - new Date(a.dataInicio));

        setCampanhas(campanhasOrdenadas);
      } catch (error) {
        console.error("Erro ao buscar campanhas:", error);
      }
    };

    buscarCampanhas();
  }, []);

  const formatarData = (data) => {
    const [ano, mes, dia] = data.split("-");
    return `${dia}/${mes}/${ano}`;
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-4 campanhas-container">
        <h1>Lista de Campanhas</h1>
        <div className="campanhas-lista">
          <div className="campanha-item header">
            <span>Nome da ONG</span>
            <span>Nome da Campanha</span>
            <span>Arrecadação / Meta</span>
            <span>Data de Início</span>
            <span>Data de Fim</span>
          </div>
          {campanhas.length > 0 ? (
            campanhas.map((campanha) => {
              const { idOng, nome, valorArrecadado, metaValor, quantidadeDeItens, quantidadeDeItensEntregues, dataInicio, dataFim } = campanha;
              const nomeOng = idOng ? idOng.nome : "ONG não encontrada";
              return (
                <div key={campanha.id} className="campanha-item">
                  <span>{nomeOng}</span>
                  <span>{nome}</span>
                  <span>
                    {valorArrecadado ? `R$ ${valorArrecadado} / R$ ${metaValor}` : `${quantidadeDeItensEntregues} itens / ${quantidadeDeItens} itens`}
                  </span>
                  <span>{formatarData(dataInicio)}</span>
                  <span>{formatarData(dataFim)}</span>
                </div>
              );
            })
          ) : (
            <p>Nenhuma campanha encontrada.</p>
          )}
        </div>
      </div>
    </div>
  );
}