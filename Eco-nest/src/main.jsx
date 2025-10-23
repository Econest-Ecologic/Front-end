import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeUsuario from "./componente/bodyPages/HomeUsuario";
import App from "./App";
import SobreNos from "./componente/bodyPages/SobreNos";
import Contato from "./componente/bodyPages/Contato";
import { TelaAdm } from "./pages/TelaAdm";
import { TelaCadastrarProduto } from "./pages/TelaCadastrarProduto";
import { CriarAdministrador } from "./pages/CriarAdministrador";
import PagProduto from "./componente/bodyPages/PagProduto";
import TelaEditarPerfil from "./pages/TelaEditarPerfil";
import { Feedback } from "./pages/Feedback";
import HomeLogado from "./componente/HomeLogado";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { GerenciarProduto } from "./pages/GerenciarProduto";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/home" element={<HomeUsuario />} />
        <Route path="/sobre" element={<SobreNos />} />
        <Route path="/contato" element={<Contato />} />
        <Route path="/adm" element={<TelaAdm />} />
        <Route path="/cadastroProduto" element={<TelaCadastrarProduto />} />
        <Route path="/criarCadastro" element={<CriarAdministrador />} />
        <Route path="/pagProduto" element={<PagProduto />} />
        <Route path="/editarperfil" element={<TelaEditarPerfil />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/homeLogado" element={<HomeLogado />} />
        <Route path="/GerenciarProduto" element={<GerenciarProduto/>} />
      </Routes>

    </BrowserRouter>
  </StrictMode>
);
