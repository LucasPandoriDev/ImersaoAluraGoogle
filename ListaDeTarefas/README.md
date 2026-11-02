# 📝 Minha Lista de Tarefas (To-Do List)

Um projeto simples, moderno e intuitivo desenvolvido para quem está dando os primeiros passos no desenvolvimento web!

---

## 🚀 Como testar e usar o projeto

Você não precisa instalar programas complexos, servidores ou bibliotecas adicionais:
1. Abra a pasta do projeto: `C:\Users\Pandori\.gemini\antigravity\scratch\lista-de-tarefas`
2. Dê um **duplo clique** no arquivo `index.html` (ou clique com o botão direito e escolha "Abrir com" -> seu navegador favorito, como Chrome, Edge ou Firefox).
3. Pronto! A aplicação já estará funcionando.

---

## 🎨 O que há de novo: Diferenciação Visual Completa

Agora as tarefas concluídas e pendentes possuem uma distinção visual evidente:

1. **Faixa lateral colorida (*Border Indicator*):**
   * **Pendente:** Faixa lateral azul vibrante (`border-left: 5px solid #3498db`), indicando atividade ativa.
   * **Concluída:** Faixa lateral verde suave (`border-left: 5px solid #2ecc71`), indicando finalização.
2. **Etiquetas visuais (*Badges*):**
   * Cada tarefa recebe uma etiqueta: `[Pendente]` (azul) ou `[✓ Concluída]` (verde).
3. **Tipografia e Opacidade:**
   * Tarefas pendentes mantêm texto nítido e em destaque.
   * Tarefas concluídas recebem texto riscado (`line-through`), tom de cor atenuado e leve transparência para não poluir a visão do usuário.
4. **Filtros de visualização:**
   * Botões no topo da lista para filtrar entre **Todas**, **Pendentes** e **Concluídas**.
5. **Estatísticas e Botão de Limpeza no Rodapé:**
   * Contador em tempo real: `X pendente(s) · Y concluída(s)`.
   * Botão `"Limpar concluídas"` que surge automaticamente quando há itens finalizados.

---

## 📂 Organização dos Arquivos e Seus Papéis

```
lista-de-tarefas/
├── index.html   # 🧱 A Estrutura (Esqueleto com botões de filtro e rodapé)
├── style.css    # 🎨 O Visual (Regras para .pendente, .concluida, .badge e filtros)
├── script.js    # ⚙️ O Cérebro (Lógica de status, filtros e renderização dinâmica)
└── README.md    # 📖 Documentação do projeto
```

### 1. `index.html` (HTML5)
* Contém a barra de filtros `<div class="filtros">` com botões de categoria.
* Rodapé com contador e botão de limpeza de concluídas.

### 2. `style.css` (CSS3)
* Regras `.item-tarefa.pendente` e `.item-tarefa.concluida`.
* Efeitos de transição suave (`transition`), cores de destaque e badges informativos.

### 3. `script.js` (JavaScript Moderno)
* Alterna dinamicamente as classes de cada item com base na propriedade booleana `tarefa.concluida`.
* Filtra os itens exibidos conforme a categoria clicada sem perder os dados salvos no `localStorage`.
