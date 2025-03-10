import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../layout/Navbar";
import { useNavigate } from "react-router-dom";
import "./resources/gerenciarCampanhasOng.css";

export default function GerenciarCampanhasOng() {
  const [campanhasDeItens, setCampanhasDeItens] = useState([]);
  const [campanhasFinanceiras, setCampanhasFinanceiras] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id");

    if (!token || !id) {
      navigate("/loginOng");
      return;
    }

    console.log("Token:", token);
    console.log("ID da ONG:", id);

    const fetchCampanhasDeItens = async () => {
      try {
        const response = await axios.get(`https://plataformaong-production.up.railway.app/listarCampanhasDeItensPorONG/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Resposta da API (Campanhas de Itens):", response.data);
        setCampanhasDeItens(response.data);
      } catch (error) {
        console.error("Erro ao buscar campanhas de itens:", error);
      }
    };

    const fetchCampanhasFinanceiras = async () => {
      try {
        const response = await axios.get(`https://plataformaong-production.up.railway.app/listarCampanhasFinanceirasPorONG/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Resposta da API (Campanhas Financeiras):", response.data);
        setCampanhasFinanceiras(response.data);
      } catch (error) {
        console.error("Erro ao buscar campanhas financeiras:", error);
      }
    };

    const fetchData = async () => {
      await fetchCampanhasDeItens();
      await fetchCampanhasFinanceiras();
    };

    fetchData();
  }, [navigate]);

  const handleEdit = (campanha, tipo) => {
    navigate(`/editarCampanhaOng`, { state: { campanha, tipo } });
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-4 campanhas-container">
        <h1>Minhas Campanhas</h1>
        <div className="campanhas-lista campanhas-de-itens">
          <h2>Campanhas de Itens</h2>
          <div className="campanha-item header">
            <span>ID</span>
            <span>Nome da Campanha</span>
            <span>Data de Início</span>
            <span>Progresso</span>
            <span>Ações</span>
          </div>
          {campanhasDeItens.length > 0 ? (
            campanhasDeItens.map((campanha) => {
              const { idCampanhaDeItens, nome, dataInicio, quantidadeDeItensEntregues, quantidadeDeItens } = campanha;
              const dataFormatada = new Date(dataInicio).toLocaleDateString('pt-BR');
              return (
                <div key={idCampanhaDeItens} className="campanha-item">
                  <span>{idCampanhaDeItens}</span>
                  <span>{nome}</span>
                  <span>{dataFormatada}</span>
                  <span>{quantidadeDeItensEntregues} / {quantidadeDeItens}</span>
                  <span>
                    <button onClick={() => handleEdit(campanha, "itens")}>Editar</button>
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
            <span>Nome da Campanha</span>
            <span>Data de Início</span>
            <span>Progresso</span>
            <span>Ações</span>
          </div>
          {campanhasFinanceiras.length > 0 ? (
            campanhasFinanceiras.map((campanha) => {
              const { idCampanhaFinanceira, nome, dataInicio, valorArrecadado, metaValor } = campanha;
              const dataFormatada = new Date(dataInicio).toLocaleDateString('pt-BR');
              return (
                <div key={idCampanhaFinanceira} className="campanha-item">
                  <span>{idCampanhaFinanceira}</span>
                  <span>{nome}</span>
                  <span>{dataFormatada}</span>
                  <span>{valorArrecadado} / {metaValor}R$</span>
                  <span>
                    <button onClick={() => handleEdit(campanha, "financeira")}>Editar</button>
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