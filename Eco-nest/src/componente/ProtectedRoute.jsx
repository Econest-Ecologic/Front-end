import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

/**
 * Componente para proteger rotas que exigem autenticação
 * Redireciona para login se não houver usuário autenticado
 */
export default function ProtectedRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verificarAutenticacao = () => {
      try {
        const usuario = localStorage.getItem("usuario");
        const token = localStorage.getItem("token");

        console.log("🔐 ProtectedRoute - Verificando autenticação:");
        console.log(
          "- Usuário no localStorage:",
          usuario ? "Existe" : "Não existe"
        );
        console.log(
          "- Token no localStorage:",
          token ? "Existe" : "Não existe"
        );

        // VERIFICAÇÃO RIGOROSA: Verifica se AMBOS existem e são válidos
        if (
          !usuario ||
          !token ||
          usuario === "null" ||
          usuario === "undefined" ||
          token === "null" ||
          token === "undefined"
        ) {
          console.log("❌ Dados de autenticação inválidos ou ausentes");
          limparDadosEBloquear();
          return;
        }

        // Tenta fazer parse do usuário
        try {
          const parsedUser = JSON.parse(usuario);

          if (!parsedUser || !parsedUser.id || !parsedUser.nome) {
            console.log("❌ Dados do usuário estão corrompidos");
            limparDadosEBloquear();
            return;
          }

          console.log("✅ Usuário autenticado:", parsedUser.nome);
          setIsAuthenticated(true);
          setIsLoading(false);
        } catch (parseError) {
          console.error("❌ Erro ao fazer parse do usuário:", parseError);
          limparDadosEBloquear();
        }
      } catch (error) {
        console.error("❌ Erro na verificação:", error);
        limparDadosEBloquear();
      }
    };

    const limparDadosEBloquear = () => {
      console.log("🧹 Limpando dados inválidos...");
      localStorage.removeItem("usuario");
      localStorage.removeItem("token");
      localStorage.removeItem("carrinho");
      setIsAuthenticated(false);
      setIsLoading(false);
    };

    verificarAutenticacao();
  }, []);

  // Mostra loading enquanto verifica
  if (isLoading) {
    return (
      <div className="min-vh-100 d-flex justify-content-center align-items-center bg-eco">
        <div className="text-center">
          <div
            className="spinner-border text-success mb-3"
            role="status"
            style={{ width: "3rem", height: "3rem" }}
          >
            <span className="visually-hidden">Verificando autenticação...</span>
          </div>
          <p className="eco-text">Verificando suas credenciais...</p>
        </div>
      </div>
    );
  }

  // Se não autenticado, redireciona para login
  if (!isAuthenticated) {
    console.log("🚫 Acesso negado - redirecionando para login");
    return <Navigate to="/" replace />;
  }

  // Se autenticado, renderiza o componente filho
  console.log("✅ Acesso permitido");
  return children;
}
