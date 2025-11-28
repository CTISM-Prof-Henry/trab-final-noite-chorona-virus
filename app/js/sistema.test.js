// Funções para testar testar dos arquivos CORE
const { criarAgendamento, verificarConflito, validarDatas } = require('./agendamentos-core');

describe('Suite de Testes do Sistema de Agendamento', () => {

    // --- TESTE 1: UNITÁRIO ---
    test('Deve impedir que a Data Final seja anterior à Data Inicial', () => {
        const inicio = "2025-12-25T10:00";
        const fimInvalido = "2025-12-20T10:00"; // Data anterior ao início

        // Espera-se que a função validarDatas retorne false
        expect(validarDatas(inicio, fimInvalido)).toBe(false);
    });

    test('Deve permitir datas cronologicamente corretas', () => {
        const inicio = "2025-12-25T10:00";
        const fimValido = "2025-12-25T12:00"; 

        expect(validarDatas(inicio, fimValido)).toBe(true);
    });


    // --- TESTE 2: COMPONENTE ---
    test('Deve criar um objeto de Agendamento com todos os campos corretos', () => {
        const agendamento = criarAgendamento(
            "Lab 01", 
            "2025-11-28T14:00", 
            "2025-11-28T16:00", 
            "000.000.000-00", 
            "Rafaela"
        );

        // Verifica se o objeto foi criado e se os dados batem
        expect(agendamento).toHaveProperty('id'); // Deve ter gerado um ID
        expect(agendamento.salaNome).toBe("Lab 01");
        expect(agendamento.nome).toBe("Rafaela");
    });

    test('Deve lançar um erro se tentar criar agendamento com data inválida', () => {
        // Tenta criar com hora final ANTES da inicial
        const criarComErro = () => {
            criarAgendamento(
                "Lab 01", 
                "2025-11-28T16:00", 
                "2025-11-28T14:00", // Erro aqui
                "CPF", "Nome"
            );
        };

        // O Jest espera que a função acima "exploda" com um erro
        expect(criarComErro).toThrow("A data/hora final deve ser posterior à inicial.");
    });


    // --- TESTE 3: INTEGRAÇÃO DE LÓGICA ---
    test('DETETIVE: Deve detectar conflito de horário entre dois agendamentos', () => {
        // Cenário: Temos uma lista com um agendamento já existente (14h as 16h)
        const agendamentoExistente = {
            id: 1,
            salaNome: "Sala 101",
            dataHoraInicial: "2025-11-28T14:00",
            dataHoraFinal:   "2025-11-28T16:00"
        };
        const listaNoBanco = [agendamentoExistente];

        // Ação: Tentamos criar um novo agendamento que bate no meio (15h as 17h)
        const novoAgendamentoConflitante = {
            salaNome: "Sala 101", // Mesma sala
            dataHoraInicial: "2025-11-28T15:00", // Começa antes do outro terminar
            dataHoraFinal:   "2025-11-28T17:00"
        };

        // Verificação: A função deve retornar o objeto que está atrapalhando
        const conflitoEncontrado = verificarConflito(listaNoBanco, novoAgendamentoConflitante);
        
        // Esperamos que ele tenha achado o conflito
        expect(conflitoEncontrado).toBeDefined();
        expect(conflitoEncontrado.id).toBe(1);
    });

    test('DETETIVE: Não deve acusar conflito se for em horários livres', () => {
        const agendamentoExistente = {
            id: 1,
            salaNome: "Sala 101",
            dataHoraInicial: "2025-11-28T14:00",
            dataHoraFinal:   "2025-11-28T16:00"
        };
        const listaNoBanco = [agendamentoExistente];

        // Novo agendamento bem mais tarde (18h)
        const novoAgendamentoLivre = {
            salaNome: "Sala 101",
            dataHoraInicial: "2025-11-28T18:00",
            dataHoraFinal:   "2025-11-28T19:00"
        };

        const conflito = verificarConflito(listaNoBanco, novoAgendamentoLivre);
        
        // Esperamos que seja undefined (sem conflito)
        expect(conflito).toBeUndefined();
    });

});