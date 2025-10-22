import { useSearchParams } from "react-router-dom"
import { Navbar } from "../Navbar"
import Card from "../Card";
export default function PagProduto(){
    const[searchParams] = useSearchParams();
   const title= searchParams.get("title")
   const listaProd = JSON.parse(decodeURIComponent(searchParams.get("listaProd")))//decotifica a var

return<>
<Navbar />

    <div className="container my-4">
      <h1 className="text-center mb-4">{title}</h1>

      <div className="row flex-wrap g-4">
        {listaProd.map((p, i) => (
          <div className="col-md-3" key={i}>
            <Card
              img={p.img}
              title={p.nome}
              desc={p.desc}
              price={p.preco}
              badge={p.categoria}
              color="bg-success"
              border="border-5 eco-border"
            />
          </div>
        ))}
      </div>
    </div>
</>    
}