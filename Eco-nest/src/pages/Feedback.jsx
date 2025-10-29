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
      <div className="d-flex justify-content-center align-items-center min-vh-100 bg-eco-admin">
        <div className="p-5 custom-card-container bg-white rounded-5 shadow-lg w-75">
          <div className="d-flex justify-content-between align-items-center mb-5">
            <div className="d-flex align-items-center">
              <img
                src="../public/logoSemFundo.png"
                alt="EcoNest Logo"
                className="logo-pequena-feedback"
              />
              <h1 className="ms-3 titulo-feedback-tela">Feedbacks</h1>
            </div>

            <button
              className="btn btn-voltar-feedback"
              onClick={() => navigate(-1)}
            >
              <i className="bi bi-arrow-left-short fs-1"></i>
            </button>
          </div>

          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          {produtosComFeedback.length === 0 ? (
            <p className="text-center text-muted">
              Nenhum produto com feedback para ser exibido.
            </p>
          ) : (
            <div className="lista-produtos-feedback">
              {produtosComFeedback.map((produto) => (
                <div key={produto.id} className="card-produto-item mb-4 p-4">
                  <h2 className="produto-nome-feedback">
                    {produto.nome}
                    <span className="badge bg-success ms-3">
                      {produto.feedbacks.length} avaliações
                    </span>
                  </h2>

                  <hr />

                  <div className="feedbacks-container">
                    {produto.feedbacks.length === 0 ? (
                      <p className="text-info-feedback">
                        Ainda não há avaliações de clientes para este item.
                      </p>
                    ) : (
                      <ul className="lista-feedbacks-aninhada">
                        {produto.feedbacks.map((feedback, index) => (
                          <li
                            key={feedback.id}
                            className="feedback-item-detalhe"
                          >
                            <p>
                              <span className="feedback-cliente-header">
                                {index + 1}. **{feedback.cliente}** -{" "}
                                {feedback.data}
                              </span>
                              <br />
                              <span className="feedback-texto-citacao">
                                "{feedback.texto}"
                              </span>
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
