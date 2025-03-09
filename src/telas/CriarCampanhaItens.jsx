import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../layout/Navbar";
import "./resources/criarCampanhaItens.css";

export default function CriarCampanhaItens() {
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");
  const [endereco, setEndereco] = useState("");
  const [quantidadeDeItens, setQuantidadeDeItens] = useState("");
  const [categoriaItens, setCategoriaItens] = useState("ROUPA");
  const [imagem, setImagem] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id");

    if (!token || !id) {
      toast.error("Você precisa estar logado para criar uma campanha.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        pauseOnHover: false,
      });
      navigate("/");
      return;
    }

    const formData = new FormData();
    formData.append(
      "campanhaDeItens",
      JSON.stringify({
        idOng: { id: id },
        nome,
        descricao,
        dataInicio,
        dataFim,
        endereco,
        quantidadeDeItens,
        categoriaItens,
      }),
    );
    if (imagem) {
      formData.append("imagem", imagem);
    }

    try {
      const response = await axios.post(
        "https://plataformaong-production.up.railway.app/salvarCampanhaDeItens",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );

      if (response.status === 201) {
        toast.success("Campanha criada com sucesso!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          pauseOnHover: false,
        });
        navigate("/AreaOng");
      }
    } catch (error) {
      console.error("Erro ao criar campanha:", error);
      toast.error("Falha ao criar campanha. Tente novamente.", {
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
      <div className="container mt-4 criar-campanha-container">
        <h2>Criar Campanha de Itens</h2>
        <form onSubmit={handleSubmit}>
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
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="dataInicio">Data de Início</label>
            <input
              type="date"
              className="form-control"
              id="dataInicio"
              value={dataInicio}
              onChange={(e) => setDataInicio(e.target.value)}
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
          <div className="form-group">
            <label htmlFor="endereco">Endereço de Entrega</label>
            <input
              type="text"
              className="form-control"
              id="endereco"
              value={endereco}
              onChange={(e) => setEndereco(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="quantidadeDeItens">Meta De Arrecadação</label>
            <input
              type="number"
              className="form-control"
              id="quantidadeDeItens"
              value={quantidadeDeItens}
              onChange={(e) => setQuantidadeDeItens(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="categoriaItens">Categoria dos Itens</label>
            <select
              className="form-control"
              id="categoriaItens"
              value={categoriaItens}
              onChange={(e) => setCategoriaItens(e.target.value)}
              required
            >
              <option value="ROUPA">Roupa</option>
              <option value="ALIMENTO">Alimento</option>
              <option value="HIGIENE">Higiene</option>
              <option value="BRINQUEDO">Brinquedo</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="imagem">Imagem</label>
            <input
              type="file"
              className="form-control"
              id="imagem"
              onChange={(e) => setImagem(e.target.files[0])}
            />
          </div>
          <button type="submit" className="btn btn-primary mt-3">
            Criar Campanha
          </button>
        </form>
      </div>
    </div>
  );
}
