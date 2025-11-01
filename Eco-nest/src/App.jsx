import { FormLogin } from "./componente/bodyPages/FormLogin";
import { useEffect } from "react";
import "./App.css";

function App() {
  useEffect(() => {
    // ✅ APENAS limpar dados de AUTENTICAÇÃO na página de login
    // ❌ NÃO limpar o carrinho aqui!
    console.log("🔐 Verificando página de login...");

    const token = localStorage.getItem("token");
    const usuario = localStorage.getItem("usuario");

    // Só limpar se houver dados inválidos
    if (token === "null" || token === "undefined") {
      localStorage.removeItem("token");
    }
    if (usuario === "null" || usuario === "undefined") {
      localStorage.removeItem("usuario");
    }

    console.log("✅ Página de login carregada");
  }, []);

  return <FormLogin />;
}

export default App;
