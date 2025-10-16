export default function Card({img,title,desc,price,badge,color="bg-success",border="border-5 eco-border"}) {
  return (
    <>
      <div className="col col-12 col-md-6 col-lg-4 col-xl-3" id="card">
        <div
          className={`card border ${border} bg-eco position-relative`}
          style={{ width: "18rem" }}
        >
        <div className={ badge ? `badge ${color} position-absolute p-2`:"none"} style={{top:"-3%", right:"-10%"}}> {badge}</div>
          <img
            src={img}
            className="card-img-top object-fit-cover p-4"
            alt="img"
            style={{borderRadius:"30px"}}
          />
          <div className="card-body px-4">
            <h5 className="card-title eco-card-text text-center">{title}</h5>
            <p className="card-text eco-card-text text-center">{desc}</p>
            <h5 className="card-text fw-bolder eco-card-text">{price}R$</h5>
            <button className="btn btn-eco px-3">
              <i className="bi bi-cart-plus-fill"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
