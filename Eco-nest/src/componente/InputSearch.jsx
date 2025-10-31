import { useEffect, useState } from "react";
import { produtoService } from "../services/produtoService";
import { useNavigate } from "react-router-dom";

export default function InputSearch() {
  const [listaInicial, setListaInicial] = useState([]);
  const [filtro, setFiltro] = useState([]);
  const navigate = useNavigate();

  const handleButtonClick = (id) => {
    console.log("Navegando para:", id);
    if (id) {
      navigate(`/produto/${id}`);
    } else {
      console.warn("cdProduto está vazio ou indefinido!");
    }
  };

  useEffect(() => {
    const loadProdutos = async () => {
      try {
        const produtos = await produtoService.listarTodos();
        setListaInicial(produtos);
      } catch (error) {
        console.log("Erro ao carregar produtos na navbar : " + error);
        setListaInicial([]);
      }
    };
    loadProdutos();
  }, []);
  return (
    <>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="d-flex input-group position-relative"
        role="search"
      >
        <input
          className="form-control border-1 eco-border border-end-0 rounded-start-0 rounded-start-5"
          type="search"
          placeholder="Pesquise o produto desejado"
          aria-label="Search"
          id="input-navbar"
          autoComplete="off"
          onChange={(e) => {
            const valor = e.target.value || "";
            if (valor.trim() === "") {
              setFiltro([]);
              return;
            }
            setFiltro(
              listaInicial
                .filter((prod) =>
                  prod.nmProduto.toLowerCase().includes(valor.toLowerCase())
                )
                .sort()
                .slice(0, 4)
            );
          }}
        />
        <button
          className="btn btn-navbar border-1 eco-border border-start-0 input-group-text rounded-end-5"
          type="button"
        >
          <i className="bi bi-search"></i>
        </button>
        <ul
          className="position-absolute d-flex flex-column bg-primary p-0 bg-body rounded-2"
          id="resultado-pesquisa"
          style={{ top: "40px", left: "10px", width: "95%", zIndex: "1000" }}
        >
          {filtro.map((prod, key) => (
            <li key={key}>
              <button
                className="bg-body border-bottom rounded-2 p-2 resp-result text-start"
                onClick={() => {
                  console.log("Produto clicado:", prod.cdProduto);
                  handleButtonClick(prod.cdProduto);
                }}
                type="button"
              >
                {prod.nmProduto}
              </button>
            </li>
          ))}
        </ul>
      </form>
    </>
  );
}
