import { Navbar } from "../Navbar";
import Footer from "../Footer";
import RadioBtn from "../RadioBtn";
import Card from "../Card";
export default function Produtos() {
  return (
    <>
      <header>
        <Navbar></Navbar>
      </header>
      <main className="container-xxl d-flex flex-column min-vh-100 mt-5 w-100 gap-4 ">
        <nav className="container d-flex gap-3 h-100 justify-content-center ">
          <RadioBtn name={"filtro"} id={"btn-check-todos"} txt={"Todos"} />
          <RadioBtn
            name={"filtro"}
            id={"btn-check-utensilios"}
            txt={"Utensilios e Acessórios Reutilizáveis"}
          />
          <RadioBtn
            name={"filtro"}
            id={"btn-check-casa"}
            txt={"Casa sustentáveis"}
          />
          <RadioBtn
            name={"filtro"}
            id={"btn-check-higiene"}
            txt={"Higiene e Cuidados pessoais"}
          />
        </nav>
        <div className="container-xxl">
          <h1>Todos</h1>
          <div className="row row-gap-4">
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
          </div>
        </div>
      </main>
      <Footer></Footer>
    </>
  );
}
