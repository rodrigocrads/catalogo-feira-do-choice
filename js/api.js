//const API_URL = './data/produtos.json';
const API_URL = 'https://script.google.com/macros/s/AKfycbzJTScc44LAsya4XlCsbuozpN1gik6LFEocXy9uMn8na79UFzk3e8bolWdxdnPLC498/exec';

async function obterProdutos() {

    const response =
        await fetch(API_URL);

    return await response.json();
}