import { useState } from "react"

export default function InputSearch() {
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
    const [filtro,setFiltro] = useState(listaInicial);
    return <>
        <form className="d-flex input-group position-relative" role="search">
            <input
                className="form-control border eco-border border-end-0 rounded-start-0 rounded-start-5"
                type="search"
                placeholder="Pesquise o produto desejado"
                aria-label="Search"
                id="input-navbar"
                onChange={(e)=>{
                    const valor = e.target.value || "";
                    if (valor.trim() === "") {
                      setFiltro([]); 
                      return;
                    }
                    setFiltro(listaInicial.filter(prod => prod.nome.toLowerCase().includes(valor.toLowerCase())).sort().splice(0,4));
                }}
            />
            <button className="btn btn-navbar border eco-border border-start-0 input-group-text rounded-end-5" type="submit">
                <i className="bi bi-search"></i>
            </button>
            <ul className="position-absolute d-flex flex-column bg-primary p-0 bg-body rounded-2" id="resultado-pesquisa" style={{ top: "40px", left: "10px", width: "90%" }}>
             {filtro.map((prod,key)=>(
                 <button key={key} className="bg-body rounded-2 p-2 resp-result">{prod.nome}</button>
             ))}
            </ul>
        </form>
    </>
}