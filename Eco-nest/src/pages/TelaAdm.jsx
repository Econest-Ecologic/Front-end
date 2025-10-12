export function TelaAdm() {
  return (
    <>
      <style>{`
        
  
 
        .card-admin {
          background-color: #fff;
          border-radius: 20px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
          min-width: 700px;
        }
  
      `}</style>

      <div className="admin-container bg-eco border-top border-2 eco-border  d-flex justify-content-center align-items-center vh-100">
        <div className="card-admin text-center position-relative p-5 bg-body">
          <img
            src="/logoSemFundo.png"
            alt="EcoNest Logo"
            className="logo position-absolute"
            style={{ top: "30px", left: "30px", width: "120px" }}
          />
          <h2 className="fw-bold mb-5 eco-text">Administrador</h2>

          <div className="d-flex justify-content-center gap-4 mb-4">
            <button className="btn btn-eco px-5 py-2 fw-bold">PRODUTOS</button>
            <button className="btn btn-eco px-5 py-2 fw-bold">CRIAR ADM</button>
          </div>

          <button className="btn btn-eco px-5 py-2 fw-bold">
            EDITAR PERFIL
          </button>
        </div>
      </div>
    </>
  );
}
