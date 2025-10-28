
/*global bootstrap*/
import { useNavigate } from "react-router-dom";
import InputFull from "../componente/InputFull";
import { Link } from "react-router-dom";
import Toast from "../componente/Toast";




export function TelaCadastrarProduto() {
     
  const navigate = useNavigate();

     const mostrarToast = () => {
          const toast = document.getElementById("toast");
          const bsToast = new bootstrap.Toast(toast);
          bsToast.show();
     };
   
     return <>



          <main className="container-fluid bg-eco border-top border-2 eco-border  d-flex justify-content-start align-items-center vh-100 " >
               <div className="container bg-body rounded rounded-5 flex-column d-flex py-5">
                    <button className="btn btn-voltar border-0 fs-2 rounded-2 align-self-start" onClick={() => { navigate(-1) }}> <i className="bi bi-arrow-left-short"></i></button>
                    <img src="..\public\logoSemFundo.png"
                         alt="logo econest"
                         className="rounded my-3 align-self-start"
                         style={{ width: '70px' }}
                    />
                    <div className="d-flex justify-content-end w-100 mb-3 px-3">
                         <Link to={"/GerenciarProduto"}>
                              <button className="btn btn-eco" style={{ width: '220px' }} >
                                   <i className="bi bi-list-task me-2"></i> Gerenciar Produtos
                              </button>
                         </Link>
                    </div>

                    <div>
                         <fieldset className="row g-3">
                              <div className="col-12 d-flex justify-content-between align-items-center mb-3">
                                   <legend className="text-success mb-0">Cadastrar Produto</legend>
                              </div>

                              <div className="col-12">
                                   <InputFull placeholder={"Escreva o nome do produto"} />
                              </div>

                              <div className="col-12 col-md-6">
                                   <InputFull placeholder={"Descrição"} />
                              </div>

                              <div className="col-12 col-md-6">
                                   <InputFull type="number" placeholder={"Quantidade em estoque"} />
                              </div>

                              <div className="col-12 col-md-6">
                                   <InputFull type="number" placeholder={"Valor do Produto"} />
                              </div>

                              <div className="col-12 col-md-6">
                                   <div className="mb-3">
                                        <label htmlFor="formFile" className="form-label">Upload do Produto</label>
                                        <input className="form-control" type="file" id="formFile" accept="image/*" />
                                   </div>
                              </div>

                              <div className="col-12 col-md-6">
                                   <select className="form-select eco-border">
                                        <option selected disabled>Categoria</option>
                                        <option>Higiene & Cuidados Pessoais</option>
                                        <option>Casa Sustentável</option>
                                        <option>Utensilios & Acessórios Reutilizáveis </option>
                                   </select>
                              </div>
                              <div className="col-12 col-md-6 d-flex align-items-end">
                                   <button  className="btn btn-eco px-5 py-2 fw-bold w-100" onClick={()=>mostrarToast()}>
                                        SALVAR PRODUTO
                                   </button>
                              </div>
                         </fieldset>
                    </div>
               </div>

          </main>
          <Toast
               msg={"Produto Cadastrado com sucesso"}
               icon={<i className="bi bi-check-lg"></i>}
          />

     </>

}    