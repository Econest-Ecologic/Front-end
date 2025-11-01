import api from "./api";

export const produtoService = {
  listarTodos: async () => {
    try {
      console.log("📦 Listando todos os produtos...");
      const response = await api.get("/produto");

      console.log(`✅ ${response.data.length} produtos encontrados`);

      // Log detalhado dos produtos
      response.data.forEach((produto) => {
        console.log(
          `Produto ${produto.cdProduto}: ${produto.nmProduto} - Estoque: ${produto.qtdEstoque} - Ativo: ${produto.flAtivo}`
        );
      });

      return response.data;
    } catch (error) {
      console.error("❌ Erro ao listar produtos:", error);
      throw error;
    }
  },

  buscarPorId: async (id) => {
    try {
      console.log(`🔍 Buscando produto ID: ${id}`);
      const response = await api.get(`/produto/${id}`);

      console.log(`✅ Produto encontrado:`, {
        id: response.data.cdProduto,
        nome: response.data.nmProduto,
        estoque: response.data.qtdEstoque,
        ativo: response.data.flAtivo,
      });

      return response.data;
    } catch (error) {
      console.error(`❌ Erro ao buscar produto ${id}:`, error);
      throw error;
    }
  },

  buscarPorCategoria: async (categoria) => {
    try {
      console.log(`🔍 Buscando produtos da categoria: ${categoria}`);
      const response = await api.get(`/produto/categoria/${categoria}`);
      console.log(
        `✅ ${response.data.length} produtos encontrados na categoria ${categoria}`
      );
      return response.data;
    } catch (error) {
      console.error(`❌ Erro ao buscar por categoria ${categoria}:`, error);
      throw error;
    }
  },

  buscarPorNome: async (nome) => {
    try {
      console.log(`🔍 Buscando produtos com nome: ${nome}`);
      const response = await api.get(`/produto/buscar?nome=${nome}`);
      console.log(`✅ ${response.data.length} produtos encontrados`);
      return response.data;
    } catch (error) {
      console.error(`❌ Erro ao buscar por nome ${nome}:`, error);
      throw error;
    }
  },

  criar: async (formData) => {
    try {
      console.log("➕ Criando novo produto...");

      // Log dos dados sendo enviados
      for (let [key, value] of formData.entries()) {
        if (key === "imgProduto") {
          console.log(`${key}: [Arquivo de imagem]`);
        } else {
          console.log(`${key}: ${value}`);
        }
      }

      const response = await api.post("/produto", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("✅ Produto criado com sucesso:", {
        id: response.data.cdProduto,
        nome: response.data.nmProduto,
        estoque: response.data.qtdEstoque,
      });

      return response.data;
    } catch (error) {
      console.error("❌ Erro ao criar produto:", error);
      console.error("Detalhes do erro:", error.response?.data);
      throw error;
    }
  },

  atualizar: async (id, formData) => {
    try {
      console.log(`📝 Atualizando produto ID: ${id}`);

      const response = await api.put(`/produto/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("✅ Produto atualizado:", {
        id: response.data.cdProduto,
        nome: response.data.nmProduto,
        estoque: response.data.qtdEstoque,
      });

      return response.data;
    } catch (error) {
      console.error(`❌ Erro ao atualizar produto ${id}:`, error);
      throw error;
    }
  },

  inativar: async (id) => {
    try {
      console.log(`🗑️ Inativando produto ID: ${id}`);
      const response = await api.delete(`/produto/${id}`);
      console.log("✅ Produto inativado com sucesso");
      return response.data;
    } catch (error) {
      console.error(`❌ Erro ao inativar produto ${id}:`, error);
      throw error;
    }
  },
};
