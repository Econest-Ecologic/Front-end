import { useState, useEffect } from "react";
import { NavbarLogado } from "../NavbarLogado";
import Toast from "../Toast";
import { useNavigate } from "react-router-dom";
/* global bootstrap */
export default function PagPagamento() {
  const [carrinho, setCarrinho] = useState([]);

  const navigate = useNavigate();

  const mostrarToast = () => {
    const toast = document.getElementById("toast");
    const bsToast = new bootstrap.Toast(toast);
    localStorage.removeItem("carrinho");
    bsToast.show();
    setTimeout(() => navigate("/homelogado"), 2000);
  };

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("carrinho");
      console.log("Carrinho recebido:", savedCart);

      if (savedCart && savedCart !== "undefined" && savedCart !== "null") {
        const parsedCart = JSON.parse(savedCart);

        // Validate that parsedCart is an array
        if (Array.isArray(parsedCart)) {
          setCarrinho(parsedCart);
        } else {
          console.warn("Carrinho não é um array, inicializando vazio");
          setCarrinho([]);
          localStorage.removeItem("carrinho");
        }
      }
    } catch (error) {
      console.error("Erro ao carregar carrinho:", error);
      setCarrinho([]);
      localStorage.removeItem("carrinho");
    }
  }, []);

  const [precoTotal, setPrecoTotal] = useState(0);

  useEffect(() => {
    if (carrinho.length > 0) {
      const total = carrinho.reduce(
        (acc, item) => acc + item.preco * item.quantidade,
        0
      );
      setPrecoTotal(total);
    }
  }, [carrinho]);

  const [pag, setPag] = useState();

  return (
    <>
      <NavbarLogado carrinho={carrinho} />
      <main className="container-xxl d-flex flex-column align-items-center w-100 min-vh-100">
        <div className="title w-100 mt-3">
          <h1 className="text-start">Carrinho</h1>
        </div>

        <div
          className="w-100 d-flex justify-content-center flex-row flex-wrap mt-5"
          style={{ minHeight: "300px" }}
        >
          <div className="col w-25 border border-success p-3">
            <h3>Resumo do pedido</h3>
            <p>Subtotal R$</p>
            <p>Frete R$</p>
            <hr className="border border-1 opacity-100 border-success" />
            <h3>Total : {precoTotal}</h3>
          </div>
          <div className="col w-25 border border-success p-3">
            <h3>Escolha a forma de pagamento :</h3>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="radioDefault"
                id="radioDefault1"
                onClick={() => setPag("cartao")}
              />
              <label className="form-check-label" htmlFor="radioDefault1">
                Cartão
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="radioDefault"
                id="radioDefault2"
                onClick={() => setPag("pix")}
              />
              <label className="form-check-label" htmlFor="radioDefault2">
                Pix
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="radioDefault"
                id="radioDefault2"
                onClick={() => setPag("boleto")}
              />
              <label className="form-check-label" htmlFor="radioDefault2">
                Boleto
              </label>
            </div>
          </div>
        </div>
        <div className="w-100 text-end">
          <button
            className="btn btn-eco mt-3 me-5"
            disabled={!pag}
            onClick={() => mostrarToast()}
          >
            Finalizar Compra
          </button>
        </div>
      </main>
      <Toast msg={"Compra finalizada"} />
    </>
  );
}
