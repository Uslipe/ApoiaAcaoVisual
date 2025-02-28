import React, { useState, useEffect } from "react";
import axios from "axios";

export default function FinancialCampaignCard({
  nome,
  descricao,
  valorArrecadado,
  metaValor,
  diasRestantes,
  onDoar,
  idCampanhaFinanceira
}) {
  const [imagem, setImagem] = useState(null);

  // Recupera o token armazenado
  const token = localStorage.getItem("token"); // Ou sessionStorage.getItem("token")

  // Carrega a imagem da campanha
  useEffect(() => {
    console.log(`🔄 Buscando imagem para campanha ID: ${idCampanhaFinanceira}`);
    axios.get(`http://localhost:8080/imagemCampanha/${idCampanhaFinanceira}`, {
      responseType: 'arraybuffer',
    }).then((response) => {
      //Logs
      console.log("✅ Imagem recebida com sucesso!");
      console.log("📏 Tamanho da imagem (bytes):", response.data.byteLength);
      console.log("📝 Tipo da imagem:", response.headers['content-type']);

      const imageBlob = new Blob([response.data], { type: response.headers['content-type'] });
      const imageUrl = URL.createObjectURL(imageBlob);

      console.log("🌐 URL gerada para a imagem:", imageUrl);
      setImagem(imageUrl);
    }).catch((error) => {
      console.error("Erro ao buscar imagem da campanha:", error);
    });
  }, [idCampanhaFinanceira, token]);

  // Evita divisão por zero e limita a duas casas decimais
  const percentual = metaValor > 0 ? ((valorArrecadado / metaValor) * 100).toFixed(2) : 0;

  return (
    <div className="card shadow-sm m-2 p-3" style={{ width: "18rem" }}>
      <div className="card-body">
        {/* Exibição da imagem no topo do card */}
        <div className="card-img-top" style={{ height: "150px", overflow: "hidden" }}>
          {imagem ? (
            <img src={imagem} alt={nome} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          ) : (
            <div className="d-flex justify-content-center align-items-center" style={{ height: "100%", backgroundColor: "#f0f0f0" }}>
              <span>Imagem não disponível</span>
            </div>
          )}
        </div>

        <h5 className="card-title fw-bold">{nome}</h5>
        <p className="card-text text-muted">{descricao}</p>

        {/* Barra de progresso */}
        <div className="progress mb-2" style={{ height: "10px" }}>
          <div 
            className="progress-bar bg-success" 
            role="progressbar" 
            style={{ width: `${percentual}%` }}
            aria-valuenow={percentual} 
            aria-valuemin="0" 
            aria-valuemax="100"
          />
        </div>

        <p className="mb-1">{percentual}% arrecadado</p>
        <p className="mb-1">R$ {valorArrecadado.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} arrecadados</p>
        <p className="text-muted">{diasRestantes} dias restantes</p>

        {/* Botão Doar */}
        <button 
          className="btn btn-primary" 
          style={{ position: "absolute", bottom: "10px", right: "10px" }}
          onClick={onDoar}
        >
          Doar
        </button>
      </div>
    </div>
  );
}
