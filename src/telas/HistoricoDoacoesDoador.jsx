import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../layout/Navbar";
import "./resources/historicoDoacoesDoador.css";

export default function HistoricoDoacoesDoador() {
  const [historicoDoacoes, setHistoricoDoacoes] = useState([]);

  useEffect(() => {
    const buscarHistoricoDoacoes = async () => {
      const token = localStorage.getItem("token");
      const idUsuario = localStorage.getItem("idUsuario");
      try {
        const response = await axios.get(
          `https://plataformaong-production.up.railway.app/verHistoricoDoacoes/${idUsuario}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        console.log("Resposta da API:", response.data); // Adicione este log

        // Ordenar as doações por data (mais recentes primeiro)
        const doacoesOrdenadas = response.data.sort((a, b) => {
          const dataA = a.doacaoFinanceira
            ? a.doacaoFinanceira.dataDoacao
            : a.doacaoDeItens.dataDoacao;
          const dataB = b.doacaoFinanceira
            ? b.doacaoFinanceira.dataDoacao
            : b.doacaoDeItens.dataDoacao;
          return new Date(dataB) - new Date(dataA);
        });

        setHistoricoDoacoes(doacoesOrdenadas);
      } catch (error) {
        console.error("Erro ao buscar histórico de doações:", error);
      }
    };

    buscarHistoricoDoacoes();
  }, []);

  const formatarData = (data) => {
    const [ano, mes, dia] = data.split("-");
    return `${dia}/${mes}/${ano}`;
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-4 historico-doacoes-container">
        <h1>Seu histórico de doações</h1>
        <div className="doacoes-lista">
          {historicoDoacoes.length > 0 ? (
            historicoDoacoes.map((doacaoWrapper) => {
              const { doacaoFinanceira, doacaoDeItens } = doacaoWrapper;
              const campanhaFinanceira = doacaoFinanceira
                ? doacaoFinanceira.campanha
                : null;
              const campanhaDeItens = doacaoDeItens
                ? doacaoDeItens.campanhaDeItens
                : null;
              const nomeOng =
                campanhaFinanceira && campanhaFinanceira.idOng
                  ? campanhaFinanceira.idOng.nome
                  : campanhaDeItens && campanhaDeItens.idOng
                    ? campanhaDeItens.idOng.nome
                    : "ONG não encontrada";
              const nomeCampanha = campanhaFinanceira
                ? campanhaFinanceira.nome
                : campanhaDeItens
                  ? campanhaDeItens.nome
                  : "Campanha não encontrada";
              return (
                <div
                  key={
                    doacaoFinanceira ? doacaoFinanceira.id : doacaoDeItens.id
                  }
                  className="doacao-item"
                >
                  <span>
                    {doacaoFinanceira
                      ? formatarData(doacaoFinanceira.dataDoacao)
                      : formatarData(doacaoDeItens.dataDoacao)}
                  </span>
                  <span>{nomeOng}</span>
                  <span>{nomeCampanha}</span>
                  <span>
                    {doacaoFinanceira
                      ? `R$ ${doacaoFinanceira.valor}`
                      : doacaoDeItens.categoriaItens}
                  </span>
                </div>
              );
            })
          ) : (
            <p>Nenhuma doação encontrada.</p>
          )}
        </div>
      </div>
    </div>
  );
}
