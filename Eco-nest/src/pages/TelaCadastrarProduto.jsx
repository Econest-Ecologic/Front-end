import { Navbar } from "../componente/Navbar"
import { useNavigate } from "react-router-dom";
export function TelaCadastrarProduto(){
     const navigate = useNavigate();
     return <>
     <Navbar></Navbar>
     <main  className="container-fluid bg-eco border-top border-2 eco-border  d-flex justify-content-center align-items-center vh-100 " onClick={()=>{navigate(-1)}}>
          <div className="container bg-body rounded rounded-5">
               <button className="btn btn-voltar border-0 fs-2 rounded-2"> <i className="bi bi-arrow-left-short"></i></button>
          </div>
     </main>


     </>
     
}    