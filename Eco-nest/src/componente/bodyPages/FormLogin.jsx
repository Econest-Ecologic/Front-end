import InputOutline from "../InputOutline";
import { BotaoTrocaLogin } from "../BotaoTrocaLogin";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Toast from "../Toast";
import { authService } from "../../services/authService";
import * as bootstrap from "bootstrap";
import { Navbar } from "../Navbar";

export function FormLogin() {
  const navigate = useNavigate();
  const [senha, setSenha] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  const mostrarToast = (msg) => {
    setToastMsg(msg);
    const toast = document.getElementById("toast");
    const bsToast = new bootstrap.Toast(toast);
    bsToast.show();
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await authService.login(email, senha);

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

      if (response.roles.includes("ADMIN")) {
        navigate("/adm");
      } else {
        navigate("/homeLogado");
      }
    } catch (error) {
      console.error("Erro no login:", error);
      mostrarToast(error.response?.data || "Email ou senha inválidos");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="vh-100 justify-content-center">
      <Navbar />
      <div className="container-fluid d-flex flex-lg-row flex-column flex-wrap justify-content-center align-items-center h-100">
        <div className="col-md-4 border border-1 border-secundary p-5">
          <h3 className="text-center mb-4 eco-text">Faça o seu Login</h3>

          <form onSubmit={handleLogin}>
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

            <button
              className="btn btn-eco w-100"
              type="submit"
              disabled={loading}
            >
              {loading ? "ENTRANDO..." : "ENTRAR"}
            </button>
            <div className="w-100 text-center">
              <button
                className="btn btn-link"
                onClick={() => navigate("/cadastroUsuario")}
                type="button"
              >
                Cadastro
              </button>
            </div>
          </form>
        </div>
      </div>
      <Toast msg={toastMsg} color="bg-danger" />
    </div>
  );
}
