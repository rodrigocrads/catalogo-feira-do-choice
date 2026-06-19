//const API_URL = './data/produtos.json';
const API_URL = 'https://script.google.com/macros/s/AKfycbwxEaIHhiQYZRF7MaRqetiUrPQubcsWae_48ZjpPNskL2XY7dFmBFZZP2BCijL0RQyf/exec';

async function obterProdutos() {

    const response =
        await fetch(API_URL);

    return await response.json();
}