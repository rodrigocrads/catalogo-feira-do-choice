const API_URL = './data/produtos.json';

async function obterProdutos() {

    const response =
        await fetch(API_URL);

    return await response.json();
}