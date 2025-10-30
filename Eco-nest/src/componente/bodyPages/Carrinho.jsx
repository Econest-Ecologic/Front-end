import { useNavigate } from "react-router-dom";
import { NavbarLogado } from "../NavbarLogado"
import { useState, useEffect } from "react";

export default function Carrinho() {
  const [carrinho, setCarrinho] = useState([]);
  const [loading, setLoading] = useState(true);


  const navigate = useNavigate();

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("carrinho");
      console.log("Carrinho recebido:", savedCart);

      if (savedCart && savedCart !== "undefined" && savedCart !== "null") {
        const parsedCart = JSON.parse(savedCart);

        // Validate that parsedCart is an array
        if (Array.isArray(parsedCart)) {
          setCarrinho(parsedCart);
        } else {
          console.warn("Carrinho não é um array, inicializando vazio");
          setCarrinho([]);
          localStorage.removeItem("carrinho");
        }
      }
    } catch (error) {
      console.error("Erro ao carregar carrinho:", error);
      setCarrinho([]);
      localStorage.removeItem("carrinho");
    } finally {
      setLoading(false);
    }
    console.log("Carrinho :" + carrinho)

  }, []);

  // Save cart to localStorage whenever it changes (except on initial load)
  useEffect(() => {
    if (!loading) {
      try {
        localStorage.setItem("carrinho", JSON.stringify(carrinho));
        console.log("Carrinho salvo:", carrinho);
      } catch (error) {
        console.error("Erro ao salvar carrinho:", error);
      }
    }
  }, [carrinho, loading]);

  // Function to remove item from cart
  const removerItem = (index) => {
    setCarrinho(prev => prev.filter((_, i) => i !== index));
  };

  // Function to update quantity
  const atualizarQuantidade = (index, novaQuantidade) => {
    if (novaQuantidade < 1) return;

    setCarrinho(prev => prev.map((item, i) =>
      i === index ? { ...item, quantidade: novaQuantidade } : item
    ));
  };

  // Calculate total
  const calcularTotal = () => {
    return carrinho.reduce((total, item) => {
      const preco = parseFloat(item.preco) || 0;
      const quantidade = parseInt(item.quantidade) || 1;
      return total + (preco * quantidade);
    }, 0);
  };

  return (
    <>
      <NavbarLogado carrinho={carrinho} />
      <main className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Carrinho de Compras</h1>

        {carrinho.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">Seu carrinho está vazio</p>
          </div>
        ) : (
          <div>
            <div className="space-y-4 mb-6">
              {carrinho.map((item, index) => (
                <div key={index} className="border border-2 border-success rounded-lg p-4 flex justify-between  items-center mt-2 rounded-2">
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.nome || 'Produto'}</h3>
                    <p className="text-gray-600 font-semibold">
                      R$ {parseFloat(item.preco || 0).toFixed(2)}
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => atualizarQuantidade(index, (item.quantidade || 1) - 1)}
                        className="px-3 btn btn-eco me-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                      >
                        -
                      </button>
                      <span className="w-12 text-center">{item.quantidade || 1}</span>
                      <button
                        onClick={() => atualizarQuantidade(index, (item.quantidade || 1) + 1)}
                        className="px-3 btn btn-eco ms-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => removerItem(index)}
                      className="px-4 btn btn-eco mt-2 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                      Remover
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between items-center text-xl font-bold">
                <h4>Total:</h4>
                <h4>R$ {calcularTotal().toFixed(2)}</h4>
              </div>

              <button 
              onClick={()=> navigate("/pagamento")}
              className="w-full mt-4 py-3 btn btn-eco bg-green-500 text-white rounded-lg hover:bg-green-600 font-semibold">
                Finalizar Compra
              </button>
            </div>
          </div>
        )}
      </main>
    </>
  );
}