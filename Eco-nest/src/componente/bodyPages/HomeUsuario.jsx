import { Navbar } from "../Navbar";
import CardBadge from "../CardBadge";
import Footer from "../Footer";
import CardPropaganda from "../CardPropaganda";
import Banner from "../Banner";
import Card from "../Card";
import { useEffect, useState } from "react";
import Toast from "../Toast"
import { useNavigate } from "react-router-dom";

export default function HomeUsuario() {

  const navigate = useNavigate()

// 1. Cart state initialization
const [carrinho, setCarrinho] = useState([]);

// 2. Load cart from localStorage
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

// 3. Save cart to localStorage
useEffect(() => {
  console.log(carrinho);
  try {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
  } catch (error) {
    console.error("Error saving cart:", error);
  }
}, [carrinho]);

  function paginaProd(title, categoria) {
    const query = new URLSearchParams();
    query.set("title", title)
    const listaFiltrada = listaProd.filter(prod => prod.categoria == categoria)
    query.set("listaProd", encodeURIComponent(JSON.stringify(listaFiltrada)));//codifica o json, passar em json para passar apenas 1 "string"
    navigate(`/pagProduto?${query.toString()}`)
  }

  const mostrarToast = (msg) => {
    const toast = document.getElementById("toast");
    const bsToast = new bootstrap.Toast(toast);
    setToastMessage(msg)
    bsToast.show();
  };

  const [toastMessage, setToastMessage] = useState()

  // const apiUrl = "http://localhost:8084/api/v1/produtos"
  const [listaProd, setListaProd] = useState([]);
  useEffect(() => {
    try {

      fetch(apiUrl).then(response => {
        if (!response.ok) {
          mostrarToast("Lista de produtos não encontrada")
        } else {
          return response.json();
        }
      }).then(
        data => {
          setListaProd(JSON.stringify(data))
          if (data.length == 0) {
            mostrarToast("Lista de produtos vazia")
          }
        }
      ).catch(erro => {
        mostrarToast("Erro ao buscar produtos : " + erro.messasge)
      })
    } catch {
      mostrarToast("Erro ao carregar os produtos")
    }

    setListaProd([
      {
        nome: "Bucha Vegetal Natural",
        preco: 8.90,
        categoria: "higiene",
        img: "https://www.gosupps.com/custom/related/childImage/2219021"
      },
      {
        nome: "Sabonete Orgânico de Lavanda",
        preco: 14.50,
        categoria: "higiene",
        img: "https://images.pexels.com/photos/322207/pexels-photo-322207.jpeg"
      },
      {
        nome: "Escova de Dente de Bambu",
        preco: 9.99,
        categoria: "higiene",
        img: "https://images.pexels.com/photos/601365/pexels-photo-601365.jpeg"
      },
      {
        nome: "Pano de Limpeza Reutilizável",
        preco: 6.75,
        categoria: "casa",
        img: "https://images.pexels.com/photos/416520/pexels-photo-416520.jpeg"
      },
      {
        nome: "Sabão Ecológico Multiuso",
        preco: 12.80,
        categoria: "casa",
        img: "https://images.pexels.com/photos/342648/pexels-photo-342648.jpeg"
      },
      {
        nome: "Composteira Doméstica Pequena",
        preco: 189.90,
        categoria: "casa",
        img: "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg"
      },
      {
        nome: "Garrafa Reutilizável de Inox",
        preco: 59.90,
        categoria: "utensilios",
        img: "https://images.pexels.com/photos/416528/pexels-photo-416528.jpeg"
      },
      {
        nome: "Canudo de Aço Inoxidável",
        preco: 4.99,
        categoria: "utensilios",
        img: "https://images.pexels.com/photos/406154/pexels-photo-406154.jpeg"
      },
      {
        nome: "Copo Retrátil de Silicone",
        preco: 19.90,
        categoria: "utensilios",
        img: "https://images.pexels.com/photos/405771/pexels-photo-405771.jpeg"
      }
    ]

    )
  },
    [])

  const destaque = listaProd.slice(0, 4);

  return (
    <>
      <header>
        <Navbar num={1} />
      </header>
      <main className="container-fluid p-0 d-flex flex-column align-items-center justify-content-center overflow-x-hidden">
        <Banner link={"/Banner1.png"} />
        <div className="row d-flex flex-wrap row-gap-4 my-5 mx-3">
          {destaque.map((prod, key) => (
            <div className="col-12 col-sm-12 col-md-6 col-lg-3" key={key} >
              <Card
                img={prod.img}
                title={prod.nome}
                badge={"PROMOÇÃO"}
                desc={prod.categoria} 
                price={prod.preco}
                border={"border-0"}
                onClick={() => {
      setCarrinho([...carrinho, prod]);
    }}
              />
            </div>
          ))}
        </div>

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
            text={"Utensilios & Acessórios  Reutilizáveis "}
            img={"/Utensilios.png"}
            onClick={() => paginaProd("Utensilios", "utensilios")}
          />

        </div>
        <div className="row justify-content-center">
          <button className="btn btn-eco p-4 w-25 row-gap-4 mb-5 w-100" onClick={() => navigate("/")} > Comprar agora</button>
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
          <CardBadge text={"Pequenas mudanças geram grandes imapctos."} />
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
