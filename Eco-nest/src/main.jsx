import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeUsuario from "./componente/bodyPages/HomeUsuario";
import App from "./App";
import SobreNos from "./componente/bodyPages/SobreNos";
import Contato from "./componente/bodyPages/Contato";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/home" element={<HomeUsuario />} />
        <Route path="/sobre" element={<SobreNos />} />
        <Route path="/contato" element={<Contato />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
