const {
    validarDatas,
    criarAgendamento,
    verificarConflito,
    adicionarAgendamento,
    removerAgendamento
} = require("../app/js/agendamentos-core.js");

QUnit.module("Agendamento Core", () => {

    // Validação de datas 
    QUnit.test("validarDatas deve retornar false se data final for anterior à inicial", (assert) => {
        const inicio = "2025-12-25T10:00";
        const fimInvalido = "2025-12-20T10:00";

        assert.notOk(validarDatas(inicio, fimInvalido), "Rejeitou data inválida corretamente");
    });

    QUnit.test("validarDatas deve retornar true para datas corretas", (assert) => {
        const inicio = "2025-12-25T10:00";
        const fimValido = "2025-12-25T12:00";

        assert.ok(validarDatas(inicio, fimValido), "Aceitou data válida corretamente");
    });

    // Criação de agendamento
    QUnit.test("criarAgendamento deve retornar objeto completo", (assert) => {
        const resultado = criarAgendamento(
            "Lab 101",
            "2025-11-28T14:00",
            "2025-11-28T16:00",
            "000.000.000-00",
            "Rafaela"
        );

        assert.ok(resultado.id, "O ID foi gerado");
        assert.equal(resultado.salaNome, "Lab 101", "Nome da sala está correto");
        assert.equal(resultado.nome, "Rafaela", "Nome do responsável está correto");
        
    });

    QUnit.test("criarAgendamento deve lançar ERRO se a data for inválida", (assert) => {
        const acaoComErro = () => {
            criarAgendamento(
                "Lab X", 
                "2025-12-25T14:00", 
                "2025-12-25T13:00", 
                "cpf", "nome"
            );
        };

        assert.throws(acaoComErro, Error, "O sistema bloqueou a criação com data errada");
    });

    // Detecção de conflitos
    QUnit.test("verificarConflito deve detectar sobreposição de horários", (assert) => {
        // Agendamento existente
        const listaExistente = [{
            id: 1,
            salaNome: "Sala A",
            dataHoraInicial: "2025-11-28T14:00",
            dataHoraFinal: "2025-11-28T16:00"
        }];

        // Agendamento com conflito
        const novoTentativa = {
            salaNome: "Sala A",
            dataHoraInicial: "2025-11-28T15:00",
            dataHoraFinal: "2025-11-28T17:00"
        };

        const conflito = verificarConflito(listaExistente, novoTentativa);

        assert.ok(conflito, "O sistema detectou o conflito");
        if (conflito) {
            assert.equal(conflito.id, 1, "Identificou corretamente o agendamento conflitante");
        }
    });

    QUnit.test("verificarConflito deve permitir horários livres", (assert) => {
        const listaExistente = [{
            id: 1,
            salaNome: "Sala A",
            dataHoraInicial: "2025-11-28T14:00",
            dataHoraFinal: "2025-11-28T16:00"
        }];

        // Agendar horário livre
        const novoLivre = {
            salaNome: "Sala A",
            dataHoraInicial: "2025-11-28T18:00",
            dataHoraFinal: "2025-11-28T19:00"
        };

        const conflito = verificarConflito(listaExistente, novoLivre);

        assert.notOk(conflito, "Não apontou conflito onde não existe");
    });

    // Funções extras
    QUnit.test("Deve adicionar e remover agendamento da lista", (assert) => {
        const item = { id: 99, salaNome: "Teste" };
        let lista = [];

        // Adicionar
        lista = adicionarAgendamento(lista, item);
        assert.equal(lista.length, 1, "Adicionou item na lista");

        // Remover
        lista = removerAgendamento(lista, 99);
        assert.equal(lista.length, 0, "Removeu item da lista");
    });

    // Teste para a l.0 (pelamor de deus vaaaaaai)
    QUnit.test("criarAgendamento deve retornar null se faltar algum dado", (assert) => {
        
        let resultado1 = criarAgendamento(null, "2025-11-28T14:00", "2025-11-28T16:00", "CPF", "Rafaela");
        assert.equal(resultado1, null, "Retorna null quando falta o nome da sala");

        let resultado2 = criarAgendamento("Lab 01", "2025-11-28T14:00", "2025-11-28T16:00", "", "Rafaela");
        assert.equal(resultado2, null, "Retorna null quando o CPF está vazio");

        let resultado3 = criarAgendamento("Lab 01", undefined, "2025-11-28T16:00", "CPF", "Rafaela");
        assert.equal(resultado3, null, "Retorna null quando falta a data inicial");
    });

    // Teste de conflito entre salas diferentes (l.16))
    QUnit.test("verificarConflito deve ignorar salas diferentes", (assert) => {

        const listaExistente = [{
            id: 1,
            salaNome: "Sala A",
            dataHoraInicial: "2025-11-28T14:00",
            dataHoraFinal:   "2025-11-28T16:00"
        }];

        const novaOutraSala = {
            salaNome: "Sala B", 
            dataHoraInicial: "2025-11-28T14:00",
            dataHoraFinal:   "2025-11-28T16:00"
        };

        const conflito = verificarConflito(listaExistente, novaOutraSala);
        
        assert.notOk(conflito, "Não deu conflito pois são salas diferentes");
    });

});