# Sistema de Agendamento de Salas - UFSM

Bem-vindo à documentação do **Sistema de Agendamento de Salas**.
Este site apresenta as funcionalidades, instalação, uso e detalhes técnicos do software desenvolvido na disciplina de Engenharia de Software.

---

## Sobre o Projeto

O sistema é uma aplicação web (Frontend) desenvolvida para facilitar a reserva de laboratórios, auditórios e salas de aula. O foco principal é a **simplicidade** e a **prevenção de conflitos de horários**.

**Principais características:**
* **Interface Institucional:** Design limpo e alinhado à identidade visual da UFSM.
* **Sem Backend Complexo:** Utiliza `localStorage` para persistência de dados no navegador.
* **Validação Inteligente:** Algoritmo que impede o agendamento de dois eventos na mesma sala e horário (Interseção de Intervalos).

---

## Tecnologias Utilizadas

O projeto foi construído utilizando tecnologias web padrão, garantindo leveza e compatibilidade.

| Tecnologia | Função |
| :--- | :--- |
| **HTML** | Estrutura semântica das páginas. |
| **CSS** | Estilização com variáveis e design responsivo. |
| **JavaScript** | Lógica de negócio, validações e manipulação do DOM. |
| **LocalStorage** | Banco de dados local (no navegador do usuário). |
| **Jest** | Framework para testes automatizados de unidade e integração. |

---

## Funcionalidades

### 1. Gestão de Salas
Permite o cadastro de novos espaços físicos.
* **Dados:** Nome da sala, Capacidade e Tipo (Laboratório, Sala de Aula, Auditório).
* **Ações:** Cadastrar, Listar e Excluir.

### 2. Agendamento
Permite reservar um espaço por um período determinado.
* **Entrada:** Sala, Data/Hora de Início, Data/Hora de Término, Nome do Responsável e CPF.
* **Validação:** O sistema verifica automaticamente se o período solicitado conflita com agendamentos existentes.

### 3. Dashboard
Painel visual para acesso rápido e visualização dos próximos eventos confirmados.

---

## Guia de Instalação e Execução

Como o projeto é estático (não depende de servidor backend), a execução é simples.

### Pré-requisitos
* Um navegador web moderno (Chrome, Firefox, Edge).
* (Opcional) Node.js instalado apenas se desejar rodar os testes.

### Passo a Passo
1.  Baixe ou clone o repositório do projeto.
2.  Navegue até a pasta `app/html/`.
3.  Dê um duplo clique no arquivo `index.html`.
4.  O sistema abrirá no seu navegador pronto para uso.

---

## Testes Automatizados

O sistema possui uma suíte de testes desenvolvida com **Jest** para garantir a confiabilidade da lógica.

Para executar os testes:

1.  Abra o terminal na raiz do projeto.
2.  Instale as dependências:
    ```bash
    npm install
    ```
3.  Execute o comando de teste:
    ```bash
    npm test
    ```

**O que é testado?**
* Criação correta dos objetos de agendamento.
* Validação cronológica de datas (Início < Fim).
* **Detector de Conflitos:** Garante que o sistema bloqueie reservas sobrepostas.

---

## Estrutura do Projeto

```text
/
├── app/
│   ├── css/          # Folhas de estilo (Tema UFSM)
│   ├── html/         # Páginas do sistema (View)
│   ├── js/           # Lógica do sistema (Core + View)
│   └── testes.html   # Visualizador visual de testes
├── docs/             # Documentação (MkDocs)
├── mkdocs.yml        # Configuração do site de documentação
└── package.json      # Configuração dos testes (Jest)

