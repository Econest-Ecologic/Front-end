
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import App from '../App';


export function Feedback() {
    const navigate = useNavigate();
    const [produtosComFeedback, setProdutosComFeedback] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const mockProdutosComFeedback = [
        {
            id: 101,
            nome: "EcoNest Smart Plug (Tomada Inteligente)",

            feedbacks: [
                { id: 1, cliente: "Lucas M.", data: "05/04/2024", texto: "Produto excelente. Redução de energia é real." },
                { id: 2, cliente: "Márcia F.", data: "01/04/2024", texto: "Fácil de configurar e usar. Recomendo para quem busca eficiência." }
            ]
        },
        {
            id: 102,
            nome: "EcoNest Sensor de Consumo",
            feedbacks: [
                { id: 3, cliente: "Patrícia R.", data: "28/03/2024", texto: "A interface de monitoramento é incrível! Consigo visualizar exatamente o quanto estou preservando." }
            ]
        },
        {
            id: 103,
            nome: "Kit Eco de Reutilizáveis",
            feedbacks: []
        }
    ];
    useEffect(() => {

        const fetchFeedbacks = async () => {
            try {

                setTimeout(() => {
                    setProdutosComFeedback(mockProdutosComFeedback);
                    setLoading(false);
                }, 1000);

            } catch (err) {
                setError('Não foi possível carregar os dados. Verifique a API.');
                setLoading(false);
            }
        };

        fetchFeedbacks();
    }, []);

    if (loading) {
        return <div className="loading-screen text-center p-5">Carregando dados...</div>;
    }
    return <>
        <div className="d-flex justify-content-center align-items-center min-vh-100 bg-eco-admin">
            <div className="p-5 custom-card-container bg-white rounded-5 shadow-lg w-75">


                <div className="d-flex justify-content-between align-items-center mb-5">
                    <div className="d-flex align-items-center">
                        <img src="..\public\logoSemFundo.png" alt="EcoNest Logo" className="logo-pequena-feedback" />
                        <h1 className="ms-3 titulo-feedback-tela">Feedbacks</h1>
                    </div>

                    <button className="btn btn-voltar-feedback" onClick={() => navigate(-1)}>
                        <i className="bi bi-arrow-left-short fs-1"></i>
                    </button>
                </div>


                {produtosComFeedback.length === 0 ? (
                    <p className="text-center text-muted">Nenhum produto com feedback para ser exibido.</p>
                ) : (
                    <div className="lista-produtos-feedback">

                        {produtosComFeedback.map(produto => (
                            <div key={produto.id} className="card-produto-item mb-4 p-4">


                                <h2 className="produto-nome-feedback">
                                    {produto.nome}
                                    <span className="badge bg-success ms-3">{produto.feedbacks.length} avaliações</span>
                                </h2>

                                <hr />


                                <div className="feedbacks-container">
                                    {produto.feedbacks.length === 0 ? (
                                        <p className="text-info-feedback">Ainda não há avaliações de clientes para este item.</p>
                                    ) : (
                                        <ul className="lista-feedbacks-aninhada">
                                            {produto.feedbacks.map((feedback, index) => (
                                                <li key={feedback.id} className="feedback-item-detalhe">
                                                    <p>
                                                        <span className="feedback-cliente-header">
                                                            {index + 1}. **{feedback.cliente}** - {feedback.data}
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
}