import { Navbar } from "../Navbar";
import CardBadge from "../CardBadge";
import Footer from "../Footer";
import CardPropaganda from "../CardPropaganda";


export default function HomeUsuario() {
  return (
    <>
      <header>
        <Navbar num={1} />
      </header>
      <main className="overflow-x-hidden">
        <div className="container-fluid d-flex w-100 m-0 p-0 bg-white">
          <img
            src="..\public\Banner1.png"
            className="w-100 m-0 p-0 object-fit-cover"
            style={{ height: "50vh" }}
            alt="Banner"
          />
        </div>
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
        <div className="container-fluid d-flex w-100 m-0 p-0 bg-white position-relative mt-5">
          <img
            src="..\public\Banner2.png"
            className="w-100 m-0 p-0 object-fit-cover"
            style={{ height: "50vh" }}
            alt="Banner"
          />
        </div>
        <div className="container-fluid d-flex justify-content-center">
          <div className="row mt-3 d-flex flex-wrap align-items-end justify-content-center w-100">
            <CardPropaganda text={"Higiene & Cuidados Pessoais"} img={"/Bucha.jpeg"} />
            <CardPropaganda text={"Casa Sustentáveis"} img={"/CasaSustentaveis.png"} />
            <CardPropaganda text={"Utensilios & Acessórios  Reutilizáveis "} img={"/Utensilios.png"} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
