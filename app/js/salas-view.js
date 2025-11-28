// Carrega a lista ao abrir a tela
document.addEventListener('DOMContentLoaded', atualizarTabela);

const form = document.getElementById('form-sala');

// Evento de Salvar
form.addEventListener('submit', (event) => {
    event.preventDefault(); 

    const nome = document.getElementById('nome').value;
    const capacidade = document.getElementById('capacidade').value;
    const tipo = document.getElementById('tipo').value;

    if (!validarSala(nome, capacidade, tipo)) {
        alert("Por favor, preencha todos os campos corretamente.");
        return;
    }

    const novaSala = criarSala(nome, capacidade, tipo);
    let listaSalas = JSON.parse(localStorage.getItem('salas')) || [];
    listaSalas = adicionarSala(listaSalas, novaSala);
    localStorage.setItem('salas', JSON.stringify(listaSalas));

    alert("Sala salva com sucesso!");
    form.reset();
    atualizarTabela();
});

// Função para tabela
function atualizarTabela() {
    const tbody = document.querySelector('tbody');
    tbody.innerHTML = ''; 

    const listaSalas = JSON.parse(localStorage.getItem('salas')) || [];

    listaSalas.forEach(sala => {
        const linha = document.createElement('tr');
        linha.innerHTML = `
            <td>${sala.nome}</td>
            <td>${sala.capacidade} alunos</td>
            <td>${sala.tipo}</td>
            <td>
                <button onclick="deletar(${sala.id})" class="btn-delete">Excluir</button>
            </td>
        `;
        tbody.appendChild(linha);
    });
}

// Excluir 
window.deletar = function(id) {
    if (confirm("Tem certeza?")) {
        let listaSalas = JSON.parse(localStorage.getItem('salas')) || [];
        listaSalas = removerSala(listaSalas, id);     
        localStorage.setItem('salas', JSON.stringify(listaSalas));
        atualizarTabela();
    }
}