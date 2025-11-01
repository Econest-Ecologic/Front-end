import { useNavigate } from "react-router-dom";
import { NavbarLogado } from "../NavbarLogado";
import { useState, useEffect } from "react";
import { estoqueService } from "../../services/estoqueService";
import { produtoService } from "../../services/produtoService";
import * as bootstrap from "bootstrap";

export default function Carrinho() {
  const [carrinho, setCarrinho] = useState([]);
  const [loading, setLoading] = useState(true);
  const [validandoEstoque, setValidandoEstoque] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    carregarCarrinho();
  }, []);

  const carregarCarrinho = async () => {
    try {
      const savedCart = localStorage.getItem("carrinho");

      if (!savedCart || savedCart === "undefined" || savedCart === "null") {
        setCarrinho([]);
        setLoading(false);
        return;
      }

      const parsedCart = JSON.parse(savedCart);

      if (Array.isArray(parsedCart) && parsedCart.length > 0) {
        setCarrinho(parsedCart);
      } else {
        setCarrinho([]);
      }
    } catch {
      setCarrinho([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!loading) {
      if (carrinho.length > 0) {
        localStorage.setItem("carrinho", JSON.stringify(carrinho));
      }
    }
  }, [carrinho, loading]);

  const removerItem = async (index) => {
    const item = carrinho[index];

    if (!window.confirm(`Remover "${item.nome}" do carrinho?`)) {
      return;
    }

    try {
      await estoqueService.liberarEstoque(item.cdProduto, item.quantidade);

      const novoCarrinho = carrinho.filter((_, i) => i !== index);
      setCarrinho(novoCarrinho);

      if (novoCarrinho.length === 0) {
        localStorage.removeItem("carrinho");
      } else {
        localStorage.setItem("carrinho", JSON.stringify(novoCarrinho));
      }

      mostrarToast("Item removido e estoque liberado", "bg-success");
    } catch {
      mostrarToast("Erro ao remover item", "bg-danger");
    }
  };

  const atualizarQuantidade = async (index, novaQuantidade) => {
    if (novaQuantidade < 1) return;

    const item = carrinho[index];
    const quantidadeAnterior = item.quantidade;
    const diferenca = novaQuantidade - quantidadeAnterior;

    try {
      const estoque = await estoqueService.buscarPorProduto(item.cdProduto);

      if (diferenca > 0) {
        if (estoque.qtdEstoque < diferenca) {
          mostrarToast(
            `Estoque disponível: ${estoque.qtdEstoque} unidades`,
            "bg-danger"
          );
          return;
        }

        await estoqueService.reservarEstoque(item.cdProduto, diferenca);
      } else if (diferenca < 0) {
        const quantidadeLiberar = Math.abs(diferenca);
        await estoqueService.liberarEstoque(item.cdProduto, quantidadeLiberar);
      }

      const novoCarrinho = carrinho.map((item, i) =>
        i === index ? { ...item, quantidade: novaQuantidade } : item
      );
      setCarrinho(novoCarrinho);

      mostrarToast("Quantidade atualizada", "bg-success");
    } catch (error) {
      mostrarToast(
        error.message || "Erro ao atualizar. Tente novamente.",
        "bg-danger"
      );
    }
  };

  const calcularTotal = () => {
    return carrinho.reduce((total, item) => {
      const preco = parseFloat(item.preco) || 0;
      const quantidade = parseInt(item.quantidade) || 1;
      return total + preco * quantidade;
    }, 0);
  };

  const handleFinalizarCompra = async () => {
    if (carrinho.length === 0) {
      mostrarToast("Carrinho vazio", "bg-warning");
      return;
    }

    setValidandoEstoque(true);

    try {
      let todosDisponiveis = true;

      for (const item of carrinho) {
        try {
          const produto = await produtoService.buscarPorId(item.cdProduto);

          if (!produto.flAtivo) {
            mostrarToast(
              `"${item.nome}" não está mais disponível`,
              "bg-warning"
            );
            todosDisponiveis = false;
            break;
          }

          if (produto.qtdEstoque < item.quantidade) {
            mostrarToast(
              `Estoque insuficiente para "${item.nome}". Disponível: ${produto.qtdEstoque}`,
              "bg-warning"
            );
            todosDisponiveis = false;
            break;
          }
        } catch {
          todosDisponiveis = false;
          break;
        }
      }

      if (!todosDisponiveis) {
        mostrarToast("Verifique os itens do carrinho", "bg-warning");
        return;
      }

      navigate("/pagamento");
    } catch {
      mostrarToast("Erro ao validar carrinho. Tente novamente.", "bg-danger");
    } finally {
      setValidandoEstoque(false);
    }
  };

  const mostrarToast = (msg, color = "bg-success") => {
    const toastEl = document.getElementById("toast");
    if (toastEl) {
      const toast = new bootstrap.Toast(toastEl);
      document.querySelector("#toast .toast-body").textContent = msg;
      toastEl.className = `toast align-items-center ${color} text-white position-fixed bottom-0 end-0 mb-3 me-3`;
      toast.show();
    }
  };

  if (loading) {
    return (
      <>
        <NavbarLogado carrinho={carrinho} />
        <main className="container mx-auto p-4 min-vh-100 d-flex justify-content-center align-items-center">
          <div className="spinner-border text-success" role="status">
            <span className="visually-hidden">Carregando carrinho...</span>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <NavbarLogado carrinho={carrinho} />
      <main className="container mx-auto p-4 min-vh-100">
        <h1 className="text-3xl font-bold mb-6">
          <i className="bi bi-cart3 me-2"></i>
          Carrinho de Compras ({carrinho.length}{" "}
          {carrinho.length === 1 ? "item" : "itens"})
        </h1>

        {carrinho.length === 0 ? (
          <div className="text-center py-12">
            <i className="bi bi-cart-x fs-1 text-muted"></i>
            <p className="text-xl text-muted mt-3">Seu carrinho está vazio</p>
            <button
              className="btn btn-eco mt-3"
              onClick={() => navigate("/homeLogado")}
            >
              <i className="bi bi-shop me-2"></i>
              Continuar Comprando
            </button>
          </div>
        ) : (
          <div>
            <div className="space-y-4 mb-6">
              {carrinho.map((item, index) => (
                <div
                  key={`${item.cdProduto}-${index}`}
                  className="border border-2 border-success rounded-lg p-4 d-flex justify-content-between align-items-center mt-2 rounded-2"
                >
                  <div className="d-flex align-items-center gap-3 flex-1">
                    {item.img && (
                      <img
                        src={item.img}
                        alt={item.nome}
                        style={{
                          width: "80px",
                          height: "80px",
                          objectFit: "contain",
                          borderRadius: "8px",
                        }}
                        onError={(e) => {
                          e.target.src = "/placeholder.png";
                        }}
                      />
                    )}
                    <div className="flex-1">
                      <h3 className="font-semibold">
                        {item.nome || "Produto"}
                      </h3>
                      <p className="text-muted font-semibold">
                        R$ {parseFloat(item.preco || 0).toFixed(2)} x{" "}
                        {item.quantidade}
                      </p>
                      <p className="fw-bold text-success">
                        Subtotal: R${" "}
                        {(
                          parseFloat(item.preco || 0) *
                          parseInt(item.quantidade || 1)
                        ).toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <div className="d-flex align-items-center gap-4">
                    <div className="d-flex align-items-center gap-2">
                      <button
                        onClick={() =>
                          atualizarQuantidade(index, (item.quantidade || 1) - 1)
                        }
                        className="btn btn-eco px-3 py-1"
                        disabled={item.quantidade <= 1}
                      >
                        -
                      </button>
                      <span className="px-3 fw-bold">
                        {item.quantidade || 1}
                      </span>
                      <button
                        onClick={() =>
                          atualizarQuantidade(index, (item.quantidade || 1) + 1)
                        }
                        className="btn btn-eco px-3 py-1"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => removerItem(index)}
                      className="btn btn-danger px-4 py-2"
                    >
                      <i className="bi bi-trash me-1"></i>
                      Remover
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-top pt-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="fs-5">Subtotal:</h4>
                <h4 className="fs-5">R$ {calcularTotal().toFixed(2)}</h4>
              </div>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="fs-5">Frete:</h4>
                <h4 className="fs-5 text-success">
                  {calcularTotal() >= 100 ? "GRÁTIS" : "A calcular"}
                </h4>
              </div>
              <div className="d-flex justify-content-between align-items-center text-xl fw-bold border-top pt-3">
                <h4 className="fs-4">Total:</h4>
                <h4 className="fs-4 text-success">
                  R$ {calcularTotal().toFixed(2)}
                </h4>
              </div>

              <div className="d-flex gap-3 mt-4">
                <button
                  className="btn btn-outline-secondary flex-grow-1 py-3"
                  onClick={() => navigate("/homeLogado")}
                >
                  <i className="bi bi-arrow-left me-2"></i>
                  Continuar Comprando
                </button>
                <button
                  onClick={handleFinalizarCompra}
                  className="btn btn-eco flex-grow-1 py-3 fw-semibold"
                  disabled={validandoEstoque || carrinho.length === 0}
                >
                  {validandoEstoque ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Validando...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-credit-card me-2"></i>
                      Finalizar Compra
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <div
        className="toast align-items-center bg-success text-white position-fixed bottom-0 end-0 mb-3 me-3"
        role="alert"
        id="toast"
        style={{ zIndex: 9999 }}
      >
        <div className="d-flex">
          <div className="toast-body">Mensagem</div>
          <button
            type="button"
            className="btn-close btn-close-white me-2 m-auto"
            data-bs-dismiss="toast"
          ></button>
        </div>
      </div>
    </>
  );
}
