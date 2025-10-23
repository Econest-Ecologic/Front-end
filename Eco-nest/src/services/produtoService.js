import api from "./api";

export const produtoService = {
  listarTodos: async () => {
    const response = await api.get("/produto");
    return response.data;
  },

  buscarPorId: async (id) => {
    const response = await api.get(`/produto/${id}`);
    return response.data;
  },

  buscarPorCategoria: async (categoria) => {
    const response = await api.get(`/produto/categoria/${categoria}`);
    return response.data;
  },

  buscarPorNome: async (nome) => {
    const response = await api.get(`/produto/buscar?nome=${nome}`);
    return response.data;
  },

  criar: async (formData) => {
    const response = await api.post("/produto", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  atualizar: async (id, formData) => {
    const response = await api.put(`/produto/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  inativar: async (id) => {
    const response = await api.delete(`/produto/${id}`);
    return response.data;
  },
};
