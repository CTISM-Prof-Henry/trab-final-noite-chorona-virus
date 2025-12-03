# Sistema de Agendamento de Salas - UFSM

![Status](https://img.shields.io/badge/Status-Concluído-brightgreen)

Trabalho final da disciplina de Engenharia de Software. O sistema é uma aplicação web para gerenciamento e reserva de salas, focando na **simplicidade** e na **prevenção de conflitos de horários**.

---

## Sumário
* [Sobre o Projeto](#-sobre-o-projeto)
* [Funcionalidades](#-funcionalidades)
* [Pré-requisitos](#-pré-requisitos)
* [Instalação e Execução](#-instalação-e-execução)
* [Testes Automatizados](#-testes-automatizados)
* [Estrutura do Projeto](#-estrutura-do-projeto)

---

## Sobre o Projeto

O software foi desenvolvido para resolver o problema de organização de espaços físicos da instituição. Ele utiliza uma arquitetura sem backend, armazenando os dados no próprio navegador do usuário (`localStorage`).

**Destaques Técnicos:**
* Identidade visual alinhada à UFSM.
* Separação clara entre Lógica e Interface.
* Algoritmo para impedir choque de horários.

---

## Funcionalidades

### 1. Gestão de Salas
Permite cadastrar ambientes (Laboratórios, Salas de Aula, Auditórios), definindo capacidade e nome. Inclui listagem e exclusão.

### 2. Agendamentos
Realiza a reserva de uma sala por período (Data/Hora Início e Fim).
* **Validação:** O sistema bloqueia automaticamente tentativas de agendamento em horários já ocupados.

### 3. Dashboard
Painel inicial que exibe os próximos eventos confirmados em ordem cronológica.

---

## Pré-requisitos

Para executar o sistema:
* Qualquer navegador moderno (Chrome, Firefox, Edge, etc.).

Para rodar os testes:
* [Node.js](https://nodejs.org/) instalado.

---

## Instalação e Execução

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/CTISM-Prof-Henry/trab-final-noite-chorona-virus.git
    ```
2.  **Acesse a pasta do projeto:**
    ```bash
    cd trab-final-noite-chorona-virus
    ```
3.  **Abra o Sistema:**
    * Navegue até a pasta `app/html/`.
    * Dê um duplo clique no arquivo `index.html`.

---

## Testes Automatizados

O projeto utiliza **QUnit** para testes unitários e de integração.

Para rodar os testes:

1.  No terminal, instale as dependências:
    ```bash
    npm install
    ```
2.  Execute o comando de teste:
    ```bash
    npm test
    ```

**Resultado Esperado:**
O console exibirá o status de cada teste e uma tabela detalhando a porcentagem de código coberto pelos testes.

---

## 📂 Estrutura do Projeto

```text
/
├── app/
│   ├── css/          # Estilos (Tema UFSM)
│   ├── html/         # Telas do sistema (View)
│   └── js/           # Lógica (Core + View)
├── docs/             # Documentação (MkDocs)
├── test/             # Arquivos de Teste (QUnit)
├── mkdocs.yml        # Configuração do site de documentação
└── package.json      # Dependências e Scripts de Teste
```

## Bibliografia
* [Tutorial de testes automatizados](https://github.com/CTISM-Prof-Henry/softwareTesting)
* [Tutorial de Documentação com MKDocs](https://github.com/CTISM-Prof-Henry/mkdocsTutorial)
* [Stack Overlfow](https://pt.stackoverflow.com/)
* [W3 Schools](https://www.w3schools.com/js/)
* [r/learnjavascript](https://www.reddit.com/r/learnjavascript/)
* [r/javascript](https://www.reddit.com/r/javascript/)
