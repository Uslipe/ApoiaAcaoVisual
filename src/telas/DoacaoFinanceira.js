import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../layout/Navbar";
import "./resources/doacaoFinanceira.css";

export default function DoacaoFinanceira() {
  const location = useLocation();
  const { campanha } = location.state || {};
  const [valorDoacao, setValorDoacao] = useState("");
  const [metodoPagamento, setMetodoPagamento] = useState("cartao");

  const handleDoacao = () => {
    // Lógica para finalizar a doação
    console.log(`Doação de R$ ${valorDoacao} para a campanha ${campanha.nome} via ${metodoPagamento}`);
  };

  const handleValorPreDefinido = (valor) => {
    setValorDoacao(valor);
  };

  if (!campanha) {
    return <p>Campanha não encontrada.</p>;
  }

  return (
    <div>
      <Navbar />
      <div className="container mt-4 doacaoFinanceira-container">
        <div className="campanha-info">
          <h2>{campanha.nome}</h2>
          <h6 className="text-muted">por: {campanha.idOng?.nome || "Desconhecida"}</h6>
        </div>
        <div className="input-group mt-3">
          <select
            className="form-select"
            value={metodoPagamento}
            onChange={(e) => setMetodoPagamento(e.target.value)}
          >
            <option value="cartao">Cartão</option>
            <option value="pix">Pix</option>
          </select>
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
        <div className="valor-predefinido mt-3 d-flex justify-content-center">
          {[10, 20, 30, 50, 80, 120].map((valor) => (
            <button
              key={valor}
              className="btn btn-primary me-2"
              onClick={() => handleValorPreDefinido(valor)}
            >
              Doe R$ {valor}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}