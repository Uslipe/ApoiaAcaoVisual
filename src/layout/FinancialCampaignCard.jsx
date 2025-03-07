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
        <div className="card-img-top" style={{ height: "150px", overflow: "hidden", display: "flex", justifyContent: "center", alignItems: "center" }}>
          {imagem ? (
            <img src={imagem} alt={nome} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          ) : (
            <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: "100%", backgroundColor: "#f0f0f0", width: "100%" }}>
              {/* Ícone de "Imagem faltando" */}
              <svg style={{ color: "rgb(61, 61, 61)", width: "40px", height: "40px" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 16v-4m0 0V5a2 2 0 0 0-2-2H8m13 9c-1.475 0-2.804.104-4 .291M3 16v3a2 2 0 0 0 2 2v0h11M3 16c1.403-.234 3.637-.293 5.945.243M3 16V5c0-.368.122-.939.5-1.377M16 21h3c.368 0 .939-.122 1.377-.5M16 21c-1.704-2.768-4.427-4.148-7.055-4.757m0 0c.927-1.073 2.24-2.084 4.055-2.85M7.341 7.5C7.14 7.728 7 8.051 7 8.5 7 9.7 8 10 8.5 10a1.66 1.66 0 0 0 1-.348M2 2l20 20" fill="#3d3d3d"></path>
              </svg>
              {/* Texto abaixo do ícone */}
              <span style={{ marginTop: "10px", color: "#3d3d3d", fontSize: "14px" }}>Imagem indisponível</span>
            </div>
          )}
        </div>

        <br></br>
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
