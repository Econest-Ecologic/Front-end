import api from "./api";

export const usuarioService = {
  listarTodos: async () => {
    const response = await api.get("/usuario");
    return response.data;
  },

  buscarPorId: async (id) => {
    const response = await api.get(`/usuario/${id}`);
    return response.data;
  },

  criar: async (formData) => {
    const response = await api.post("/usuario", formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  },

  atualizar: async (id, dados) => {
    const response = await api.put(`/usuario/${id}`, dados);
    return response.data;
  },

  inativar: async (id) => {
    const response = await api.delete(`/usuario/${id}`);
    return response.data;
  },
};
