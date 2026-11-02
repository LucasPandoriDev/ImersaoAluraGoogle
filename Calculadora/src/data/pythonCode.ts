export interface CodeComponentExplanation {
  id: string;
  title: string;
  lineRange: [number, number];
  summary: string;
  role: string;
  details: string[];
  beginnerPitfalls?: string[];
  snippet: string;
}

export const PYTHON_CALCULATOR_CODE = `# ==============================================================
# CALCULADORA SIMPLES EM PYTHON
# Ideal para quem está começando a aprender programação!
# ==============================================================

# 1. FUNÇÕES PARA AS QUATRO OPERAÇÕES MATEMÁTICAS BÁSICAS
def adicao(a, b):
    """Retorna a soma de dois números."""
    return a + b

def subtracao(a, b):
    """Retorna a diferença entre dois números."""
    return a - b

def multiplicacao(a, b):
    """Retorna o produto de dois números."""
    return a * b

def divisao(a, b):
    """Retorna a divisão entre dois números.
    Inclui verificação para evitar erro de divisão por zero!
    """
    if b == 0:
        return "Erro: Divisão por zero não é permitida!"
    return a / b

# 2. FUNÇÃO PRINCIPAL QUE CONTROLA O MENU E O FLUXO DO PROGRAMA
def calculadora():
    print("=" * 40)
    print("      CALCULADORA SIMPLES EM PYTHON     ")
    print("=" * 40)
    
    # Laço de repetição: mantém a calculadora funcionando até o usuário sair
    while True:
        # Exibição do menu de opções
        print("\\nSelecione a operação desejada:")
        print("  1 -> Adição (+)")
        print("  2 -> Subtração (-)")
        print("  3 -> Multiplicação (*)")
        print("  4 -> Divisão (/)")
        print("  0 -> Sair do programa")
        
        opcao = input("\\nDigite a opção desejada (0 a 4): ").strip()
        
        # 3. VERIFICAÇÃO SE O USUÁRIO DESEJA SAIR
        if opcao == "0":
            print("\\nObrigado por usar a calculadora! Bons estudos em Python.")
            break  # Interrompe o laço 'while'
            
        # 4. VALIDAÇÃO DA OPÇÃO ESCOLHIDA
        if opcao not in ["1", "2", "3", "4"]:
            print("Opção inválida! Escolha apenas entre 0, 1, 2, 3 ou 4.")
            continue  # Volta para o início do laço
            
        # 5. ENTRADA DOS DOIS NÚMEROS COM TRATAMENTO DE ERROS
        try:
            num1 = float(input("Digite o primeiro número: "))
            num2 = float(input("Digite o segundo número: "))
        except ValueError:
            print("Erro: Você precisa digitar números válidos!")
            continue
            
        # 6. ESTRUTURA CONDICIONAL (IF / ELIF) PARA ESCOLHER A CONTA
        if opcao == "1":
            resultado = adicao(num1, num2)
            operador = "+"
        elif opcao == "2":
            resultado = subtracao(num1, num2)
            operador = "-"
        elif opcao == "3":
            resultado = multiplicacao(num1, num2)
            operador = "*"
        elif opcao == "4":
            resultado = divisao(num1, num2)
            operador = "/"
            
        # 7. EXIBIÇÃO FORMATADA DO RESULTADO
        print("-" * 40)
        if isinstance(resultado, str):
            # Se for texto (a mensagem de erro da divisão por zero)
            print(f"Resultado: {resultado}")
        else:
            # Formata para inteiro caso não tenha decimais (ex: 5.0 vira 5)
            n1_fmt = int(num1) if num1.is_integer() else num1
            n2_fmt = int(num2) if num2.is_integer() else num2
            res_fmt = int(resultado) if resultado.is_integer() else round(resultado, 4)
            print(f"Conta: {n1_fmt} {operador} {n2_fmt} = {res_fmt}")
        print("-" * 40)

# 8. PONTO DE ENTRADA DO SCRIPT
if __name__ == "__main__":
    calculadora()
`;

