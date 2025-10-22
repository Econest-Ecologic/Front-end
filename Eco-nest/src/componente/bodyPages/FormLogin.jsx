import InputOutline from "../InputOutline";
import { BotaoTrocaLogin } from "../BotaoTrocaLogin";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Toast from "../Toast";
/* global bootstrap */

export function FormLogin({ trocaLogin }) {
  const verdeTema = "#2F5E36";

  const navigate = useNavigate();
  const [senha, setSenha] = useState();
  const [email, setEmail] = useState();

  const mostrarToast = () => {
    const toast = document.getElementById("toast");
    const bsToast = new bootstrap.Toast(toast);
    bsToast.show();
  };

  function adm() {
    if (email == "adm" && senha == "adm") {
      navigate("/adm");
    } else if(email=="user" && senha == "123"){
        navigate("/homeLogado")
    }else{
      mostrarToast();
    }
  }
  return (
    <>
      <div className="container-fluid d-flex flex-lg-row flex-column flex-wrap justify-content-center align-items-center">
        <div className="col-md-4 border border-1  border-secundary p-5 ">
          <h3 className="text-center mb-4" style={{ color: verdeTema }}>
            Faça o seu Login
          </h3>

          <div>
            <InputOutline
              type={"email"}
              placeholder={"Email"}
              icon={<i className="bi bi-envelope-at"></i>}
              inputValue={email}
              inputFunction={setEmail}
            />
            <InputOutline
              type={"password"}
              placeholder={"Senha"}
              icon={<i className="bi bi-lock"></i>}
              inputValue={senha}
              inputFunction={setSenha}
            />

            <button className="btn btn-eco w-100" onClick={adm}>
              ENTRAR
            </button>
            <BotaoTrocaLogin trocaLogin={trocaLogin} text={"Cadastro"} />
          </div>
        </div>
      </div>
      <Toast msg={"Email ou senha errados"} color={"bg-danger"} />
    </>
  );
}
