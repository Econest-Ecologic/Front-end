/* global bootstrap */
import { Navbar } from "../Navbar";
import InputOutline from "../InputOutline";
import { useState } from "react";
import Footer from "../Footer";
import Toast from "../Toast";
export default function Contato() {
  const [nome, setNome] = useState();
  const [email, setEmail] = useState();

  const mostrarToast = () => {
    const toast = document.getElementById("toast");
    const bsToast = new bootstrap.Toast(toast);
    bsToast.show();
  };
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="container-fluid d-flex justify-content-center align-items-center h-75 overflow-hidden min-vh-100">
        <div className="container d-flex justify-content-center align-items-center flex-column border eco-border py-5 px-0 ">
          <h1 className="text-wrap">Entre em Contato</h1>
          <p className="fs-4">
            Queremos ouvir você, preencha o formulário abaixo :
          </p>
          <div className="w-50">
            <InputOutline
              placeholder={"Nome"}
              icon={<i className="bi bi-person"></i>}
              inputValue={nome}
              inputFunction={setNome}
            />

            <InputOutline
              type={"email"}
              placeholder={"Email"}
              icon={<i className="bi bi-envelope-at"></i>}
              inputValue={email}
              inputFunction={setEmail}
            />
            <div className="form-floating">
              <textarea
                className="form-control eco-border"
                placeholder="Comentário"
                id="floatingTextarea"
              ></textarea>
              <label htmlFor="floatingTextarea">
                <i className="bi bi-chat-left-dots me-2"></i>
                Mensagem
              </label>
            </div>
            <div className="container-fluid d-flex justify-content-end mt-3">
              <button className="btn btn-eco" onClick={mostrarToast}>
                Enviar
              </button>
            </div>
          </div>
        </div>
        <Toast
          msg={"Mensagem enviada com sucesso"}
          icon={<i className="bi bi-check-lg"></i>}
        />
      </main>

      <Footer />
    </>
  );
}
