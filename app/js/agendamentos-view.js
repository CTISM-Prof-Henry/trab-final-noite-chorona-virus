document.addEventListener('DOMContentLoaded', () => {
    carregarSelectSalas();
    atualizarTabelaAgendamentos();
});

function carregarSelectSalas() {
    const select = document.getElementById('salaSelect');
    const salas = JSON.parse(localStorage.getItem('salas')) || [];
    select.innerHTML = '<option value="" disabled selected>Selecione uma sala...</option>';
    
    if (salas.length === 0) select.add(new Option("Nenhuma sala cadastrada!", ""));

    salas.forEach(sala => {
        select.add(new Option(`${sala.nome} (Cap: ${sala.capacidade})`, sala.nome));
    });
}

document.getElementById('form-agendamento').addEventListener('submit', (e) => {
    e.preventDefault();

    try {
        const salaNome = document.getElementById('salaSelect').value;
        // Pega o valor direto do input datetime-local (vem como string ISO: "YYYY-MM-DDTHH:MM")
        const dataHoraInicial = document.getElementById('dataHoraInicial').value;
        const dataHoraFinal = document.getElementById('dataHoraFinal').value;
        const cpf = document.getElementById('cpf').value;
        const nome = document.getElementById('nomeResponsavel').value;

        const novoAgendamento = criarAgendamento(salaNome, dataHoraInicial, dataHoraFinal, cpf, nome);

        if (!novoAgendamento) {
            alert("Preencha todos os campos!");
            return;
        }

        let agendamentos = JSON.parse(localStorage.getItem('agendamentos')) || [];

        // Verifica conflito
        const conflito = verificarConflito(agendamentos, novoAgendamento);

        if (conflito) {
            // Formata as datas do conflito para mostrar no alerta
            const inicio = new Date(conflito.dataHoraInicial).toLocaleString('pt-BR');
            const fim = new Date(conflito.dataHoraFinal).toLocaleString('pt-BR');
            alert(`ERRO DE CONFLITO!\n\nSala já reservada por: ${conflito.nome}\nDe: ${inicio}\nAté: ${fim}`);
            return; 
        }

        agendamentos = adicionarAgendamento(agendamentos, novoAgendamento);
        localStorage.setItem('agendamentos', JSON.stringify(agendamentos));

        alert("Agendamento realizado com sucesso!");
        e.target.reset();
        atualizarTabelaAgendamentos();

    } catch (erro) {
        alert(erro.message);
    }
});

// Nova função de formatação para ficar bonito (Dia/Mês às Hora:Min)
function formatarDataHora(dataISO) {
    if(!dataISO) return "";
    const data = new Date(dataISO);
    return data.toLocaleString('pt-BR', {
        day: '2-digit', month: '2-digit', year: '2-digit',
        hour: '2-digit', minute: '2-digit'
    }).replace(',', ' às');
}

function atualizarTabelaAgendamentos() {
    const tbody = document.querySelector('tbody');
    tbody.innerHTML = '';
    const lista = JSON.parse(localStorage.getItem('agendamentos')) || [];

    // Ordenar por data também na listagem
    lista.sort((a, b) => new Date(a.dataHoraInicial) - new Date(b.dataHoraInicial));

    lista.forEach(item => {
        const tr = document.createElement('tr');
        
        const inicio = formatarDataHora(item.dataHoraInicial);
        const fim = formatarDataHora(item.dataHoraFinal);

        tr.innerHTML = `
            <td><strong>${item.salaNome}</strong></td>
            <td>
                <div>De: <strong>${inicio}</strong></div>
                <div style="color: #666;">Até: <strong>${fim}</strong></div>
            </td>
            <td>
                ${item.nome}<br>
                <small style="color: #888;">CPF: ${item.cpf}</small>
            </td>
            <td style="text-align: center;">
                <button onclick="deletarAgendamento(${item.id})" class="btn-delete">
                    <i class="fas fa-trash"></i> Excluir
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

window.deletarAgendamento = function(id) {
    if(confirm("Cancelar este agendamento?")) {
        let lista = JSON.parse(localStorage.getItem('agendamentos')) || [];
        lista = removerAgendamento(lista, id);
        localStorage.setItem('agendamentos', JSON.stringify(lista));
        atualizarTabelaAgendamentos();
    }
}