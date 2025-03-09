import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../layout/Navbar";
import "./resources/deletarCampanhasADM.css";

export default function DeletarCampanhasADM() {
  const [campanhasDeItens, setCampanhasDeItens] = useState([]);
  const [campanhasFinanceiras, setCampanhasFinanceiras] = useState([]);
  const [ongs, setOngs] = useState([]);
  const [ongsCarregadas, setOngsCarregadas] = useState(false); // Novo estado para controlar quando as ONGs foram carregadas

  useEffect(() => {
    const buscarOngs = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token não encontrado");
        return;
      }

      try {
        const response = await axios.get("http://localhost:8080/listarONG", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("ONGs carregadas:", response.data);
        setOngs(response.data);
        setOngsCarregadas(true); // Marcar que as ONGs foram carregadas
      } catch (error) {
        console.error("Erro ao buscar ONGs:", error);
      }
    };

    buscarOngs();
  }, []);

  useEffect(() => {
    if (!ongsCarregadas) return; // Esperar até que as ONGs sejam carregadas

    const buscarCampanhasDeItens = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token não encontrado");
        return;
      }

      try {
        const response = await axios.get("http://localhost:8080/listarCampanhasDeItens", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Resposta da API (Campanhas de Itens):", response.data);

        // Ordenar as campanhas por ID (do menor para o maior)
        const campanhasOrdenadas = response.data.sort((a, b) => a.idCampanhaDeItens - b.idCampanhaDeItens);

        // Adicionar o nome da ONG a cada campanha
        const campanhasComNomeOng = campanhasOrdenadas.map(campanha => {
          const ong = ongs.find(ong => ong.id === campanha.idOng.id);
          console.log("ONG encontrada para campanha de itens:", ong);
          return { ...campanha, nomeOng: ong ? ong.nome : "ONG não encontrada" };
        });

        setCampanhasDeItens(campanhasComNomeOng);
      } catch (error) {
        console.error("Erro ao buscar campanhas de itens:", error);
      }
    };

    const buscarCampanhasFinanceiras = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token não encontrado");
        return;
      }

      try {
        const response = await axios.get("http://localhost:8080/listarCampanhasFinanceiras", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Resposta da API (Campanhas Financeiras):", response.data);

        // Ordenar as campanhas por ID (do menor para o maior)
        const campanhasOrdenadas = response.data.sort((a, b) => a.idCampanhaFinanceira - b.idCampanhaFinanceira);

        // Adicionar o nome da ONG a cada campanha
        const campanhasComNomeOng = campanhasOrdenadas.map(campanha => {
          const ong = ongs.find(ong => ong.id === campanha.idOng.id);
          console.log("ONG encontrada para campanha financeira:", ong);
          return { ...campanha, nomeOng: ong ? ong.nome : "ONG não encontrada" };
        });

        setCampanhasFinanceiras(campanhasComNomeOng);
      } catch (error) {
        console.error("Erro ao buscar campanhas financeiras:", error);
      }
    };

    const fetchData = async () => {
      await buscarCampanhasDeItens();
      await buscarCampanhasFinanceiras();
    };

    fetchData();
  }, [ongsCarregadas]); // Executar o efeito quando as ONGs forem carregadas

  const deletarCampanha = async (id, tipo) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token não encontrado");
      return;
    }

    try {
      let url = "";
      if (tipo === "itens") {
        url = `http://localhost:8080/deletarCampanhaDeItens/${id}`;
      } else if (tipo === "financeira") {
        url = `http://localhost:8080/deletarCampanhaFinanceira/${id}`;
      }

      await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Remover a campanha deletada da lista
      if (tipo === "itens") {
        setCampanhasDeItens(campanhasDeItens.filter(campanha => campanha.idCampanhaDeItens !== id));
      } else if (tipo === "financeira") {
        setCampanhasFinanceiras(campanhasFinanceiras.filter(campanha => campanha.idCampanhaFinanceira !== id));
      }
    } catch (error) {
      console.error(`Erro ao deletar campanha ${tipo}:`, error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-4 campanhas-container">
        <h1>Lista de Campanhas</h1>
        <div className="campanhas-lista campanhas-de-itens">
          <h2>Campanhas de Itens</h2>
          <div className="campanha-item header">
            <span>ID</span>
            <span>Nome da ONG</span>
            <span>Nome da Campanha</span>
            <span>Encerrada</span>
            <span>Ações</span>
          </div>
          {campanhasDeItens.length > 0 ? (
            campanhasDeItens.map((campanha) => {
              const { idCampanhaDeItens, nomeOng, nome, encerrada } = campanha;
              return (
                <div key={idCampanhaDeItens} className="campanha-item">
                  <span>{idCampanhaDeItens}</span>
                  <span>{nomeOng}</span>
                  <span>{nome}</span>
                  <span>{encerrada ? "Sim" : "Não"}</span>
                  <span>
                    <button onClick={() => deletarCampanha(idCampanhaDeItens, "itens")}>Deletar</button>
                  </span>
                </div>
              );
            })
          ) : (
            <p>Nenhuma campanha de itens encontrada.</p>
          )}
        </div>
        <div className="campanhas-lista campanhas-financeiras">
          <h2>Campanhas Financeiras</h2>
          <div className="campanha-item header">
            <span>ID</span>
            <span>Nome da ONG</span>
            <span>Nome da Campanha</span>
            <span>Encerrada</span>
            <span>Ações</span>
          </div>
          {campanhasFinanceiras.length > 0 ? (
            campanhasFinanceiras.map((campanha) => {
              const { idCampanhaFinanceira, nomeOng, nome, encerrada } = campanha;
              return (
                <div key={idCampanhaFinanceira} className="campanha-item">
                  <span>{idCampanhaFinanceira}</span>
                  <span>{nomeOng}</span>
                  <span>{nome}</span>
                  <span>{encerrada ? "Sim" : "Não"}</span>
                  <span>
                    <button onClick={() => deletarCampanha(idCampanhaFinanceira, "financeira")}>Deletar</button>
                  </span>
                </div>
              );
            })
          ) : (
            <p>Nenhuma campanha financeira encontrada.</p>
          )}
        </div>
      </div>
    </div>
  );
}