export default function Card() {
  return (
    <>
      <div className="col">
        <div
          className="card bg-eco border border-5 border-success"
          style={{ width: "18rem" }}
        >
          <img
            src="../public\exProd.png"
            className="card-img-top object-fit-cover"
            alt="img"
          />
          <div className="card-body">
            <h5 className="card-title eco-card-text">Nome Produto</h5>
            <p className="card-text eco-card-text">descrição produto</p>
            <h5 className="card-text fw-bolder eco-card-text">R$ 16,90</h5>
            <button className="btn btn-eco px-3">
              <i class="bi bi-cart-plus-fill"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
