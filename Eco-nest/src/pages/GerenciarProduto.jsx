import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';


// 1. DADOS DE SIMULAÇÃO (Simulam o que viria do backend)
const DADOS_PRODUTOS = [
    { id: 1, nome: 'Sabonete Artesanal de Lavanda', categoria: 'Higiene Pessoal', valor: 'R$ 25,00' },
    { id: 2, nome: 'Vaso de Cerâmica Médio', categoria: 'Decoração', valor: 'R$ 85,90' },
    { id: 3, nome: 'Ecopad de Algodão (3 unid)', categoria: 'Reutilizáveis', valor: 'R$ 12,50' },
];

export function GerenciarProduto() {
    const navigate = useNavigate();
    const [produtos, setProdutos] = useState(DADOS_PRODUTOS);
    const [busca, setBusca] = useState('');

   
    const handleExcluir = (id, nomeProduto) => {
        if (window.confirm(`Tem certeza que deseja excluir o produto: ${nomeProduto}? Esta ação não pode ser desfeita.`)) {
         
            setProdutos(produtos.filter(p => p.id !== id));
        }
    };

  
    const produtosFiltrados = produtos.filter(produto =>
        produto.nome.toLowerCase().includes(busca.toLowerCase()) ||
        produto.categoria.toLowerCase().includes(busca.toLowerCase())
    );

    return (
        <main className="container-fluid bg-eco d-flex justify-content-center align-items-center vh-100">
            
            <div className="container bg-body rounded rounded-5 flex-column d-flex py-5 shadow" style={{ maxWidth: '850px' }}>
                
                
                <div className="d-flex justify-content-between align-items-center w-100 mb-4 px-3">
                    
                    
                    <div className="d-flex align-items-center">
                        <button 
                            className="btn btn-voltar border-0 fs-2 rounded-2" 
                            onClick={() => navigate(-1)}
                            title="Voltar ao Menu Administrador"
                        >
                            <i className="bi bi-arrow-left-short"></i>
                        </button>
                        <h1 className="text-success fs-4 fw-bold ms-2">Gerenciar Produtos</h1>
                    </div>
                    
                
                </div>
                
              
                <div className="mb-4 w-100 px-3">
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Buscar por Nome ou Categoria..."
                        value={busca}
                        onChange={(e) => setBusca(e.target.value)}
                    />
                </div>
                
                <div className="table-responsive px-3">
                    <table className="table table-hover align-middle">
                        <thead>
                            <tr className="table-light">
                                <th>NOME DO PRODUTO</th>
                                <th>CATEGORIA</th>
                                <th>VALOR DO PRODUTO</th>
                                
                                <th>AÇÕES</th>
                            </tr>
                        </thead>
                        <tbody>
                            {produtosFiltrados.map(produto => (
                                <tr key={produto.id}>
                                    <td>{produto.nome}</td>
                                    <td>{produto.categoria}</td>
                                    <td>{produto.valor}</td>
                                    <td>
                                       
                                        <Link 
                                            to={`/editar-produto/${produto.id}`} 
                                            className="btn btn-sm btn-outline-success me-2"
                                            title="Editar Produto"
                                        >
                                            <i className="bi bi-pencil-square"></i>
                                        </Link>
                                        
                                       
                                        <button 
                                            className="btn btn-sm btn-outline-danger"
                                            onClick={() => handleExcluir(produto.id, produto.nome)}
                                            title="Excluir Produto"
                                        >
                                            <i className="bi bi-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {produtosFiltrados.length === 0 && (
                        <p className="text-center text-muted mt-4">Nenhum produto encontrado.</p>
                    )}
                </div>
                
            </div>
        </main>
    );
}