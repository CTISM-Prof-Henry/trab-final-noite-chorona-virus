// Valida se os dados da sala estão corretos
function validarSala(nome, capacidade, tipo) {
    if (!nome || nome.trim() === "") return false;
    if (!capacidade || capacidade <= 0) return false;
    if (!tipo) return false;
    return true;
}

// Cria o objeto sala (Fábrica)
function criarSala(nome, capacidade, tipo) {
    return {
        id: Date.now(), // Gera ID único baseado no relógio
        nome: nome,
        capacidade: parseInt(capacidade),
        tipo: tipo
    };
}

// Adiciona sala na lista (Imutabilidade simples)
function adicionarSala(listaAtual, novaSala) {
    // Retorna uma NOVA lista contendo tudo que tinha antes + a nova
    return [...listaAtual, novaSala];
}

// Remove sala da lista pelo ID
function removerSala(listaAtual, idParaRemover) {
    return listaAtual.filter(sala => sala.id !== idParaRemover);
}

// Exportação para testes (Node.js) - O navegador ignora isso
if (typeof module !== 'undefined') {
    module.exports = { validarSala, criarSala, adicionarSala, removerSala };
}