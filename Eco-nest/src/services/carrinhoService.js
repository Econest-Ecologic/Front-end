// src/services/carrinhoService.js
// Serviço para gerenciar o carrinho usando localStorage

const CARRINHO_KEY = "econest_carrinho";

export const carrinhoService = {
  // Obter todos os itens do carrinho
  obterCarrinho: () => {
    const carrinho = localStorage.getItem(CARRINHO_KEY);
    return carrinho ? JSON.parse(carrinho) : [];
  },

  // Adicionar item ao carrinho
  adicionarItem: (produto, quantidade = 1) => {
    const carrinho = carrinhoService.obterCarrinho();

    // Verificar se o produto já existe no carrinho
    const itemExistente = carrinho.find(
      (item) => item.cdProduto === produto.cdProduto
    );

    if (itemExistente) {
      // Atualizar quantidade
      itemExistente.quantidade += quantidade;

      // Verificar se não excede o estoque
      if (itemExistente.quantidade > produto.qtdEstoque) {
        throw new Error("Quantidade solicitada excede o estoque disponível");
      }
    } else {
      // Adicionar novo item
      carrinho.push({
        cdProduto: produto.cdProduto,
        nome: produto.nome,
        preco: produto.preco,
        img: produto.img,
        quantidade: quantidade,
        qtdEstoque: produto.qtdEstoque,
      });
    }

    localStorage.setItem(CARRINHO_KEY, JSON.stringify(carrinho));
    return carrinho;
  },

  // Remover item do carrinho
  removerItem: (cdProduto) => {
    let carrinho = carrinhoService.obterCarrinho();
    carrinho = carrinho.filter((item) => item.cdProduto !== cdProduto);
    localStorage.setItem(CARRINHO_KEY, JSON.stringify(carrinho));
    return carrinho;
  },

  // Atualizar quantidade de um item
  atualizarQuantidade: (cdProduto, novaQuantidade) => {
    const carrinho = carrinhoService.obterCarrinho();
    const item = carrinho.find((item) => item.cdProduto === cdProduto);

    if (item) {
      if (novaQuantidade <= 0) {
        return carrinhoService.removerItem(cdProduto);
      }

      if (novaQuantidade > item.qtdEstoque) {
        throw new Error("Quantidade solicitada excede o estoque disponível");
      }

      item.quantidade = novaQuantidade;
      localStorage.setItem(CARRINHO_KEY, JSON.stringify(carrinho));
    }

    return carrinho;
  },

  // Limpar carrinho
  limparCarrinho: () => {
    localStorage.removeItem(CARRINHO_KEY);
    return [];
  },

  // Obter quantidade total de itens
  obterQuantidadeTotal: () => {
    const carrinho = carrinhoService.obterCarrinho();
    return carrinho.reduce((total, item) => total + item.quantidade, 0);
  },

  // Obter valor total do carrinho
  obterValorTotal: () => {
    const carrinho = carrinhoService.obterCarrinho();
    return carrinho.reduce(
      (total, item) => total + item.preco * item.quantidade,
      0
    );
  },
};
