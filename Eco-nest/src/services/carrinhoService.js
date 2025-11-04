const CARRINHO_KEY = "econest_carrinho";

export const carrinhoService = {
  obterCarrinho: () => {
    const carrinho = localStorage.getItem(CARRINHO_KEY);
    return carrinho ? JSON.parse(carrinho) : [];
  },

  adicionarItem: (produto, quantidade = 1) => {
    const carrinho = carrinhoService.obterCarrinho();

    const itemExistente = carrinho.find(
      (item) => item.cdProduto === produto.cdProduto
    );

    if (itemExistente) {
      itemExistente.quantidade += quantidade;

      if (itemExistente.quantidade > produto.qtdEstoque) {
        throw new Error("Quantidade solicitada excede o estoque disponível");
      }
    } else {
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

  removerItem: (cdProduto) => {
    let carrinho = carrinhoService.obterCarrinho();
    carrinho = carrinho.filter((item) => item.cdProduto !== cdProduto);
    localStorage.setItem(CARRINHO_KEY, JSON.stringify(carrinho));
    return carrinho;
  },

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

  limparCarrinho: () => {
    localStorage.removeItem(CARRINHO_KEY);
    return [];
  },

  obterQuantidadeTotal: () => {
    const carrinho = carrinhoService.obterCarrinho();
    return carrinho.reduce((total, item) => total + item.quantidade, 0);
  },

  obterValorTotal: () => {
    const carrinho = carrinhoService.obterCarrinho();
    return carrinho.reduce(
      (total, item) => total + item.preco * item.quantidade,
      0
    );
  },
};
