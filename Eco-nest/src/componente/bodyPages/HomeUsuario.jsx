import { Navbar } from "../Navbar";
import CardBadge from "../CardBadge";
import Footer from "../Footer";
import CardPropaganda from "../CardPropaganda";
import Banner from "../Banner";
import Card from "../Card";
import { useEffect, useState } from "react";
import Toast from "../Toast";
import { useNavigate } from "react-router-dom";
import { produtoService } from "../../services/produtoService";
import * as bootstrap from "bootstrap";
export default function HomeUsuario() {
  const navigate = useNavigate();
  const [carrinho, setCarrinho] = useState([]);
  const [toastMessage, setToastMessage] = useState("");
  const [listaProd, setListaProd] = useState([]);
  const [loading, setLoading] = useState(true);

  // Carregar carrinho do localStorage
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("carrinho");
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        setCarrinho(Array.isArray(parsedCart) ? parsedCart : []);
      }
    } catch (error) {
      console.error("Error loading cart:", error);
      setCarrinho([]);
    }
  }, []);

  // Salvar carrinho no localStorage
  useEffect(() => {
    try {
      localStorage.setItem("carrinho", JSON.stringify(carrinho));
    } catch (error) {
      console.error("Error saving cart:", error);
    }
  }, [carrinho]);

  // Carregar produtos da API
  useEffect(() => {
    carregarProdutos();
  }, []);

  const carregarProdutos = async () => {
    try {
      setLoading(true);
      const produtos = await produtoService.listarTodos();

      const produtosFormatados = produtos.map((p) => ({
        cdProduto: p.cdProduto,
        nome: p.nmProduto,
        preco: p.preco,
        categoria: p.categoria,
        img: p.imgProduto
          ? `data:image/jpeg;base64,${p.imgProduto}`
          : "/placeholder.png",
        qtdEstoque: p.qtdEstoque,
      }));

      setListaProd(produtosFormatados);
    } catch (error) {
      console.error("Erro ao carregar produtos:", error);
      mostrarToast("Erro ao carregar produtos");
    } finally {
      setLoading(false);
    }
  };

  function paginaProd(title, categoria) {
    const query = new URLSearchParams();
    query.set("title", title);
    const listaFiltrada = listaProd.filter(
      (prod) => prod.categoria.toLowerCase() === categoria.toLowerCase()
    );
    query.set("listaProd", encodeURIComponent(JSON.stringify(listaFiltrada)));
    navigate(`/pagProduto?${query.toString()}`);
  }

  const mostrarToast = (msg) => {
    const toast = document.getElementById("toast");
    const bsToast = new bootstrap.Toast(toast);
    setToastMessage(msg);
    bsToast.show();
  };

  const destaque = listaProd.slice(0, 4);

  if (loading) {
    return (
      <>
        <header>
          <Navbar num={1} />
        </header>
        <main className="container-fluid min-vh-100 d-flex justify-content-center align-items-center">
          <div className="spinner-border text-success" role="status">
            <span className="visually-hidden">Carregando...</span>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <header>
        <Navbar num={1} />
      </header>
      <main className="container-fluid p-0 d-flex flex-column align-items-center justify-content-center overflow-x-hidden">
        <Banner link={"/Banner1.png"} />

        {destaque.length > 0 ? (
          <div className="row d-flex flex-wrap row-gap-4 my-5 mx-3">
            {destaque.map((prod) => (
              <div
                className="col-12 col-sm-12 col-md-6 col-lg-3"
                key={prod.cdProduto}
              >
                <Card
                  cdProduto={prod.cdProduto}
                  img={prod.img}
                  title={prod.nome}
                  badge={"PROMOÇÃO"}
                  desc={prod.categoria}
                  price={prod.preco}
                  border={"border-0"}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="my-5">
            <p className="text-muted">Nenhum produto disponível no momento</p>
          </div>
        )}

        <Banner link={"/ProdutosEcologicos.png"} />
        <div className="row row-gap-4 my-5 flex-wrap align-items-center justify-content-center">
          <CardPropaganda
            text={"Higiene & Cuidados Pessoais"}
            img={"/Bucha.jpeg"}
            onClick={() => paginaProd("Higiene & Cuidados Pessoais", "higiene")}
          />

          <CardPropaganda
            text={"Casa Sustentáveis"}
            img={"/CasaSustentaveis.png"}
            onClick={() => paginaProd("Casa Sustentáveis", "casa")}
          />

          <CardPropaganda
            text={"Utensilios & Acessórios Reutilizáveis"}
            img={"/Utensilios.png"}
            onClick={() => paginaProd("Utensilios", "utensilios")}
          />
        </div>
        <div className="row justify-content-center">
          <button
            className="btn btn-eco p-4 w-25 row-gap-4 mb-5 w-100"
            onClick={() => navigate("/")}
          >
            Comprar agora
          </button>
        </div>
        <Banner link={"/Banner3.png"} />

        <div className="d-flex flex-column bg-body gap-3 mt-4 ms-3">
          <h1>Conheça a Eco-nest</h1>
          <p className="text-wrap">
            O lugar certo para quem busca um estilo de vida mais consciente e
            sustentável. Aqui você encontra produtos ecológicos que fazem a
            diferença no dia a dia e ajudam a construir um futuro mais verde.
          </p>
        </div>
        <div className="d-flex w-100 justify-content-center">
          <button className="btn btn-eco w-25 py-3 fw-semibold fs-4">
            Conheça todos os nossos Produtos
          </button>
        </div>
        <div className="row flex-wrap gap-2 align-items-center justify-content-center my-5">
          <CardBadge text={"Gestos simples transformam grandes realidades."} />
          <CardBadge text={"Pequenas mudanças geram grandes impactos."} />
          <CardBadge
            text={"Conheça nossos produtos e faça parte desse movimento"}
          />
        </div>
      </main>
      <Toast msg={toastMessage} color="bg-danger" />
      <Footer />
    </>
  );
}
