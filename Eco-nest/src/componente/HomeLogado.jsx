import Card from "./Card";
import { NavbarLogado } from "./NavbarLogado";
import RadioBtn from "./RadioBtn";
import { useState, useEffect } from "react";
import { produtoService } from "../services/produtoService";

export default function HomeLogado() {
  const [listaProd, setListaProd] = useState([]);
  const [listaFiltrado, setFiltrado] = useState([]);
  const [loading, setLoading] = useState(true);
  const [usuario, setUsuario] = useState(null);
  const [carrinho, setCarrinho] = useState([]);

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("carrinho");

      if (savedCart && savedCart !== "undefined" && savedCart !== "null") {
        const parsedCart = JSON.parse(savedCart);

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

  useEffect(() => {
    const usuarioData = JSON.parse(localStorage.getItem("usuario"));
    setUsuario(usuarioData);
    carregarProdutos();
  }, []);

  const carregarProdutos = async () => {
    try {
      console.log("Carregando produtos do HomeLogado...");
      const produtos = await produtoService.listarTodos();

      console.log("Produtos recebidos da API:", produtos);

      const produtosAtivos = produtos.filter((p) => p.flAtivo === true);

      console.log(
        `Produtos ativos: ${produtosAtivos.length} de ${produtos.length}`
      );

      const produtosFormatados = produtosAtivos.map((p) => {
        const estoque = p.qtdEstoque !== undefined ? p.qtdEstoque : 0;

        console.log(`Produto ${p.cdProduto} - ${p.nmProduto}:`, {
          estoque: estoque,
          ativo: p.flAtivo,
          preco: p.preco,
        });

        return {
          cdProduto: p.cdProduto,
          nome: p.nmProduto,
          preco: p.preco,
          categoria: p.categoria,
          img: p.imgProdutoBase64
            ? `data:image/jpeg;base64,${p.imgProdutoBase64}`
            : "/placeholder.png",
          qtdEstoque: estoque,
          flAtivo: p.flAtivo,
        };
      });

      console.log("Produtos formatados:", produtosFormatados);

      setListaProd(produtosFormatados);
      setFiltrado(produtosFormatados);
    } catch (error) {
      console.error("Erro ao carregar produtos:", error);
      alert("Erro ao carregar produtos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setFiltrado(listaProd);
  }, [listaProd]);

  const filtrarPorCategoria = (categoria) => {
    if (!categoria) {
      setFiltrado(listaProd);
      return;
    }

    const filtrados = listaProd.filter(
      (p) => p.categoria.toLowerCase() === categoria.toLowerCase()
    );

    console.log(`Filtrando por ${categoria}: ${filtrados.length} produtos`);
    setFiltrado(filtrados);
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

  return (
    <>
      <NavbarLogado carrinho={carrinho} />

      {usuario && (
        <h5 className="text-end w-100 mt-2 pe-5">
          Bem vindo, {usuario.nome || "Usuário"}
        </h5>
      )}

      <main className="container-xxl d-flex flex-column align-items-center w-100 min-vh-100">
        <nav className="mt-3 d-flex gap-3 h-100 justify-content-center flex-wrap">
          <div onClick={() => filtrarPorCategoria(null)}>
            <RadioBtn
              name="filtro"
              id="btn-check-todos"
              txt="Todos"
              defaultChecked
            />
          </div>
          <div onClick={() => filtrarPorCategoria("utensilios")}>
            <RadioBtn
              name="filtro"
              id="btn-check-utensilios"
              txt="Utensílios e Acessórios Reutilizáveis"
            />
          </div>
          <div onClick={() => filtrarPorCategoria("casa")}>
            <RadioBtn
              name="filtro"
              id="btn-check-casa"
              txt="Casa Sustentáveis"
            />
          </div>
          <div onClick={() => filtrarPorCategoria("higiene")}>
            <RadioBtn
              name="filtro"
              id="btn-check-higiene"
              txt="Higiene e Cuidados Pessoais"
            />
          </div>
        </nav>

        <div className="row row-gap-3 justify-content-start w-75 mt-4">
          {listaFiltrado.length === 0 ? (
            <div className="col-12 text-center py-5">
              <i className="bi bi-inbox fs-1 text-muted"></i>
              <p className="fs-5 text-muted mt-3">Nenhum produto encontrado</p>
              <button
                className="btn btn-eco mt-2"
                onClick={() => filtrarPorCategoria(null)}
              >
                Ver Todos os Produtos
              </button>
            </div>
          ) : (
            listaFiltrado.map((prod) => (
              <div
                key={prod.cdProduto}
                className="col-12 col-sm-6 col-md-4 d-flex justify-content-center"
              >
                <Card
                  cdProduto={prod.cdProduto}
                  title={prod.nome}
                  price={prod.preco}
                  desc={prod.categoria}
                  img={prod.img}
                  qtdEstoque={prod.qtdEstoque}
                  flAtivo={prod.flAtivo}
                />
              </div>
            ))
          )}
        </div>

        {listaProd.length > 0 && (
          <div className="mt-5 text-center">
            <p className="text-muted">
              <i className="bi bi-box-seam me-2"></i>
              {listaProd.length}{" "}
              {listaProd.length === 1
                ? "produto disponível"
                : "produtos disponíveis"}
            </p>
          </div>
        )}
      </main>
    </>
  );
}
