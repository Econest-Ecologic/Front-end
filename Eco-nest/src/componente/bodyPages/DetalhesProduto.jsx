import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { NavbarLogado } from "../NavbarLogado";
import { Navbar } from "../Navbar";
import Footer from "../Footer";
import { produtoService } from "../../services/produtoService";
import Toast from "../Toast";
import * as bootstrap from "bootstrap";

export default function DetalhesProduto() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [produto, setProduto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantidade, setQuantidade] = useState(1);
  const [toastMsg, setToastMsg] = useState("");
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    // Verifica se tem usuário logado
    const usuarioData = localStorage.getItem("usuario");
    if (usuarioData) {
      setUsuario(JSON.parse(usuarioData));
    }

    carregarProduto();
  }, [id]);

  const carregarProduto = async () => {
    try {
      const data = await produtoService.buscarPorId(id);

      // Formatar produto
      const produtoFormatado = {
        cdProduto: data.cdProduto,
        nome: data.nmProduto,
        preco: data.preco,
        categoria: data.categoria,
        descricao: data.dsProduto || "Produto ecológico de alta qualidade",
        img: data.imgProduto
          ? `data:image/jpeg;base64,${data.imgProduto}`
          : "/placeholder.png",
        qtdEstoque: data.qtdEstoque,
      };

      setProduto(produtoFormatado);
    } catch (error) {
      console.error("Erro ao carregar produto:", error);
      mostrarToast("Erro ao carregar produto");
      setTimeout(() => navigate(-1), 2000);
    } finally {
      setLoading(false);
    }
  };

  const mostrarToast = (msg) => {
    setToastMsg(msg);
    const toast = document.getElementById("toast");
    const bsToast = new bootstrap.Toast(toast);
    bsToast.show();
  };

  const handleAdicionarCarrinho = () => {
    if (!usuario) {
      mostrarToast("Faça login para adicionar ao carrinho");
      setTimeout(() => navigate("/"), 2000);
      return;
    }

    // Recuperar carrinho atual do localStorage
    const carrinhoAtual = JSON.parse(localStorage.getItem("carrinho")) || [];

    // Verificar se o produto já existe no carrinho
    const itemExistenteIndex = carrinhoAtual.findIndex(
      (item) => item.cdProduto === produto.cdProduto
    );

    if (itemExistenteIndex >= 0) {
      // Atualizar quantidade do produto já existente
      const itemExistente = carrinhoAtual[itemExistenteIndex];
      const novaQuantidade = itemExistente.quantidade + quantidade;

      // Verifica estoque
      if (novaQuantidade > produto.qtdEstoque) {
        mostrarToast("Quantidade máxima em estoque atingida");
        return;
      }

      carrinhoAtual[itemExistenteIndex].quantidade = novaQuantidade;
    } else {
      // Adicionar novo produto ao carrinho
      carrinhoAtual.push({
        cdProduto: produto.cdProduto,
        nome: produto.nome,
        preco: produto.preco,
        quantidade: quantidade,
        img: produto.img,
      });
    }

    // Salvar carrinho atualizado
    localStorage.setItem("carrinho", JSON.stringify(carrinhoAtual));

    mostrarToast(
      `${quantidade} ${
        quantidade > 1 ? "unidades adicionadas" : "unidade adicionada"
      } ao carrinho!`
    );
  };

  const handleComprar = () => {
    if (!usuario) {
      mostrarToast("Faça login para realizar a compra");
      setTimeout(() => navigate("/"), 2000);
      return;
    }

    // Aqui você implementaria a lógica de compra
    mostrarToast("Redirecionando para pagamento...");
  };

  const incrementarQuantidade = () => {
    if (quantidade < produto.qtdEstoque) {
      setQuantidade(quantidade + 1);
    } else {
      mostrarToast("Quantidade máxima em estoque atingida");
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
        {usuario ? <NavbarLogado /> : <Navbar />}
        <div className="container min-vh-100 d-flex justify-content-center align-items-center">
          <div className="spinner-border text-success" role="status">
            <span className="visually-hidden">Carregando...</span>
          </div>
        </div>
      </>
    );
  }

  if (!produto) {
    return (
      <>
        {usuario ? <NavbarLogado /> : <Navbar />}
        <div className="container min-vh-100 d-flex justify-content-center align-items-center">
          <h3>Produto não encontrado</h3>
        </div>
      </>
    );
  }

  return (
    <>
      {usuario ? <NavbarLogado /> : <Navbar />}

      <main className="container my-5 min-vh-100">
        <button
          className="btn btn-voltar border-0 fs-4 mb-4"
          onClick={() => navigate(-1)}
        >
          <i className="bi bi-arrow-left-short"></i> Voltar
        </button>

        <div className="row">
          {/* Imagem do Produto */}
          <div className="col-lg-6 mb-4">
            <div className="card border-0 shadow-sm">
              <img
                src={produto.img}
                className="card-img-top p-4"
                alt={produto.nome}
                style={{
                  height: "500px",
                  objectFit: "cover",
                  borderRadius: "20px",
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
                  <strong>{produto.qtdEstoque} unidades</strong>
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
              <div className="mb-4">
                <label className="form-label eco-card-text fw-bold">
                  Quantidade:
                </label>
                <div className="input-group w-50">
                  <button
                    className="btn btn-outline-success"
                    type="button"
                    onClick={decrementarQuantidade}
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
                  >
                    <i className="bi bi-plus"></i>
                  </button>
                </div>
              </div>

              {/* Botões de Ação */}
              <div className="d-flex gap-3 flex-column flex-md-row">
                <button
                  className="btn btn-eco flex-grow-1 py-3"
                  onClick={handleAdicionarCarrinho}
                  disabled={produto.qtdEstoque === 0}
                >
                  <i className="bi bi-cart-plus me-2"></i>
                  Adicionar ao Carrinho
                </button>
                <button
                  className="btn btn-success flex-grow-1 py-3"
                  onClick={handleComprar}
                  disabled={produto.qtdEstoque === 0}
                >
                  <i className="bi bi-credit-card me-2"></i>
                  Comprar Agora
                </button>
              </div>

              {produto.qtdEstoque === 0 && (
                <div className="alert alert-warning mt-3" role="alert">
                  <i className="bi bi-exclamation-triangle me-2"></i>
                  Produto indisponível no momento
                </div>
              )}
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

      <Toast msg={toastMsg} />
      <Footer />
    </>
  );
}
