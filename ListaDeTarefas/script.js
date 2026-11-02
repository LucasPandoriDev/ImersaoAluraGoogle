// ===================================================================
// 1. ESTADO DA APLICAÇÃO
// ===================================================================
// Mantém as tarefas cadastradas na memória
let tarefas = [];

// Guarda o filtro visual selecionado: 'todas', 'pendentes' ou 'concluidas'
let filtroAtual = 'todas';

// ===================================================================
// 2. SELEÇÃO DE ELEMENTOS DO HTML (DOM)
// ===================================================================
const formTarefa = document.getElementById('form-tarefa');
const inputTarefa = document.getElementById('input-tarefa');
const listaTarefas = document.getElementById('lista-tarefas');
const mensagemVazia = document.getElementById('mensagem-vazia');
const contadorTarefas = document.getElementById('contador-tarefas');
const botoesFiltro = document.querySelectorAll('.btn-filtro');
const btnLimparConcluidas = document.getElementById('btn-limpar-concluidas');

// ===================================================================
// 3. PERSISTÊNCIA LOCAL (localStorage)
// ===================================================================
function salvarTarefas() {
    localStorage.setItem('minhas_tarefas', JSON.stringify(tarefas));
}

function carregarTarefas() {
    const dadosSalvos = localStorage.getItem('minhas_tarefas');
    if (dadosSalvos) {
        try {
            tarefas = JSON.parse(dadosSalvos);
        } catch (e) {
            tarefas = [];
        }
    }
}

// ===================================================================
// 4. FUNÇÕES DE MANIPULAÇÃO DE TAREFAS (LÓGICA)
// ===================================================================

/**
 * Adiciona uma nova tarefa à lista
 * @param {string} texto
 */
function adicionarTarefa(texto) {
    const novaTarefa = {
        id: Date.now(),
        texto: texto.trim(),
        concluida: false // Toda nova tarefa começa como pendente
    };

    tarefas.unshift(novaTarefa);
    salvarTarefas();
    renderizarTarefas();
}

/**
 * Alterna entre concluída e pendente
 * @param {number} id
 */
function alternarConclusao(id) {
    tarefas = tarefas.map(tarefa => {
        if (tarefa.id === id) {
            return { ...tarefa, concluida: !tarefa.concluida };
        }
        return tarefa;
    });

    salvarTarefas();
    renderizarTarefas();
}

/**
 * Remove uma única tarefa pelo id
 * @param {number} id
 */
function removerTarefa(id) {
    tarefas = tarefas.filter(tarefa => tarefa.id !== id);
    salvarTarefas();
    renderizarTarefas();
}

/**
 * Remove todas as tarefas que estão concluídas
 */
function limparConcluidas() {
    tarefas = tarefas.filter(tarefa => !tarefa.concluida);
    salvarTarefas();
    renderizarTarefas();
}

