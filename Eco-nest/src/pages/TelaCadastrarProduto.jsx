import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
import Toast from "../componente/Toast";
import { produtoService } from "../services/produtoService";
import * as bootstrap from "bootstrap";

export function TelaCadastrarProduto() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [toastColor, setToastColor] = useState("bg-success");

  const [nmProduto, setNmProduto] = useState("");
  const [dsProduto, setDsProduto] = useState("");
  const [preco, setPreco] = useState("");
  const [categoria, setCategoria] = useState("");
  const [qtdEstoque, setQtdEstoque] = useState("");
  const [imgProduto, setImgProduto] = useState(null);

  const mostrarToast = (msg, color = "bg-success") => {
    setToastMsg(msg);
    setToastColor(color);
    const toast = document.getElementById("toast");
    const bsToast = new bootstrap.Toast(toast);
    bsToast.show();
  };

  const handleImagemChange = (e) => {
    const arquivo = e.target.files[0];
    if (arquivo) {
      if (arquivo.size > 10 * 1024 * 1024) {
        mostrarToast("Imagem muito grande. Máximo 10MB", "bg-danger");
        e.target.value = "";
        return;
      }
      setImgProduto(arquivo);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!nmProduto || nmProduto.length < 3) {
        mostrarToast(
          "Nome do produto deve ter no mínimo 3 caracteres",
          "bg-danger"
        );
        return;
      }

      if (!dsProduto || dsProduto.length < 3) {
        mostrarToast("Descrição deve ter no mínimo 3 caracteres", "bg-danger");
        return;
      }

      if (!preco || parseFloat(preco) < 0.01) {
        mostrarToast("Preço deve ser maior que 0", "bg-danger");
        return;
      }

      if (!categoria) {
        mostrarToast("Selecione uma categoria", "bg-danger");
        return;
      }

      if (!qtdEstoque || parseInt(qtdEstoque) < 0) {
        mostrarToast("Quantidade em estoque inválida", "bg-danger");
        return;
      }

      const formData = new FormData();
      formData.append("nmProduto", nmProduto);
      formData.append("dsProduto", dsProduto);
      formData.append("preco", parseFloat(preco));
      formData.append("categoria", categoria);
      formData.append("qtdEstoque", parseInt(qtdEstoque));
      formData.append("flAtivo", true);

      if (imgProduto) {
        formData.append("imgProduto", imgProduto);
      }

      await produtoService.criar(formData);

      mostrarToast("Produto cadastrado com sucesso!");

      setTimeout(() => {
        setNmProduto("");
        setDsProduto("");
        setPreco("");
        setCategoria("");
        setQtdEstoque("");
        setImgProduto(null);
        document.getElementById("formFile").value = "";
      }, 1500);
    } catch (error) {
      console.error("Erro ao cadastrar produto:", error);
      mostrarToast(
        error.response?.data || "Erro ao cadastrar produto",
        "bg-danger"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <main className="container-fluid bg-eco border-top border-2 eco-border d-flex justify-content-start align-items-center vh-100">
        <div className="container bg-body rounded rounded-5 flex-column d-flex py-5">
          <button
            className="btn btn-voltar border-0 fs-2 rounded-2 align-self-start"
            onClick={() => {
              navigate(-1);
            }}
          >
            <i className="bi bi-arrow-left-short"></i>
          </button>
          <img
            src="../public/logoSemFundo.png"
            alt="logo econest"
            className="rounded my-3 align-self-start"
            style={{ width: "70px" }}
          />
          <div className="d-flex justify-content-end w-100 mb-3 px-3">
            <Link to={"/GerenciarProduto"}>
              <button className="btn btn-eco" style={{ width: "220px" }}>
                <i className="bi bi-list-task me-2"></i> Gerenciar Produtos
              </button>
            </Link>
          </div>

          <form onSubmit={handleSubmit}>
            <fieldset className="row g-3">
              <div className="col-12 d-flex justify-content-between align-items-center mb-3">
                <legend className="text-success mb-0">Cadastrar Produto</legend>
              </div>

              <div className="col-12">
                <input
                  type="text"
                  className="form-control eco-border"
                  placeholder="Nome do produto"
                  value={nmProduto}
                  onChange={(e) => setNmProduto(e.target.value)}
                  required
                />
              </div>

              <div className="col-12 col-md-6">
                <textarea
                  className="form-control eco-border"
                  placeholder="Descrição do produto"
                  rows="3"
                  value={dsProduto}
                  onChange={(e) => setDsProduto(e.target.value)}
                  required
                />
              </div>

              <div className="col-12 col-md-6">
                <input
                  type="number"
                  className="form-control eco-border"
                  placeholder="Quantidade em estoque"
                  min="0"
                  value={qtdEstoque}
                  onChange={(e) => setQtdEstoque(e.target.value)}
                  required
                />
              </div>

              <div className="col-12 col-md-6">
                <input
                  type="number"
                  className="form-control eco-border"
                  placeholder="Valor do Produto (R$)"
                  step="0.01"
                  min="0.01"
                  value={preco}
                  onChange={(e) => setPreco(e.target.value)}
                  required
                />
              </div>

              <div className="col-12 col-md-6">
                <div className="mb-3">
                  <label htmlFor="formFile" className="form-label">
                    Upload da Imagem do Produto
                  </label>
                  <input
                    className="form-control eco-border"
                    type="file"
                    id="formFile"
                    accept="image/*"
                    onChange={handleImagemChange}
                  />
                  <small className="text-muted">Máximo 10MB</small>
                </div>
              </div>

              <div className="col-12 col-md-6">
                <select
                  className="form-select eco-border"
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value)}
                  required
                >
                  <option value="" disabled>
                    Selecione a Categoria
                  </option>
                  <option value="higiene">Higiene & Cuidados Pessoais</option>
                  <option value="casa">Casa Sustentável</option>
                  <option value="utensilios">
                    Utensílios & Acessórios Reutilizáveis
                  </option>
                </select>
              </div>

              <div className="col-12 col-md-6 d-flex align-items-end">
                <button
                  type="submit"
                  className="btn btn-eco px-5 py-2 fw-bold w-100"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      SALVANDO...
                    </>
                  ) : (
                    "SALVAR PRODUTO"
                  )}
                </button>
              </div>
            </fieldset>
          </form>
        </div>
      </main>
      <Toast msg={toastMsg} color={toastColor} />
    </>
  );
}
