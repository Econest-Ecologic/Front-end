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
import { GerenciarProduto } from "./pages/GerenciarProduto";
import Carrinho from "./componente/bodyPages/Carrinho";
import DetalhesProduto from "./componente/bodyPages/DetalhesProduto";
import PagPagamento from "./componente/bodyPages/PagPagamento";
import ProtectedRoute from "./componente/ProtectedRoute";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import EditarUsuario from "./componente/bodyPages/EditarUsuario";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* ROTAS PÚBLICAS (sem login) */}
        <Route path="/" element={<App />} />
        <Route path="/home" element={<HomeUsuario />} />
        <Route path="/sobre" element={<SobreNos />} />
        <Route path="/contato" element={<Contato />} />

        {/* ROTAS PROTEGIDAS (requerem login) */}
        <Route
          path="/produto/:id"
          element={
            <ProtectedRoute>
              <DetalhesProduto />
            </ProtectedRoute>
          }
        />
        <Route
          path="/homeLogado"
          element={
            <ProtectedRoute>
              <HomeLogado />
            </ProtectedRoute>
          }
        />
        <Route
          path="/carrinho"
          element={
            <ProtectedRoute>
              <Carrinho />
            </ProtectedRoute>
          }
        />
        <Route
          path="/editarperfil"
          element={
            <ProtectedRoute>
              <TelaEditarPerfil />
            </ProtectedRoute>
          }
        />

        {/* ROTAS DE ADMINISTRADOR (protegidas) */}
        <Route
          path="/adm"
          element={
            <ProtectedRoute>
              <TelaAdm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cadastroProduto"
          element={
            <ProtectedRoute>
              <TelaCadastrarProduto />
            </ProtectedRoute>
          }
        />
        <Route
          path="/criarCadastro"
          element={
            <ProtectedRoute>
              <CriarAdministrador />
            </ProtectedRoute>
          }
        />
        <Route
          path="/GerenciarProduto"
          element={
            <ProtectedRoute>
              <GerenciarProduto />
            </ProtectedRoute>
          }
        />
        <Route
          path="/feedback"
          element={
            <ProtectedRoute>
              <Feedback />
            </ProtectedRoute>
          }
        />

        {/* ROTAS MISTAS (podem ser ajustadas) */}
        <Route path="/pagProduto" element={<PagProduto />} />
        <Route path="/editarperfil" element={<TelaEditarPerfil />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/homeLogado" element={<HomeLogado />} />
        <Route path="/GerenciarProduto" element={<GerenciarProduto />} />
        <Route path="/carrinho" element={<Carrinho />} />
        <Route path="/GerenciarProduto" element={<GerenciarProduto />} />
        <Route path="/produto/:id" element={<DetalhesProduto />} />
        <Route path="/pagamento" element={<PagPagamento />} />
        <Route path="/editarUsuario" element={<EditarUsuario />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
