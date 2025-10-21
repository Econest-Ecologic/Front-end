import { Navbar } from "../componente/Navbar";
import { Link } from "react-router-dom";

export function TelaAdm() {
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
  
      `}</style>


      <div className="admin-container bg-eco border-top border-2 eco-border  d-flex justify-content-center align-items-center vh-100">
        <div className="card-admin text-center position-relative p-5 bg-body w-auto">
          <img
            src="..\public\logoSemFundo.png"
            alt="EcoNest Logo"
            className="logo position-absolute"
            style={{ top: "30px", left: "30px", width: "120px" }}
          />
          <h2 className="fw-bold mb-5 eco-text">Administrador</h2>

          <div className="d-flex justify-content-center gap-4 mb-4">
            <Link to={"/cadastroProduto"}>
              <button className="btn btn-eco px-5 py-2 fw-bold">PRODUTOS</button>
            </Link>
            <Link to={"/criarCadastro"}>
              <button className="btn btn-eco px-5 py-2 fw-bold">CRIAR ADM</button>
            </Link>
          </div>

          <div className="d-flex justify-content-center gap-4 mb-4">
            <Link to={"/editarperfil"}>
              <button className="btn btn-eco px-5 py-2 fw-bold">
                EDITAR PERFIL
              </button>
            </Link>
            <Link to={"/feedback"}>
            <button className="btn btn-eco px-5 py-2 fw-bold"> FEEDBACK</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
