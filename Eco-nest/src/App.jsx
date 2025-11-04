import { FormLogin } from "./componente/bodyPages/FormLogin";
import { useEffect } from "react";
import "./App.css";

function App() {
  useEffect(() => {
    console.log("Verificando página de login...");

    const token = localStorage.getItem("token");
    const usuario = localStorage.getItem("usuario");

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
