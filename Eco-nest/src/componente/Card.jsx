export default function Card() {
  return (
    <>
      <div className="col col-12 col-md-6 col-lg-4 col-xl-3" id="card">
        <div
          className="card bg-eco border border-5 eco-border"
          style={{ width: "18rem" }}
        >
          <img
            src="../public\exProd.png"
            className="card-img-top object-fit-cover p-4"
            alt="img"
            style={{borderRadius:"30px"}}
          />
          <div className="card-body">
            <h5 className="card-title eco-card-text">Nome Produto</h5>
            <p className="card-text eco-card-text">descrição produto</p>
            <h5 className="card-text fw-bolder eco-card-text">R$ 16,90</h5>
            <button className="btn btn-eco px-3">
              <i className="bi bi-cart-plus-fill"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
