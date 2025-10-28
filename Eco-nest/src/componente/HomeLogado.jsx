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

  // 1. Cart state initialization
  const [carrinho, setCarrinho] = useState([]);

  // 2. Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("carrinho");
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart);
      setCarrinho(parsedCart);
    }
  }, []);

  // 3. Save cart to localStorage
  useEffect(() => {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
  }, [carrinho]);

  useEffect(() => {
    // Pegar dados do usuário
    const usuarioData = JSON.parse(localStorage.getItem("usuario"));
    setUsuario(usuarioData);

    // Buscar produtos
    carregarProdutos();
  }, []);

  const carregarProdutos = async () => {
    try {
      const produtos = await produtoService.listarTodos();

      // Converter para formato usado no front
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

  if (loading) {
    return (
      <>
        <NavbarLogado />
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
      <main className="container-xxl d-flex flex-column align-items-center w-100 min-vh-100">
        <h5 className="text-end w-100 mt-2">
          Bem vindo, {usuario?.nome || "Usuário"}
        </h5>

        <nav className="mt-3 d-flex gap-3 h-100 justify-content-center flex-wrap">
          <div onClick={() => setFiltrado(listaProd)}>
            <RadioBtn
              name="filtro"
              id="btn-check-todos"
              txt="Todos"
              defaultChecked
            />
          </div>
          <div
            onClick={() =>
              setFiltrado(
                listaProd.filter(
                  (p) =>
                    p.categoria.toLowerCase() === "utensilios".toLowerCase()
                )
              )
            }
          >
            <RadioBtn
              name="filtro"
              id="btn-check-utensilios"
              txt="Utensílios e Acessórios Reutilizáveis"
            />
          </div>
          <div
            onClick={() =>
              setFiltrado(
                listaProd.filter(
                  (p) => p.categoria.toLowerCase() === "casa".toLowerCase()
                )
              )
            }
          >
            <RadioBtn
              name="filtro"
              id="btn-check-casa"
              txt="Casa Sustentáveis"
            />
          </div>
          <div
            onClick={() =>
              setFiltrado(
                listaProd.filter(
                  (p) => p.categoria.toLowerCase() === "higiene".toLowerCase()
                )
              )
            }
          >
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
              <p className="fs-5 text-muted">Nenhum produto encontrado</p>
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
                />
              </div>
            ))
          )}
        </div>
      </main>
    </>
  );
}
