import React, { useState, useEffect } from "react";
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
  const [nomeTitular, setNomeTitular] = useState("");
  const [digitosCartao, setDigitosCartao] = useState("");
  const [dataDeValidade, setDataDeValidade] = useState("");
  const [cvv, setCvv] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("https://plataformaong-production.up.railway.app/ultimoCartaoDeCredito", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          if (response.data) {
            const { nomeTitular, digitosCartao, dataDeValidade } =
              response.data;
            setNomeTitular(nomeTitular);
            setDigitosCartao(digitosCartao);
            setDataDeValidade(dataDeValidade.slice(0, 7)); // Apenas ano-mês
          }
        })
        .catch((error) => {
          console.error("Erro ao buscar o último cartão de crédito:", error);
        });
    }
  }, []);

  const handleDoacao = async () => {
    const token = localStorage.getItem("token");
    const idUsuario = localStorage.getItem("idUsuario");

    if (!valorDoacao) {
      toast.error("Digite ou selecione um valor a ser doado.", {
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
      // Se o método de pagamento for cartão, primeiro cadastra o cartão
      if (metodoPagamento === "CARTAO") {
        // Adiciona um dia do mês à data de validade
        const [ano, mes] = dataDeValidade.split("-");
        const dataDeValidadeCompleta = `${ano}-${mes}-25`; // Adiciona o dia 25

        const cartaoResponse = await axios.post(
          "https://plataformaong-production.up.railway.app/cadastrarCartaoDeCredito",
          {
            nomeTitular,
            digitosCartao,
            dataDeValidade: dataDeValidadeCompleta,
            cvv,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (cartaoResponse.status !== 200) {
          throw new Error("Erro ao cadastrar o cartão de crédito.");
        }
      }

      const doacaoResponse = await axios.post(
        "https://plataformaong-production.up.railway.app/salvarDoacaoFinanceira",
        {
          valor: valorDoacao,
          formaPagamento: metodoPagamento,
          campanha: { idCampanhaFinanceira: campanha.idCampanhaFinanceira },
          idUsuario: { id: idUsuario },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.dismiss(notificacaoDeEspera);

      if (doacaoResponse.status === 201) {
        toast.success("Doação realizada com sucesso!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
        });
        setValorDoacao("");
        setMetodoPagamento("CARTAO");

        axios
          .get("https://plataformaong-production.up.railway.app/ultimoCartaoDeCredito", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            const { nomeTitular, digitosCartao, dataDeValidade } =
              response.data;
            setNomeTitular(nomeTitular);
            setDigitosCartao(digitosCartao);
            setDataDeValidade(dataDeValidade.slice(0, 7));
            setCvv(""); // Limpar o campo CVV
          })
          .catch((error) => {
            console.error("Erro ao buscar o último cartão de crédito:", error);
          });
      }
    } catch (error) {
      console.error("Erro ao realizar doação:", error);
      toast.dismiss(notificacaoDeEspera);
      toast.error("Falha ao realizar doação. Tente novamente.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
    }
  };

  const handleValorPreDefinido = (valor) => {
    setValorDoacao(valor);
  };

  const handleCvvChange = (e) => {
    const value = e.target.value;
    if (value.length <= 3) {
      setCvv(value);
    }
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
          <h6 className="text-muted">
            por: {campanha.idOng?.nome || "Desconhecida"}
          </h6>
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
        </div>
        {metodoPagamento === "CARTAO" && (
          <div className="mt-3">
            <div className="form-group">
              <label htmlFor="nomeTitular">Nome do Titular</label>
              <input
                type="text"
                className="form-control"
                id="nomeTitular"
                value={nomeTitular}
                onChange={(e) => setNomeTitular(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="digitosCartao">Dígitos do Cartão</label>
              <input
                type="text"
                className="form-control"
                id="digitosCartao"
                value={digitosCartao}
                onChange={(e) => setDigitosCartao(e.target.value)}
                maxLength="16"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="dataDeValidade">Data de Validade</label>
              <input
                type="month"
                className="form-control"
                id="dataDeValidade"
                value={dataDeValidade}
                onChange={(e) => setDataDeValidade(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="cvv">CVV</label>
              <input
                type="number"
                className="form-control"
                id="cvv"
                value={cvv}
                onChange={handleCvvChange}
                required
              />
            </div>
          </div>
        )}
        <div className="input-group mt-3">
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
              <i className="fa-solid fa-hand-holding-heart"></i> Doe R$ {valor}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
