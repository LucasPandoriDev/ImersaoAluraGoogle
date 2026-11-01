# 🧮🐍 Calculadora Simples em Python

Projeto desenvolvido durante a **Imersão Alura + Google**, com o objetivo de dar os primeiros passos na programação com utilização da IA.

A aplicação consiste em uma calculadora de terminal organizada, modular e interativa que realiza as operações matemáticas com tratamento de erros.

---

## 🚀 Funcionalidades

### 🔹 Aula 01 (Base do Projeto)
* ➕ **Adição (+)**
* ➖ **Subtração (-)**
* ✖️ **Multiplicação (*)**
* ➗ **Divisão (/)** com proteção contra divisão por zero
* 🔁 **Menu interativo contínuo** para fazer vários cálculos sem reiniciar
* 🛡️ **Validação de entradas** para evitar que o programa feche ao digitar letras ou opções inválidas

### 🔹 Aula 02 (Novidades e Melhorias)
* 🎯 **Cálculo de Porcentagem (%):** Adicionada a função dedicada `porcentagem(valor, percentual)` no menu (opção 5).
* 💬 **Entradas Inteligentes e Contextuais:** Mensagens adaptadas para porcentagem solicitando especificamente o *valor principal* e a *porcentagem (%)*.
* 📊 **Exibição Formatada:** Resultado claro do cálculo percentual (exemplo: `Conta: 15% de 200 = 30`).

---

## 🧠 O que foi praticado no projeto

* **Funções (`def` / `return`):** Organização do código dividindo cada operação em blocos reutilizáveis.
* **Laços de Repetição (`while` / `break` / `continue`):** Criação de um menu contínuo com opção de saída.
* **Condicionais (`if` / `elif` / `else`):** Tomada de decisão com base na escolha do usuário.
* **Tratamento de Exceções (`try` / `except`):** Proteção do fluxo contra entradas inválidas (`ValueError`).
* **Boas Práticas:** Código legível, comentários explicativos e ponto de entrada padrão (`if __name__ == "__main__":`).

---

## 🎓 Sobre a Imersão

Este projeto foi construído como parte dos estudos práticos da **Imersão Alura + Google**, explorando os fundamentos da lógica de programação com IA e o ecossistema Python de maneira descomplicada e aplicada.

---

## 💻 Como Executar

### Pré-requisitos
* Ter o Python 3 instalado em sua máquina.

### Passo a Passo
1. Clone o repositório ou baixe o arquivo `calculadora.py`:
   ```bash
   git clone https://github.com/LucasPandoriDev/calculadora-python.git
   cd calculadora-python
   ```

2. Execute o script desejado:
   * **Versão com Interface Gráfica (Janela):**
     ```bash
     python calculadora_gui.py
     ```
   * **Versão no Terminal:**
     ```bash
     python calculadora.py
     ```

---

## 🖥️ Exemplo de Uso no Terminal

```text
========================================
      CALCULADORA SIMPLES EM PYTHON     
========================================

Selecione a operação desejada:
  1 -> Adição (+)
  2 -> Subtração (-)
  3 -> Multiplicação (*)
  4 -> Divisão (/)
  5 -> Porcentagem (%)
  0 -> Sair do programa

Digite a opção desejada (0 a 5): 1
Digite o primeiro número: 15
Digite o segundo número: 27.5
----------------------------------------
Conta: 15 + 27.5 = 42.5
----------------------------------------

Selecione a operação desejada:
  1 -> Adição (+)
  2 -> Subtração (-)
  3 -> Multiplicação (*)
  4 -> Divisão (/)
  5 -> Porcentagem (%)
  0 -> Sair do programa

Digite a opção desejada (0 a 5): 5
Digite o valor principal: 200
Digite a porcentagem (%): 15
----------------------------------------
Conta: 15% de 200 = 30
----------------------------------------

Selecione a operação desejada:
  ...
Digite a opção desejada (0 a 5): 4
Digite o primeiro número: 42
Digite o segundo número: 0
----------------------------------------
Resultado: Erro: Divisão por zero não é permitida!
----------------------------------------

Digite a opção desejada (0 a 5): 0
Obrigado por usar a calculadora! Bons estudos em Python.
```

---

## 🎯 Próximos Passos e Desafios

* [x] **Cálculo de Porcentagem:** Desenvolver uma opção para calcular porcentagens com base em dois números *(Concluído!)*
* [x] **Potenciação (`**`):** Adicionar uma função `potencia(a, b)` para calcular exponenciação *(Concluído!)*
* [x] **Resto da Divisão (`%`):** Criar uma operação de módulo para identificar números pares e ímpares *(Concluído!)*
* [x] **Interface Gráfica (GUI):** Migrar para uma interface de botões e tela usando a biblioteca Tkinter *(Concluído!)*
* [ ] **Histórico de Operações:** Utilizar uma lista (`[]`) para salvar o histórico de todas as operações em um painel lateral ou arquivo.

---

## 👨‍💻 Autor

Desenvolvido por **Lucas Pandori** durante a Imersão da Alura.

* 💼 **LinkedIn:** [linkedin.com/in/lucaspandori](https://www.linkedin.com/in/lucaspandori)
* 🐙 **GitHub:** [LucasPandoriDev](https://github.com/LucasPandoriDev)

---

## 📄 Licença

Este projeto está sob a licença MIT. Sinta-se à vontade para clonar, estudar, modificar e compartilhar!
