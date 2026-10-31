# ==============================================================
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
        print("\nSelecione a operação desejada:")
        print("  1 -> Adição (+)")
        print("  2 -> Subtração (-)")
        print("  3 -> Multiplicação (*)")
        print("  4 -> Divisão (/)")
        print("  0 -> Sair do programa")
        
        opcao = input("\nDigite a opção desejada (0 a 4): ").strip()
        
        # 3. VERIFICAÇÃO SE O USUÁRIO DESEJA SAIR
        if opcao == "0":
            print("\nObrigado por usar a calculadora! Bons estudos em Python.")
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
