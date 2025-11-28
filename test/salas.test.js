const {
    criarSala,
    adicionarSala,
    removerSala,
    validarSala
} = require("../app/js/salas-core.js");

QUnit.module("Salas Core", () => {

    QUnit.test("Deve criar objeto Sala corretamente", (assert) => {
        const sala = criarSala("Lab 1", 30, "Laboratório");
        assert.equal(sala.nome, "Lab 1");
        assert.equal(sala.capacidade, 30);
    });

    QUnit.test("Deve validar dados da sala (Caminhos de Erro)", (assert) => {
        // Tudo correto
        assert.ok(validarSala("Sala A", 10, "Sala"), "Aceita dados válidos");

        // Erro de Nome
        assert.notOk(validarSala("", 10, "Sala"), "Rejeita nome vazio");

        // Erro de Capacidade (Zero ou Negativo)
        assert.notOk(validarSala("Sala B", 0, "Sala"), "Rejeita capacidade zero");
        assert.notOk(validarSala("Sala B", -5, "Sala"), "Rejeita capacidade negativa");

        // Erro de Tipo
        assert.notOk(validarSala("Sala C", 20, ""), "Rejeita tipo vazio");
    });

    QUnit.test("Deve adicionar e remover sala da lista", (assert) => {
        const sala1 = { id: 1, nome: "A" };
        const listaVazia = [];

        // Testa Adicionar
        const listaCom1 = adicionarSala(listaVazia, sala1);
        assert.equal(listaCom1.length, 1, "Adicionou na lista");

        // Testa Remover
        const listaVaziaDeNovo = removerSala(listaCom1, 1);
        assert.equal(listaVaziaDeNovo.length, 0, "Removeu da lista");
    });
});