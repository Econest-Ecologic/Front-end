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
      console.log("Carrinho recebido:", savedCart);

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
    } finally {
      setLoading(false);
    }
    console.log("Carrinho :" + carrinho);
  }, []);

  useEffect(() => {
    const usuarioData = JSON.parse(localStorage.getItem("usuario"));
    setUsuario(usuarioData);

    console.log(usuarioData);
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
        img: p.imgProdutoBase64 // ✅ CAMPO CORRETO
          ? `data:image/jpeg;base64,${p.imgProdutoBase64}` // ✅ CAMPO CORRETO
          : "/placeholder.png",
        qtdEstoque: p.qtdEstoque,
      }));

      console.log("✅ Produtos carregados (HomeLogado):", produtosFormatados); // Debug
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
      <h5 className="text-end w-100 mt-2 pe-5">
        Bem vindo, {usuario?.nome || "Usuário"}
      </h5>
      <main className="container-xxl d-flex flex-column align-items-center w-100 min-vh-100">
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