// ===================================================================
// 5. RENDERIZAÇÃO (ATUALIZAÇÃO VISUAL NA TELA)
// ===================================================================
function renderizarTarefas() {
    // 1. Limpa a lista na tela
    listaTarefas.innerHTML = '';

    // 2. Filtra as tarefas de acordo com o filtro selecionado pelo usuário
    let tarefasFiltradas = tarefas;
    if (filtroAtual === 'pendentes') {
        tarefasFiltradas = tarefas.filter(t => !t.concluida);
    } else if (filtroAtual === 'concluidas') {
        tarefasFiltradas = tarefas.filter(t => t.concluida);
    }

    // 3. Exibe ou oculta a mensagem quando a lista está vazia
    if (tarefasFiltradas.length === 0) {
        mensagemVazia.style.display = 'block';
        if (tarefas.length > 0 && filtroAtual !== 'todas') {
            mensagemVazia.innerHTML = `<p>Nenhuma tarefa na categoria <strong>${filtroAtual}</strong>.</p>`;
        } else {
            mensagemVazia.innerHTML = `<p>Nenhuma tarefa adicionada ainda. Digite algo acima para começar!</p>`;
        }
    } else {
        mensagemVazia.style.display = 'none';
    }

    // 4. Cria os elementos visuais para cada tarefa
    tarefasFiltradas.forEach(tarefa => {
        const itemLi = document.createElement('li');

        // Adiciona classe 'pendente' ou 'concluida' para estilização visual diferenciada
        const statusClasse = tarefa.concluida ? 'concluida' : 'pendente';
        itemLi.className = `item-tarefa ${statusClasse}`;

        // Cria a etiqueta (badge) correspondente ao status da tarefa
        const badgeHTML = tarefa.concluida
            ? `<span class="badge badge-concluida">✓ Concluída</span>`
            : `<span class="badge badge-pendente">Pendente</span>`;

        itemLi.innerHTML = `
            <div class="item-conteudo">
                <input 
                    type="checkbox" 
                    class="item-checkbox" 
                    ${tarefa.concluida ? 'checked' : ''}
                    title="${tarefa.concluida ? 'Marcar como pendente' : 'Marcar como concluída'}"
                >
                <span class="item-texto">${escapeHTML(tarefa.texto)}</span>
                ${badgeHTML}
            </div>
            <button class="btn-remover" title="Excluir tarefa" aria-label="Excluir tarefa">✕</button>
        `;

        // Evento de marcar / desmarcar checkbox
        const checkbox = itemLi.querySelector('.item-checkbox');
        checkbox.addEventListener('change', () => alternarConclusao(tarefa.id));

        // Evento de remoção
        const btnRemover = itemLi.querySelector('.btn-remover');
        btnRemover.addEventListener('click', () => removerTarefa(tarefa.id));

        listaTarefas.appendChild(itemLi);
    });

    // 5. Atualiza o contador de pendentes e concluídas no rodapé
    const totalPendentes = tarefas.filter(t => !t.concluida).length;
    const totalConcluidas = tarefas.filter(t => t.concluida).length;
    contadorTarefas.textContent = `${totalPendentes} pendente(s) · ${totalConcluidas} concluída(s)`;

    // 6. Mostra o botão "Limpar concluídas" apenas se houver pelo menos uma concluída
    if (totalConcluidas > 0) {
        btnLimparConcluidas.style.display = 'inline-block';
    } else {
        btnLimparConcluidas.style.display = 'none';
    }
}

// Utilitário para evitar injeção de HTML malicioso
function escapeHTML(texto) {
    const div = document.createElement('div');
    div.textContent = texto;
    return div.innerHTML;
}

// ===================================================================
// 6. EVENTOS (INTERAÇÕES DO USUÁRIO)
// ===================================================================

// Envio do formulário
formTarefa.addEventListener('submit', (evento) => {
    evento.preventDefault();
    const texto = inputTarefa.value;

    if (texto.trim() !== '') {
        adicionarTarefa(texto);
        inputTarefa.value = '';
        inputTarefa.focus();
    }
});

// Clique nos botões de filtro (Todas / Pendentes / Concluídas)
botoesFiltro.forEach(botao => {
    botao.addEventListener('click', () => {
        // Remove a classe "ativo" de todos e adiciona no botão clicado
        botoesFiltro.forEach(b => b.classList.remove('ativo'));
        botao.classList.add('ativo');

        // Atualiza o estado do filtro e redesenha a lista
        filtroAtual = botao.dataset.filtro;
        renderizarTarefas();
    });
});

// Clique no botão de limpar tarefas concluídas
btnLimparConcluidas.addEventListener('click', () => {
    if (confirm('Deseja realmente remover todas as tarefas concluídas?')) {
        limparConcluidas();
    }
});

// ===================================================================
// 7. INICIALIZAÇÃO
// ===================================================================
carregarTarefas();
renderizarTarefas();
