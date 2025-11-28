const {
    validarDatas,
    criarAgendamento,
    verificarConflito,
    adicionarAgendamento,
    removerAgendamento
} = require("../app/js/agendamentos-core.js");

QUnit.module("Agendamento Core", () => {

    // --- TESTE 1: Validação de Datas ---
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

    // --- TESTE 2: Criação de Objeto ---
    QUnit.test("criarAgendamento deve retornar objeto completo", (assert) => {
        const resultado = criarAgendamento(
            "Lab 101",
            "2025-11-28T14:00",
            "2025-11-28T16:00",
            "000.000.000-00",
            "Rafaela"
        );

        // Verificações
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

        // Verificação
        assert.throws(acaoComErro, Error, "O sistema bloqueou a criação com data errada");
    });

    // --- TESTE 3: Detecção de Conflitos ---
    QUnit.test("verificarConflito deve detectar sobreposição de horários", (assert) => {
        // Cenário: Agendamento existente das 14h às 16h
        const listaExistente = [{
            id: 1,
            salaNome: "Sala A",
            dataHoraInicial: "2025-11-28T14:00",
            dataHoraFinal: "2025-11-28T16:00"
        }];

        // Tentativa: Agendar das 15h às 17h (Conflito!)
        const novoTentativa = {
            salaNome: "Sala A",
            dataHoraInicial: "2025-11-28T15:00",
            dataHoraFinal: "2025-11-28T17:00"
        };

        const conflito = verificarConflito(listaExistente, novoTentativa);

        // Se conflito não for undefined/null, o teste passa
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

        // Tentativa: Agendar às 18h (Livre)
        const novoLivre = {
            salaNome: "Sala A",
            dataHoraInicial: "2025-11-28T18:00",
            dataHoraFinal: "2025-11-28T19:00"
        };

        const conflito = verificarConflito(listaExistente, novoLivre);

        // Esperamos que seja undefined (sem conflito)
        assert.notOk(conflito, "Não apontou conflito onde não existe");
    });

    // --- TESTE 4: Funções Auxiliares  ---
    QUnit.test("Deve adicionar e remover agendamento da lista", (assert) => {
        const item = { id: 99, salaNome: "Teste" };
        let lista = [];

        // Testa Adicionar
        lista = adicionarAgendamento(lista, item);
        assert.equal(lista.length, 1, "Adicionou item na lista");

        // Testa Remover
        lista = removerAgendamento(lista, 99);
        assert.equal(lista.length, 0, "Removeu item da lista");
    });

});