import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../layout/Navbar";
import FinancialCampaignCard from "../layout/FinancialCampaignCard";
import './resources/home.css';

export default function Home() {
  const [campanhasFinanceiras, setCampanhasFinanceiras] = useState([]);
  const [campanhasItens, setCampanhasItens] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:8080/listarCampanhasFinanceiras")
      .then(response => setCampanhasFinanceiras(response.data))
      .catch(error => console.error("Erro ao buscar campanhas financeiras:", error));
  
    axios.get("http://localhost:8080/listarCampanhasDeItens")
      .then(response => setCampanhasItens(response.data))
      .catch(error => console.error("Erro ao buscar campanhas de itens:", error));
  }, []);

  const handleDoar = (campanha) => {
    navigate("/doacaoFinanceira", { state: { campanha }});
  };

  const calcularDiasRestantes = (dataFim) => {
    const hoje = new Date();
    const fim = new Date(dataFim);
    const diferenca = Math.ceil((fim - hoje) / (1000 * 60 * 60 * 24));
    return diferenca > 0 ? diferenca : 0;
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-4 home-container">
        <h2>Campanhas Financeiras</h2>
        {campanhasFinanceiras.length > 0 ? (
          <div className="row">
            {campanhasFinanceiras.map((campanha) => (
              <div key={campanha.idCampanhaFinanceira} className="col-md-4">
                <FinancialCampaignCard
                  nome={campanha.nome}
                  descricao={campanha.descricao}
                  valorArrecadado={campanha.valorArrecadado}
                  metaValor={campanha.metaValor}
                  diasRestantes={calcularDiasRestantes(campanha.dataFim)}
                  onDoar={() => handleDoar(campanha)}
                />
              </div>
            ))}
          </div>
        ) : (
          <p></p>
        )}

        <h2 className="mt-4">Campanhas de Itens</h2>
        {campanhasItens.length > 0 && (
          campanhasItens.map((campanha) => (
            <div key={campanha.idCampanhaDeItens} className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">{campanha.nome}</h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  ONG: {campanha.idOng?.nome || "Desconhecida"}
                </h6>
                <p className="card-text">{campanha.descricao}</p>
                <p className="card-text">
                  <small className="text-muted">
                    Início: {campanha.dataInicio} | Fim: {campanha.dataFim}
                  </small>
                </p>
                <p className="card-text">
                  Endereço de entrega: {campanha.endereco} <br />
                  Quantidade de itens: {campanha.quantidadeDeItens} <br />
                  Itens entregues: {campanha.quantidadeDeItensEntregues} <br />
                  Categoria: {campanha.categoriaItens}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}