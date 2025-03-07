import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Navbar from "../layout/Navbar";
import "./resources/doacaoItens.css";

export default function DoacaoItens() {
  const location = useLocation();
  const navigate = useNavigate();
  const { campanha } = location.state || {};
  const [quantidade, setQuantidade] = useState("");

  const handleDoacao = async () => {
    const token = localStorage.getItem("token");
    const idUsuario = localStorage.getItem("idUsuario");

    if (!quantidade) {
      toast.error("Informe a quantidade de itens para doação.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        pauseOnHover: false,
      });
      return;
    }

    if (!token) {
      toast.error("Você precisa estar logado para realizar uma doação.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        pauseOnHover: false,
      });
      navigate("/login");
      return;
    }

    const notificacaoDeEspera = toast.info(
      "Processando sua doação, por favor aguarde...",
      {
        position: "top-right",
        autoClose: false,
        closeOnClick: false,
        draggable: false,
      },
    );

    try {
      const response = await axios.post(
        "http://localhost:8080/salvarDoacaoDeItens",
        {
          usuario: { id: idUsuario },
          campanhaDeItens: { idCampanhaDeItens: campanha.idCampanhaDeItens },
          quantidadeDeItens: quantidade,
          categoriaItens: campanha.categoriaItens,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.dismiss(notificacaoDeEspera);

      if (response.status === 201) {
        toast.success("Doação realizada com sucesso!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          pauseOnHover: false,
        });
        setQuantidade("");
      }
    } catch (error) {
      toast.error("Erro ao realizar a doação. Tente novamente.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        pauseOnHover: false,
      });
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-4 doacaoItens-container">
        <div className="campanha-info">
          <h2>{campanha.nome}</h2>
          <h6 className="text-muted">
            por: {campanha.idOng?.nome || "Desconhecida"}
          </h6>
          <p className="text-muted">Categoria: {campanha.categoriaItens}</p>
          <p className="text-muted">
            Endereço de Entrega:{" "}
            {campanha.idOng?.endereco || "Endereço não disponível"}
          </p>
        </div>
        <div className="input-group mt-3">
          <input
            type="number"
            className="form-control"
            placeholder="Quantidade de itens"
            value={quantidade}
            onChange={(e) => setQuantidade(e.target.value)}
            required
          />
          <button className="btn btn-primary" onClick={handleDoacao}>
            Finalizar Doação
          </button>
        </div>
      </div>
    </div>
  );
}
