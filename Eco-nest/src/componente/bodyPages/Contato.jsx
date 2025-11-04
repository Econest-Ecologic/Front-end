/* global bootstrap */
import { Navbar } from "../Navbar";
import InputOutline from "../InputOutline";
import { useState } from "react";
import Footer from "../Footer";
import Toast from "../Toast";
export default function Contato() {
  const [nome, setNome] = useState();
  const [email, setEmail] = useState();
  const [msg, setMsg] = useState();
  const [color, setColor] = useState();
  const handleSubmit = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!nome || !email || !emailRegex.test(email)) {
      const toast = document.getElementById("liveToast");
      const toastFinal = new bootstrap.Toast(toast);
      setMsg("Preencha todos os campos");
      setColor("bg-danger");
      setTimeout(() => toastFinal.show(), 50);

      return;
    }

    const toast = document.getElementById("liveToast");
    const toastFinal = new bootstrap.Toast(toast);
    setMsg("Enviado com sucesso");
    setColor("bg-success");

    setTimeout(() => toastFinal.show(), 50);

    setNome("");
    setEmail("");
    document.getElementById("floatingTextarea").value = "";
  };
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="container-fluid d-flex justify-content-center align-items-center h-75 overflow-hidden min-vh-100">
        <div className="container d-flex justify-content-center align-items-center flex-column border eco-border py-5 px-0 ">
          <h1 className="text-wrap text-success">Entre em Contato</h1>
          <p className="fs-4 text-wrap fs-sm-5">
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
            <div className="container-fluid d-flex justify-content-end mt-3 ">
              <button
                className="btn btn-eco btn-lg w-100"
                onClick={() => {
                  handleSubmit();
                }}
              >
                Enviar
              </button>
            </div>
          </div>
        </div>

        <div class="toast-container{} position-fixed bottom-0 end-0 p-3">
          <div
            id="liveToast"
            class={`toast ${color}`}
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
          >
            <div class="toast-header">
              <strong class="me-auto">Alert</strong>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="toast"
                aria-label="Close"
              ></button>
            </div>
            <div class="toast-body">{msg} </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
