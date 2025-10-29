import InputOutline from "../componente/InputOutline";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../app.css";
import Toast from "../componente/Toast";
import { usuarioService } from "../services/usuarioService";
import * as bootstrap from "bootstrap";

export default function TelaEditarPerfil() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [toastColor, setToastColor] = useState("bg-success");

  const [usuario, setUsuario] = useState(null);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [endereco, setEndereco] = useState("");
  const [cpf, setCpf] = useState("");
  const [telefone, setTelefone] = useState("");
  const [estado, setEstado] = useState("SC");

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
    { nome: "Tocantins", sigla: "TO" },
  ];

  useEffect(() => {
    carregarDadosUsuario();
  }, []);

  const carregarDadosUsuario = async () => {
    try {
      const usuarioData = JSON.parse(localStorage.getItem("usuario"));
      if (!usuarioData || !usuarioData.id) {
        mostrarToast("Usuário não encontrado", "bg-danger");
        navigate("/");
        return;
      }

      const dados = await usuarioService.buscarPorId(usuarioData.id);

      setUsuario(dados);
      setNome(dados.nmUsuario);
      setEmail(dados.nmEmail);
      setEndereco(dados.dsEndereco);
      setCpf(dados.nuCpf);
      setTelefone(dados.nuTelefone);
      setEstado(dados.estado || "SC");
    } catch (error) {
      console.error("Erro ao carregar dados do usuário:", error);
      mostrarToast("Erro ao carregar dados do usuário", "bg-danger");
    }
  };

  const mostrarToast = (msg, color = "bg-success") => {
    setToastMsg(msg);
    setToastColor(color);
    const toast = document.getElementById("toast");
    const bsToast = new bootstrap.Toast(toast);
    bsToast.show();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (nome.length < 3) {
        mostrarToast("Nome deve ter no mínimo 3 caracteres", "bg-danger");
        return;
      }

      if (cpf.replace(/\D/g, "").length !== 11) {
        mostrarToast("CPF deve ter 11 dígitos", "bg-danger");
        return;
      }

      if (telefone.replace(/\D/g, "").length < 10) {
        mostrarToast("Telefone inválido", "bg-danger");
        return;
      }

      if (senha && senha.length < 3) {
        mostrarToast("Senha deve ter no mínimo 3 caracteres", "bg-danger");
        return;
      }

      const dados = {
        nmUsuario: nome,
        nmEmail: email,
        nuCpf: cpf.replace(/\D/g, ""),
        dsEndereco: endereco,
        nuTelefone: telefone.replace(/\D/g, ""),
        estado: estado,
        roles: usuario.roles,
        flAtivo: usuario.flAtivo,
      };

      // Apenas incluir senha se foi alterada
      if (senha && senha.trim() !== "") {
        dados.nmSenha = senha;
      } else {
        dados.nmSenha = usuario.nmSenha || "unchanged";
      }

      await usuarioService.atualizar(usuario.cdUsuario, dados);

      // Atualizar localStorage
      const usuarioAtualizado = JSON.parse(localStorage.getItem("usuario"));
      usuarioAtualizado.nome = nome;
      usuarioAtualizado.email = email;
      localStorage.setItem("usuario", JSON.stringify(usuarioAtualizado));

      mostrarToast("Perfil atualizado com sucesso!");

      // Limpar campo de senha
      setSenha("");
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
      mostrarToast(
        error.response?.data || "Erro ao atualizar perfil",
        "bg-danger"
      );
    } finally {
      setLoading(false);
    }
  };

  if (!usuario) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Carregando...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="d-flex justify-content-center align-items-center min-vh-100 bg-eco d-flex vh-100 ">
        <div className="p-5 custom-card-container bg-body rounded rounded-5 d-flex justify-content-center align-items-center">
          <button
            className="btn btn-voltar border-0 fs-2 rounded-2 align-self-start"
            onClick={() => {
              navigate(-1);
            }}
          >
            <i className="bi bi-arrow-left-short"></i>
          </button>

          <div className="row">
            <div
              className="col-md-5 d-flex flex-column align-items-center justify-content-center text-center eco-text"
              id="logo-container"
            >
              <h2 className="fw-bold" id="titulo-admin">
                EDITAR <br /> PERFIL
              </h2>
              <img
                src="../public/logoSemFundo.png"
                alt="EcoNest Logo"
                className="img-fluid w-50"
              />
            </div>

            <div className="col-md-7 d-flex justify-content-center align-items-center">
              <form className="w-100" onSubmit={handleSubmit}>
                <InputOutline
                  type="text"
                  placeholder={"Nome"}
                  icon={<i className="bi bi-person"></i>}
                  inputValue={nome}
                  inputFunction={setNome}
                />

                <InputOutline
                  type="email"
                  placeholder={"E-mail"}
                  icon={<i className="bi bi-envelope"></i>}
                  inputValue={email}
                  inputFunction={setEmail}
                />

                <InputOutline
                  type="password"
                  placeholder="Nova Senha (deixe em branco para manter)"
                  icon={<i className="bi bi-lock"></i>}
                  inputValue={senha}
                  inputFunction={setSenha}
                />

                <InputOutline
                  type="text"
                  placeholder="Endereço"
                  icon={<i className="bi bi-geo-alt"></i>}
                  inputValue={endereco}
                  inputFunction={setEndereco}
                />

                <InputOutline
                  type="text"
                  placeholder="CPF"
                  icon={<i className="bi bi-file-text"></i>}
                  inputValue={cpf}
                  inputFunction={setCpf}
                />

                <InputOutline
                  type="tel"
                  placeholder="Telefone"
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
                    {estadosBrasil.map((est) => (
                      <option key={est.sigla} value={est.sigla}>
                        {est.nome}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  className="btn w-100 mt-4 btn-lg btn-eco text-white"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      SALVANDO...
                    </>
                  ) : (
                    "SALVAR ALTERAÇÕES"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Toast msg={toastMsg} color={toastColor} />
    </>
  );
}
