import { useNavigate } from "react-router-dom";

export default function Card({
  img,
  title,
  desc,
  price,
  badge,
  color = "bg-success",
  border = "border-5 eco-border",
  cdProduto,
  qtdEstoque = 0,
  flAtivo = true,
}) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    if (cdProduto && flAtivo) {
      navigate(`/produto/${cdProduto}`);
    }
  };

  const handleButtonClick = (e) => {
    e.stopPropagation();
    if (cdProduto && flAtivo) {
      navigate(`/produto/${cdProduto}`);
    }
  };

  const getEstoqueStatus = () => {
    if (!flAtivo) {
      return {
        text: "INDISPONÍVEL",
        class: "bg-secondary",
        icon: "bi-x-circle",
      };
    }
    if (qtdEstoque === 0) {
      return { text: "ESGOTADO", class: "bg-danger", icon: "bi-x-circle" };
    }
    if (qtdEstoque <= 5) {
      return {
        text: "ÚLTIMAS UNIDADES",
        class: "bg-warning text-dark",
        icon: "bi-exclamation-triangle",
      };
    }
    return { text: "EM ESTOQUE", class: "bg-success", icon: "bi-check-circle" };
  };

  const estoqueStatus = getEstoqueStatus();

  return (
    <div
      className={`card border ${border} bg-eco position-relative mx-auto ${
        !flAtivo || qtdEstoque === 0 ? "opacity-75" : ""
      }`}
      style={{
        width: "100%",
        maxWidth: "18rem",
        minHeight: "28rem",
        maxHeight: "32rem",
        cursor: flAtivo && qtdEstoque > 0 ? "pointer" : "not-allowed",
      }}
      onClick={handleCardClick}
    >
      <div
        className={badge ? `badge ${color} position-absolute p-2` : "d-none"}
        style={{ top: "-3%", right: "-10%", zIndex: 10 }}
      >
        {badge}
      </div>

      <div
        className={`badge ${estoqueStatus.class} position-absolute p-2 d-flex align-items-center gap-1`}
        style={{ top: "10px", left: "10px", zIndex: 10, fontSize: "0.7rem" }}
      >
        <i className={`bi ${estoqueStatus.icon}`}></i>
        {estoqueStatus.text}
      </div>

      {(!flAtivo || qtdEstoque === 0) && (
        <div
          className="position-absolute w-100 h-100 d-flex align-items-center justify-content-center"
          style={{
            backgroundColor: "rgba(0,0,0,0.3)",
            zIndex: 5,
            borderRadius: "0.375rem",
          }}
        >
          <div className="badge bg-dark fs-6 p-3">
            {!flAtivo ? "PRODUTO INDISPONÍVEL" : "SEM ESTOQUE"}
          </div>
        </div>
      )}

      <img
        src={img}
        className="card-img-top object-fit-cover p-4"
        alt={title}
        onError={(e) => {
          console.error("Erro ao carregar imagem:", title);
          e.target.src = "/placeholder.png";
        }}
        style={{
          borderRadius: "30px",
          maxHeight: "200px",
          objectFit: "contain",
          backgroundColor: "#f8f9fa",
        }}
      />

      <div className="card-body px-4 d-flex flex-column">
        <h5 className="card-title eco-card-text text-center">{title}</h5>
        <p className="card-text eco-card-text text-center flex-grow-1">
          {desc}
        </p>
        <h5 className="card-text fw-bolder eco-card-text">
          R$ {parseFloat(price).toFixed(2)}
        </h5>

        <small className="text-muted mb-2">
          {qtdEstoque > 0 ? (
            <>
              <i className="bi bi-box-seam me-1"></i>
              {qtdEstoque} {qtdEstoque === 1 ? "unidade" : "unidades"}
            </>
          ) : (
            <>
              <i className="bi bi-x-circle me-1"></i>
              Sem estoque
            </>
          )}
        </small>

        <button
          className={`btn ${
            flAtivo && qtdEstoque > 0 ? "btn-eco" : "btn-secondary"
          } px-3`}
          onClick={handleButtonClick}
          title={
            !flAtivo
              ? "Produto indisponível"
              : qtdEstoque === 0
              ? "Sem estoque"
              : "Ver detalhes do produto"
          }
          disabled={!flAtivo || qtdEstoque === 0}
        >
          {!flAtivo ? (
            <>
              <i className="bi bi-x-circle me-1"></i>
              Indisponível
            </>
          ) : qtdEstoque === 0 ? (
            <>
              <i className="bi bi-x-circle me-1"></i>
              Esgotado
            </>
          ) : (
            <>
              <i className="bi bi-cart-plus-fill me-1"></i>
              Ver Produto
            </>
          )}
        </button>
      </div>
    </div>
  );
}
