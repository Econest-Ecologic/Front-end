import { Navbar } from "../Navbar";
import PerfilImg from "../PerfilImg";
import Footer from "../Footer";
export default function SobreNos() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="container-xxl gap-2 my-5">
        <div className="d-flex gap-2 flex-column">
          <h3 className="text-success">Nossa equipe</h3>
          <p className="fs-5">
            A Eco Nest nasceu com o propósito de oferecer produtos sustentáveis
            e acessíveis, incentivando escolhas conscientes no dia a dia. Nosso
            objetivo é tornar a sustentabilidade prática, simples e ao alcance
            de todos.
          </p>
          <p>
            🌱 “Juntos, unimos nossos aprendizados para criar a Eco Nest: um
            espaço que conecta tecnologia, sustentabilidade e criatividade.”
          </p>
        </div>
        <div className="container-md">
          <div className="row gap-2 justify-content-center ">
            <div className="col-lg-4 ">
              <PerfilImg
                img={"../public/Sinara.JPG"}
                nome={"Sinara Santinoni"}
                heightImg={"170px"}
              />
            </div>

            <div className="col-lg-4 ">
              <PerfilImg
                img={"../public/marcos.jpeg"}
                nome={"Marcos Paulo Bittencourt de Medeiros"}
              />
            </div>

            <div className="col-lg-4 ">
              <PerfilImg
                img={"../public/elessandro.jpeg"}
                nome={"Elessandro de Abreu"}
              />
            </div>

            <div className="col-lg-4">
              <PerfilImg
                img={"../public/Victor.jpeg"}
                nome={"Victor Hugo de Pieri Justino"}
                heightImg="170px"
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
