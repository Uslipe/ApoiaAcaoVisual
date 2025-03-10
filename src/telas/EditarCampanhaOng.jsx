/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../layout/Navbar";
import "./resources/editarCampanhaOng.css";

export default function EditarCampanhaOng() {
  const navigate = useNavigate();
  const location = useLocation();
  const { campanha, tipo } = location.state; // Assuming the campaign data and type are passed via state

  const [nome, setNome] = useState(campanha.nome);
  const [descricao, setDescricao] = useState(campanha.descricao);
  const [dataFim, setDataFim] = useState(campanha.dataFim);
  const [metaValor, setMetaValor] = useState(campanha.metaValor || "");
  const [endereco, setEndereco] = useState(campanha.endereco || "");
  const [quantidadeDeItens, setQuantidadeDeItens] = useState(
    campanha.quantidadeDeItens || "",
  );
  const [itensACaminho, setItensACaminho] = useState(
    campanha.itensACaminho || 0,
  );
  const [doacoes, setDoacoes] = useState([]);

  // Determine the campaign ID based on the type of campaign
  const campanhaId =
    tipo === "financeira"
      ? campanha.idCampanhaFinanceira
      : campanha.idCampanhaDeItens;

  useEffect(() => {
    const token = localStorage.getItem("token");

    console.log("Token:", token);
    console.log("Campanha ID:", campanhaId);
    console.log("Tipo de Campanha:", tipo);

    if (!token || !campanhaId) {
      navigate("/loginOng");
      return;
    }

    const fetchDoacoes = async () => {
      try {
        const response = await axios.get(
          `https://plataformaong-production.up.railway.app/listarDoacoesPorCampanhaDeItens/${campanhaId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        console.log("Resposta da API (Doações):", response.data);
        setDoacoes(response.data);
      } catch (error) {
        console.error("Erro ao buscar doações:", error);
      }
    };

    if (tipo === "itens") {
      fetchDoacoes();
    }
  }, [navigate, campanhaId, tipo]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const url =
        tipo === "financeira"
          ? `https://plataformaong-production.up.railway.app/editarCampanhaFinanceira/${campanhaId}`
          : `https://plataformaong-production.up.railway.app/editarCampanhaDeItens/${campanhaId}`;

      const response = await axios.put(
        url,
        {
          nome,
          descricao,
          dataFim,
          metaValor: tipo === "financeira" ? metaValor : undefined,
          endereco: tipo === "itens" ? endereco : undefined,
          quantidadeDeItens: tipo === "itens" ? quantidadeDeItens : undefined,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.status === 200) {
        toast.success("Campanha atualizada com sucesso!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
        });
      }
    } catch (error) {
      console.error("Erro ao atualizar campanha:", error);
      toast.error("Falha ao atualizar campanha. Tente novamente.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
      });
    }
  };

  const handleDelete = async () => {
    const token = localStorage.getItem("token");

    try {
      const url =
        tipo === "financeira"
          ? `https://plataformaong-production.up.railway.app/deletarCampanhaFinanceira/${campanhaId}`
          : `https://plataformaong-production.up.railway.app/deletarCampanhaDeItens/${campanhaId}`;

      const response = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 204) {
        toast.success("Campanha deletada com sucesso!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
        });
        navigate("/gerenciarCampanhasOng");
      }
    } catch (error) {
      console.error("Erro ao deletar campanha:", error);
      toast.error("Falha ao deletar campanha. Tente novamente.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
      });
    }
  };

  const handleRecebida = async (doacaoId) => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.put(
        `https://plataformaong-production.up.railway.app/marcarDoacaoComoRecebida/${doacaoId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.status === 200) {
        toast.success("Doação marcada como recebida!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
        });
        setDoacoes(
          doacoes.filter((doacao) => doacao.idDoacaoDeItens !== doacaoId),
        );
      }
    } catch (error) {
      console.error("Erro ao marcar doação como recebida:", error);
      toast.error("Falha ao marcar doação como recebida. Tente novamente.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
      });
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-4 editar-campanha-container">
        <h2>Editar Campanha</h2>
        <form onSubmit={handleUpdate}>
          <div className="form-group">
            <label htmlFor="nome">Nome</label>
            <input
              type="text"
              className="form-control"
              id="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="descricao">Descrição</label>
            <textarea
              className="form-control"
              id="descricao"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="dataFim">Data de Fim</label>
            <input
              type="date"
              className="form-control"
              id="dataFim"
              value={dataFim}
              onChange={(e) => setDataFim(e.target.value)}
              required
            />
          </div>
          {tipo === "financeira" && (
            <div className="form-group">
              <label htmlFor="metaValor">Meta Valor</label>
              <input
                type="number"
                className="form-control"
                id="metaValor"
                value={metaValor}
                onChange={(e) => setMetaValor(e.target.value)}
              />
            </div>
          )}
          {tipo === "itens" && (
            <>
              <div className="form-group">
                <label htmlFor="quantidadeDeItens">Quantidade de Itens</label>
                <input
                  type="number"
                  className="form-control"
                  id="quantidadeDeItens"
                  value={quantidadeDeItens}
                  onChange={(e) => setQuantidadeDeItens(e.target.value)}
                />
              </div>
              <div className="itens-a-caminho" style={{ fontSize: "small" }}>
                Itens a caminho: {itensACaminho}
              </div>
              <div className="doacoes-lista">
                <h3>Doações</h3>
                {doacoes.length > 0 ? (
                  doacoes.map((doacao) => (
                    <div key={doacao.idDoacaoDeItens} className="doacao-item">
                      <span>ID: {doacao.idDoacaoDeItens}</span>
                      <span>Nome: {doacao.nomeDoador}</span>
                      <span>Quantidade: {doacao.quantidadeDeItens}</span>
                      <button
                        className="btn btn-success"
                        onClick={() => handleRecebida(doacao.idDoacaoDeItens)}
                      >
                        Recebida
                      </button>
                    </div>
                  ))
                ) : (
                  <p>Nenhuma doação encontrada.</p>
                )}
              </div>
            </>
          )}
          <button type="submit" className="btn btn-primary mt-3">
            Editar Campanha
          </button>
          <button
            type="button"
            className="btn btn-danger mt-3 ml-3"
            onClick={handleDelete}
          >
            Deletar Campanha
          </button>
        </form>
      </div>
    </div>
  );
}
