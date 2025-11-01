import api from "./api";

export const estoqueService = {
  // Buscar estoque por produto - COM FALLBACK
  buscarPorProduto: async (cdProduto) => {
    try {
      console.log(`🔍 Tentando buscar estoque do produto ${cdProduto}`);
      const response = await api.get(`/estoque/produto/${cdProduto}`);
      console.log(`✅ Estoque encontrado:`, response.data);
      return response.data;
    } catch (error) {
      // ⚠️ SE ERRO 404 (não encontrado), retornar estoque 0 ao invés de falhar
      if (error.response?.status === 404) {
        console.warn(
          `⚠️ Estoque não encontrado para produto ${cdProduto}, usando estoque 0`
        );
        return {
          cdEstoque: null,
          qtdEstoque: 0,
          cdProduto: cdProduto,
        };
      }

      // Se for outro erro, logar e retornar 0 também
      console.error(
        `❌ Erro ao buscar estoque do produto ${cdProduto}:`,
        error.message
      );
      return {
        cdEstoque: null,
        qtdEstoque: 0,
        cdProduto: cdProduto,
      };
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

      // Mensagem de erro mais amigável
      const mensagem =
        error.response?.data || "Estoque insuficiente ou produto indisponível";
      throw new Error(mensagem);
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
      // Não lançar erro aqui para não bloquear remoção de item
      return null;
    }
  },

  // Verificar disponibilidade - SIMPLIFICADO
  verificarDisponibilidade: async (cdProduto, quantidade) => {
    try {
      const estoque = await estoqueService.buscarPorProduto(cdProduto);
      const disponivel = estoque.qtdEstoque >= quantidade;

      console.log(
        `🔍 Disponibilidade - Produto: ${cdProduto}, Solicitado: ${quantidade}, Disponível: ${estoque.qtdEstoque} = ${disponivel}`
      );

      return disponivel;
    } catch (error) {
      console.error("❌ Erro ao verificar disponibilidade:", error);
      return false;
    }
  },
};
