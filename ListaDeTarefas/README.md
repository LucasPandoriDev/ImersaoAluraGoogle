# 📝 Minha Lista de Tarefas (To-Do List)

> Aplicação web interativa para gerenciamento de tarefas diárias, desenvolvida durante a Imersão Alura + Google, com o objetivo de dar os primeiros passos na programação com utilização da IA. A aplicação permite criar, gerenciar, filtrar e persistir tarefas cotidianas em uma interface moderna, limpa, responsiva e agradável de usar.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Status](https://img.shields.io/badge/Status-Concluído-brightgreen?style=for-the-badge)

---

## ✨ Funcionalidades

* ➕ **Adicionar Tarefas:** Digite a atividade e pressione `Enter` ou clique no botão **"Adicionar"** (com validação para evitar campos em branco).
* ✅ **Conclusão com Feedback Visual:** Ao marcar uma tarefa, seu estilo é transformado em tempo real com texto tachado (*strikethrough*), cor atenuada e indicador verde.
* 🏷️ **Badges de Status:** Identificação visual imediata através de etiquetas estilizadas:
  * <kbd>Pendente</kbd> (azul suave)
  * <kbd>✓ Concluída</kbd> (verde suave)
* 🔍 **Filtros Dinâmicos:** Alterne rapidamente a visualização entre:
  * **Todas:** exibe todo o histórico de atividades cadastradas.
  * **Pendentes:** foca apenas no que ainda precisa ser realizado.
  * **Concluídas:** lista as atividades que já foram finalizadas.
* 📊 **Contador em Tempo Real:** Estatísticas no rodapé mostrando exatamente quantas tarefas estão pendentes e quantas foram concluídas.
* 🗑️ **Remoção Individual:** Exclusão rápida de qualquer item da lista pelo botão `✕`.
* 🧹 **Limpeza em Massa:** Botão inteligente **"Limpar concluídas"** que surge automaticamente sempre que houver itens concluídos para organizar a lista com apenas um clique.
* 💾 **Persistência Local (LocalStorage):** Todas as informações ficam salvas na memória local do navegador, garantindo que nada se perca ao fechar ou atualizar a página.

---

## 🎨 Diferenciação Visual (Design & UX)

Para facilitar a distinção entre tarefas **ativas** e **finalizadas**, foram aplicados padrões visuais modernos:

| Elemento | Tarefa Pendente | Tarefa Concluída |
| :--- | :--- | :--- |
| **Faixa Lateral** | Azul vibrante (`border-left: 5px solid #3498db`) | Verde suave (`border-left: 5px solid #2ecc71`) |
| **Fundo** | Branco puro com sombra sutil | Verde/cinza suave (`#f6faf7`) |
| **Tipografia** | Texto nítido em cor escura (`#2c3e50`) | Texto riscado (`line-through`) e itálico |
| **Opacidade** | Opacidade 100% (foco total) | Opacidade reduzida (82%) para não poluir a tela |
| **Etiqueta** | `[Pendente]` em azul | `[✓ Concluída]` em verde |

---

## 🛠️ Tecnologias e Linguagens Utilizadas

A aplicação foi intencionalmente construída utilizando **apenas tecnologias nativas da web**, sem a necessidade de frameworks, pré-processadores ou dependências externas:

* **[HTML5](https://developer.mozilla.org/pt-BR/docs/Web/HTML):** Estruturação semântica da página utilizando tags adequadas (`<header>`, `<main>`, `<footer>`, `<form>`, `<ul>`, `<button>`).
* **[CSS3](https://developer.mozilla.org/pt-BR/docs/Web/CSS):** 
  * Layout flexível com **CSS Flexbox** para alinhamentos precisos e responsivos.
  * Efeitos de transição suave (`transition`) ao passar o mouse (*hover*) e ao alternar estados.
  * Reset moderno e variáveis de contraste pensadas para leitura agradável.
* **[JavaScript (ES6+)](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript):**
  * Manipulação dinâmica da árvore do navegador (**DOM API**).
  * Arquitetura baseada em **Estado** (`State -> UI`), separando os dados da interface.
  * Escuta e tratamento de eventos (`addEventListener` para `submit`, `click` e `change`).
  * Tratamento de persistência com `localStorage` e serialização com `JSON.stringify` / `JSON.parse`.
  * Sanitização simples contra injeção de código (`escapeHTML`).

---

## 📂 Estrutura de Arquivos do Projeto

A organização dos arquivos segue uma estrutura direta e autoexplicativa:

```text
lista-de-tarefas/
│
├── index.html        # Estrutura HTML: cabeçalho, formulário, botões de filtro e lista
├── style.css         # Folha de estilos: tema visual, layout responsivo e diferenciação de status
├── script.js         # Lógica da aplicação: gerenciamento de estado, eventos e LocalStorage
├── .gitignore        # Arquivo de configuração para manter o repositório Git limpo
└── README.md         # Documentação completa e apresentação do projeto
```

---

## 🚀 Como Executar o Projeto Localmente

Você não precisa de servidores, Node.js ou comandos de instalação no terminal:

1. **Clone ou baixe** este repositório no seu computador:
   ```bash
   git clone https://github.com/LucasPandoriDev/ImersaoAluraGoogle.git
   ```
2. Acesse a pasta do projeto:
   ```bash
   cd ImersaoAluraGoogle/ListaDeTarefas
   ```
3. Abra o arquivo **`index.html`** no seu navegador padrão (dando um duplo clique ou arrastando o arquivo para a janela do Chrome, Edge, Firefox, etc.).

---

## 🧠 Principais Conceitos Aprendidos e Praticados

- [x] **Tríade Front-end:** Compreensão prática de como HTML, CSS e JavaScript se complementam.
- [x] **Manipulação do DOM:** Criação (`createElement`), inserção (`appendChild`) e remoção de elementos dinamicamente.
- [x] **Event Driven (Orientação a Eventos):** Captura de ações do usuário sem recarregar a página (`e.preventDefault()`).
- [x] **Gerenciamento de Estado:** Manter uma fonte única de verdade (`array` de objetos) e sincronizar a interface gráfica a partir dela.
- [x] **Web Storage API:** Salvar e resgatar preferências e dados localmente com `localStorage`.
- [x] **Versionamento com Git & GitHub:** Criação de repositórios, commits e estruturação de documentação clara.

---

## 👨‍💻 Autor

Desenvolvido por Lucas Pandori durante a Imersão da Alura.

💼 LinkedIn: linkedin.com/in/lucaspandori
🐙 GitHub: LucasPandoriDev

---

⭐ *Se você gostou deste projeto, sinta-se à vontade para deixar uma estrela no repositório!*
