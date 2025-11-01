import { Link, useNavigate } from "react-router-dom";
export function TelaAdm() {
  const navigate = useNavigate();

  return (
    <div className="container-fluid bg-eco border-top border-2 eco-border d-flex justify-content-center align-items-center min-vh-100">
      <div
        className="container text-center p-4 p-md-5 bg-body rounded-4"
        style={{ maxWidth: "600px" }}
      >
        <div className="row align-items-center mb-4 gy-3">
          <div className="col-12 col-md-4">
            <img
              src="../public/logoSemFundo.png"
              alt="EcoNest Logo"
              className="img-fluid"
              style={{ maxWidth: "120px" }}
            />
          </div>

          <div className="col-12 col-md-4">
            <h2 className="fw-bold eco-text m-0">Administrador</h2>
          </div>

          <div className="col-12 col-md-4">
            <button
              className="btn btn-eco"
              title="Sair (Logout)"
              onClick={() => navigate("/")}
            >
              <i className="bi bi-box-arrow-left"></i>
            </button>
          </div>
        </div>

        {/* Primeira linha de botões */}
        <div className="row gy-3">
          <div className="col-12 col-sm-6">
            <Link to="/cadastroProduto">
              <button className="btn btn-eco w-100 px-4 py-2 fw-bold text-white">
                PRODUTOS
              </button>
            </Link>
          </div>

          <div className="col-12 col-sm-6">
            <Link to="/criarCadastro">
              <button className="btn btn-eco w-100 px-4 py-2 fw-bold text-white">
                CRIAR ADM
              </button>
            </Link>
          </div>
        </div>

        <div className="row mt-3 gy-3">
          <div className="col-12 col-sm-6">
            <Link to="/editarperfil">
              <button className="btn btn-eco w-100 px-4 py-2 fw-bold text-white text-nowrap">
                EDITAR PERFIL
              </button>
            </Link>
          </div>

          <div className="col-12 col-sm-6">
            <Link to="/feedback">
              <button className="btn btn-eco w-100 px-4 py-2 fw-bold text-white">
                FEEDBACK
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
