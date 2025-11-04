import api from "./api";

export const estoqueService = {
  buscarPorProduto: async (cdProduto) => {
    try {
      console.log(`Buscando estoque do produto ${cdProduto}`);
      const response = await api.get(`/estoque/produto/${cdProduto}`);
      console.log(`Estoque encontrado:`, response.data);
      return response.data;
    } catch (error) {
      if (error.response?.status === 404) {
        console.warn(`Estoque não encontrado para produto ${cdProduto}`);
        return {
          cdEstoque: null,
          qtdEstoque: 0,
          cdProduto: cdProduto,
        };
      }

      console.error(`Erro ao buscar estoque do produto ${cdProduto}:`, error);
      throw error;
    }
  },

  reservarEstoque: async (cdProduto, quantidade) => {
    try {
      console.log(
        `Reservando estoque - Produto: ${cdProduto}, Qtd: ${quantidade}`
      );

      const response = await api.post("/estoque/reservar", {
        cdProduto: cdProduto,
        quantidade: quantidade,
      });

      console.log("Estoque reservado:", response.data);
      return response.data;
    } catch (error) {
      console.error("Erro ao reservar estoque:", error);

      if (error.response?.status === 404) {
        throw new Error("Produto não encontrado ou sem estoque cadastrado");
      }

      if (error.response?.status === 400) {
        const mensagem = error.response?.data || "Estoque insuficiente";
        throw new Error(mensagem);
      }

      throw new Error("Erro ao reservar estoque. Tente novamente.");
    }
  },

  liberarEstoque: async (cdProduto, quantidade) => {
    try {
      console.log(
        `Liberando estoque - Produto: ${cdProduto}, Qtd: ${quantidade}`
      );

      const response = await api.post("/estoque/liberar", {
        cdProduto: cdProduto,
        quantidade: quantidade,
      });

      console.log("Estoque liberado:", response.data);
      return response.data;
    } catch (error) {
      console.error("Erro ao liberar estoque:", error);
      return null;
    }
  },

  verificarDisponibilidade: async (cdProduto, quantidade) => {
    try {
      const estoque = await estoqueService.buscarPorProduto(cdProduto);
      const disponivel = estoque.qtdEstoque >= quantidade;

      console.log(
        `Disponibilidade - Produto: ${cdProduto}, Solicitado: ${quantidade}, Disponível: ${estoque.qtdEstoque} = ${disponivel}`
      );

      return disponivel;
    } catch (error) {
      console.error("Erro ao verificar disponibilidade:", error);
      return false;
    }
  },
};
