import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { produtoService } from "../services/produtoService";
import * as bootstrap from "bootstrap";

export function GerenciarProduto() {
  const navigate = useNavigate();
  const [produtos, setProdutos] = useState([]);
  const [busca, setBusca] = useState("");
  const [loading, setLoading] = useState(true);
  const [toastMsg, setToastMsg] = useState("");
  const [toastColor, setToastColor] = useState("bg-success");

  const [produtoEditando, setProdutoEditando] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [excluindo, setExcluindo] = useState(null);

  useEffect(() => {
    carregarProdutos();
  }, []);

  const carregarProdutos = async () => {
    try {
      setLoading(true);
      const data = await produtoService.listarTodos();

      console.log("Produtos recebidos:", data);

      const produtosAtivos = data.filter((produto) => produto.flAtivo === true);
      setProdutos(produtosAtivos);

      console.log("Produtos ativos:", produtosAtivos);
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
    if (toast) {
      const bsToast = new bootstrap.Toast(toast);
      bsToast.show();
    }
  };

  const handleExcluir = async (id, nomeProduto) => {
    if (
      window.confirm(
        `TEM CERTEZA que deseja INATIVAR o produto:\n\n"${nomeProduto}"\n\n` +
          `O produto será removido da loja e não aparecerá mais para os clientes!\n\n` +
          `Esta ação não pode ser desfeita!`
      )
    ) {
      try {
        setExcluindo(id);
        console.log(`Inativando produto ID: ${id}`);

        await produtoService.inativar(id);

        console.log("Produto inativado com sucesso!");
        mostrarToast(
          `Produto "${nomeProduto}" foi inativado e removido da loja!`,
          "bg-success"
        );

        setProdutos((prevProdutos) =>
          prevProdutos.filter((produto) => produto.cdProduto !== id)
        );

        setTimeout(() => {
          carregarProdutos();
        }, 1000);
      } catch (error) {
        console.error("Erro ao inativar produto:", error);
        mostrarToast(
          error.response?.data || "Erro ao inativar produto. Tente novamente.",
          "bg-danger"
        );
      } finally {
        setExcluindo(null);
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

      mostrarToast("Produto atualizado com sucesso!");
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
          style={{ maxWidth: "900px" }}
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
                  <th className="text-center">AÇÕES</th>
                </tr>
              </thead>
              <tbody>
                {produtosFiltrados.map((produto) => (
                  <tr key={produto.cdProduto}>
                    <td>{produto.nmProduto}</td>
                    <td>
                      <span className="badge bg-success">
                        {produto.categoria}
                      </span>
                    </td>
                    <td className="fw-bold">R$ {produto.preco.toFixed(2)}</td>
                    <td>
                      <span
                        className={`badge ${
                          produto.qtdEstoque > 10
                            ? "bg-success"
                            : produto.qtdEstoque > 0
                            ? "bg-warning"
                            : "bg-danger"
                        }`}
                      >
                        {produto.qtdEstoque} un
                      </span>
                    </td>
                    <td className="text-center">
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
                        disabled={excluindo === produto.cdProduto}
                        title="Inativar Produto (Remove da loja)"
                      >
                        {excluindo === produto.cdProduto ? (
                          <span
                            className="spinner-border spinner-border-sm"
                            role="status"
                          />
                        ) : (
                          <i className="bi bi-trash"></i>
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {produtosFiltrados.length === 0 && (
              <div className="text-center py-5">
                <i className="bi bi-inbox fs-1 text-muted"></i>
                <p className="text-muted mt-3">
                  {busca
                    ? "Nenhum produto encontrado com esse termo."
                    : "Nenhum produto cadastrado."}
                </p>
              </div>
            )}
          </div>

          <div className="px-3 mt-3">
            <small className="text-muted">
              <i className="bi bi-info-circle me-1"></i>
              Total de produtos ativos: <strong>{produtos.length}</strong>
            </small>
          </div>
        </div>
      </main>

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

      <div
        className={`toast align-items-center ${toastColor} text-white position-fixed bottom-0 end-0 mb-3 me-3`}
        role="alert"
        id="toast"
      >
        <div className="d-flex">
          <div className="toast-body">{toastMsg}</div>
          <button
            type="button"
            className="btn-close btn-close-white me-2 m-auto"
            data-bs-dismiss="toast"
          ></button>
        </div>
      </div>
    </>
  );
}

export default GerenciarProduto;
