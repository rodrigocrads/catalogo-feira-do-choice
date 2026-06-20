//const API_URL = './data/produtos.json';
const API_URL = 'https://script.google.com/macros/s/AKfycbyjZPNPPrpDlXS0oWUW8Lk34Id-vte-4ZDZYMBDhgahpvc3LNyLaCHIy0oDOQdsc53f/exec';

async function obterProdutos() {

    const response =
        await fetch(API_URL);

    return await response.json();
}