# 🧮 Calculadora em Python

Projeto desenvolvido durante a **Imersão Alura + Google**, focado no aprendizado prático de lógica de programação, boas práticas e versionamento de código com Python e GitHub.

---

## 📌 Sobre o Projeto

A **Calculadora em Python** é uma aplicação de linha de comando (terminal) modular e interativa. O projeto foi construído para demonstrar como organizar funções de forma limpa, tratar erros de entrada do usuário e manter um fluxo contínuo de execução por meio de menus interativos.

---

## 🚀 Evolução do Projeto

O repositório reflete a progressão dos estudos ao longo das aulas da imersão:

### 🔹 Aula 01: Estrutura Base e Operações Fundamentais
Na primeira aula, foi construída a base da aplicação com:
* **As Quatro Operações Básicas:** Funções dedicadas para adição (`+`), subtração (`-`), multiplicação (`*`) e divisão (`/`).
* **Tratamento de Divisão por Zero:** Verificação condicional para evitar o erro `ZeroDivisionError`, retornando uma mensagem clara ao usuário.
* **Menu Interativo:** Utilização de um laço `while True` para permitir múltiplos cálculos sem fechar o programa.
* **Validação de Entrada:** Bloco `try / except ValueError` para capturar digitações inválidas (letras ou símbolos).

---

### 🔹 Aula 02: Evolução e Adição de Porcentagem
Na segunda aula, a calculadora recebeu novos recursos e refinamentos:
* **Nova Função de Porcentagem (`porcentagem`):** Implementação da regra matemática $\frac{\text{valor} \times \text{percentual}}{100}$ isolada em uma função reutilizável.
* **Expansão do Menu:** Adição da opção `5 -> Porcentagem (%)` com validação atualizada (opções de `0` a `5`).
* **Entradas Dinâmicas e Amigáveis:** 
  * Para contas normais: solicita o *primeiro* e o *segundo* número.
  * Para porcentagem: solicita especificamente o *valor principal* e a *porcentagem (%)*, evitando confusão na ordem dos dados.
* **Exibição Formatada do Resultado:** Apresentação clara e contextualizada (exemplo: `Conta: 15% de 200 = 30`).

---

## ⚙️ Estrutura das Funções

| Função | Parâmetros | Descrição |
| :--- | :--- | :--- |
| `adicao(a, b)` | Dois números | Retorna a soma entre `a` e `b`. |
| `subtracao(a, b)` | Dois números | Retorna a diferença entre `a` e `b`. |
| `multiplicacao(a, b)` | Dois números | Retorna o produto entre `a` e `b`. |
| `divisao(a, b)` | Dois números | Retorna a divisão de `a` por `b` (com proteção para `b == 0`). |
| `porcentagem(valor, percentual)` | Valor base e taxa % | Retorna o cálculo percentual aplicado ao valor. |
| `calculadora()` | Nenhum | Controla o menu, fluxo do programa e formatação. |

---

## 💻 Como Executar

### Pré-requisitos
* Ter o [Python 3](https://www.python.org/) instalado no computador.

### Passo a Passo
1. Clone este repositório ou baixe o arquivo `calculadora.py`:
   ```bash
   git clone https://github.com/SEU-USUARIO/SEU-REPOSITORIO.git
   ```
2. Acesse a pasta do projeto no terminal:
   ```bash
   cd "SEU-REPOSITORIO"
   ```
3. Execute o script:
   ```bash
   python calculadora.py
   ```

---

## 🛠️ Tecnologias Utilizadas

* **Python 3**
* **Git & GitHub** (Controle de Versão)

---

## 👨‍💻 Autor

Projeto desenvolvido como parte dos estudos na **Imersão Alura + Google**.
