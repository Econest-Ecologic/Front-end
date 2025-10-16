import { Navbar } from "../Navbar";
import CardBadge from "../CardBadge";
import Footer from "../Footer";
import CardPropaganda from "../CardPropaganda";
import Banner from "../Banner";
import Card from "../Card";

export default function HomeUsuario() {
  return (
    <>
      <header>
        <Navbar num={1} />
      </header>
      <main className="overflow-x-hidden">
        <Banner link={"/Banner1.png"} />
        <div className="d-flex flex-column bg-body gap-3 mt-4 ms-3">
          <h1>Bem-vindo à Eco Nest 🌱</h1>
          <p className="text-wrap">
            O lugar certo para quem busca um estilo de vida mais consciente e
            sustentável. Aqui você encontra produtos ecológicos que fazem a
            diferença no dia a dia e ajudam a construir um futuro mais verde.
          </p>
        </div>
        <div className="row gap-2 align-items-center justify-content-center mt-3">
          <CardBadge text={"Gestos simples transformam grandes realidades."} />
          <CardBadge text={"Pequenas mudanças geram grandes imapctos."} />
          <CardBadge
            text={"Conheça nossos produtos e faça parte desse movimento"}
          />
        </div>
        <Banner link={"/ProdutosEcologicos.png"} />
        <div className="row mt-3 d-flex mx-3 flex-wrap align-items-end justify-content-center">
          <CardPropaganda text={"Higiene & Cuidados Pessoais"} img={"/Bucha.jpeg"} />
          <CardPropaganda text={"Casa Sustentáveis"} img={"/CasaSustentaveis.png"} />
          <CardPropaganda text={"Utensilios & Acessórios  Reutilizáveis "} img={"/Utensilios.png"} />
        </div>
        <Banner link={"../Banner3.png"} />
        <div className="row row-gap-4 mt-5 mx-3">
        <Card img={"../exProd.png"} title={"Titulo"} badge={"NOVO"} desc={"descrição de um produto"} price={22.50} border={"border-0"}/>
        <Card img={"../exProd.png"} title={"Titulo"} badge={"NOVO"} desc={"descrição de um produto"} price={22.50} border={"border-0"}/>
        <Card img={"../exProd.png"} title={"Titulo"} badge={"PROMOÇÃO"} desc={"descrição de um produto"} price={22.50} color="bg-promo" border={"border-0"}/>
        <Card img={"../exProd.png"} title={"Titulo"} badge={"PROMOÇÃO"} desc={"descrição de um produto"} price={22.50} color="bg-promo" border={"border-0"}/>
        </div>
      </main>
      <Footer />
    </>
  );
}