export const CODE_COMPONENTS: CodeComponentExplanation[] = [
  {
    id: "funcoes",
    title: "1. Funções (def e return)",
    lineRange: [7, 26],
    summary: "Blocos de código reutilizáveis que realizam uma tarefa específica.",
    role: "Em vez de misturar as contas no meio do código, criamos uma função para cada operação: adicao, subtracao, multiplicacao e divisao.",
    details: [
      "A palavra-chave 'def' avisa ao Python: 'aqui começa uma nova função'.",
      "Os nomes entre parênteses (a, b) são chamados de parâmetros (são os números que a função recebe para calcular).",
      "O comando 'return' calcula o valor e entrega a resposta de volta para quem chamou a função.",
      "Boa prática: separar lógica matemática de exibição (print) torna seu código modular e fácil de testar.",
    ],
    beginnerPitfalls: [
      "Confundir 'return' com 'print': print apenas mostra na tela; return devolve o dado para uma variável poder usá-lo depois.",
      "Esquecer a indentação (os 4 espaços à direita dentro do def). No Python, espaços definem o que pertence à função!",
    ],
    snippet: `def adicao(a, b):
    return a + b

def divisao(a, b):
    if b == 0:
        return "Erro: Divisão por zero não é permitida!"
    return a / b`,
  },
  {
    id: "loop",
    title: "2. Laço de Repetição (while True e break)",
    lineRange: [34, 46],
    summary: "Mantém a calculadora aberta para fazer vários cálculos sem reiniciar o programa.",
    role: "Sem o laço, o programa faria apenas uma conta e fecharia imediatamente. O while True cria um ciclo contínuo.",
    details: [
      "'while True' significa 'enquanto for verdadeiro, repita infinitamente'.",
      "'break' é o freio de mão: quando o usuário digita '0', o comando break encerra o laço e finaliza o programa.",
      "'continue' pula o restante do código da rodada atual e volta imediatamente para o topo do menu.",
    ],
    beginnerPitfalls: [
      "Criar loops infinitos sem nenhuma condição de parada com 'break'.",
      "Indentação errada fazendo com que o menu se repita no lugar incorreto.",
    ],
    snippet: `while True:
    opcao = input("Digite a opção (0 para sair): ")
    if opcao == "0":
        print("Saindo...")
        break  # Sai do laço`,
  },
  {
    id: "input_conversao",
    title: "3. Entrada e Conversão (input e float)",
    lineRange: [54, 60],
    summary: "Captura o que o usuário digita no teclado e transforma texto em números.",
    role: "A função input() sempre lê dados como texto (string). Para fazer matemática, precisamos converter para número decimal com float().",
    details: [
      "input('...') exibe uma mensagem no terminal e aguarda o usuário digitar Enter.",
      "Se você fizer '5' + '5' em Python sem converter, o resultado é '55' (concatenação de texto), e não 10!",
      "Usamos float() em vez de int() porque float aceita tanto números inteiros (4, 10) quanto decimais com ponto (2.5, 0.75).",
      ".strip() no input remove espaços acidentais antes ou depois da resposta.",
    ],
    beginnerPitfalls: [
      "Usar vírgula em vez de ponto para decimais: Python segue o padrão internacional (digite 4.5 e não 4,5).",
      "Tentar somar diretamente a saída do input() sem envolver com float() ou int().",
    ],
    snippet: `# input() retorna texto (str), float() converte para número decimal
num1 = float(input("Digite o primeiro número: "))
num2 = float(input("Digite o segundo número: "))`,
  },
  {
    id: "tratamento_erros",
    title: "4. Tratamento de Exceções (try ... except)",
    lineRange: [54, 60],
    summary: "Protege o programa para não travar (crash) caso o usuário digite algo inesperado.",
    role: "Se o usuário digitar 'banana' ou 'dez' quando o programa pede um número, o Python geraria um erro fatal ValueError. O try/except evita isso.",
    details: [
      "O bloco 'try:' diz: 'tente executar estas linhas arriscadas'.",
      "O bloco 'except ValueError:' diz: 'se o usuário digitou letras onde esperava número, capture o erro gentilmente'.",
      "Na divisão (linha 22), também tratamos o erro clássico da matemática: dividir por zero!",
      "Isso torna o programa muito mais profissional, robusto e amigável.",
    ],
    beginnerPitfalls: [
      "Escrever blocos 'except:' genéricos sem especificar o tipo de erro (ex: capture ValueError especificamente).",
      "Não avisar o usuário do que ele errou.",
    ],
    snippet: `try:
    num1 = float(input("Digite um número: "))
except ValueError:
    print("Você digitou um texto e não um número!")
    continue`,
  },
  {
    id: "condicionais",
    title: "5. Estruturas de Decisão (if, elif, else)",
    lineRange: [62, 74],
    summary: "Avalia a escolha do usuário e direciona o fluxo para a operação correta.",
    role: "Permite que o programa tome decisões lógicas com base no número que o usuário digitou no menu.",
    details: [
      "'if' (se): testa a primeira condição (ex: opção == '1').",
      "'elif' (senão se): testa as opções seguintes caso a anterior seja falsa.",
      "O operador de comparação de igualdade no Python é '==' (dois sinais de igual). Um único sinal '=' serve apenas para atribuir valores a variáveis.",
      "'in' e 'not in': usados na linha 49 para verificar se a opção está dentro da lista de opções válidas ['1', '2', '3', '4'].",
    ],
    beginnerPitfalls: [
      "Usar '=' (atribuição) em vez de '==' (comparação) dentro do if.",
      "Esquecer dos dois pontos ':' no final de cada linha de if, elif e else.",
    ],
    snippet: `if opcao == "1":
    resultado = adicao(num1, num2)
elif opcao == "2":
    resultado = subtracao(num1, num2)
elif opcao == "3":
    resultado = multiplicacao(num1, num2)
elif opcao == "4":
    resultado = divisao(num1, num2)`,
  },
  {
    id: "dunder_main",
    title: "6. Ponto de Entrada (__name__ == '__main__')",
    lineRange: [88, 90],
    summary: "A convenção oficial do Python para iniciar a execução do script.",
    role: "Garante que a função calculadora() só seja chamada se você executar este arquivo diretamente.",
    details: [
      "Em Python, todo arquivo tem uma variável interna especial chamada __name__.",
      "Quando você roda 'python calculadora.py' diretamente no terminal, o Python define __name__ como '__main__'.",
      "Se um dia você quiser importar a função adicao em outro arquivo (ex: 'from calculadora import adicao'), o menu não vai disparar sozinho acidentalmente!",
      "É um padrão profissional muito valorizado em entrevistas e projetos reais.",
    ],
    snippet: `if __name__ == "__main__":
    calculadora()`,
  },
];

