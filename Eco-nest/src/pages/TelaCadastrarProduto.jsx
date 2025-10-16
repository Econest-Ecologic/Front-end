import { Navbar } from "../componente/Navbar"
import { useNavigate } from "react-router-dom";
import InputFull from "../componente/InputFull";
export function TelaCadastrarProduto() {
     const navigate = useNavigate();
     return <>
          <Navbar></Navbar>
          <main className="container-fluid bg-eco border-top border-2 eco-border  d-flex justify-content-start align-items-center vh-100 " >
               <div className="container bg-body rounded rounded-5 flex-column d-flex">
                    <button className="btn btn-voltar border-0 fs-2 rounded-2 align-self-start" onClick={() => { navigate(-1) }}> <i className="bi bi-arrow-left-short"></i></button>
                    <img src="..\public\logoSemFundo.png"
                         alt="logo econest"
                         className="rounded my-3 align-self-start"
                         style={{ width: '70px' }}
                    />

                    <form>
                         <fieldset>
                              <legend>Cadastrar Produto</legend>
                              <InputFull placeholder={"Escreva o nome do produto"} />
                              <InputFull placeholder={"Descrição"}></InputFull>
                              <InputFull type="number" placeholder={"Valor do Produto"}></InputFull>

                              <div class="mb-3">
                                   <select class="form-select eco-border">
                                        <option>Higiene & Cuidados Pessoais</option>
                                        <option>Casa Sustentável</option>
                                        <option>Utensilios & Acessórios  Reutilizáveis </option>
                                   </select>
                              </div>
                              <InputFull type="number" placeholder={"Quantidade de produtos"}></InputFull>

                              <div class="mb-3 eco-border">
                                   <label for="formFile" class="form-label">Imagem do Produto</label>
                                   <input class="form-control" type="file" id="formFile" />
                              </div>
                              <button className="btn btn-eco px-5 py-2 fw-bold"> SALVAR PRODUTO </button>
                         </fieldset>


                    </form>
               </div>

          </main>


     </>

}    