import { useSearchParams } from "react-router-dom"
import { Navbar } from "../Navbar"

export default function PagProduto(){
    const[searchParams] = useSearchParams();
   const title= searchParams.get("title")
return<>
<Navbar />
<main>
<h1>{title}</h1>

</main>
</>    
}