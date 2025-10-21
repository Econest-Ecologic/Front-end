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

  const apiUrl = "http://localhost:8084/api/v1/produtos"
  const [listaProd, setListaProd] = useState();
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
        categoria: "higiene"
      },
      {
        nome: "Sabonete Orgânico de Lavanda",
        preco: 14.50,
        categoria: "higiene"
      },
      {
        nome: "Escova de Dente de Bambu",
        preco: 9.99,
        categoria: "higiene"
      },
      {
        nome: "Pano de Limpeza Reutilizável",
        preco: 6.75,
        categoria: "casa"
      },
      {
        nome: "Sabão Ecológico Multiuso",
        preco: 12.80,
        categoria: "casa"
      },
      {
        nome: "Composteira Doméstica Pequena",
        preco: 189.90,
        categoria: "casa"
      },
      {
        nome: "Garrafa Reutilizável de Inox",
        preco: 59.90,
        categoria: "utensilios"
      },
      {
        nome: "Canudo de Aço Inoxidável",
        preco: 4.99,
        categoria: "utensilios"
      },
      {
        nome: "Copo Retrátil de Silicone",
        preco: 19.90,
        categoria: "utensilios"
      }]
    )
  },
    [])

  return (
    <>
      <header>
        <Navbar num={1} />
      </header>
      <main className="container-fluid p-0 d-flex flex-column justify-content-center overflow-x-hidden">
        <Banner link={"/Banner1.png"} />
        <div className="d-flex flex-column bg-body gap-3 mt-4 ms-3">
          <h1>Bem-vindo à Eco Nest 🌱</h1>
          <p className="text-wrap">
            O lugar certo para quem busca um estilo de vida mais consciente e
            sustentável. Aqui você encontra produtos ecológicos que fazem a
            diferença no dia a dia e ajudam a construir um futuro mais verde.
          </p>
        </div>
        <div className="row flex-wrap gap-2 align-items-center justify-content-center my-5">
          <CardBadge text={"Gestos simples transformam grandes realidades."} />
          <CardBadge text={"Pequenas mudanças geram grandes imapctos."} />
          <CardBadge
            text={"Conheça nossos produtos e faça parte desse movimento"}
          />
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
          <button className="btn btn-eco p-4 w-25 row-gap-4 mb-5" onClick={() => navigate("/")} > Comprar agora</button>
        </div>
        <Banner link={"../Banner3.png"} />
        <div className="row row-gap-4 mt-5 mx-3 justify-content-center">
          <Card
            img={"../exProd.png"}
            title={"Titulo"}
            badge={"NOVO"}
            desc={"descrição de um produto"}
            price={22.5}
            border={"border-0"}
          />
          <Card
            img={"../exProd.png"}
            title={"Titulo"}
            badge={"NOVO"}
            desc={"descrição de um produto"}
            price={22.5}
            border={"border-0"}
          />
          <Card
            img={"../exProd.png"}
            title={"Titulo"}
            badge={"PROMOÇÃO"}
            desc={"descrição de um produto"}
            price={22.5}
            color="bg-promo"
            border={"border-0"}
          />
          <Card
            img={"../exProd.png"}
            title={"Titulo"}
            badge={"PROMOÇÃO"}
            desc={"descrição de um produto"}
            price={22.5}
            color="bg-promo"
            border={"border-0"}
          />
          <button className="btn btn-eco w-25 justify-content-center align-items-center py-3 fw-semibold fs-4">
            Conheça todos os nossos Produtos
          </button>
        </div>
      </main>
      <Toast msg={toastMessage} />
      <Footer />
    </>
  );
}
