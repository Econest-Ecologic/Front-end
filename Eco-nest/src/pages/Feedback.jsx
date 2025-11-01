import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function Feedback() {
  const navigate = useNavigate();
  const [produtosComFeedback, setProdutosComFeedback] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mock temporário - substituir por chamada API quando o endpoint estiver pronto
  const mockProdutosComFeedback = [
    {
      id: 101,
      nome: "Produto Exemplo 1",
      feedbacks: [
        {
          id: 1,
          cliente: "Cliente A",
          data: "05/04/2024",
          texto: "Ótimo produto!",
        },
      ],
    },
  ];

  useEffect(() => {
    carregarFeedbacks();
  }, []);

  const carregarFeedbacks = async () => {
    try {
      setLoading(true);

      // TODO: Quando o endpoint de avaliações estiver pronto, substituir por:
      // const response = await api.get('/avaliacao');
      // const avaliacoes = response.data;

      // Por enquanto, usar mock
      setTimeout(() => {
        setProdutosComFeedback(mockProdutosComFeedback);
        setLoading(false);
      }, 1000);
      // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setError("Não foi possível carregar os feedbacks.");
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-screen text-center p-5 min-vh-100 d-flex justify-content-center align-items-center">
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Carregando...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="container-fluid d-flex justify-content-center align-items-center min-vh-100 bg-eco py-4">
        <div className="container bg-body rounded-4 shadow-lg p-4 p-md-5">
          {/* Cabeçalho */}
          <div className="row align-items-center justify-content-between gy-3 mb-4">
            <div className="col-12 col-md-8 d-flex align-items-center justify-content-center justify-content-md-start">
              <img
                src="../public/logoSemFundo.png"
                alt="EcoNest Logo"
                className="img-fluid"
                style={{ maxWidth: "90px" }}
              />
              <h1 className="ms-3 fw-bold eco-text text-center text-md-start mb-0">
                Feedbacks
              </h1>
            </div>

            <div className="col-12 col-md-4 d-flex justify-content-center justify-content-md-end">
              <button
                className="btn btn-eco"
                title="Voltar"
                onClick={() => navigate(-1)}
              >
                <i className="bi bi-arrow-left-short fs-3"></i>
              </button>
            </div>
          </div>

          {error && (
            <div className="alert alert-danger text-center" role="alert">
              {error}
            </div>
          )}

          {produtosComFeedback.length === 0 ? (
            <p className="text-center text-muted">
              Nenhum produto com feedback para ser exibido.
            </p>
          ) : (
            <div className="row gy-4">
              {produtosComFeedback.map((produto) => (
                <div key={produto.id} className="col-12">
                  <div className=" border border-1 border-success shadow-sm p-4 rounded-4 h-100">
                    <h2 className="fw-bold text-success text-break">
                      {produto.nome}
                      <span className="badge bg-success ms-3">
                        {produto.feedbacks.length} avaliações
                      </span>
                    </h2>

                    <hr />

                    {produto.feedbacks.length === 0 ? (
                      <p className="text-info mb-0">
                        Ainda não há avaliações de clientes para este item.
                      </p>
                    ) : (
                      <ul className="list-unstyled mt-3">
                        {produto.feedbacks.map((feedback, index) => (
                          <li key={feedback.id} className="mb-3">
                            <p className="mb-1 text-break">
                              <strong>
                                {index + 1}. {feedback.cliente}
                              </strong>{" "}
                              – {feedback.data}
                            </p>
                            <p className="fst-italic text-muted text-break">
                              "{feedback.texto}"
                            </p>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
