import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeUsuario from "./componente/bodyPages/HomeUsuario";
import App from "./App";
import SobreNos from "./componente/bodyPages/SobreNos";
import Contato from "./componente/bodyPages/Contato";
import Produtos from "./componente/bodyPages/Produtos";
import { TelaAdm } from "./pages/TelaAdm";
import { TelaCadastrarProduto } from "./pages/TelaCadastrarProduto";
import { CriarAdministrador } from "./pages/CriarAdministrador";
import PagProduto from "./componente/bodyPages/PagProduto";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/home" element={<HomeUsuario />} />
        <Route path="/sobre" element={<SobreNos />} />
        <Route path="/contato" element={<Contato />} />
        <Route path="/produtos" element={<Produtos />} />
        <Route path="/adm" element={<TelaAdm />} />
        <Route path="/cadastroProduto" element={<TelaCadastrarProduto />} />
        <Route path="/criarCadastro" element={<CriarAdministrador />} />
        <Route path="/pagProduto" element={<PagProduto />} />
        
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
