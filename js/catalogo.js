let produtos = [];

window.onload = async () => {

    produtos = await obterProdutos();

    popularCategorias();

    renderizar(produtos);

    document
        .getElementById("busca")
        .addEventListener("input", filtrar);

    document
        .getElementById("categoria")
        .addEventListener("change", filtrar);

    document
        .getElementById("estado")
        .addEventListener("change", filtrar);

    document
        .getElementById("precoMin")
        .addEventListener("input", filtrar);

    document
        .getElementById("precoMax")
        .addEventListener("input", filtrar);
};

function popularCategorias() {

    const categorias =
        [...new Set(produtos.map(x => x.categoria))];

    const select =
        document.getElementById("categoria");

    categorias.forEach(cat => {

        const option =
            document.createElement("option");

        option.value = cat;
        option.textContent = cat;

        select.appendChild(option);
    });
}

function filtrar() {

    const busca =
        document.getElementById("busca")
            .value.toLowerCase();

    const categoria =
        document.getElementById("categoria")
            .value;

    const estado =
        document.getElementById("estado")
            .value;

    const precoMin =
        Number(document.getElementById("precoMin").value || 0);

    const precoMax =
        Number(document.getElementById("precoMax").value || 999999);

    const resultado = produtos.filter(produto => {

        return (
            produto.nome.toLowerCase().includes(busca)
            && (!categoria || produto.categoria === categoria)
            && (!estado || produto.estadoDoItem === estado)
            && produto.preco >= precoMin
            && produto.preco <= precoMax
        );
    });

    renderizar(resultado);
}

function renderizar(lista) {

    const container =
        document.getElementById("produtos");

    container.innerHTML = "";

    lista.forEach(produto => {

        container.innerHTML += `
            <article class="card">

                <img
                    src="imagens/${produto.imagem}"
                    loading="lazy">

                <h3>${produto.nome}</h3>

                <span class="preco">
                    R$ ${produto.preco.toFixed(2)}
                </span>

                <p>${produto.estadoDoItem}</p>

                <a
                    class="btn-secundario"
                    href="produto.html?codigo=${produto.codigo}">
                    Ver detalhes
                </a>

                <button
                    class="btn-whatsapp"
                    onclick="pedirProduto('${produto.codigo}')">
                    Pedir via WhatsApp
                </button>

            </article>
        `;
    });
}

function pedirProduto(codigo) {

    const produto =
        produtos.find(x => x.codigo === codigo);

    const mensagem =
`Olá! Tenho interesse no produto:

${produto.nome}
Código: ${produto.codigo}
Preço: R$ ${produto.preco}`;

    const url =
        `https://wa.me/5521999999999?text=${encodeURIComponent(mensagem)}`;

    window.open(url, "_blank");
}