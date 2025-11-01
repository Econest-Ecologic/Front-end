import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { NavbarLogado } from "../NavbarLogado";
import Footer from "../Footer";
import { produtoService } from "../../services/produtoService";
import { estoqueService } from "../../services/estoqueService";
import * as bootstrap from "bootstrap";

export default function DetalhesProduto() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [produto, setProduto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantidade, setQuantidade] = useState(1);
  const [toastMsg, setToastMsg] = useState("");
  const [toastColor, setToastColor] = useState("bg-success");
  const [carrinho, setCarrinho] = useState([]);
  const [usuario, setUsuario] = useState(null);
  const [adicionandoCarrinho, setAdicionandoCarrinho] = useState(false);

  useEffect(() => {
    // Carrega dados do usuário
    const usuarioData = localStorage.getItem("usuario");
    if (usuarioData) {
      try {
        const parsed = JSON.parse(usuarioData);
        setUsuario(parsed);
      } catch (error) {
        console.error("Erro ao parsear usuário:", error);
      }
    }

    // Carrega carrinho
    const carrinhoSalvo = localStorage.getItem("carrinho");
    if (carrinhoSalvo && carrinhoSalvo !== "null") {
      try {
        setCarrinho(JSON.parse(carrinhoSalvo));
      } catch (error) {
        console.error("Erro ao carregar carrinho:", error);
        setCarrinho([]);
      }
    }

    carregarProduto();
  }, [id]);

  const carregarProduto = async () => {
    try {
      console.log(`🔍 Carregando produto ID: ${id}`);
      const data = await produtoService.buscarPorId(id);

      console.log("📦 Dados do produto recebidos:", data);

      // ✅ Verificar se produto está ativo
      if (!data.flAtivo) {
        mostrarToast("Este produto não está mais disponível", "bg-danger");
        setTimeout(() => navigate("/homeLogado"), 2000);
        return;
      }

      // ✅ USAR O ESTOQUE QUE JÁ VEM DO BACKEND
      const estoqueAtual = data.qtdEstoque !== undefined ? data.qtdEstoque : 0;

      console.log(`📊 Estoque disponível: ${estoqueAtual}`);

      const produtoFormatado = {
        cdProduto: data.cdProduto,
        nome: data.nmProduto,
        preco: data.preco,
        categoria: data.categoria,
        descricao: data.dsProduto || "Produto ecológico de alta qualidade",
        img: data.imgProdutoBase64
          ? `data:image/jpeg;base64,${data.imgProdutoBase64}`
          : "/placeholder.png",
        qtdEstoque: estoqueAtual,
        flAtivo: data.flAtivo,
      };

      console.log("✅ Produto formatado:", produtoFormatado);
      setProduto(produtoFormatado);
    } catch (error) {
      console.error("❌ Erro ao carregar produto:", error);
      mostrarToast("Erro ao carregar produto", "bg-danger");
      setTimeout(() => navigate("/homeLogado"), 2000);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Recarregar apenas o produto (que já traz o estoque)
  const recarregarEstoque = async () => {
    try {
      console.log("🔄 Recarregando estoque...");
      const data = await produtoService.buscarPorId(id);
      const estoqueAtual = data.qtdEstoque !== undefined ? data.qtdEstoque : 0;

      setProduto((prev) => ({
        ...prev,
        qtdEstoque: estoqueAtual,
      }));

      console.log(`✅ Estoque atualizado: ${estoqueAtual}`);
      return estoqueAtual;
    } catch (error) {
      console.error("❌ Erro ao recarregar estoque:", error);
      return produto?.qtdEstoque || 0;
    }
  };

  const mostrarToast = (msg, color = "bg-success") => {
    setToastMsg(msg);
    setToastColor(color);
    const toast = document.getElementById("toast");
    if (toast) {
      const bsToast = new bootstrap.Toast(toast);
      bsToast.show();
    }
  };

  const handleAdicionarCarrinho = async () => {
    if (adicionandoCarrinho) return;

    try {
      setAdicionandoCarrinho(true);

      // ✅ 1. Verificar estoque atual do produto
      if (!produto || produto.qtdEstoque === 0) {
        mostrarToast("Produto sem estoque", "bg-danger");
        return;
      }

      if (quantidade > produto.qtdEstoque) {
        mostrarToast(
          `Estoque disponível: ${produto.qtdEstoque} unidades`,
          "bg-danger"
        );
        setQuantidade(Math.min(quantidade, produto.qtdEstoque));
        return;
      }

      // ✅ 2. Verificar quantidade já no carrinho
      const carrinhoAtual = JSON.parse(localStorage.getItem("carrinho")) || [];
      const itemExistente = carrinhoAtual.find(
        (item) => item.cdProduto === produto.cdProduto
      );

      const quantidadeJaNoCarrinho = itemExistente
        ? itemExistente.quantidade
        : 0;
      const quantidadeTotal = quantidadeJaNoCarrinho + quantidade;

      if (quantidadeTotal > produto.qtdEstoque) {
        mostrarToast(
          `Você já tem ${quantidadeJaNoCarrinho} no carrinho. Estoque disponível: ${produto.qtdEstoque}`,
          "bg-danger"
        );
        return;
      }

      // ✅ 3. Tentar reservar estoque no banco
      try {
        await estoqueService.reservarEstoque(produto.cdProduto, quantidade);
        console.log("✅ Estoque reservado no banco");
      } catch {
        console.warn(
          "⚠️ Não foi possível reservar no banco, mas continuando..."
        );
        // Continuar mesmo se falhar - estoque será validado no checkout
      }

      // ✅ 4. Adicionar ao carrinho local
      if (itemExistente) {
        itemExistente.quantidade += quantidade;
      } else {
        carrinhoAtual.push({
          cdProduto: produto.cdProduto,
          nome: produto.nome,
          preco: produto.preco,
          quantidade: quantidade,
          img: produto.img,
        });
      }

      localStorage.setItem("carrinho", JSON.stringify(carrinhoAtual));
      setCarrinho(carrinhoAtual);

      // ✅ 5. Atualizar estoque localmente (otimista)
      setProduto((prev) => ({
        ...prev,
        qtdEstoque: prev.qtdEstoque - quantidade,
      }));

      mostrarToast(
        `${quantidade} ${
          quantidade > 1 ? "unidades adicionadas" : "unidade adicionada"
        } ao carrinho!`,
        "bg-success"
      );

      setQuantidade(1);

      // Recarregar estoque do servidor em background
      setTimeout(() => recarregarEstoque(), 1000);
    } catch (error) {
      console.error("❌ Erro ao adicionar ao carrinho:", error);
      mostrarToast(
        "Erro ao adicionar ao carrinho. Tente novamente.",
        "bg-danger"
      );

      // Recarregar estoque em caso de erro
      await recarregarEstoque();
    } finally {
      setAdicionandoCarrinho(false);
    }
  };

  const handleComprar = async () => {
    await handleAdicionarCarrinho();
    if (!adicionandoCarrinho) {
      setTimeout(() => navigate("/carrinho"), 1000);
    }
  };

  const incrementarQuantidade = () => {
    if (quantidade < produto.qtdEstoque) {
      setQuantidade(quantidade + 1);
    } else {
      mostrarToast("Quantidade máxima em estoque atingida", "bg-warning");
    }
  };

  const decrementarQuantidade = () => {
    if (quantidade > 1) {
      setQuantidade(quantidade - 1);
    }
  };

  if (loading) {
    return (
      <>
        <NavbarLogado carrinho={carrinho} />
        <div className="container min-vh-100 d-flex justify-content-center align-items-center">
          <div className="spinner-border text-success" role="status">
            <span className="visually-hidden">Carregando...</span>
          </div>
        </div>
      </>
    );
  }

  if (!produto || !produto.flAtivo) {
    return (
      <>
        <NavbarLogado carrinho={carrinho} />
        <div className="container min-vh-100 d-flex justify-content-center align-items-center">
          <div className="text-center">
            <i className="bi bi-exclamation-triangle fs-1 text-danger mb-3"></i>
            <h3>Produto não disponível</h3>
            <button
              className="btn btn-eco mt-3"
              onClick={() => navigate("/homeLogado")}
            >
              Voltar para Home
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <NavbarLogado carrinho={carrinho} />

      <main className="container my-5 min-vh-100">
        <button
          className="btn btn-voltar border-0 fs-4 mb-4"
          onClick={() => navigate("/homeLogado")}
        >
          <i className="bi bi-arrow-left-short"></i> Voltar
        </button>

        {usuario && (
          <div className="alert alert-success mb-4" role="alert">
            <i className="bi bi-person-check me-2"></i>
            Olá, <strong>{usuario.nome}</strong>!
          </div>
        )}

        <div className="row">
          {/* Imagem do Produto */}
          <div className="col-lg-6 mb-4">
            <div className="card border-0 shadow-sm">
              <img
                src={produto.img}
                className="card-img-top p-4"
                alt={produto.nome}
                onError={(e) => {
                  e.target.src = "/placeholder.png";
                }}
                style={{
                  height: "500px",
                  objectFit: "contain",
                  borderRadius: "20px",
                  backgroundColor: "#f8f9fa",
                }}
              />
            </div>
          </div>

          {/* Informações do Produto */}
          <div className="col-lg-6">
            <div className="bg-eco p-4 rounded-4 h-100">
              <span className="badge bg-success mb-3">{produto.categoria}</span>

              <h1 className="eco-card-text fw-bold mb-3">{produto.nome}</h1>

              <h2 className="eco-text fw-bold mb-4">
                R$ {produto.preco.toFixed(2)}
              </h2>

              <div className="mb-4">
                <h5 className="eco-card-text mb-2">Descrição:</h5>
                <p className="eco-card-text">{produto.descricao}</p>
              </div>

              <div className="mb-4">
                <p className="eco-card-text mb-2">
                  <i className="bi bi-box-seam me-2"></i>
                  Estoque disponível:{" "}
                  <strong
                    className={
                      produto.qtdEstoque <= 5 && produto.qtdEstoque > 0
                        ? "text-warning"
                        : produto.qtdEstoque === 0
                        ? "text-danger"
                        : "text-success"
                    }
                  >
                    {produto.qtdEstoque} unidades
                  </strong>
                  {produto.qtdEstoque <= 5 && produto.qtdEstoque > 0 && (
                    <span className="badge bg-warning text-dark ms-2">
                      Últimas unidades!
                    </span>
                  )}
                  {produto.qtdEstoque === 0 && (
                    <span className="badge bg-danger ms-2">Esgotado</span>
                  )}
                </p>
                <p className="eco-card-text mb-2">
                  <i className="bi bi-truck me-2"></i>
                  Frete grátis para compras acima de R$ 100,00
                </p>
                <p className="eco-card-text">
                  <i className="bi bi-award me-2"></i>
                  Produto 100% ecológico e sustentável
                </p>
              </div>

              {/* Controle de Quantidade */}
              {produto.qtdEstoque > 0 && (
                <div className="mb-4">
                  <label className="form-label eco-card-text fw-bold">
                    Quantidade:
                  </label>
                  <div className="input-group w-50">
                    <button
                      className="btn btn-outline-success"
                      type="button"
                      onClick={decrementarQuantidade}
                      disabled={quantidade <= 1 || adicionandoCarrinho}
                    >
                      <i className="bi bi-dash"></i>
                    </button>
                    <input
                      type="text"
                      className="form-control text-center"
                      value={quantidade}
                      readOnly
                    />
                    <button
                      className="btn btn-outline-success"
                      type="button"
                      onClick={incrementarQuantidade}
                      disabled={
                        quantidade >= produto.qtdEstoque || adicionandoCarrinho
                      }
                    >
                      <i className="bi bi-plus"></i>
                    </button>
                  </div>
                </div>
              )}

              {/* Botões de Ação */}
              <div className="d-flex gap-3 flex-column flex-md-row">
                <button
                  className="btn btn-eco flex-grow-1 py-3"
                  onClick={handleAdicionarCarrinho}
                  disabled={produto.qtdEstoque === 0 || adicionandoCarrinho}
                >
                  {adicionandoCarrinho ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Adicionando...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-cart-plus me-2"></i>
                      Adicionar ao Carrinho
                    </>
                  )}
                </button>
                <button
                  className="btn btn-success flex-grow-1 py-3"
                  onClick={handleComprar}
                  disabled={produto.qtdEstoque === 0 || adicionandoCarrinho}
                >
                  <i className="bi bi-credit-card me-2"></i>
                  Comprar Agora
                </button>
              </div>

              {produto.qtdEstoque === 0 && (
                <div className="alert alert-danger mt-3" role="alert">
                  <i className="bi bi-exclamation-triangle me-2"></i>
                  Produto indisponível no momento
                </div>
              )}

              {/* Botão para atualizar estoque */}
              <button
                className="btn btn-sm btn-outline-secondary mt-3 w-100"
                onClick={recarregarEstoque}
                disabled={adicionandoCarrinho}
              >
                <i className="bi bi-arrow-clockwise me-1"></i>
                Atualizar Estoque
              </button>
            </div>
          </div>
        </div>

        {/* Seção de Benefícios */}
        <div className="row mt-5">
          <div className="col-12">
            <h3 className="eco-text mb-4">
              Por que escolher produtos ecológicos?
            </h3>
          </div>
          <div className="col-md-4 mb-3">
            <div className="card bg-eco h-100 border-0">
              <div className="card-body">
                <i className="bi bi-leaf fs-1 text-success"></i>
                <h5 className="card-title eco-card-text mt-3">Sustentável</h5>
                <p className="card-text eco-card-text">
                  Produtos que respeitam o meio ambiente e contribuem para um
                  futuro melhor.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="card bg-eco h-100 border-0">
              <div className="card-body">
                <i className="bi bi-recycle fs-1 text-success"></i>
                <h5 className="card-title eco-card-text mt-3">Reutilizável</h5>
                <p className="card-text eco-card-text">
                  Durabilidade e qualidade que reduzem o desperdício.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="card bg-eco h-100 border-0">
              <div className="card-body">
                <i className="bi bi-heart fs-1 text-success"></i>
                <h5 className="card-title eco-card-text mt-3">Saudável</h5>
                <p className="card-text eco-card-text">
                  Livre de substâncias tóxicas, seguro para você e sua família.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Toast */}
      <div
        className={`toast align-items-center ${toastColor} text-white position-fixed bottom-0 end-0 mb-3 me-3`}
        role="alert"
        id="toast"
        style={{ zIndex: 9999 }}
      >
        <div className="d-flex">
          <div className="toast-body">{toastMsg}</div>
          <button
            type="button"
            className="btn-close btn-close-white me-2 m-auto"
            data-bs-dismiss="toast"
          ></button>
        </div>
      </div>

      <Footer />
    </>
  );
}
