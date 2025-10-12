import { Navbar } from "../Navbar";
import Footer from "../Footer";
import RadioBtn from "../RadioBtn";
export default function Produtos() {
  return (
    <>
      <header>
        <Navbar></Navbar>
      </header>
      <main className="container-xxl d-flex min-vh-100 mt-5 w-100 justify-content-evenly align-items-start">
        <nav className="d-flex gap-3">
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
      </main>
      <Footer></Footer>
    </>
  );
}
