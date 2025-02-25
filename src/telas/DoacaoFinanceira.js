import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Navbar from "../layout/Navbar";
import "./resources/doacaoFinanceira.css";

export default function DoacaoFinanceira() {
  const location = useLocation();
  const navigate = useNavigate();
  const { campanha } = location.state || {};
  const [valorDoacao, setValorDoacao] = useState("");
  const [metodoPagamento, setMetodoPagamento] = useState("CARTAO");

  const handleDoacao = async () => {
    const token = localStorage.getItem("token");
    const idUsuario = localStorage.getItem("idUsuario");

    console.log("Token:", token);
    console.log("ID do Usuário:", idUsuario);

    if (!token) {
      toast.error("Você precisa estar logado para realizar uma doação.", {
        position: "top-right",
        autoClose: 3000,
      });
      navigate("/login");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/salvarDoacaoFinanceira", {
        valor: valorDoacao,
        formaPagamento: metodoPagamento,
        campanha: { idCampanhaFinanceira: campanha.idCampanhaFinanceira },
        idUsuario: { id: idUsuario } // Referencia o ID do usuário logado
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.status === 201) {
        toast.success("Doação realizada com sucesso!", {
          position: "top-right",
          autoClose: 3000,
        });
        setValorDoacao("");
        setMetodoPagamento("CARTAO");
      }
    } catch (error) {
      console.error("Erro ao realizar doação:", error);
      toast.error("Falha ao realizar doação. Tente novamente.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
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
            <option value="CARTAO">Cartão</option>
            <option value="PIX">Pix</option>
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