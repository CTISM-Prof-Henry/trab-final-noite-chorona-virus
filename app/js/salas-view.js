// Carrega a lista ao abrir a tela
document.addEventListener('DOMContentLoaded', atualizarTabela);

const form = document.getElementById('form-sala');

// Evento de Salvar
form.addEventListener('submit', (event) => {
    event.preventDefault(); // Não deixa recarregar a página

    // 1. Pegar valores do HTML
    const nome = document.getElementById('nome').value;
    const capacidade = document.getElementById('capacidade').value;
    const tipo = document.getElementById('tipo').value;

    // 2. Usar a Lógica (do arquivo core)
    if (!validarSala(nome, capacidade, tipo)) {
        alert("Por favor, preencha todos os campos corretamente.");
        return;
    }

    const novaSala = criarSala(nome, capacidade, tipo);

    // 3. Salvar no LocalStorage
    // Pega o que já tem lá ou cria lista vazia
    let listaSalas = JSON.parse(localStorage.getItem('salas')) || [];
    
    // Adiciona a nova
    listaSalas = adicionarSala(listaSalas, novaSala);
    
    // Grava de volta
    localStorage.setItem('salas', JSON.stringify(listaSalas));

    // 4. Limpar e Atualizar
    alert("Sala salva com sucesso!");
    form.reset();
    atualizarTabela();
});

// Função que desenha a tabela
function atualizarTabela() {
    const tbody = document.querySelector('tbody');
    tbody.innerHTML = ''; // Limpa antes de desenhar

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

// Função de Excluir (precisa ser global window para o onclick funcionar no HTML gerado)
window.deletar = function(id) {
    if (confirm("Tem certeza?")) {
        let listaSalas = JSON.parse(localStorage.getItem('salas')) || [];
        
        // Usa a lógica do core para remover
        listaSalas = removerSala(listaSalas, id);
        
        localStorage.setItem('salas', JSON.stringify(listaSalas));
        atualizarTabela();
    }
}