import { useEffect } from "react";
import { NavbarLogado } from "../NavbarLogado";
import { useState } from "react";
import InputOutline from "../InputOutline";
import { usuarioService } from "../../services/usuarioService";
import Toast from "../Toast";

export default function EditarUsuario() {
  const [toastMsg, setToastMsg] = useState("");
  const [toastColor, setToastColor] = useState("bg-success");

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [cpf, setCpf] = useState("");
  const [endereco, setEndereco] = useState("");
  const [telefone, setTelefone] = useState("");
  const [estado, setEstado] = useState("SC");
  const [usuario, setUsuario] = useState([]);

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
    carregarUsuario();
  }, []);
  async function carregarUsuario() {
    try {
      const usuarioCadastrado = JSON.parse(localStorage.getItem("usuario"));
      const usuarioBuscado = await usuarioService.buscarPorId(
        usuarioCadastrado.id
      );
      setUsuario(usuarioBuscado);
    } catch (err) {
      console.error("Erro ao buscar usuário:", err);
    }
  }
  /* global bootstrap*/
  const mostrarToast = (msg, color = "bg-success") => {
    setToastMsg(msg);
    setToastColor(color);
    const toast = document.getElementById("toast");
    const bsToast = new bootstrap.Toast(toast);
    bsToast.show();
  };

  useEffect(() => {
    console.log(usuario);
    setNome(usuario.nmUsuario);
    setEmail(usuario.nmEmail);
    setEndereco(usuario.dsEndereco);
    setCpf(usuario.nuCpf);
    setTelefone(usuario.nuTelefone);
    setEstado(usuario.estado);
  }, [usuario]);

  const handleSubmit = async (e) => {
    e.preventDefault();

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
    }
  };
  return (
    <>
      <NavbarLogado />
      <main className="container-fluid d-flex flex-row flex-wrap justify-content-center align-items-center border border-1 border-secundary p-5">
        <div className="row">
          <div className="col-md-6 d-flex justify-content-center align-items-center flex-column ">
            <h1 className="text-center text-success">Editar perfil {nome}</h1>
            <img
              src="../public/logoSemFundo.png"
              className="img-thumbnail border-0 w-50"
              alt="Logo"
            />
          </div>

          <div className=" col-md-6 justify-content-center">
            <form onSubmit={handleSubmit}>
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
                  {estadosBrasil.map((est) => (
                    <option value={est.sigla}>{est.nome}</option>
                  ))}
                </select>
              </div>

              <div className="d-flex gap-2 justify-content-center flex-column gap-3">
                <button className="btn btn-eco w-100" type="submit">
                  Atualizar
                </button>
              </div>
            </form>
          </div>
        </div>
        <Toast msg={toastMsg} color={toastColor} />
      </main>
    </>
  );
}
