import React from "react";

export default function FinancialCampaignCard({
  nome,
  descricao,
  valorArrecadado,
  metaValor,
  diasRestantes,
  onDoar
}) {
  // Evita divisão por zero e limita a duas casas decimais
  const percentual = metaValor > 0 ? ((valorArrecadado / metaValor) * 100).toFixed(2) : 0;

  return (
    <div className="card shadow-sm m-2 p-3" style={{ width: "18rem" }}>
      <div className="card-body">
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