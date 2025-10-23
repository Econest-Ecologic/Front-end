import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { produtoService } from "../services/produtoService";

export function TelaCadastrarProduto() {
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [qtdEstoque, setQtdEstoque] = useState("");
  const [categoria, setCategoria] = useState("");
  const [imagem, setImagem] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("nmProduto", nome);
      formData.append("dsProduto", descricao);
      formData.append("preco", parseFloat(preco));
      formData.append("categoria", categoria);
      formData.append("qtdEstoque", parseInt(qtdEstoque));
      if (imagem) {
        formData.append("imgProduto", imagem);
      }

      await produtoService.criar(formData);
      alert("Produto cadastrado com sucesso!");
      navigate("/adm");
    } catch (error) {
      console.error("Erro ao cadastrar produto:", error);
      alert(error.response?.data || "Erro ao cadastrar produto");
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
            onClick={() => navigate(-1)}
          >
            <i className="bi bi-arrow-left-short"></i>
          </button>
          <img
            src="../public/logoSemFundo.png"
            alt="logo econest"
            className="rounded my-3 align-self-start"
            style={{ width: "70px" }}
          />

          <form onSubmit={handleSubmit}>
            <fieldset className="row g-3">
              <legend className="col-12 text-success">Cadastrar Produto</legend>

              <div className="col-12">
                <input
                  type="text"
                  className="form-control eco-border"
                  placeholder="Nome do produto"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  required
                />
              </div>

              <div className="col-12 col-md-6">
                <input
                  type="text"
                  className="form-control eco-border"
                  placeholder="Descrição"
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  required
                />
              </div>

              <div className="col-12 col-md-6">
                <input
                  type="number"
                  className="form-control eco-border"
                  placeholder="Quantidade em estoque"
                  value={qtdEstoque}
                  onChange={(e) => setQtdEstoque(e.target.value)}
                  required
                  min="0"
                />
              </div>

              <div className="col-12 col-md-6">
                <input
                  type="number"
                  step="0.01"
                  className="form-control eco-border"
                  placeholder="Valor do Produto"
                  value={preco}
                  onChange={(e) => setPreco(e.target.value)}
                  required
                  min="0.01"
                />
              </div>

              <div className="col-12 col-md-6">
                <label htmlFor="formFile" className="form-label">
                  Upload do Produto
                </label>
                <input
                  className="form-control eco-border"
                  type="file"
                  id="formFile"
                  accept="image/*"
                  onChange={(e) => setImagem(e.target.files[0])}
                />
              </div>

              <div className="col-12 col-md-6">
                <select
                  className="form-select eco-border"
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value)}
                  required
                >
                  <option value="" disabled>
                    Categoria
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
                  {loading ? "SALVANDO..." : "SALVAR PRODUTO"}
                </button>
              </div>
            </fieldset>
          </form>
        </div>
      </main>
    </>
  );
}
