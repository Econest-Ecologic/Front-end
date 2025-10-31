// Eco-nest/src/services/estoqueService.js

import api from "./api";

export const estoqueService = {
  // Buscar estoque por produto
  buscarPorProduto: async (cdProduto) => {
    try {
      const response = await api.get(`/estoque/produto/${cdProduto}`);
      console.log(`✅ Estoque do produto ${cdProduto}:`, response.data);
      return response.data;
    } catch (error) {
      console.error(
        `❌ Erro ao buscar estoque do produto ${cdProduto}:`,
        error
      );
      throw error;
    }
  },

  // Reservar estoque (quando adiciona ao carrinho)
  reservarEstoque: async (cdProduto, quantidade) => {
    try {
      console.log(
        `🔒 Reservando estoque - Produto: ${cdProduto}, Quantidade: ${quantidade}`
      );

      const response = await api.post("/estoque/reservar", {
        cdProduto: cdProduto,
        quantidade: quantidade,
      });

      console.log("✅ Estoque reservado:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ Erro ao reservar estoque:", error);
      throw error;
    }
  },

  // Liberar estoque (quando remove do carrinho)
  liberarEstoque: async (cdProduto, quantidade) => {
    try {
      console.log(
        `🔓 Liberando estoque - Produto: ${cdProduto}, Quantidade: ${quantidade}`
      );

      const response = await api.post("/estoque/liberar", {
        cdProduto: cdProduto,
        quantidade: quantidade,
      });

      console.log("✅ Estoque liberado:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ Erro ao liberar estoque:", error);
      throw error;
    }
  },

  // Verificar disponibilidade
  verificarDisponibilidade: async (cdProduto, quantidade) => {
    try {
      const response = await api.get(`/estoque/verificar/${cdProduto}`, {
        params: { quantidade },
      });
      return true;
    } catch (error) {
      return false;
    }
  },

  // Atualizar estoque (admin)
  atualizarEstoque: async (cdEstoque, qtdEstoque) => {
    try {
      const response = await api.put(`/estoque/${cdEstoque}`, {
        qtdEstoque: qtdEstoque,
      });
      console.log("✅ Estoque atualizado:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ Erro ao atualizar estoque:", error);
      throw error;
    }
  },
};
