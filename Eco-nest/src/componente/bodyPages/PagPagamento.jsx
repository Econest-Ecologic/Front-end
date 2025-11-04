import { useState, useEffect } from "react";
import { NavbarLogado } from "../NavbarLogado";
import Toast from "../Toast";
import { useNavigate } from "react-router-dom";
import { produtoService } from "../../services/produtoService";
import { estoqueService } from "../../services/estoqueService";
import * as bootstrap from "bootstrap";

export default function PagPagamento() {
  const [carrinho, setCarrinho] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processando, setProcessando] = useState(false);
  const [pag, setPag] = useState("");
  const [toastMsg, setToastMsg] = useState("");
  const [toastColor, setToastColor] = useState("bg-success");
  const navigate = useNavigate();

  useEffect(() => {
    carregarCarrinho();
  }, []);

  const carregarCarrinho = async () => {
    try {
      const savedCart = localStorage.getItem("carrinho");

      if (!savedCart || savedCart === "undefined" || savedCart === "null") {
        navigate("/homelogado");
        return;
      }

      const parsedCart = JSON.parse(savedCart);

      if (!Array.isArray(parsedCart) || parsedCart.length === 0) {
        mostrarToast("Carrinho vazio", "bg-warning");
        setTimeout(() => navigate("/homelogado"), 2000);
        return;
      }

      const carrinhoValidado = await validarCarrinho(parsedCart);

      if (carrinhoValidado.length === 0) {
        mostrarToast("Carrinho vazio ou produtos indisponíveis", "bg-warning");
        localStorage.removeItem("carrinho");
        setTimeout(() => navigate("/homelogado"), 2000);
        return;
      }

      setCarrinho(carrinhoValidado);
    } catch (error) {
      console.error("Erro ao carregar carrinho:", error);
      mostrarToast("Erro ao carregar carrinho", "bg-danger");
      setTimeout(() => navigate("/homelogado"), 2000);
    } finally {
      setLoading(false);
    }
  };

  const validarCarrinho = async (itens) => {
    const itensValidos = [];

    for (const item of itens) {
      try {
        const produto = await produtoService.buscarPorId(item.cdProduto);

        if (!produto.flAtivo) {
          mostrarToast(`"${item.nome}" não está mais disponível`, "bg-warning");
          continue;
        }

        const estoque = await estoqueService.buscarPorProduto(item.cdProduto);

        if (estoque.qtdEstoque < item.quantidade) {
          mostrarToast(
            `Estoque insuficiente para "${item.nome}"`,
            "bg-warning"
          );
          continue;
        }

        itensValidos.push(item);
      } catch (error) {
        console.error(`Erro ao validar ${item.nome}:`, error);
      }
    }

    return itensValidos;
  };

  const calcularSubtotal = () => {
    return carrinho.reduce((total, item) => {
      return total + parseFloat(item.preco) * parseInt(item.quantidade);
    }, 0);
  };

  const calcularFrete = () => {
    const subtotal = calcularSubtotal();
    return subtotal >= 100 ? 0 : 15.0;
  };

  const calcularTotal = () => {
    return calcularSubtotal() + calcularFrete();
  };

  const mostrarToast = (msg, color = "bg-success") => {
    setToastMsg(msg);
    setToastColor(color);
    const toast = document.getElementById("liveToast");
    if (toast) {
      const toastFinal = new bootstrap.Toast(toast);
      setTimeout(() => toastFinal.show(), 50);
    }
  };

  const finalizarCompra = async () => {
    if (!pag) {
      mostrarToast("Selecione uma forma de pagamento", "bg-warning");
      return;
    }

    if (carrinho.length === 0) {
      mostrarToast("Carrinho vazio", "bg-warning");
      return;
    }

    setProcessando(true);

    try {
      console.log("Validando carrinho antes de finalizar...");
      const carrinhoValidado = await validarCarrinho(carrinho);

      if (carrinhoValidado.length === 0) {
        mostrarToast("Não há produtos disponíveis para compra", "bg-danger");
        localStorage.removeItem("carrinho");
        setTimeout(() => navigate("/homelogado"), 2000);
        return;
      }

      if (carrinhoValidado.length < carrinho.length) {
        setCarrinho(carrinhoValidado);
        mostrarToast(
          "Alguns produtos foram removidos. Verifique seu carrinho.",
          "bg-warning"
        );
        setProcessando(false);
        return;
      }

      console.log("Processando compra...");

      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log("Pagamento confirmado!");
      console.log("Estoque já foi reservado anteriormente");

      localStorage.removeItem("carrinho");
      setCarrinho([]);

      mostrarToast("Compra finalizada com sucesso!", "bg-success");

      setTimeout(() => {
        navigate("/homelogado");
      }, 2000);
    } catch (error) {
      console.error("Erro ao finalizar compra:", error);
      mostrarToast("Erro ao finalizar compra. Tente novamente.", "bg-danger");
      setProcessando(false);
    }
  };

  if (loading) {
    return (
      <>
        <NavbarLogado carrinho={carrinho} />
        <main className="container-xxl d-flex justify-content-center align-items-center min-vh-100">
          <div className="spinner-border text-success" role="status">
            <span className="visually-hidden">Carregando...</span>
          </div>
        </main>
      </>
    );
  }

  if (carrinho.length === 0) {
    return (
      <>
        <NavbarLogado carrinho={[]} />
        <main className="container-xxl d-flex flex-column align-items-center justify-content-center min-vh-100">
          <i className="bi bi-cart-x fs-1 text-muted mb-3"></i>
          <h3>Carrinho vazio</h3>
          <button
            className="btn btn-eco mt-3"
            onClick={() => navigate("/homelogado")}
          >
            Voltar para Home
          </button>
        </main>
      </>
    );
  }

  return (
    <>
      <NavbarLogado carrinho={carrinho} />
      <main className="container-xxl d-flex flex-column align-items-center w-100 min-vh-100 py-4">
        <div className="w-100 mb-4">
          <button
            className="btn btn-voltar border-0 fs-4"
            onClick={() => navigate("/carrinho")}
            disabled={processando}
          >
            <i className="bi bi-arrow-left-short"></i> Voltar ao Carrinho
          </button>
        </div>

        <div className="row w-100 g-4">
          <div className="col-lg-4">
            <div className="card border-success">
              <div className="card-header bg-success text-white">
                <h4 className="mb-0">
                  <i className="bi bi-receipt me-2"></i>
                  Resumo do Pedido
                </h4>
              </div>
              <div className="card-body">
                {carrinho.map((item, index) => (
                  <div key={index} className="mb-3 pb-3 border-bottom">
                    <div className="d-flex justify-content-between">
                      <div>
                        <p className="mb-1 fw-bold">{item.nome}</p>
                        <small className="text-muted">
                          Qtd: {item.quantidade} x R${" "}
                          {parseFloat(item.preco).toFixed(2)}
                        </small>
                      </div>
                      <p className="mb-0 fw-bold">
                        R${" "}
                        {(parseFloat(item.preco) * item.quantidade).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}

                <div className="d-flex justify-content-between mb-2">
                  <span>Subtotal:</span>
                  <span>R$ {calcularSubtotal().toFixed(2)}</span>
                </div>

                <div className="d-flex justify-content-between mb-2">
                  <span>Frete:</span>
                  <span
                    className={
                      calcularFrete() === 0 ? "text-success fw-bold" : ""
                    }
                  >
                    {calcularFrete() === 0
                      ? "GRÁTIS"
                      : `R$ ${calcularFrete().toFixed(2)}`}
                  </span>
                </div>

                <hr />

                <div className="d-flex justify-content-between fs-5 fw-bold">
                  <span>Total:</span>
                  <span className="text-success">
                    R$ {calcularTotal().toFixed(2)}
                  </span>
                </div>

                {calcularSubtotal() >= 100 && (
                  <div className="alert alert-success mt-3 mb-0" role="alert">
                    <i className="bi bi-truck me-2"></i>
                    <small>Você ganhou frete grátis!</small>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="col-lg-8 border border-success p-0">
            <div className=" border-success w-100 h-100">
              <div className="card-header bg-success text-white">
                <h4 className="mb-0">
                  <i className="bi bi-credit-card me-2"></i>
                  Escolha a Forma de Pagamento
                </h4>
              </div>
              <div className="card-body mt-3 p-3">
                <div className="row g-3">
                  <div className="col-md-4">
                    <input
                      type="radio"
                      className="btn-check"
                      name="pagamento"
                      id="pix"
                      onChange={() => setPag("PIX")}
                      disabled={processando}
                    />
                    <label
                      className="btn btn-outline-success w-100 py-4"
                      htmlFor="pix"
                      style={{ minHeight: "120px" }}
                    >
                      <i className="bi bi-qr-code fs-1 d-block mb-2"></i>
                      <strong>PIX</strong>
                      <br />
                      <small className="text-muted">Aprovação imediata</small>
                    </label>
                  </div>

                  <div className="col-md-4">
                    <input
                      type="radio"
                      className="btn-check"
                      name="pagamento"
                      id="cartao"
                      onChange={() => setPag("CARTAO")}
                      disabled={processando}
                    />
                    <label
                      className="btn btn-outline-success w-100 py-4"
                      htmlFor="cartao"
                      style={{ minHeight: "120px" }}
                    >
                      <i className="bi bi-credit-card-fill fs-1 d-block mb-2"></i>
                      <strong>Cartão</strong>
                      <br />
                      <small className="text-muted">Crédito ou Débito</small>
                    </label>
                  </div>

                  <div className="col-md-4">
                    <input
                      type="radio"
                      className="btn-check"
                      name="pagamento"
                      id="boleto"
                      onChange={() => setPag("BOLETO")}
                      disabled={processando}
                    />
                    <label
                      className="btn btn-outline-success w-100 py-4"
                      htmlFor="boleto"
                      style={{ minHeight: "120px" }}
                    >
                      <i className="bi bi-upc-scan fs-1 d-block mb-2"></i>
                      <strong>Boleto</strong>
                      <br />
                      <small className="text-muted">
                        Aprovação em 1-2 dias
                      </small>
                    </label>
                  </div>
                </div>

                {pag && (
                  <div className="alert alert-info mt-4" role="alert">
                    <i className="bi bi-info-circle me-2"></i>
                    Forma de pagamento selecionada: <strong>{pag}</strong>
                  </div>
                )}

                <div className="mt-4">
                  <button
                    className="btn btn-eco w-100 py-3 fs-5 fw-bold"
                    onClick={finalizarCompra}
                    disabled={!pag || processando}
                  >
                    {processando ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Processando pagamento...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-check-circle me-2"></i>
                        Finalizar Compra
                      </>
                    )}
                  </button>
                </div>

                <div className="mt-3 text-center">
                  <small className="text-muted">
                    <i className="bi bi-shield-check me-1"></i>
                    Ambiente seguro. Seus dados estão protegidos.
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <div className="toast-container position-fixed bottom-0 end-0 p-3">
        <div
          id="liveToast"
          className={`toast ${toastColor}`}
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div className="toast-header">
            <strong className="me-auto">Notificação</strong>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="toast"
            ></button>
          </div>
          <div className="toast-body text-white">{toastMsg}</div>
        </div>
      </div>
    </>
  );
}
