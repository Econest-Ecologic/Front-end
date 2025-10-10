export function TelaAdm (){
    return<>
     <style>{`
        
        .admin-container {
          background-color: #dce6d5;
        }
 
        .card-admin {
          background-color: #fff;
          border-radius: 20px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
          min-width: 700px;
        }
 
        .logo {
          top: 30px;
          left: 30px;
          width: 120px;
        }

        .text-success-eco {
          color: #2f5531 !important;
        }
  
        .btn-eco {
          background-color: #2f5531;
          color: #fff;
          border: none;
          border-radius: 6px;
          transition: background-color 0.3s ease;
        }

        .btn-eco:hover {
          background-color: #254627;
          color: #fff;
        }
      `}</style>

      <div className="admin-container d-flex justify-content-center align-items-center vh-100">
        <div className="card-admin text-center position-relative p-5">
          <img
            src="/logoSemFundo.png"
            alt="EcoNest Logo"
            className="logo position-absolute"
          />
          <h2 className="fw-bold mb-5 text-success-eco">Administrador</h2>

          <div className="d-flex justify-content-center gap-4 mb-4">
            <button className="btn btn-eco px-5 py-2 fw-bold">PRODUTOS</button>
            <button className="btn btn-eco px-5 py-2 fw-bold">CRIAR ADM</button>
          </div>

          <button className="btn btn-eco px-5 py-2 fw-bold">EDITAR PERFIL</button>
        </div>
      </div>
    </>
}