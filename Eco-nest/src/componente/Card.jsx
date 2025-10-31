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
}) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    if (cdProduto) {
      navigate(`/produto/${cdProduto}`);
    }
  };

  const handleButtonClick = (e) => {
    e.stopPropagation();
    if (cdProduto) {
      navigate(`/produto/${cdProduto}`);
    }
  };

  return (
    <div
      className={`card border ${border} bg-eco position-relative mx-auto`}
      style={{
        width: "100%",
        maxWidth: "18rem",
        minHeight: "26rem",
        maxHeight: "30rem",
        cursor: "pointer",
      }}
      onClick={handleCardClick}
    >
      <div
        className={badge ? `badge ${color} position-absolute p-2` : "d-none"}
        style={{ top: "-3%", right: "-10%" }}
      >
        {badge}
      </div>

      <img
        src={img}
        className="card-img-top object-fit-cover p-4"
        alt={title}
        onError={(e) => {
          console.error("❌ Erro ao carregar imagem do card:", title);
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
        <h5 className="card-text fw-bolder eco-card-text">R$ {price}</h5>

        <button
          className="btn btn-eco px-3"
          onClick={handleButtonClick}
          title="Ver detalhes do produto"
        >
          <i className="bi bi-cart-plus-fill"></i>
        </button>
      </div>
    </div>
  );
}
