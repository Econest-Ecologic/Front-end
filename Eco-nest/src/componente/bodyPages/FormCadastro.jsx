import { useEffect, useState } from "react";
import { BotaoTrocaLogin } from "../BotaoTrocaLogin";
import InputOutline from "../InputOutline";
import { authService } from "../../services/authService";
import { useNavigate } from "react-router-dom";

export function FormCadastro({ trocaLogin }) {
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [cpf, setCpf] = useState("");
  const [endereco, setEndereco] = useState("");
  const [telefone, setTelefone] = useState("");
  const [estado, setEstado] = useState("SC");
  const [loading, setLoading] = useState(false);
  const estadosBrasil = [
    { nome: "Acre", sigla: "AC" },
    { nome: "Alagoas", sigla: "AL" },
    { nome: "Amapá", sigla: "AP" },
    { nome: "Amazonas", sigla: "AM" },
    { nome: "Bahia", sigla: "BA" },
    { nome: "Ceará", sigla: "CE" },
    { nome: "Distrito Federal", sigla: "DF" },
    { nome: "Espírito Santo", sigla: "ES" },
    { nome: "Goiás", sigla: "GO" },
    { nome: "Maranhão", sigla: "MA" },
    { nome: "Mato Grosso", sigla: "MT" },
    { nome: "Mato Grosso do Sul", sigla: "MS" },
    { nome: "Minas Gerais", sigla: "MG" },
    { nome: "Pará", sigla: "PA" },
    { nome: "Paraíba", sigla: "PB" },
    { nome: "Paraná", sigla: "PR" },
    { nome: "Pernambuco", sigla: "PE" },
    { nome: "Piauí", sigla: "PI" },
    { nome: "Rio de Janeiro", sigla: "RJ" },
    { nome: "Rio Grande do Norte", sigla: "RN" },
    { nome: "Rio Grande do Sul", sigla: "RS" },
    { nome: "Rondônia", sigla: "RO" },
    { nome: "Roraima", sigla: "RR" },
    { nome: "Santa Catarina", sigla: "SC" },
    { nome: "São Paulo", sigla: "SP" },
    { nome: "Sergipe", sigla: "SE" },
    { nome: "Tocantins", sigla: "TO" }
  ];

  const handleCadastro = async (e) => {
    e.preventDefault();
    setLoading(true);


    try {
      const response = await authService.register({
        nome,
        email,
        senha,
        cpf: cpf.replace(/\D/g, ""), // Remove formatação
        endereco,
        telefone: telefone.replace(/\D/g, ""),
        estado,
      });

      // Auto-login após cadastro
      localStorage.setItem("token", response.token);
      localStorage.setItem(
        "usuario",
        JSON.stringify({
          id: response.cdUsuario,
          nome: response.nmUsuario,
          email: response.nmEmail,
          roles: response.roles,
          estado: response.estado,
        })
      );

      navigate("/homeLogado");
    } catch (error) {
      console.error("Erro no cadastro:", error);
      alert(error.response?.data || "Erro ao cadastrar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="container-fluid d-flex flex-lg-row flex-column flex-wrap justify-content-center align-items-center border border-1 border-secundary p-5">
        <div className="container-fluid d-flex justify-content-center align-items-center flex-column w-50">
          <h1 className="text-center text-success">Realizar Cadastro</h1>
          <img
            src="../public/logoSemFundo.png"
            className="img-thumbnail border-0 w-50"
            alt="Logo"
          />
        </div>

        <div className="container-fluid w-50 justify-content-center">
          <form onSubmit={handleCadastro}>
            <InputOutline
              placeholder="Nome"
              icon={<i className="bi bi-person"></i>}
              inputValue={nome}
              inputFunction={setNome}
            />
            <InputOutline
              type="email"
              placeholder="Email"
              icon={<i className="bi bi-envelope-at"></i>}
              inputValue={email}
              inputFunction={setEmail}
            />
            <InputOutline
              type="password"
              placeholder="Senha"
              icon={<i className="bi bi-lock"></i>}
              inputValue={senha}
              inputFunction={setSenha}
            />
            <InputOutline
              placeholder="Endereço"
              icon={<i className="bi bi-globe-americas"></i>}
              inputValue={endereco}
              inputFunction={setEndereco}
            />
            <InputOutline
              placeholder="CPF (apenas números)"
              icon={<i className="bi bi-file-earmark-lock-fill"></i>}
              inputValue={cpf}
              inputFunction={setCpf}
            />
            <InputOutline
              placeholder="Telefone (apenas números)"
              icon={<i className="bi bi-telephone"></i>}
              inputValue={telefone}
              inputFunction={setTelefone}
            />

            <div className="mb-3">
              <select
                className="form-select eco-border"
                value={estado}
                onChange={(e) => setEstado(e.target.value)}
              >
                {estadosBrasil.map(est => (
                  <option value={est.sigla}>{est.nome}</option>
                ))}
              </select>
            </div>

            <div className="d-flex gap-2 justify-content-center flex-column gap-3">
              <button
                className="btn btn-eco w-100"
                type="submit"
                disabled={loading}
              >
                {loading ? "CADASTRANDO..." : "CADASTRAR"}
              </button>
              <BotaoTrocaLogin trocaLogin={trocaLogin} text="Login" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