export const BEGINNER_CHALLENGES = [
  {
    id: "potencia",
    title: "Desafio 1: Adicionar Potenciação (Exponenciação)",
    difficulty: "Fácil",
    description: "Crie uma nova função chamada potencia(a, b) que calcule 'a' elevado a 'b' (ex: 2 elevado a 3 = 8).",
    hint: "No Python, o operador de potência é dois asteriscos seguidos: ** (ex: a ** b).",
    solutionCode: `# 1. Crie a função:
def potencia(a, b):
    return a ** b

# 2. Adicione ao menu:
print("  5 -> Potência (**)")

# 3. Adicione ao if/elif:
elif opcao == "5":
    resultado = potencia(num1, num2)
    operador = "**"`,
  },
  {
    id: "resto",
    title: "Desafio 2: Resto da Divisão (Módulo)",
    difficulty: "Fácil",
    description: "Adicione uma opção para calcular o resto de uma divisão inteira (muito útil para saber se um número é par ou ímpar).",
    hint: "O operador para resto de divisão no Python é o símbolo de porcentagem % (ex: 10 % 3 resulta em 1).",
    solutionCode: `def resto_divisao(a, b):
    if b == 0:
        return "Erro: Impossível calcular resto com divisor zero!"
    return a % b`,
  },
  {
    id: "porcentagem",
    title: "Desafio 3: Cálculo de Porcentagem",
    difficulty: "Médio",
    description: "Crie uma função para calcular quanto é X% de Y (exemplo: 15% de 200 = 30).",
    hint: "A fórmula matemática é (a * b) / 100.",
    solutionCode: `def porcentagem(porcento, total):
    """Calcula quanto 'porcento' representa do 'total'."""
    return (porcento * total) / 100`,
  },
  {
    id: "historico",
    title: "Desafio 4: Guardar Histórico com Lista",
    difficulty: "Avançado",
    description: "Crie uma lista vazia chamada historico = [] e guarde cada conta realizada usando historico.append(). Adicione uma opção 'H' para ver o histórico!",
    hint: "Use historico.append(f'{n1} {operador} {n2} = {resultado}') e depois percorra com um 'for conta in historico:'.",
    solutionCode: `historico = []

# Após calcular com sucesso:
historico.append(f"{n1_fmt} {operador} {n2_fmt} = {res_fmt}")

# Para listar:
if opcao.upper() == "H":
    print("\\n--- Histórico de Cálculos ---")
    for i, conta in enumerate(historico, 1):
        print(f"{i}. {conta}")`,
  },
];

export const PYTHON_OPERATORS_TABLE = [
  { simbolo: "+", nome: "Adição", exemplo: "5 + 3", resultado: "8", explicacao: "Soma dois valores." },
  { simbolo: "-", nome: "Subtração", exemplo: "10 - 4", resultado: "6", explicacao: "Subtrai o segundo valor do primeiro." },
  { simbolo: "*", nome: "Multiplicação", exemplo: "3 * 4", resultado: "12", explicacao: "Multiplica dois fatores." },
  { simbolo: "/", nome: "Divisão Real", exemplo: "7 / 2", resultado: "3.5", explicacao: "Retorna a divisão exata com ponto flutuante (float)." },
  { simbolo: "//", nome: "Divisão Inteira", exemplo: "7 // 2", resultado: "3", explicacao: "Descarta a parte decimal e retorna apenas o quociente inteiro." },
  { simbolo: "%", nome: "Módulo (Resto)", exemplo: "7 % 2", resultado: "1", explicacao: "Retorna o resto que sobra da divisão inteira." },
  { simbolo: "**", nome: "Potenciação", exemplo: "2 ** 3", resultado: "8", explicacao: "Eleva o primeiro número à potência do segundo." },
];
