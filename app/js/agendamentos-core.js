// Verifica se a data final é maior que a inicial
function validarDatas(inicioISO, fimISO) {
    const inicio = new Date(inicioISO);
    const fim = new Date(fimISO);
    return fim > inicio;
}

// Verifica se os intervalos de tempo se sobrepõem.

function verificarConflito(listaAgendamentos, novo) {
    const inicioNovo = new Date(novo.dataHoraInicial).getTime();
    const fimNovo = new Date(novo.dataHoraFinal).getTime();

    return listaAgendamentos.find(item => {
        // 1. Se não for a mesma sala, ignora
        if (item.salaNome !== novo.salaNome) return false;

        const inicioItem = new Date(item.dataHoraInicial).getTime();
        const fimItem = new Date(item.dataHoraFinal).getTime();

        // 2. Lógica de Interseção de Intervalos
        const temConflito = (inicioNovo < fimItem) && (fimNovo > inicioItem);
        
        return temConflito;
    });
}

function criarAgendamento(salaNome, dataHoraInicial, dataHoraFinal, cpf, nome) {
    if (!salaNome || !dataHoraInicial || !dataHoraFinal || !cpf || !nome) {
        return null;
    }

    if (!validarDatas(dataHoraInicial, dataHoraFinal)) {
        throw new Error("A data/hora final deve ser posterior à inicial.");
    }

    return {
        id: Date.now(),
        salaNome,
        dataHoraInicial,
        dataHoraFinal,
        cpf,
        nome
    };
}

function adicionarAgendamento(listaAtual, novoAgendamento) {
    return [...listaAtual, novoAgendamento];
}

function removerAgendamento(listaAtual, id) {
    return listaAtual.filter(item => item.id !== id);
}

// if (typeof module !== 'undefined') {
module.exports = { validarDatas, verificarConflito, criarAgendamento, adicionarAgendamento, removerAgendamento };
// }