import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { produtoService } from "../services/produtoService";
import Toast from "../componente/Toast";
import * as bootstrap from "bootstrap";

export function GerenciarProduto() {
  const navigate = useNavigate();
  const [produtos, setProdutos] = useState([]);
  const [busca, setBusca] = useState("");
  const [loading, setLoading] = useState(true);
  const [toastMsg, setToastMsg] = useState("");
  const [toastColor, setToastColor] = useState("bg-success");

  // Estados para modal de edição
  const [produtoEditando, setProdutoEditando] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    carregarProdutos();
  }, []);

  const carregarProdutos = async () => {
    try {
      setLoading(true);
      const data = await produtoService.listarTodos();
      setProdutos(data);
    } catch (error) {
      console.error("Erro ao carregar produtos:", error);
      mostrarToast("Erro ao carregar produtos", "bg-danger");
    } finally {
      setLoading(false);
    }
  };

  const mostrarToast = (msg, color = "bg-success") => {
    setToastMsg(msg);
    setToastColor(color);
    const toast = document.getElementById("toast");
    const bsToast = new bootstrap.Toast(toast);
    bsToast.show();
  };

  const handleExcluir = async (id, nomeProduto) => {
    if (
      window.confirm(
        `Tem certeza que deseja inativar o produto: ${nomeProduto}? Esta ação não pode ser desfeita.`
      )
    ) {
      try {
        await produtoService.inativar(id);
        mostrarToast("Produto inativado com sucesso");
        carregarProdutos();
      } catch (error) {
        console.error("Erro ao inativar produto:", error);
        mostrarToast("Erro ao inativar produto", "bg-danger");
      }
    }
  };

  const abrirModalEdicao = (produto) => {
    setProdutoEditando({
      cdProduto: produto.cdProduto,
      nmProduto: produto.nmProduto,
      dsProduto: produto.dsProduto,
      preco: produto.preco,
      categoria: produto.categoria,
      qtdEstoque: produto.qtdEstoque,
      imgProduto: null,
    });
    setShowModal(true);
  };

  const handleSalvarEdicao = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("nmProduto", produtoEditando.nmProduto);
      formData.append("dsProduto", produtoEditando.dsProduto);
      formData.append("preco", parseFloat(produtoEditando.preco));
      formData.append("categoria", produtoEditando.categoria);
      formData.append("qtdEstoque", parseInt(produtoEditando.qtdEstoque));
      formData.append("flAtivo", true);

      if (produtoEditando.imgProduto) {
        formData.append("imgProduto", produtoEditando.imgProduto);
      }

      await produtoService.atualizar(produtoEditando.cdProduto, formData);

      mostrarToast("Produto atualizado com sucesso");
      setShowModal(false);
      setProdutoEditando(null);
      carregarProdutos();
    } catch (error) {
      console.error("Erro ao atualizar produto:", error);
      mostrarToast("Erro ao atualizar produto", "bg-danger");
    }
  };

  const produtosFiltrados = produtos.filter(
    (produto) =>
      produto.nmProduto.toLowerCase().includes(busca.toLowerCase()) ||
      produto.categoria.toLowerCase().includes(busca.toLowerCase())
  );

  if (loading) {
    return (
      <main className="container-fluid bg-eco d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Carregando...</span>
        </div>
      </main>
    );
  }

  return (
    <>
      <main className="container-fluid bg-eco d-flex justify-content-center align-items-center vh-100">
        <div
          className="container bg-body rounded rounded-5 flex-column d-flex py-5 shadow"
          style={{ maxWidth: "850px" }}
        >
          <div className="d-flex justify-content-between align-items-center w-100 mb-4 px-3">
            <div className="d-flex align-items-center">
              <button
                className="btn btn-voltar border-0 fs-2 rounded-2"
                onClick={() => navigate(-1)}
                title="Voltar ao Menu Administrador"
              >
                <i className="bi bi-arrow-left-short"></i>
              </button>
              <h1 className="text-success fs-4 fw-bold ms-2">
                Gerenciar Produtos
              </h1>
            </div>
          </div>

          <div className="mb-4 w-100 px-3">
            <input
              type="text"
              className="form-control eco-border"
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
                  <th>VALOR</th>
                  <th>ESTOQUE</th>
                  <th>AÇÕES</th>
                </tr>
              </thead>
              <tbody>
                {produtosFiltrados.map((produto) => (
                  <tr key={produto.cdProduto}>
                    <td>{produto.nmProduto}</td>
                    <td>{produto.categoria}</td>
                    <td>R$ {produto.preco.toFixed(2)}</td>
                    <td>{produto.qtdEstoque}</td>
                    <td>
                      <button
                        onClick={() => abrirModalEdicao(produto)}
                        className="btn btn-sm btn-outline-success me-2"
                        title="Editar Produto"
                      >
                        <i className="bi bi-pencil-square"></i>
                      </button>

                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() =>
                          handleExcluir(produto.cdProduto, produto.nmProduto)
                        }
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
              <p className="text-center text-muted mt-4">
                Nenhum produto encontrado.
              </p>
            )}
          </div>
        </div>
      </main>

      {/* Modal de Edição */}
      {showModal && produtoEditando && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Editar Produto</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <form onSubmit={handleSalvarEdicao}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Nome do Produto</label>
                    <input
                      type="text"
                      className="form-control"
                      value={produtoEditando.nmProduto}
                      onChange={(e) =>
                        setProdutoEditando({
                          ...produtoEditando,
                          nmProduto: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Descrição</label>
                    <textarea
                      className="form-control"
                      rows="3"
                      value={produtoEditando.dsProduto}
                      onChange={(e) =>
                        setProdutoEditando({
                          ...produtoEditando,
                          dsProduto: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Preço (R$)</label>
                      <input
                        type="number"
                        className="form-control"
                        step="0.01"
                        min="0.01"
                        value={produtoEditando.preco}
                        onChange={(e) =>
                          setProdutoEditando({
                            ...produtoEditando,
                            preco: e.target.value,
                          })
                        }
                        required
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label">
                        Quantidade em Estoque
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        min="0"
                        value={produtoEditando.qtdEstoque}
                        onChange={(e) =>
                          setProdutoEditando({
                            ...produtoEditando,
                            qtdEstoque: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Categoria</label>
                    <select
                      className="form-select"
                      value={produtoEditando.categoria}
                      onChange={(e) =>
                        setProdutoEditando({
                          ...produtoEditando,
                          categoria: e.target.value,
                        })
                      }
                      required
                    >
                      <option value="higiene">
                        Higiene & Cuidados Pessoais
                      </option>
                      <option value="casa">Casa Sustentável</option>
                      <option value="utensilios">
                        Utensílios & Acessórios Reutilizáveis
                      </option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Nova Imagem (opcional)</label>
                    <input
                      type="file"
                      className="form-control"
                      accept="image/*"
                      onChange={(e) =>
                        setProdutoEditando({
                          ...produtoEditando,
                          imgProduto: e.target.files[0],
                        })
                      }
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowModal(false)}
                  >
                    Cancelar
                  </button>
                  <button type="submit" className="btn btn-eco">
                    Salvar Alterações
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <Toast msg={toastMsg} color={toastColor} />
    </>
  );
}
