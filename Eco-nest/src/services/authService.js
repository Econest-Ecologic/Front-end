import api from "./api";

export const authService = {
  login: async (email, senha) => {
    const response = await api.post("/auth/login", {
      nmEmail: email,
      nmSenha: senha,
    });
    return response.data;
  },

  register: async (dados) => {
    const response = await api.post("/auth/register", {
      nmUsuario: dados.nome,
      nmEmail: dados.email,
      nmSenha: dados.senha,
      nuCpf: dados.cpf,
      dsEndereco: dados.endereco,
      nuTelefone: dados.telefone,
      estado: dados.estado,
    });
    return response.data;
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
  },
};
