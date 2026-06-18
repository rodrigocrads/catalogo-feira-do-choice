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

            <div class="produto-page__imagem"><img src="imagens/produtos/${produto.imagem}"></div>

            <h1 class="produto-page__nome">${produto.nome || limitarTexto(produto.descricao)}</h1>

            <h2 class="produto-page__preco">
                ${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(produto.preco.toFixed(2))}
            </h2>

            <p class="produto-page__estado">
                <span class="selector ${produto.estadoDoItem.toLowerCase()}"></span>Estado do item: ${produto.estadoDoItem}
            </p>

            <div class="produto-page__detalhes">
                <p><strong>Código:</strong> ${produto.codigo}</p>
                
                <p><strong>Categoria:</strong> ${produto.categoria}</p>

                <p><strong>Tamanho:</strong> ${produto.tamanho}</p>

                <div class="produto-page__descricao">
                    <p><strong>Descrição geral:</strong></p>
                    <p>
                        ${produto.descricao}
                    </p>
                </div>

                <p><strong>Possui algum defeito?</strong> ${produto.descricaoDoDefeito ? "Sim" : "Não"}</p>

                ${produto.descricaoDoDefeito ? `
                    <div class="produto-page__descricao-defeito">
                        <p><strong>Descrição do defeito:</strong></p>
                        <p>
                            ${produto.descricaoDoDefeito || "Nenhum defeito informado."}
                        </p>
                    </div>
                ` : ""}
            </div>


            <button
                class="btn-whatsapp"
                onclick="pedirProduto()">
                Pedir via WhatsApp
            </button>

        </div>
    `;

    window.pedirProduto = () => {

        const mensagem =
            `Olá! Tenho interesse no produto:

${produto.nome}
Código: ${produto.codigo}
Preço: R$ ${produto.preco}`;

        const url =
            `https://wa.me/5521971216282?text=${encodeURIComponent(mensagem)}`;

        window.open(url, "_blank");
    };
};

function limitarTexto(texto) {
    if (texto.length <= 50) {
        return texto;
    }
    return texto.slice(0, 47) + '...';
}