import { FormLogin } from "./componente/bodyPages/FormLogin";
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

  return <FormLogin />;
}

export default App;
