let produtos = [];

window.onload = async () => {

    produtos = await obterProdutos();

    // popularCategorias();

    renderizar(produtos);

    document
        .getElementById("busca")
        .addEventListener("input", filtrar);

    // document
    //     .getElementById("categoria")
    //     .addEventListener("change", filtrar);

    // document
    //     .getElementById("estado")
    //     .addEventListener("change", filtrar);

    // document
    //     .getElementById("precoMin")
    //     .addEventListener("input", filtrar);

    // document
    //     .getElementById("precoMax")
    //     .addEventListener("input", filtrar);
};

// function popularCategorias() {

//     const categorias =
//         [...new Set(produtos.map(x => x.categoria))];

//     const select =
//         document.getElementById("categoria");

//     categorias.forEach(cat => {

//         const option =
//             document.createElement("option");

//         option.value = cat;
//         option.textContent = cat;

//         select.appendChild(option);
//     });
// }

function filtrar() {

    const busca =
        document.getElementById("busca")
            .value.toLowerCase();

    // const categoria =
    //     document.getElementById("categoria")
    //         .value;

    // const estado =
    //     document.getElementById("estado")
    //         .value;

    // const precoMin =
    //     Number(document.getElementById("precoMin").value || 0);

    // const precoMax =
    //     Number(document.getElementById("precoMax").value || 999999);

    const resultado = produtos.filter(produto => {

        return (
            produto.nome.toLowerCase().includes(busca)
            //&& (!categoria || produto.categoria === categoria)
            //&& (!estado || produto.estadoDoItem === estado)
            //&& produto.preco >= precoMin
            //&& produto.preco <= precoMax
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
                    src="imagens/produtos/${produto.imagem}"
                    loading="lazy">

                <p class="categoria">${produto.categoria}</p>

                <h3>${produto.nome}</h3>

                <span class="preco">
                    R$ ${produto.preco.toFixed(2)}
                </span>

                <p class="estado"><span class="selector ${produto.estadoDoItem.toLowerCase()}"></span>Estado: ${produto.estadoDoItem}</p>

                <a
                    class="btn-secundario"
                    href="produto.html?codigo=${produto.codigo}">
                    Ver detalhes
                </a>

                <button
                    class="btn-whatsapp"
                    onclick="pedirProduto('${produto.codigo}')">
                    <div style="width:20px;height:20px;">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="white" width="100%" height="100%">
                            <path d="M16.02 3C8.84 3 3 8.71 3 15.74c0 2.25.61 4.45 1.78 6.38L3 29l7.08-1.84a13.2 13.2 0 0 0 5.94 1.41C23.2 28.57 29 22.86 29 15.83 29 8.71 23.2 3 16.02 3zm7.58 18.03c-.32.89-1.84 1.69-2.54 1.79-.65.09-1.47.13-2.37-.16-.55-.18-1.25-.41-2.16-.79-3.8-1.6-6.28-5.32-6.47-5.57-.19-.25-1.55-2.02-1.55-3.86 0-1.84.96-2.74 1.3-3.11.34-.37.74-.46.99-.46.25 0 .49 0 .71.01.23.01.53-.09.83.61.31.74 1.04 2.55 1.13 2.73.09.18.15.39.03.64-.12.25-.18.4-.37.61-.18.21-.39.47-.55.63-.18.18-.37.38-.16.75.21.37.94 1.53 2.01 2.48 1.38 1.22 2.55 1.6 2.91 1.79.37.18.58.15.8-.09.21-.25.92-1.07 1.16-1.44.25-.37.49-.31.83-.18.34.12 2.13 1 2.49 1.18.37.18.61.28.7.43.09.16.09.92-.24 1.81z"/>
                        </svg>
                    </div>
                    <span>Pedir via WhatsApp</span>
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