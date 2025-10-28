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

  return (
    <>
      <div
        className={`card border ${border} bg-eco position-relative`}
        style={{
          width: "18rem",
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
          style={{
            borderRadius: "30px",
            maxHeight: "200px",
          }}
        />

        <div className="card-body px-4 d-flex flex-column">
          <h5 className="card-title eco-card-text text-center">{title}</h5>
          <p className="card-text eco-card-text text-center flex-grow-1">
            {desc}
          </p>
          <h5 className="card-text fw-bolder eco-card-text">R$ {price}</h5>

          <button className="btn btn-eco px-3">
            <i className="bi bi-cart-plus-fill"></i>
          </button>
        </div>
      </div>
    </>
  );
}
