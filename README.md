# 🚀 Imersão Alura + Google — Projetos Desenvolvidos

> Repositório com as aplicações desenvolvidas durante a **Imersão Engenharia de Software: Dev na Era da IA Alura + Google**, explorando os primeiros passos no desenvolvimento de software com o auxílio de Inteligência Artificial.

![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)

---

## 📌 Sobre a Imersão

Este repositório reúne os projetos práticos construídos ao longo da **Imersão Alura + Google**. O objetivo central foi aprender a pensar como uma pessoa desenvolvedora, explorando os fundamentos da lógica de programação com IA e o ecossistema Python de maneira descomplicada e aplicada.

---

## 📂 Estrutura do Repositório

O repositório está organizado em pastas modulares, cada uma contendo sua respectiva aplicação e documentação técnica:

```text
ImersaoAluraGoogle/
│
├── 🧮 Calculadora/          # Projeto 1: Aplicação matemática em Python
│   ├── calculadora.py       # Lógica no terminal com menu interativo
│   ├── calculadora_gui.py   # Versão com interface gráfica
│   └── README.md            # Documentação específica da Calculadora
│
├── 📝 ListaDeTarefas/       # Projeto 2: Aplicação web de produtividade
│   ├── index.html           # Estrutura e semântica web
│   ├── style.css            # Estilização visual moderna e badges
│   ├── script.js            # Lógica, eventos e persistência (LocalStorage)
│   └── README.md            # Documentação específica da Lista de Tarefas
│
└── 📖 README.md             # Visão geral de todos os projetos (este arquivo)
```

---

## 🧮 Projeto 1: Calculadora Simples em Python

Uma aplicação modular focada em lógica de programação, operações aritméticas e robustez contra erros de entrada do usuário.

### ⚙️ Funcionalidades:
* ➕ **Adição, Subtração e Multiplicação:** Operações matemáticas básicas executadas com precisão.
* ➗ **Divisão Segura:** Tratamento especial com proteção contra divisão por zero.
* 🎯 **Cálculo de Porcentagem (%):** Função dedicada para cálculo de percentuais com entradas contextuais.
* 🔁 **Menu Interativo Contínuo:** Permite realizar múltiplos cálculos consecutivos sem fechar o programa.
* 🛡️ **Validação de Entradas:** Uso de blocos `try/except` para impedir que o programa quebre se o usuário digitar letras ou símbolos inválidos.

### 🛠️ Tecnologias e Conceitos Praticados:
* **Linguagem:** Python 3
* **Funções Modulares (`def` / `return`):** Código limpo dividido em responsabilidades únicas.
* **Estruturas de Repetição (`while`):** Laço contínuo do menu de navegação.
* **Controle de Fluxo (`if` / `elif` / `else`):** Decisão de rota conforme a opção selecionada.
* **Tratamento de Exceções (`try` / `except`):** Tratamento de `ValueError` e `ZeroDivisionError`.

### 🚀 Como executar a Calculadora:
```bash
# Acesse a pasta do projeto
cd Calculadora

# Execute pelo terminal
python calculadora.py
```

---

## 📝 Projeto 2: Lista de Tarefas Interativa (To-Do List)

Uma aplicação front-end completa e moderna que permite gerenciar tarefas diárias de maneira visual e intuitiva.

### ⚙️ Funcionalidades:
* ➕ **Adicionar Tarefas:** Campo de texto dinâmico com envio por clique ou tecla `Enter`.
* ✅ **Feedback Visual Diferenciado:**
  * **Pendentes:** Borda lateral azul vibrante (`#3498db`), texto em destaque e badge <kbd>Pendente</kbd>.
  * **Concluídas:** Borda lateral verde (`#2ecc71`), texto riscado (*strikethrough*), tom atenuado e badge <kbd>✓ Concluída</kbd>.
* 🔍 **Filtros de Exibição:** Botões para alternar instantaneamente entre **Todas**, **Pendentes** e **Concluídas**.
* 📊 **Estatísticas em Tempo Real:** Rodapé informativo com a contagem de tarefas ativas e finalizadas.
* 🧹 **Limpeza em Massa:** Botão inteligente *"Limpar concluídas"* que surge automaticamente quando há itens finalizados.
* 💾 **Persistência Local (LocalStorage):** Os dados ficam salvos na memória do navegador — suas tarefas não somem ao atualizar a página.

### 🛠️ Tecnologias e Conceitos Praticados:
* **HTML5:** Tags semânticas (`<header>`, `<main>`, `<footer>`, `<form>`, `<ul>`).
* **CSS3:** Design responsivo, **CSS Flexbox**, cantos arredondados, transições dinâmicas e sombras suaves.
* **JavaScript (ES6+):**
  * Manipulação dinâmica da árvore de elementos (**DOM API**).
  * Arquitetura guiada por estado (`State -> UI`).
  * Escuta de eventos (`submit`, `click`, `change`).
  * Web Storage API (`localStorage.setItem` / `getItem`).

### 🚀 Como executar a Lista de Tarefas:
Basta abrir o arquivo **`index.html`** dentro da pasta `ListaDeTarefas` em qualquer navegador web (Google Chrome, Edge, Firefox, etc.).

---

## 👨‍💻 Autor
Desenvolvido por Lucas Pandori durante a Imersão da Alura.

- 💼 LinkedIn: www.linkedin.com/in/lucaspandori
- 🐙 GitHub: https://github.com/LucasPandoriDev

---

⭐ *Projeto desenvolvido com fins de estudo e prática. Sinta-se à vontade para explorar os códigos e contribuir!*
