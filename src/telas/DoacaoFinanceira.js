import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../layout/Navbar";
import "./resources/doacaoFinanceira.css";

export default function DoacaoFinanceira() {
  const location = useLocation();
  const { campanha } = location.state || {};
  const [valorDoacao, setValorDoacao] = useState("");

  const handleDoacao = () => {
    // Lógica para finalizar a doação
    console.log(`Doação de R$ ${valorDoacao} para a campanha ${campanha.nome}`);
  };

  if (!campanha) {
    return <p>Campanha não encontrada.</p>;
  }

  return (
    <div>
      <Navbar />
      <div className="container mt-4 doacaoFinanceira-container">
        <h2>{campanha.nome}</h2>
        <h6 className="text-muted">por: {campanha.idOng?.nome || "Desconhecida"}</h6>
        <div className="input-group mt-3">
          <input
            type="number"
            className="form-control"
            placeholder="Valor em reais"
            value={valorDoacao}
            onChange={(e) => setValorDoacao(e.target.value)}
          />
          <button className="btn btn-primary" onClick={handleDoacao}>
            Finalizar Doação
          </button>
        </div>
      </div>
    </div>
  );
}