import { Navbar } from "../componente/Navbar"
import { useNavigate } from "react-router-dom";
import InputFull from "../componente/InputFull";
export function TelaCadastrarProduto() {
     const navigate = useNavigate();
     return <>



          <main className="container-fluid bg-eco border-top border-2 eco-border  d-flex justify-content-start align-items-center vh-100 " >
               <div className="container bg-body rounded rounded-5 flex-column d-flex py-5">
                    <button className="btn btn-voltar border-0 fs-2 rounded-2 align-self-start" onClick={() => { navigate(-1) }}> <i className="bi bi-arrow-left-short"></i></button>
                    <img src="..\public\logoSemFundo.png"
                         alt="logo econest"
                         className="rounded my-3 align-self-start"
                         style={{ width: '70px' }}
                    />

                    <form>
                         <fieldset className="row g-3">
                              <div className="col-12 d-flex justify-content-between align-items-center mb-3">
                                   <legend className="text-success mb-0">Cadastrar Produto</legend>

                                   <Link to="/gerenciar-produtos" className="btn btn-success eco-btn-manage">
                                        <i className="fas fa-list me-2"></i> Gerenciar Produtos
                                   </Link>
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
                                   <button type="submit" className="btn btn-eco px-5 py-2 fw-bold w-100">
                                        SALVAR PRODUTO
                                   </button>
                              </div>
                         </fieldset>
                    </form>
               </div>

          </main>


     </>

}    