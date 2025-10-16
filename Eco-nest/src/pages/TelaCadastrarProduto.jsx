import { Navbar } from "../componente/Navbar"
import { useNavigate } from "react-router-dom";
export function TelaCadastrarProduto() {
     const navigate = useNavigate();
     return <>
          <Navbar></Navbar>
          <main className="container-fluid bg-eco border-top border-2 eco-border  d-flex justify-content-start align-items-center vh-100 " >
               <div className="container bg-body rounded rounded-5 flex-column d-flex">
                    <button className="btn btn-voltar border-0 fs-2 rounded-2 align-self-start"onClick={() => { navigate(-1) }}> <i className="bi bi-arrow-left-short"></i></button>
                    <img src="..\public\logoSemFundo.png"
                         alt="logo econest"
                         className="rounded my-3 align-self-start"
                         style={{ width: '70px' }}
                    />

                    <form>
                         <fieldset>
                              <legend>Cadastrar Produto</legend>
                              <div class="mb-3">
                                   <input type="text" class="form-control" placeholder="Escreva o nome do produto" />
                              </div>
                              <div class="mb-3">
                                   <input type="text" class="form-control" placeholder="Descrição do produto" />
                              </div>
                              <div class="mb-3">
                                   <input type="text" class="form-control" placeholder="Preço" />
                              </div>

                              <div class="mb-3">
                                   <select class="form-select">
                                        <option>Higiene & Cuidados Pessoais</option>
                                        <option>Casa Sustentável</option>
                                        <option>Utensilios & Acessórios  Reutilizáveis </option>
                                   </select> 
                                   </div>

                         </fieldset>
                    </form>
               </div>

          </main>


     </>

}    