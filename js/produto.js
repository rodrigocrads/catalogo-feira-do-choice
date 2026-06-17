window.onload = async () => {

    const codigo =
        new URLSearchParams(window.location.search)
            .get("codigo");

    const produtos =
        await obterProdutos();

    const produto =
        produtos.find(x => x.codigo === codigo);

    document.getElementById("produtoDetalhe")
        .innerHTML = `
        <div class="produto-page">

            <img
                src="imagens/produtos/${produto.imagem}">

            <div>

                <h1>${produto.nome}</h1>

                <h2>
                    R$ ${produto.preco.toFixed(2)}
                </h2>

                <p>
                    ${produto.descricao}
                </p>

                <p>
                    Estado:
                    ${produto.estadoDoItem}
                </p>

                <button
                    class="btn-whatsapp"
                    onclick="pedirProduto()">
                    Pedir via WhatsApp
                </button>

            </div>

        </div>
    `;

    window.pedirProduto = () => {

        const mensagem =
            `Olá! Tenho interesse no produto:

${produto.nome}
Código: ${produto.codigo}
Preço: R$ ${produto.preco}`;

        const url =
            `https://wa.me/5521999999999?text=${encodeURIComponent(mensagem)}`;

        window.open(url, "_blank");
    };
};