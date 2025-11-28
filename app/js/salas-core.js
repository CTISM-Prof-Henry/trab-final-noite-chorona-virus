// Valida se os dados da sala estão corretos
function validarSala(nome, capacidade, tipo) {
    if (!nome || nome.trim() === "") return false;
    if (!capacidade || capacidade <= 0) return false;
    if (!tipo) return false;
    return true;
}

// Cria Sala 
function criarSala(nome, capacidade, tipo) {
    return {
        id: Date.now(), 
        nome: nome,
        capacidade: parseInt(capacidade),
        tipo: tipo
    };
}

// Adiciona sala na lista 
function adicionarSala(listaAtual, novaSala) {
    return [...listaAtual, novaSala];
}

// Remove sala da lista
function removerSala(listaAtual, idParaRemover) {
    return listaAtual.filter(sala => sala.id !== idParaRemover);
}


// if (typeof module !== 'undefined') {
module.exports = { validarSala, criarSala, adicionarSala, removerSala };
// }