document.addEventListener('DOMContentLoaded', () => {
    carregarDashboard();
});

function formatarDataCurta(dataISO) {
    const data = new Date(dataISO);
    // Formato: 29/11 às 14:00
    return data.toLocaleString('pt-BR', { 
        day: '2-digit', 
        month: '2-digit', 
        hour: '2-digit', 
        minute: '2-digit' 
    }).replace(',', ' às');
}

function carregarDashboard() {
    const agendamentos = JSON.parse(localStorage.getItem('agendamentos')) || [];
    const tbody = document.querySelector('#tabela-dashboard tbody');
    const totalInfo = document.getElementById('total-info');
    
    tbody.innerHTML = '';

    // Ordenar: Do mais recente para o mais distante
    agendamentos.sort((a, b) => new Date(a.dataHoraInicial) - new Date(b.dataHoraInicial));

    // Filtrar: Apenas futuros
    const agora = new Date();
    const futuros = agendamentos.filter(item => new Date(item.dataHoraFinal) > agora);

    totalInfo.innerText = `Total: ${futuros.length} agendamentos futuros`;

    if (futuros.length === 0) {
        tbody.innerHTML = '<tr><td colspan="3" style="text-align:center; padding: 20px;">Nenhum agendamento futuro.</td></tr>';
        return;
    }

    futuros.forEach(item => {
        const tr = document.createElement('tr');
        
        // MUDANÇA AQUI: Formatamos início e fim completos
        const inicio = formatarDataCurta(item.dataHoraInicial);
        const fim = formatarDataCurta(item.dataHoraFinal);

        tr.innerHTML = `
            <td>
                <span style="color: var(--ufsm-blue-primary); font-weight: bold;">
                    <i class="fas fa-arrow-circle-right"></i> ${inicio}
                </span> 
                <br>
                <span style="color: var(--text-light); font-size: 0.9em; margin-left: 20px;">
                    até ${fim}
                </span>
            </td>
            <td><strong>${item.salaNome}</strong></td>
            <td>${item.nome}</td>
        `;
        tbody.appendChild(tr);
    });
}