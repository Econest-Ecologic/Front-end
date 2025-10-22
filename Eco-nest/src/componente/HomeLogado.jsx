import Card from "./Card";
import { NavbarLogado } from "./NavbarLogado";
import RadioBtn from "./RadioBtn";
import { useState, useEffect } from "react";
export default function HomeLogado() {
    const listaInicial = [
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
    img: "https://images.pexels.com/photos/322207/pexels-photo-322207.jpeg" },
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

    useEffect(() => {
        try {

            fetch(apiUrl).then(response => {
                if (!response.ok) {
                    console.log("Lista de produtos não encontrada")
                } else {
                    return response.json();
                }
            }).then(
                data => {
                    setListaProd(JSON.stringify(data))
                    if (data.length == 0) {
                        console.log("Lista de produtos vazia")
                    }
                }
            ).catch(erro => {
                console.log("Erro ao buscar produtos : " + erro.messasge)
            })
        } catch {
            console.log("Erro ao carregar os produtos")
        }


    }, [])
    const [listaProd, setListaProd] = useState(listaInicial);
    const [listaFiltrado, setFiltrado] = useState([])
    useEffect(() => { setFiltrado(listaProd) }, [listaProd])


    return <>
        <NavbarLogado />
        <main className="container-xxl d-flex flex-column  align-items-center w-100 min-vh-100">
            <h5 className="text-end w-100 mt-2">Bem vindo, Elessandro</h5>
            <nav className=" mt-3 d-flex gap-3 h-100 justify-content-center ">
                <div onClick={() => setFiltrado(listaProd)}>
                    <RadioBtn name={"filtro"} id={"btn-check-todos"} txt={"Todos"} defaultChecked
                    />
                </div>
                <div onClick={() => setFiltrado(listaProd.filter((prod) => prod.categoria == "utensilios"))}>
                    <RadioBtn
                        name={"filtro"}
                        id={"btn-check-utensilios"}
                        txt={"Utensilios e Acessórios Reutilizáveis"}

                    />
                </div>
                <div onClick={() => setFiltrado(listaProd.filter((prod) => prod.categoria == "casa"))}>
                    <RadioBtn
                        name={"filtro"}
                        id={"btn-check-casa"}
                        txt={"Casa sustentáveis"}
                    />
                </div>
                <div onClick={() => setFiltrado(listaProd.filter((prod) => prod.categoria == "higiene"))}>
                    <RadioBtn
                        name={"filtro"}
                        id={"btn-check-higiene"}
                        txt={"Higiene e Cuidados pessoais"}
                    />
                </div>
            </nav>
            <div className="row row-gap-3 justify-content-start w-75 mt-4">
                {listaFiltrado.map((prod, id) => (
                    <div key={id} className="col-12 col-sm-6 col-md-4 d-flex justify-content-center">
                        <Card  title={prod.nome} price={prod.preco} desc={prod.categoria} img={prod.img} />
                    </div>
                )
                )}
            </div>
        </main>
    </>
}