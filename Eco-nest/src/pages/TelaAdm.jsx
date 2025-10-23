import { Navbar } from "../componente/Navbar";
import { Link, useNavigate } from "react-router-dom";
export function TelaAdm() {

  const navigate = useNavigate();

  return (
    <>

      <style>{`
        
  
 
        .card-admin {
          background-color: #fff;
          border-radius: 20px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
          max-whidth: 600px;
          width:90%;

          }
          .btn-logout-icon {
                    color: #004d40; /* Cor Verde */
                    cursor: pointer;
                    transition: color 0.2s;
                    font-size: 2rem; 
                    position: absolute; 
                    top: 30px;
                    right: 30px; /* Posição na direita */
                    background: none;
                    border: none;
                    padding: 0;
                    font-size: 1.5rem;
                }
                .btn-logout-icon:hover {
                    color: #388e3c; 
                }
  
      `}</style>


      <div className="admin-container bg-eco border-top border-2 eco-border  d-flex justify-content-center align-items-center vh-100">
        <div className="card-admin text-center position-relative p-5 bg-body w-auto">
          <button 
                        className="btn-logout-icon" 
                        title="Sair (Logout)"
                        onClick={()=>navigate("/")}>
                        <i className="bi bi-box-arrow-left"></i>
                    </button>
          <img
            src="..\public\logoSemFundo.png"
            alt="EcoNest Logo"
            className="logo position-absolute"
            style={{ top: "30px", left: "30px", width: "120px" }}
          />
          <h2 className="fw-bold mb-5 eco-text">Administrador</h2>

          <div className="d-flex justify-content-center gap-4 mb-4">
            <Link to={"/cadastroProduto"}>
              <button className="btn btn-eco px-5 py-2 fw-bold text-white">PRODUTOS</button>
            </Link>
            <Link to={"/criarCadastro"}>
              <button className="btn btn-eco px-5 py-2 fw-bold text-white">CRIAR ADM</button>
            </Link>
          </div>

          <div className="d-flex justify-content-center gap-4 mb-4 text-white">
            <Link to={"/editarperfil"}>
              <button className="btn btn-eco px-5 py-2 fw-bold text-white">
                EDITAR PERFIL
              </button>
            </Link>
            <Link to={"/feedback"}>
            <button className="btn btn-eco px-5 py-2 fw-bold text-white"> FEEDBACK</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
