import { TelaForms } from "./pages/TelaForms";
import { Navbar } from "./componente/Navbar";
import { useEffect } from "react";
import "./App.css";

function App() {
  useEffect(() => {
    // LIMPAR TUDO quando entrar na página inicial (login/cadastro)
    console.log("🧹 Limpando localStorage na página inicial...");

    localStorage.removeItem("usuario");
    localStorage.removeItem("token");
    localStorage.removeItem("carrinho");
    localStorage.removeItem("redirectAfterLogin");

    console.log("✅ LocalStorage limpo!");
  }, []);

  return (
    <>
      <Navbar />
      <TelaForms />
    </>
  );
}

export default App;
