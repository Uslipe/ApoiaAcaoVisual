import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick"; // Importa o carrossel
import Navbar from "../layout/Navbar";
import Footer from "../layout/footer";
import FinancialCampaignCard from "../layout/FinancialCampaignCard";
import ItemCampaignCard from "../layout/ItemCampaignCard"; // Importa o novo componente
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./resources/home.css";

export default function Home() {
  const [campanhasFinanceiras, setCampanhasFinanceiras] = useState([]);
  const [campanhasItens, setCampanhasItens] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/listarCampanhasFinanceiras")
      .then((response) => setCampanhasFinanceiras(response.data))
      .catch((error) =>
        console.error("Erro ao buscar campanhas financeiras:", error)
      );

    axios
      .get("http://localhost:8080/listarCampanhasDeItens")
      .then((response) => setCampanhasItens(response.data))
      .catch((error) =>
        console.error("Erro ao buscar campanhas de itens:", error)
      );
  }, []);

  const handleDoar = (campanha) => {
    navigate("/doacaoFinanceira", { state: { campanha } });
  };

  const handleDoarItens = (campanha) => {
    navigate("/doacaoItens", { state: { campanha } });
  };

  const calcularDiasRestantes = (dataFim) => {
    const hoje = new Date();
    const fim = new Date(dataFim);
    const diferenca = Math.ceil((fim - hoje) / (1000 * 60 * 60 * 24));
    return diferenca > 0 ? diferenca : 0;
  };

  // Configurações do carrossel
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Exibe 3 campanhas por vez
    slidesToScroll: 1,
    arrows: true, // Habilita as setas de navegação
    autoplay: false, // Habilita o autoplay
    autoplaySpeed: 2000, // Define a velocidade do autoplay (2 segundos)
    responsive: [
      {
        breakpoint: 1024, // Tablets e telas médias
        settings: {
          slidesToShow: 2, // Mostra 2 cards por vez
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768, // Celulares
        settings: {
          slidesToShow: 1, // Mostra 1 card por vez
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div>
      <Navbar />

      <div className="container mt-4 home-container" style={{paddingBottom: "5%"}}>
        <h2>Campanhas Financeiras</h2>
        {campanhasFinanceiras.length > 0 ? (
          <Slider {...settings}>
            {campanhasFinanceiras.map((campanha) => (
              <div key={campanha.idCampanhaFinanceira}>
                <FinancialCampaignCard
                  nome={campanha.nome}
                  descricao={campanha.descricao}
                  valorArrecadado={campanha.valorArrecadado}
                  metaValor={campanha.metaValor}
                  diasRestantes={calcularDiasRestantes(campanha.dataFim)}
                  onDoar={() => handleDoar(campanha)}
                  idCampanhaFinanceira={campanha.idCampanhaFinanceira}
                />
              </div>
            ))}
          </Slider>
        ) : (
          <p>Nenhuma campanha disponível.</p>
        )}

        <h2 className="mt-4" style={{paddingTop: "5%"}}>Campanhas de Itens</h2>
        {campanhasItens.length > 0 ? (
          <Slider {...settings}>
            {campanhasItens.map((campanha) => (
              <div key={campanha.idCampanhaDeItens}>
                <ItemCampaignCard
                  nome={campanha.nome}
                  descricao={campanha.descricao}
                  quantidadeDeItens={campanha.quantidadeDeItens}
                  quantidadeDeItensEntregues={campanha.quantidadeDeItensEntregues}
                  diasRestantes={calcularDiasRestantes(campanha.dataFim)}
                  onDoar={() => handleDoarItens(campanha)}
                  idCampanhaDeItens={campanha.idCampanhaDeItens}
                />
              </div>
            ))}
          </Slider>
        ) : (
          <p>Nenhuma campanha de itens disponível.</p>
        )}
      </div>

      <Footer />
    </div>
  );
}
